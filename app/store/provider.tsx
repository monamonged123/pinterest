import React, { useState, type PropsWithChildren } from 'react';
import AppContext, { type FavoriteItem } from './context';

export default function Provider({ children }: PropsWithChildren) {
  const [cart, setCart] = useState<unknown[]>([]);
  const [favorites, setfavorites] = useState<FavoriteItem[]>([]);
  const value = {
    cart,
    setCart,
    favorites,
    setfavorites,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}