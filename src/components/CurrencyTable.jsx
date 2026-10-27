import { useState } from 'react';
import CurrencyFilters from './CurrencyFilters.jsx';
import StatusMessage from './StatusMessage.jsx';
import { EMPTY_FILTERS } from '../constants/index.js';
import { filterRows, sortRows, validateFilters } from '../utils/rates.js';
import { formatDate } from '../utils/dates.js';
import { formatRate } from '../utils/formatters.js';
import { exportCsv } from '../utils/csvExporter.js'; // S9
import styles from './CurrencyTable.module.css';

export default function CurrencyTable({ rows, loading, error }) {
  const [filters, setFilters] = useState(EMPTY_FILTERS);
  const [sort, setSort] = useState({ key: 'date', dir: 'desc' });
  const [notice, setNotice] = useState(''); // S9
  const visible = validateFilters(filters) ? [] : sortRows(filterRows(rows, filters), sort.key, sort.dir);
  const handleExport = () => setNotice(exportCsv(visible) ? '' : 'Não há registros para exportar com os filtros atuais.'); // S9

  return (
    <section className={styles.card} aria-labelledby="data-title">
      <div className={styles.top}>
        <h2 id="data-title" className={styles.h2}>Cotações</h2>
        <button type="button" className={styles.export} onClick={handleExport} disabled={loading || visible.length === 0}>Exportar CSV</button> {/* S9 */}
      </div>
      <CurrencyFilters filters={filters} onChange={setFilters} onClear={() => setFilters(EMPTY_FILTERS)}
        sortKey={sort.key} sortDir={sort.dir} onSortChange={(key, dir) => setSort({ key, dir })} />
      {loading && <StatusMessage>Carregando registros…</StatusMessage>}
      {error && <StatusMessage type="error">{error}</StatusMessage>}
      {notice && <StatusMessage type="error">{notice}</StatusMessage>} {/* S9 */}
      {!loading && !error && (
        <>
          <p className={styles.count} aria-live="polite">{visible.length} de {rows.length} registros</p>
          {visible.length === 0 ? (
            <StatusMessage>Nenhum registro encontrado. Ajuste ou limpe os filtros.</StatusMessage>
          ) : (
            <div className={styles.scroll}>
              <table className={styles.table}>
                <thead><tr><th>Data</th><th>Origem</th><th>Destino</th><th className={styles.num}>Cotação</th></tr></thead>
                <tbody>
                  {visible.map((r) => (
                    <tr key={r.date}><td>{formatDate(r.date)}</td><td>{r.from}</td><td>{r.to}</td><td className={styles.num}>{formatRate(r.rate)}</td></tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </>
      )}
    </section>
  );
}
