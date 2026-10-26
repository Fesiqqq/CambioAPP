import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from 'recharts';
import PeriodSelector from './PeriodSelector.jsx';
import StatusMessage from './StatusMessage.jsx';
import { formatDate } from '../utils/dates.js';
import { formatRate } from '../utils/format.js';
import styles from './RateChart.module.css';

export default function RateChart({ from, to, period, onPeriodChange, rows, loading, error }) {
  return (
    <section className={styles.card} aria-labelledby="chart-title">
      <h2 id="chart-title" className={styles.h2}>Histórico {from}/{to}</h2>
      <PeriodSelector value={period} onChange={onPeriodChange} />
      <div className={styles.chart}>
        {loading && <StatusMessage>Carregando histórico…</StatusMessage>}
        {error && <StatusMessage type="error">{error}</StatusMessage>}
        {!loading && !error && rows.length === 0 && <StatusMessage>Nenhuma cotação publicada neste período.</StatusMessage>}
        {!loading && !error && rows.length > 0 && (
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={rows} margin={{ top: 8, right: 8, bottom: 0, left: 0 }}>
              <CartesianGrid stroke="#d5ded9" strokeDasharray="3 3" />
              <XAxis dataKey="date" tickFormatter={formatDate} minTickGap={40} fontSize={12} />
              <YAxis domain={['auto', 'auto']} tickFormatter={(v) => v.toFixed(2)} width={52} fontSize={12} />
              <Tooltip labelFormatter={formatDate} formatter={(v) => [formatRate(v), `${from}→${to}`]} />
              <Line type="monotone" dataKey="rate" stroke="#0f6b4f" strokeWidth={2} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        )}
      </div>
    </section>
  );
}
