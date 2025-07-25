/* eslint-disable @typescript-eslint/no-unsafe-assignment */
"use client";

import React, { createContext, useContext, useReducer, useEffect, type ReactNode } from "react";
import { type Product } from "@/server/api/routers/product";

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface CartState {
  items: CartItem[];
  total: number;
  itemCount: number;
}

type CartAction =
  | { type: "ADD_ITEM"; payload: Product }
  | { type: "REMOVE_ITEM"; payload: number }
  | { type: "UPDATE_QUANTITY"; payload: { id: number; quantity: number } }
  | { type: "CLEAR_CART" }
  | { type: "LOAD_CART"; payload: CartState };

const initialState: CartState = {
  items: [],
  total: 0,
  itemCount: 0,
};

function calculateTotal(items: CartItem[]): number {
  return items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
}

function calculateItemCount(items: CartItem[]): number {
  return items.reduce((sum, item) => sum + item.quantity, 0);
}

function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case "ADD_ITEM": {
      const existingItem = state.items.find(item => item.product.id === action.payload.id);
      
      let newItems: CartItem[];
      if (existingItem) {
        newItems = state.items.map(item =>
          item.product.id === action.payload.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        newItems = [...state.items, { product: action.payload, quantity: 1 }];
      }
      
      return {
        items: newItems,
        total: calculateTotal(newItems),
        itemCount: calculateItemCount(newItems),
      };
    }
    
    case "REMOVE_ITEM": {
      const newItems = state.items.filter(item => item.product.id !== action.payload);
      return {
        items: newItems,
        total: calculateTotal(newItems),
        itemCount: calculateItemCount(newItems),
      };
    }
    
    case "UPDATE_QUANTITY": {
      const newItems = state.items.map(item =>
        item.product.id === action.payload.id
          ? { ...item, quantity: Math.max(0, action.payload.quantity) }
          : item
      ).filter(item => item.quantity > 0);
      
      return {
        items: newItems,
        total: calculateTotal(newItems),
        itemCount: calculateItemCount(newItems),
      };
    }
    
    case "CLEAR_CART": {
      return initialState;
    }
    
    case "LOAD_CART": {
      return action.payload;
    }
    
    default:
      return state;
  }
}

interface CartContextType {
  state: CartState;
  addItem: (product: Product) => void;
  removeItem: (productId: number) => void;
  updateQuantity: (productId: number, quantity: number) => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem("cart");
    if (savedCart) {
      try {
        const parsedCart: CartState = JSON.parse(savedCart);
        dispatch({ type: "LOAD_CART", payload: parsedCart });
      } catch (error) {
        console.error("Failed to load cart from localStorage:", error);
      }
    }
  }, []);

  // Save cart to localStorage whenever state changes
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(state));
  }, [state]);

  const addItem = (product: Product) => {
    dispatch({ type: "ADD_ITEM", payload: product });
  };

  const removeItem = (productId: number) => {
    dispatch({ type: "REMOVE_ITEM", payload: productId });
  };

  const updateQuantity = (productId: number, quantity: number) => {
    dispatch({ type: "UPDATE_QUANTITY", payload: { id: productId, quantity } });
  };

  const clearCart = () => {
    dispatch({ type: "CLEAR_CART" });
  };

  return (
    <CartContext.Provider value={{ state, addItem, removeItem, updateQuantity, clearCart }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
