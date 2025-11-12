import { useEffect, useCallback } from 'react';
import { useLocalStorage } from './useLocalStorage';

export function useDarkMode() {
  const [isDark, setIsDark] = useLocalStorage('darkMode', true);

  useEffect(() => {
    const root = window.document.documentElement;
    
    if (isDark) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [isDark]);

  const toggleDarkMode = useCallback(() => {
    setIsDark(!isDark);
  }, [isDark, setIsDark]);

  return {
    isDark,
    toggleDarkMode
  };
}