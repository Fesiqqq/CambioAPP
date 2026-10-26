import { PERIODS } from '../constants/index.js';
import styles from './PeriodSelector.module.css';

export default function PeriodSelector({ value, onChange }) {
  return (
    <div className={styles.group} role="radiogroup" aria-label="Período do histórico">
      {PERIODS.map((p) => (
        <button key={p.id} type="button" role="radio" aria-checked={value === p.id}
          className={`${styles.btn} ${value === p.id ? styles.active : ''}`} onClick={() => onChange(p.id)}>
          {p.label}
        </button>
      ))}
    </div>
  );
}
