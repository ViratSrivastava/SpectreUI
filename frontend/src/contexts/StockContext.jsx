import { createContext, useContext, useState } from 'react';

const StockContext = createContext(null);

export function StockProvider({ children }) {
  const [selectedStock, setSelectedStock] = useState(null);
  const [watchlist, setWatchlist] = useState([]);

  const addToWatchlist = (stock) => {
    setWatchlist((prev) => [...prev, stock]);
  };

  const removeFromWatchlist = (symbol) => {
    setWatchlist((prev) => prev.filter((s) => s.symbol !== symbol));
  };

  const value = {
    selectedStock,
    setSelectedStock,
    watchlist,
    addToWatchlist,
    removeFromWatchlist,
  };

  return (
    <StockContext.Provider value={value}>
      {children}
    </StockContext.Provider>
  );
}

export function useStockContext() {
  const context = useContext(StockContext);
  if (!context) {
    throw new Error('useStockContext must be used within StockProvider');
  }
  return context;
}

export default StockContext;
