import React, { createContext, useContext, useMemo, useState } from 'react';
import { darkTheme, lightTheme } from '../theme/colors';

type ThemeContextValue = {
  dark: boolean;
  theme: typeof lightTheme;
  toggle: () => void;
};

const ThemeContext = createContext<ThemeContextValue | null>(null);

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [dark, setDark] = useState(false);
  const value = useMemo(
    () => ({ dark, theme: dark ? darkTheme : lightTheme, toggle: () => setDark((v) => !v) }),
    [dark],
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
};

export const useTheme = () => {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error('useTheme must be used inside ThemeProvider');
  return ctx;
};
