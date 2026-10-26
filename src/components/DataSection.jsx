import { useState } from 'react';
import Filters from './Filters.jsx';
import RatesTable from './RatesTable.jsx';
import StatusMessage from './StatusMessage.jsx';
import { EMPTY_FILTERS } from '../constants/index.js';
import { filterRows, sortRows, validateFilters } from '../utils/rates.js';
import { exportCsv } from '../utils/csv.js';
import styles from './DataSection.module.css';

export default function DataSection({ rows, loading, error }) {
  const [filters, setFilters] = useState(EMPTY_FILTERS);
  const [sort, setSort] = useState({ key: 'date', dir: 'desc' });
  const [notice, setNotice] = useState('');

  const filtersError = validateFilters(filters);
  const visible = sortRows(filterRows(rows, filters), sort.key, sort.dir);

  const handleExport = () => {
    setNotice(exportCsv(visible) ? '' : 'Não há registros para exportar com os filtros atuais.');
  };

  return (
    <section className={styles.card} aria-labelledby="data-title">
      <div className={styles.top}>
        <h2 id="data-title" className={styles.h2}>Cotações</h2>
        <button type="button" className={styles.export} onClick={handleExport}
          disabled={loading || visible.length === 0 || !!filtersError}>Exportar CSV</button>
      </div>
      <Filters filters={filters} onChange={setFilters} onClear={() => setFilters(EMPTY_FILTERS)}
        sortKey={sort.key} sortDir={sort.dir} onSortChange={(key, dir) => setSort({ key, dir })} />
      {loading && <StatusMessage>Carregando registros…</StatusMessage>}
      {error && <StatusMessage type="error">{error}</StatusMessage>}
      {notice && <StatusMessage type="error">{notice}</StatusMessage>}
      {!loading && !error && (
        <>
          <p className={styles.count} aria-live="polite">{visible.length} de {rows.length} registros</p>
          {visible.length === 0
            ? <StatusMessage>Nenhum registro encontrado. Ajuste ou limpe os filtros.</StatusMessage>
            : <RatesTable rows={visible} />}
        </>
      )}
    </section>
  );
}
