// Stock data service
import api from './api';

export const stockService = {
  getStockData: async (symbol) => {
    return api.get(`/stocks/${symbol}`);
  },
  
  getStockList: async () => {
    return api.get('/stocks');
  },
  
  getStockAnalysis: async (symbol) => {
    return api.get(`/stocks/${symbol}/analysis`);
  },
};

export default stockService;
