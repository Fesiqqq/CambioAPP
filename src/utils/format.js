/** Converte texto do input em número; retorna null se inválido (vazio, negativo, zero, NaN). */
export function parseAmount(text) {
  if (typeof text !== 'string' || text.trim() === '') return null;
  const n = Number(text.trim().replace(',', '.'));
  return Number.isFinite(n) && n > 0 ? n : null;
}

export const formatMoney = (value, currency) =>
  new Intl.NumberFormat('pt-BR', { style: 'currency', currency, maximumFractionDigits: 2 }).format(value);

export const formatRate = (rate) =>
  new Intl.NumberFormat('pt-BR', { minimumFractionDigits: 4, maximumFractionDigits: 6 }).format(rate);
