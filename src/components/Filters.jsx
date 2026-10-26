import { validateFilters } from '../utils/rates.js';
import StatusMessage from './StatusMessage.jsx';
import styles from './Filters.module.css';

export default function Filters({ filters, onChange, onClear, sortKey, sortDir, onSortChange }) {
  const set = (name) => (e) => onChange({ ...filters, [name]: e.target.value });
  const problem = validateFilters(filters);
  return (
    <div className={styles.wrap}>
      <div className={styles.grid}>
        <label>Data inicial<input type="date" value={filters.startDate} onChange={set('startDate')} /></label>
        <label>Data final<input type="date" value={filters.endDate} onChange={set('endDate')} /></label>
        <label>Cotação mínima<input type="number" step="any" min="0" value={filters.minRate} onChange={set('minRate')} /></label>
        <label>Cotação máxima<input type="number" step="any" min="0" value={filters.maxRate} onChange={set('maxRate')} /></label>
        <label>Ordenar por
          <select value={`${sortKey}:${sortDir}`} onChange={(e) => onSortChange(...e.target.value.split(':'))}>
            <option value="date:desc">Data (mais recente)</option>
            <option value="date:asc">Data (mais antiga)</option>
            <option value="rate:desc">Cotação (maior)</option>
            <option value="rate:asc">Cotação (menor)</option>
          </select>
        </label>
        <button type="button" className={styles.clear} onClick={onClear}>Limpar filtros</button>
      </div>
      {problem && <StatusMessage type="error">{problem}</StatusMessage>}
    </div>
  );
}
