import { useState } from 'react';
import { useLatestRate } from '../hooks/useExchangeRates.js';
import { parseAmount, formatMoney, formatRate } from '../utils/format.js';
import { formatDate } from '../utils/dates.js';
import StatusMessage from './StatusMessage.jsx';
import styles from './Converter.module.css';

export default function Converter({ currencies, from, to, onChangeFrom, onChangeTo, onSwap }) {
  const [amountText, setAmountText] = useState('100');
  const { data, loading, error } = useLatestRate(from, to);
  const amount = parseAmount(amountText);
  const invalid = amountText.trim() !== '' && amount === null;
  const options = Object.entries(currencies).map(([code, name]) => (
    <option key={code} value={code}>{code} — {name}</option>
  ));

  return (
    <section className={styles.card} aria-labelledby="conv-title">
      <h2 id="conv-title" className={styles.h2}>Conversor</h2>
      <div className={styles.grid}>
        <label className={styles.field}>Valor
          <input inputMode="decimal" value={amountText} onChange={(e) => setAmountText(e.target.value)}
            aria-invalid={invalid} aria-describedby={invalid ? 'amount-err' : undefined} />
        </label>
        <label className={styles.field}>De
          <select value={from} onChange={(e) => onChangeFrom(e.target.value)}>{options}</select>
        </label>
        <button type="button" className={styles.swap} onClick={onSwap} aria-label="Inverter moedas">⇄</button>
        <label className={styles.field}>Para
          <select value={to} onChange={(e) => onChangeTo(e.target.value)}>{options}</select>
        </label>
      </div>
      {invalid && <p id="amount-err" className={styles.err}>Digite um número maior que zero (ex.: 100 ou 99,90).</p>}

      <div className={styles.result}>
        {loading && <StatusMessage>Buscando cotação…</StatusMessage>}
        {error && <StatusMessage type="error">{error}</StatusMessage>}
        {!loading && !error && data && amount !== null && (
          <>
            <p className={styles.big}>{formatMoney(amount * data.rate, to)}</p>
            <p className={styles.meta}>{formatMoney(amount, from)} = {formatMoney(amount * data.rate, to)}</p>
            <p className={styles.meta}>Taxa: 1 {from} = {formatRate(data.rate)} {to} · Cotação de {formatDate(data.date)}</p>
          </>
        )}
        {!loading && !error && amount === null && !invalid && <StatusMessage>Informe um valor para converter.</StatusMessage>}
      </div>
    </section>
  );
}
