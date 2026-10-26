export const toISODate = (d) => d.toISOString().slice(0, 10);

/** Data inicial do período, a partir de `today` (injetável para testes). */
export function getStartDate(period, today = new Date()) {
  const d = new Date(Date.UTC(today.getUTCFullYear(), today.getUTCMonth(), today.getUTCDate()));
  if (period.days) d.setUTCDate(d.getUTCDate() - period.days);
  else d.setUTCMonth(d.getUTCMonth() - period.months);
  return toISODate(d);
}

export const formatDate = (iso) => (iso ? iso.split('-').reverse().join('/') : '');
