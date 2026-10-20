import { createContext, useContext, type Dispatch, type SetStateAction } from 'react';

export type FavoriteItem = {
  productdescription: string;
  image: string;
  logo: string;
};

type AppContextValue = {
  cart: unknown[];
  setCart: Dispatch<SetStateAction<unknown[]>>;
  favorites: FavoriteItem[];
  setfavorites: Dispatch<SetStateAction<FavoriteItem[]>>;
};

const AppContext = createContext<AppContextValue | undefined>(undefined);

export function useAppContext() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within the app Provider');
  }
  return context;
}

export default AppContext;
