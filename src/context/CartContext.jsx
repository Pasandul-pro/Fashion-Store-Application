import React, { createContext, useContext, useReducer, useEffect } from 'react';

const CartContext = createContext();

const cartReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_TO_CART':
      const existingItemIndex = state.items.findIndex(
        item => item.id === action.payload.id && item.size === action.payload.size
      );

      if (existingItemIndex > -1) {
        const newItems = [...state.items];
        newItems[existingItemIndex].quantity += action.payload.quantity;
        return { ...state, items: newItems };
      }
      return { ...state, items: [...state.items, action.payload] };

    case 'REMOVE_FROM_CART':
      return {
        ...state,
        items: state.items.filter(item => !(item.id === action.payload.id && item.size === action.payload.size))
      };

    case 'UPDATE_QUANTITY':
      return {
        ...state,
        items: state.items.map(item =>
          item.id === action.payload.id && item.size === action.payload.size
            ? { ...item, quantity: action.payload.quantity }
            : item
        )
      };

    case 'CLEAR_CART':
      return { ...state, items: [] };

    default:
      return state;
  }
};

export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, { items: [] }, () => {
    const localData = localStorage.getItem('cart');
    return localData ? { items: JSON.parse(localData) } : { items: [] };
  });

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(state.items));
  }, [state.items]);

  const addToCart = (product) => dispatch({ type: 'ADD_TO_CART', payload: product });
  const removeFromCart = (id, size) => dispatch({ type: 'REMOVE_FROM_CART', payload: { id, size } });
  const updateQuantity = (id, size, quantity) => dispatch({ type: 'UPDATE_QUANTITY', payload: { id, size, quantity } });
  const clearCart = () => dispatch({ type: 'CLEAR_CART' });

  const cartTotal = state.items.reduce((total, item) => total + item.price * item.quantity, 0);
  const cartCount = state.items.reduce((total, item) => total + item.quantity, 0);

  return (
    <CartContext.Provider value={{ cart: state.items, addToCart, removeFromCart, updateQuantity, clearCart, cartTotal, cartCount }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
