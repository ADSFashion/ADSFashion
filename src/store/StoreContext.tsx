import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';
import type { CartItem, Product } from '@/types';
import { products as allProducts } from '@/data/catalog';

interface StoreContextValue {
  cart: CartItem[];
  wishlist: string[];
  addToCart: (product: Product, size?: string, color?: string, qty?: number) => void;
  removeFromCart: (productId: string, size: string, color: string) => void;
  updateQty: (productId: string, size: string, color: string, qty: number) => void;
  clearCart: () => void;
  toggleWishlist: (productId: string) => void;
  isWishlisted: (productId: string) => boolean;
  cartCount: number;
  cartSubtotal: number;
}

const StoreContext = createContext<StoreContextValue | null>(null);

const CART_KEY = 'ads_cart';
const WISH_KEY = 'ads_wishlist';

export function StoreProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      return JSON.parse(localStorage.getItem(CART_KEY) ?? '[]');
    } catch {
      return [];
    }
  });
  const [wishlist, setWishlist] = useState<string[]>(() => {
    try {
      return JSON.parse(localStorage.getItem(WISH_KEY) ?? '[]');
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem(CART_KEY, JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem(WISH_KEY, JSON.stringify(wishlist));
  }, [wishlist]);

  const addToCart: StoreContextValue['addToCart'] = (product, size = product.sizes[0], color = product.colors[0], qty = 1) => {
    setCart((prev) => {
      const existing = prev.find((i) => i.productId === product.id && i.size === size && i.color === color);
      if (existing) {
        return prev.map((i) =>
          i.productId === product.id && i.size === size && i.color === color
            ? { ...i, quantity: i.quantity + qty }
            : i,
        );
      }
      return [...prev, { productId: product.id, name: product.name, image: product.images[0], price: product.price, size, color, quantity: qty }];
    });
  };

  const removeFromCart: StoreContextValue['removeFromCart'] = (productId, size, color) => {
    setCart((prev) => prev.filter((i) => !(i.productId === productId && i.size === size && i.color === color)));
  };

  const updateQty: StoreContextValue['updateQty'] = (productId, size, color, qty) => {
    if (qty < 1) return;
    setCart((prev) =>
      prev.map((i) =>
        i.productId === productId && i.size === size && i.color === color ? { ...i, quantity: qty } : i,
      ),
    );
  };

  const clearCart = () => setCart([]);

  const toggleWishlist: StoreContextValue['toggleWishlist'] = (productId) => {
    setWishlist((prev) => (prev.includes(productId) ? prev.filter((id) => id !== productId) : [...prev, productId]));
  };

  const isWishlisted: StoreContextValue['isWishlisted'] = (productId) => wishlist.includes(productId);

  const cartCount = useMemo(() => cart.reduce((sum, i) => sum + i.quantity, 0), [cart]);
  const cartSubtotal = useMemo(() => cart.reduce((sum, i) => sum + i.price * i.quantity, 0), [cart]);

  const value: StoreContextValue = {
    cart,
    wishlist,
    addToCart,
    removeFromCart,
    updateQty,
    clearCart,
    toggleWishlist,
    isWishlisted,
    cartCount,
    cartSubtotal,
  };

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
}

export function useStore() {
  const ctx = useContext(StoreContext);
  if (!ctx) throw new Error('useStore must be used within StoreProvider');
  return ctx;
}

export function getProduct(id: string): Product | undefined {
  return allProducts.find((p) => p.id === id);
}
