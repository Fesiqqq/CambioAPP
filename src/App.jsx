import { useState } from 'react';
import Header from './components/Header.jsx';
import Converter from './components/Converter.jsx';
import RateChart from './components/RateChart.jsx';
import DataSection from './components/DataSection.jsx';
import StatusMessage from './components/StatusMessage.jsx';
import { useCurrencies, useHistory } from './hooks/useExchangeRates.js';
import { DEFAULT_FROM, DEFAULT_TO, DEFAULT_PERIOD } from './constants/index.js';
import styles from './App.module.css';

export default function App() {
  const [from, setFrom] = useState(DEFAULT_FROM);
  const [to, setTo] = useState(DEFAULT_TO);
  const [period, setPeriod] = useState(DEFAULT_PERIOD);
  const currencies = useCurrencies();
  const history = useHistory(from, to, period);

  return (
    <div className={styles.page}>
      <Header />
      <main className={styles.main}>
        {currencies.loading && <StatusMessage>Carregando moedas…</StatusMessage>}
        {currencies.error && <StatusMessage type="error">{currencies.error}</StatusMessage>}
        {currencies.data && (
          <>
            <Converter currencies={currencies.data} from={from} to={to}
              onChangeFrom={setFrom} onChangeTo={setTo} onSwap={() => { setFrom(to); setTo(from); }} />
            <RateChart from={from} to={to} period={period} onPeriodChange={setPeriod} {...history} />
            <DataSection rows={history.rows} loading={history.loading} error={history.error} />
          </>
        )}
      </main>
    </div>
  );
}
