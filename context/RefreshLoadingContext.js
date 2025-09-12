'use client'

import { createContext, useContext, useEffect, useState } from 'react'

const RefreshLoadingContext = createContext();

export const RefreshLoadingProvider = ({ children }) => {
     const [loadingCount, setLoadingCount] = useState(0);

  const showLoading = () => setLoadingCount((prev) => prev + 1);
  const hideLoading = () => setLoadingCount((prev) => Math.max(prev - 1, 0));

  return (
    <RefreshLoadingContext.Provider
      value={{ isLoading: loadingCount > 0, showLoading, hideLoading }}
    >
      {children}
    </RefreshLoadingContext.Provider>
  );
};

export const useRefreshLoading = () => useContext(RefreshLoadingContext);
