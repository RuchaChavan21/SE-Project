import React, { createContext, useContext, useState, useEffect } from 'react';
import { defaultPlatformState } from '../data/mockPlatformState';
import { getPlatformState, setPlatformState } from '../services/courseService';

const PlatformStateContext = createContext();

export const PlatformStateProvider = ({ children }) => {
  // We use this state to trigger re-renders across the app when state changes
  const [platformData, setPlatformData] = useState(() => {
    const saved = getPlatformState();
    if (!saved) {
      setPlatformState(defaultPlatformState);
      return defaultPlatformState;
    }
    return saved;
  });

  // Listen for storage events (allows multi-tab sync if needed, and also manual dispatch)
  useEffect(() => {
    const handleStorageChange = () => {
      const current = getPlatformState();
      if (current) setPlatformData(current);
    };

    window.addEventListener('platform_state_updated', handleStorageChange);
    window.addEventListener('storage', handleStorageChange);

    return () => {
      window.removeEventListener('platform_state_updated', handleStorageChange);
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  // Helper to trigger re-renders manually after calling service functions
  const refreshPlatformState = () => {
    const current = getPlatformState();
    if (current) setPlatformData(current);
    window.dispatchEvent(new Event('platform_state_updated'));
  };

  return (
    <PlatformStateContext.Provider value={{ platformData, refreshPlatformState }}>
      {children}
    </PlatformStateContext.Provider>
  );
};

export const usePlatformState = () => useContext(PlatformStateContext);
