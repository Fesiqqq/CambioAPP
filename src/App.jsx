import { useState } from 'react';
import Header from './components/Header.jsx';
import CurrencyConverter from './components/CurrencyConverter.jsx';
import { DEFAULT_FROM, DEFAULT_TO } from './constants/index.js';
import styles from './App.module.css';

export default function App() {
  const [from, setFrom] = useState(DEFAULT_FROM);
  const [to, setTo] = useState(DEFAULT_TO);

  return (
    <div className={styles.page}>
      <Header />
      <main className={styles.main}>
        <CurrencyConverter from={from} to={to} onChangeFrom={setFrom} onChangeTo={setTo}
          onSwap={() => { setFrom(to); setTo(from); }} />
      </main>
    </div>
  );
}
