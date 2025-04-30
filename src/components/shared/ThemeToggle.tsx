// components/ThemeToggle.tsx
'use client';

import { Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';

export function ThemeToggle() {
  const { setTheme, theme } = useTheme();

  return (
    <button
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
      className="relative p-2 rounded-lg hover:bg-accent transition-colors duration-300 overflow-hidden w-10 h-10 flex items-center justify-center"
    >
      <Sun className="h-5 w-5 absolute rotate-0 scale-100 transition-all duration-300 dark:-rotate-90 dark:scale-0 dark:opacity-0" />
      <Moon className="h-5 w-5 absolute rotate-90 scale-0 opacity-0 transition-all duration-300 dark:rotate-0 dark:scale-100 dark:opacity-100" />
      <span className="sr-only">Toggle theme</span>
    </button>
  );
}
