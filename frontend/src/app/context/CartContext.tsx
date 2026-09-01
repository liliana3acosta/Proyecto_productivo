import { createContext, useContext, useState, useEffect, ReactNode, useCallback } from 'react';
import { api } from '../lib/api';
import { Carrito } from '../types';
import { useAuth } from './AuthContext';

interface CartContextType {
  carrito: Carrito | null;
  cargando: boolean;
  addToCart: (producto: string, cantidad: number, talla: string, color?: string) => Promise<void>;
  updateQuantity: (itemId: string, cantidad: number) => Promise<void>;
  removeFromCart: (itemId: string) => Promise<void>;
  clearCart: () => Promise<void>;
  refrescarCarrito: () => Promise<void>;
  getCartTotal: () => number;
  getCartCount: () => number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const CARRITO_VACIO: Carrito = {
  _id: '',
  usuario: '',
  productos: [],
  total: 0,
};

export function CartProvider({ children }: { children: ReactNode }) {
  const { estaAutenticado } = useAuth();
  const [carrito, setCarrito] = useState<Carrito | null>(null);
  const [cargando, setCargando] = useState(false);

  const refrescarCarrito = useCallback(async () => {
    if (!estaAutenticado) {
      setCarrito(null);
      return;
    }

    setCargando(true);

    try {
      const data = await api.get<Carrito | null>('/cart');
      setCarrito(data ?? CARRITO_VACIO);
    } catch {
      setCarrito(CARRITO_VACIO);
    } finally {
      setCargando(false);
    }
  }, [estaAutenticado]);

  useEffect(() => {
    refrescarCarrito();
  }, [refrescarCarrito]);

  const addToCart = async (producto: string, cantidad: number, talla: string, color = '') => {
    const actualizado = await api.post<Carrito>('/cart', { producto, cantidad, talla, color });
    setCarrito(actualizado);
  };

  const updateQuantity = async (itemId: string, cantidad: number) => {
    if (cantidad <= 0) {
      await removeFromCart(itemId);
      return;
    }

    const actualizado = await api.put<Carrito>(`/cart/${itemId}`, { cantidad });
    setCarrito(actualizado);
  };

  const removeFromCart = async (itemId: string) => {
    const actualizado = await api.delete<Carrito>(`/cart/${itemId}`);
    setCarrito(actualizado);
  };

  const clearCart = async () => {
    const actualizado = await api.delete<Carrito>('/cart');
    setCarrito(actualizado ?? CARRITO_VACIO);
  };

  const getCartTotal = () => carrito?.total ?? 0;

  const getCartCount = () =>
    carrito?.productos.reduce((total, item) => total + item.cantidad, 0) ?? 0;

  return (
    <CartContext.Provider
      value={{
        carrito,
        cargando,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
        refrescarCarrito,
        getCartTotal,
        getCartCount,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart debe usarse dentro de un CartProvider');
  }
  return context;
}
