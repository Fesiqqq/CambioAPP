const BASE_URL = 'https://api.frankfurter.dev/v1';

async function request(path, signal) {
  let res;
  try {
    res = await fetch(`${BASE_URL}${path}`, { signal });
  } catch (err) {
    if (err.name === 'AbortError') throw err;
    throw new Error('Não foi possível conectar à API. Verifique sua conexão.');
  }
  if (res.status === 404) throw new Error('Não há cotação publicada para os parâmetros informados.');
  if (!res.ok) throw new Error(`A API respondeu com erro (${res.status}). Tente novamente.`);
  return res.json();
}

/** { USD: "United States Dollar", ... } */
export const getCurrencies = (signal) => request('/currencies', signal);

/** { amount, base, date, rates: { BRL: 5.1 } } */
export const getLatestRate = (from, to, signal) => request(`/latest?base=${from}&symbols=${to}`, signal);

/** { base, start_date, end_date, rates: { '2024-01-02': { BRL: 4.9 } } } */
export const getTimeSeries = (from, to, start, end, signal) =>
  request(`/${start}..${end}?base=${from}&symbols=${to}`, signal);
