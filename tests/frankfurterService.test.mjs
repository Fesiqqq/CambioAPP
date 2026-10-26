import assert from 'node:assert/strict';
import { getCurrencies, getLatestRate, getTimeSeries } from '../src/services/frankfurterService.js';

const calls = [];
const mock = (status, body) => { globalThis.fetch = async (url) => { calls.push(url); return { ok: status < 400, status, json: async () => body }; }; };
const out = [];
const test = async (name, fn) => { try { await fn(); out.push(['PASS', name]); } catch (e) { out.push(['FAIL', `${name} -> ${e.message}`]); } };
const B = 'https://api.frankfurter.app';

await test('getCurrencies monta URL e devolve dados', async () => { mock(200, { USD: 'US Dollar' }); const d = await getCurrencies(); assert.equal(calls.at(-1), `${B}/currencies`); assert.equal(d.USD, 'US Dollar'); });
await test('getLatestRate monta URL', async () => { mock(200, { rates: { BRL: 5 } }); await getLatestRate('USD', 'BRL'); assert.equal(calls.at(-1), `${B}/latest?from=USD&to=BRL`); });
await test('getTimeSeries monta URL com intervalo', async () => { mock(200, { rates: {} }); await getTimeSeries('USD', 'BRL', '2024-01-01', '2024-01-31'); assert.equal(calls.at(-1), `${B}/2024-01-01..2024-01-31?from=USD&to=BRL`); });
await test('404 vira mensagem amigável', async () => { mock(404, {}); await assert.rejects(getLatestRate('XXX', 'BRL'), /Não há cotação publicada/); });
await test('500 informa código HTTP', async () => { mock(500, {}); await assert.rejects(getCurrencies(), /\(500\)/); });
await test('falha de rede vira mensagem de conexão', async () => { globalThis.fetch = async () => { throw new TypeError('fail'); }; await assert.rejects(getCurrencies(), /conectar à API/); });
await test('AbortError é repassado intacto', async () => { globalThis.fetch = async () => { throw Object.assign(new Error('x'), { name: 'AbortError' }); }; await assert.rejects(getCurrencies(), (e) => e.name === 'AbortError'); });

out.forEach(([s, n]) => console.log(s, n));
console.log(`${out.filter((x) => x[0] === 'PASS').length}/${out.length} passaram`);
process.exit(out.some((x) => x[0] === 'FAIL') ? 1 : 0);
