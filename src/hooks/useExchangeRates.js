import { useMemo } from 'react';
import { useAsync } from './useAsync.js';
import { getCurrencies, getLatestRate, getTimeSeries } from '../services/frankfurter.js';
import { PERIODS } from '../constants/index.js';
import { getStartDate, toISODate } from '../utils/dates.js';
import { normalizeSeries } from '../utils/rates.js';

export const useCurrencies = () => useAsync((s) => getCurrencies(s), []);

export function useLatestRate(from, to) {
  const same = from === to;
  const state = useAsync((s) => getLatestRate(from, to, s), [from, to], !same);
  if (same) return { data: { rate: 1, date: toISODate(new Date()) }, loading: false, error: null };
  const data = state.data ? { rate: state.data.rates[to], date: state.data.date } : null;
  return { ...state, data };
}

export function useHistory(from, to, periodId) {
  const same = from === to;
  const state = useAsync((s) => {
    const period = PERIODS.find((p) => p.id === periodId);
    return getTimeSeries(from, to, getStartDate(period), toISODate(new Date()), s);
  }, [from, to, periodId], !same);
  const rows = useMemo(() => normalizeSeries(state.data, from, to), [state.data, from, to]);
  return {
    rows, loading: state.loading,
    error: same ? 'Escolha moedas diferentes para ver o histórico.' : state.error,
  };
}
