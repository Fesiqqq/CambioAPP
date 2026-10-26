const escapeCell = (v) => {
  const s = String(v);
  return /[",\n;]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;
};

export function buildCsv(rows) {
  const header = ['Data', 'Moeda de origem', 'Moeda de destino', 'Cotacao'];
  const lines = rows.map((r) => [r.date, r.from, r.to, r.rate].map(escapeCell).join(','));
  return [header.join(','), ...lines].join('\n');
}

export const csvFileName = (rows) => `cotacoes_${rows[0].from}-${rows[0].to}_${rows[0].date}_a_${rows[rows.length - 1].date}.csv`;

/** Baixa o CSV. Retorna false (sem baixar) quando não há registros. */
export function exportCsv(rows) {
  if (!rows.length) return false;
  const sorted = [...rows].sort((a, b) => a.date.localeCompare(b.date));
  const blob = new Blob(['\uFEFF' + buildCsv(rows)], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const a = Object.assign(document.createElement('a'), { href: url, download: csvFileName(sorted) });
  document.body.appendChild(a); a.click(); a.remove();
  URL.revokeObjectURL(url);
  return true;
}
