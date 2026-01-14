// Application constants
export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api';
export const WS_URL = import.meta.env.VITE_WS_URL || 'ws://localhost:3000';

export const STOCK_INTERVALS = {
  '1D': '1 Day',
  '1W': '1 Week',
  '1M': '1 Month',
  '3M': '3 Months',
  '1Y': '1 Year',
};

export const SIGNAL_TYPES = {
  BUY: 'buy',
  SELL: 'sell',
  HOLD: 'hold',
};

export default {
  API_BASE_URL,
  WS_URL,
  STOCK_INTERVALS,
  SIGNAL_TYPES,
};
