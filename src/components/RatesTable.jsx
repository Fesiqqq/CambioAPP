import { formatDate } from '../utils/dates.js';
import { formatRate } from '../utils/format.js';
import styles from './RatesTable.module.css';

export default function RatesTable({ rows }) {
  return (
    <div className={styles.scroll}>
      <table className={styles.table}>
        <thead><tr><th>Data</th><th>Origem</th><th>Destino</th><th className={styles.num}>Cotação</th></tr></thead>
        <tbody>
          {rows.map((r) => (
            <tr key={r.date}><td>{formatDate(r.date)}</td><td>{r.from}</td><td>{r.to}</td><td className={styles.num}>{formatRate(r.rate)}</td></tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
