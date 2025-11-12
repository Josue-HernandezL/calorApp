import React from 'react';
import { MoonIcon, SunIcon } from 'lucide-react';
import { useDarkMode } from '../hooks/useDarkMode';
export function ThemeToggle() {
  const {
    isDark,
    toggleDarkMode
  } = useDarkMode();
  return <button onClick={toggleDarkMode} className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors" aria-label={isDark ? 'Activar modo claro' : 'Activar modo oscuro'} title={isDark ? 'Modo claro' : 'Modo oscuro'}>
      {isDark ? <SunIcon className="w-5 h-5 text-yellow-500" /> : <MoonIcon className="w-5 h-5 text-gray-700" />}
    </button>;
}