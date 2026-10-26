/** Normaliza resposta da série temporal em linhas planas, ordenadas por data. */
export function normalizeSeries(data, from, to) {
  if (!data || !data.rates) return [];
  return Object.entries(data.rates)
    .filter(([, r]) => r && typeof r[to] === 'number')
    .map(([date, r]) => ({ date, from, to, rate: r[to] }))
    .sort((a, b) => a.date.localeCompare(b.date));
}

/** Aplica filtros combináveis (AND). Campos vazios são ignorados. */
export function filterRows(rows, { startDate, endDate, minRate, maxRate }) {
  const min = minRate === '' ? null : Number(minRate);
  const max = maxRate === '' ? null : Number(maxRate);
  return rows.filter((r) =>
    (!startDate || r.date >= startDate) &&
    (!endDate || r.date <= endDate) &&
    (min === null || Number.isNaN(min) || r.rate >= min) &&
    (max === null || Number.isNaN(max) || r.rate <= max));
}

/** Ordena sem mutar. key: 'date' | 'rate'; dir: 'asc' | 'desc'. */
export function sortRows(rows, key, dir) {
  const f = dir === 'asc' ? 1 : -1;
  return [...rows].sort((a, b) => (key === 'date' ? a.date.localeCompare(b.date) : a.rate - b.rate) * f);
}

/** Valida consistência dos filtros; retorna mensagem ou null. */
export function validateFilters({ startDate, endDate, minRate, maxRate }) {
  if (startDate && endDate && startDate > endDate) return 'A data inicial não pode ser posterior à final.';
  if (minRate !== '' && maxRate !== '' && Number(minRate) > Number(maxRate)) return 'A cotação mínima não pode ser maior que a máxima.';
  return null;
}
