import React, { useMemo, useState, type PropsWithChildren } from 'react';
import { appColors } from '@/constants/app-colors';
import { useColorScheme } from '@/hooks/use-color-scheme';
import AppContext, { type FavoriteItem, type ThemeMode } from './context';

export default function Provider({ children }: PropsWithChildren) {
  const systemColorScheme = useColorScheme();
  const [cart, setCart] = useState<unknown[]>([]);
  const [favorites, setfavorites] = useState<FavoriteItem[]>([]);
  const [themeOverride, setThemeOverride] = useState<ThemeMode | null>(null);
  const mode: ThemeMode = themeOverride ?? (systemColorScheme === 'dark' ? 'dark' : 'light');
  const value = useMemo(
    () => ({
      cart,
      setCart,
      favorites,
      setfavorites,
      isDark: mode === 'dark',
      colors: appColors[mode],
      toggleTheme: () =>
        setThemeOverride((previous) => {
          const current = previous ?? (systemColorScheme === 'dark' ? 'dark' : 'light');
          return current === 'dark' ? 'light' : 'dark';
        }),
    }),
    [cart, favorites, mode, setCart, setfavorites, systemColorScheme],
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}