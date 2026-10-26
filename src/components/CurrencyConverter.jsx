import { useEffect, useState } from 'react';
import { getCurrencies } from '../services/frankfurterService.js';
import { DEFAULT_FROM, DEFAULT_TO } from '../constants/index.js';
import styles from './CurrencyConverter.module.css';

export default function CurrencyConverter() {
  const [currencies, setCurrencies] = useState({});
  const [from, setFrom] = useState(DEFAULT_FROM);
  const [to, setTo] = useState(DEFAULT_TO);
  const [amountText, setAmountText] = useState('100');

  useEffect(() => {
    getCurrencies().then(setCurrencies).catch(console.error);
  }, []);

  const options = Object.entries(currencies).map(([code, name]) => (
    <option key={code} value={code}>{code} — {name}</option>
  ));

  return (
    <section className={styles.card} aria-labelledby="conv-title">
      <h2 id="conv-title" className={styles.h2}>Conversor</h2>
      <div className={styles.grid}>
        <label className={styles.field}>Valor
          <input inputMode="decimal" value={amountText} onChange={(e) => setAmountText(e.target.value)} />
        </label>
        <label className={styles.field}>De
          <select value={from} onChange={(e) => setFrom(e.target.value)}>{options}</select>
        </label>
        <button type="button" className={styles.swap} disabled aria-label="Inverter moedas">⇄</button>
        <label className={styles.field}>Para
          <select value={to} onChange={(e) => setTo(e.target.value)}>{options}</select>
        </label>
      </div>
    </section>
  );
}
