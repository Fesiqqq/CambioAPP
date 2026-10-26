import { useEffect, useState } from 'react';
import { getCurrencies, getLatestRate } from '../services/frankfurterService.js';
import { parseAmount, formatMoney, formatRate } from '../utils/formatters.js';
import { formatDate, toISODate } from '../utils/dates.js';
import styles from './CurrencyConverter.module.css';

export default function CurrencyConverter({ from, to, onChangeFrom, onChangeTo, onSwap }) {
  const [currencies, setCurrencies] = useState({});
  const [amountText, setAmountText] = useState('100');
  const [quote, setQuote] = useState(null);

  useEffect(() => {
    getCurrencies().then(setCurrencies).catch(console.error);
  }, []);

  useEffect(() => {
    if (from === to) { setQuote({ rate: 1, date: toISODate(new Date()) }); return; }
    let cancelled = false;
    setQuote(null);
    getLatestRate(from, to)
      .then((d) => { if (!cancelled) setQuote({ rate: d.rates[to], date: d.date }); })
      .catch(console.error);
    return () => { cancelled = true; };
  }, [from, to]);

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
        {quote && amount !== null && (
          <>
            <p className={styles.big}>{formatMoney(amount * quote.rate, to)}</p>
            <p className={styles.meta}>{formatMoney(amount, from)} = {formatMoney(amount * quote.rate, to)}</p>
            <p className={styles.meta}>Taxa: 1 {from} = {formatRate(quote.rate)} {to} · Cotação de {formatDate(quote.date)}</p>
          </>
        )}
      </div>
    </section>
  );
}
