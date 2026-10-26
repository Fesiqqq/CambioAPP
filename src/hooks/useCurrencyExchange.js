import { useAsync } from './useAsync.js';
import { getCurrencies, getLatestRate } from '../services/frankfurterService.js';
import { toISODate } from '../utils/dates.js';

export const useCurrencies = () => useAsync((s) => getCurrencies(s), []);

export function useLatestRate(from, to) {
  const same = from === to;
  const state = useAsync((s) => getLatestRate(from, to, s), [from, to], !same);
  if (same) return { data: { rate: 1, date: toISODate(new Date()) }, loading: false, error: null };
  const data = state.data ? { rate: state.data.rates[to], date: state.data.date } : null;
  return { ...state, data };
}
