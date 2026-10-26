export const DEFAULT_FROM = 'USD';
export const DEFAULT_TO = 'BRL';
export const DEFAULT_PERIOD = '1m';
export const PERIODS = [
  { id: '7d', label: '7 dias', days: 7 },
  { id: '15d', label: '15 dias', days: 15 },
  { id: '1m', label: '30 dias', days: 30 },
  { id: '3m', label: '3 meses', months: 3 },
  { id: '6m', label: '6 meses', months: 6 },
  { id: '1y', label: '1 ano', months: 12 },
  { id: '5y', label: '5 anos', months: 60 },
  { id: '10y', label: '10 anos', months: 120 },
];
export const EMPTY_FILTERS = { startDate: '', endDate: '', minRate: '', maxRate: '' };
