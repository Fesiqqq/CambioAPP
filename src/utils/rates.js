/** Normaliza resposta da série temporal em linhas planas, ordenadas por data. */
export function normalizeSeries(data, from, to) {
  if (!data || !data.rates) return [];
  return Object.entries(data.rates)
    .filter(([, r]) => r && typeof r[to] === 'number')
    .map(([date, r]) => ({ date, from, to, rate: r[to] }))
    .sort((a, b) => a.date.localeCompare(b.date));
}

