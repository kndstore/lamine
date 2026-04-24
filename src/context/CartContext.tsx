import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export interface CartItem {
  domain: string;
  price: number;
  years: number;
}

interface CartContextType {
  items: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (domain: string) => void;
  clearCart: () => void;
  total: number;
}

const CartContext = createContext<CartContextType>({
  items: [],
  addToCart: () => {},
  removeFromCart: () => {},
  clearCart: () => {},
  total: 0,
});

export const CartProvider = ({ children }: { children: ReactNode }) => {
  // Optionnel: Sauvegarder dans le localStorage pour persister le panier
  const [items, setItems] = useState<CartItem[]>(() => {
    const saved = localStorage.getItem('cart');
    if (saved) return JSON.parse(saved);
    return [];
  });

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(items));
  }, [items]);

  const addToCart = (item: CartItem) => {
    setItems((prev) => {
      // Ignorer si le domaine est déjà dans le panier
      if (prev.find((i) => i.domain === item.domain)) return prev;
      return [...prev, item];
    });
  };

  const removeFromCart = (domain: string) => {
    setItems((prev) => prev.filter((i) => i.domain !== domain));
  };

  const clearCart = () => {
    setItems([]);
  };

  const total = items.reduce((acc, item) => acc + item.price * item.years, 0);

  return (
    <CartContext.Provider value={{ items, addToCart, removeFromCart, clearCart, total }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
