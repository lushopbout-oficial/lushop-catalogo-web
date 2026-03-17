'use client';

import { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);
  const [isOpen, setIsOpen] = useState(false);

  // Cargar carrito desde localStorage al iniciar
  useEffect(() => {
    const savedCart = localStorage.getItem('lushop-cart');
    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }
  }, []);

  // Guardar carrito en localStorage cuando cambie
  useEffect(() => {
    localStorage.setItem('lushop-cart', JSON.stringify(cart));
  }, [cart]);

  // Agregar producto al carrito
  const addToCart = (product) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.sku === product.sku);
      
      if (existingItem) {
        // Si ya existe, aumentar cantidad
        return prevCart.map(item =>
          item.sku === product.sku
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        // Si no existe, agregar nuevo
        return [...prevCart, { ...product, quantity: 1 }];
      }
    });
    setIsOpen(true); // Abrir carrito al agregar
  };

  // Remover producto del carrito
  const removeFromCart = (sku) => {
    setCart(prevCart => prevCart.filter(item => item.sku !== sku));
  };

  // Actualizar cantidad
  const updateQuantity = (sku, quantity) => {
    if (quantity <= 0) {
      removeFromCart(sku);
      return;
    }
    
    setCart(prevCart =>
      prevCart.map(item =>
        item.sku === sku ? { ...item, quantity } : item
      )
    );
  };

  // Limpiar carrito
  const clearCart = () => {
    setCart([]);
  };

  // Calcular total
  const getTotal = () => {
    return cart.reduce((total, item) => {
      return total + (item.precio_venta * item.quantity);
    }, 0);
  };

  // Calcular costo de envío
  const getShippingCost = () => {
    const total = getTotal();
    
    if (total >= 2500) {
      return 0; // Gratis
    } else if (total >= 1500) {
      return 50; // 50% descuento (asumiendo $100 envío base)
    } else {
      return 100; // Costo completo
    }
  };

  // Calcular número de items
  const getItemCount = () => {
    return cart.reduce((count, item) => count + item.quantity, 0);
  };

  const value = {
    cart,
    isOpen,
    setIsOpen,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    getTotal,
    getShippingCost,
    getItemCount,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within CartProvider');
  }
  return context;
}
