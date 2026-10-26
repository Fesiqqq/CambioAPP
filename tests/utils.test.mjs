import assert from 'node:assert/strict';
import { parseAmount, formatRate } from '../src/utils/format.js';
import { getStartDate } from '../src/utils/dates.js';
import { normalizeSeries, filterRows, sortRows, validateFilters } from '../src/utils/rates.js';
import { buildCsv } from '../src/utils/csv.js';
import { PERIODS } from '../src/constants/index.js';

const rows = [
  { date: '2024-01-03', from: 'USD', to: 'BRL', rate: 4.9 },
  { date: '2024-01-01', from: 'USD', to: 'BRL', rate: 4.85 },
  { date: '2024-01-02', from: 'USD', to: 'BRL', rate: 5.0 },
];
const none = { startDate: '', endDate: '', minRate: '', maxRate: '' };
const t = [];
const test = (name, fn) => { try { fn(); t.push(['PASS', name]); } catch (e) { t.push(['FAIL', name + ' -> ' + e.message]); } };

test('parseAmount aceita ponto e vírgula', () => { assert.equal(parseAmount('99,90'), 99.9); assert.equal(parseAmount('100'), 100); });
test('parseAmount rejeita inválidos', () => { for (const v of ['', 'abc', '-5', '0', '1e999']) assert.equal(parseAmount(v), null); });
test('getStartDate 7 dias', () => assert.equal(getStartDate(PERIODS[0], new Date('2024-03-15T12:00:00Z')), '2024-03-08'));
test('getStartDate 3 meses', () => assert.equal(getStartDate(PERIODS[3], new Date('2024-03-15T12:00:00Z')), '2023-12-15'));
test('getStartDate 10 anos', () => assert.equal(getStartDate(PERIODS[7], new Date('2024-03-15T12:00:00Z')), '2014-03-15'));
test('normalizeSeries ordena e achata', () => {
  const out = normalizeSeries({ rates: { '2024-01-02': { BRL: 5 }, '2024-01-01': { BRL: 4.85 } } }, 'USD', 'BRL');
  assert.deepEqual(out.map((r) => r.date), ['2024-01-01', '2024-01-02']);
});
test('normalizeSeries com dados vazios', () => { assert.deepEqual(normalizeSeries(null, 'USD', 'BRL'), []); assert.deepEqual(normalizeSeries({ rates: {} }, 'USD', 'BRL'), []); });
test('filtro por data', () => assert.equal(filterRows(rows, { ...none, startDate: '2024-01-02', endDate: '2024-01-02' }).length, 1));
test('filtro por cotação mín/máx', () => assert.deepEqual(filterRows(rows, { ...none, minRate: '4.9', maxRate: '5' }).map((r) => r.rate), [4.9, 5.0]));
test('filtros combinados (AND)', () => assert.equal(filterRows(rows, { ...none, startDate: '2024-01-02', minRate: '4.95' }).length, 1));
test('filtros vazios retornam tudo', () => assert.equal(filterRows(rows, none).length, 3));
test('sort data asc/desc', () => { assert.equal(sortRows(rows, 'date', 'asc')[0].date, '2024-01-01'); assert.equal(sortRows(rows, 'date', 'desc')[0].date, '2024-01-03'); });
test('sort cotação desc e não muta', () => { const c = [...rows]; assert.equal(sortRows(rows, 'rate', 'desc')[0].rate, 5); assert.deepEqual(rows, c); });
test('validateFilters detecta intervalos inválidos', () => {
  assert.ok(validateFilters({ ...none, startDate: '2024-02-01', endDate: '2024-01-01' }));
  assert.ok(validateFilters({ ...none, minRate: '6', maxRate: '5' }));
  assert.equal(validateFilters(none), null);
});
test('buildCsv cabeçalho + linhas', () => { const l = buildCsv(rows).split('\n'); assert.equal(l.length, 4); assert.equal(l[0], 'Data,Moeda de origem,Moeda de destino,Cotacao'); assert.equal(l[1], '2024-01-03,USD,BRL,4.9'); });
test('buildCsv escapa aspas e vírgulas', () => assert.ok(buildCsv([{ date: 'a,b', from: 'X"Y', to: 'Z', rate: 1 }]).includes('"a,b","X""Y"')));

t.forEach(([s, n]) => console.log(s, n));
console.log(`\n${t.filter((x) => x[0] === 'PASS').length}/${t.length} passaram`);
process.exit(t.some((x) => x[0] === 'FAIL') ? 1 : 0);
