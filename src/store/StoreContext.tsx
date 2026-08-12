import { createContext, useContext, useEffect, useReducer, useCallback, type ReactNode } from 'react';
import type { CartItem, Order, User, Address } from '@/types';
import { getProductById } from '@/data/products';
import { mockUser, mockAddresses } from '@/data/user';
import { mockOrders } from '@/data/orders';
import { getCoupon } from '@/data/orders';
import type { Coupon } from '@/types';

interface StoreState {
  cart: CartItem[];
  wishlist: string[];
  orders: Order[];
  user: User;
  addresses: Address[];
  appliedCoupon: Coupon | null;
  isCartOpen: boolean;
}

type Action =
  | { type: 'ADD_TO_CART'; payload: CartItem }
  | { type: 'REMOVE_FROM_CART'; payload: { productId: string; size: string; color: string } }
  | { type: 'UPDATE_QUANTITY'; payload: { productId: string; size: string; color: string; quantity: number } }
  | { type: 'CLEAR_CART' }
  | { type: 'TOGGLE_WISHLIST'; payload: string }
  | { type: 'MOVE_WISHLIST_TO_CART'; payload: CartItem }
  | { type: 'ADD_ORDER'; payload: Order }
  | { type: 'UPDATE_USER'; payload: Partial<User> }
  | { type: 'ADD_ADDRESS'; payload: Address }
  | { type: 'UPDATE_ADDRESS'; payload: { index: number; address: Address } }
  | { type: 'DELETE_ADDRESS'; payload: number }
  | { type: 'APPLY_COUPON'; payload: Coupon | null }
  | { type: 'SET_CART_OPEN'; payload: boolean }
  | { type: 'HYDRATE'; payload: Partial<StoreState> };

const STORAGE_KEY = 'nova-store-v1';

function loadState(): Partial<StoreState> {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return {};
    return JSON.parse(raw);
  } catch {
    return {};
  }
}

function saveState(state: StoreState) {
  const { isCartOpen, ...persist } = state;
  void isCartOpen;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(persist));
  } catch {
    // ignore
  }
}

const initialState: StoreState = {
  cart: [],
  wishlist: [],
  orders: mockOrders,
  user: mockUser,
  addresses: mockAddresses,
  appliedCoupon: null,
  isCartOpen: false,
};

function reducer(state: StoreState, action: Action): StoreState {
  switch (action.type) {
    case 'HYDRATE':
      return { ...state, ...action.payload };
    case 'ADD_TO_CART': {
      const existing = state.cart.find(
        (item) =>
          item.productId === action.payload.productId &&
          item.size === action.payload.size &&
          item.color === action.payload.color
      );
      if (existing) {
        return {
          ...state,
          cart: state.cart.map((item) =>
            item === existing
              ? { ...item, quantity: item.quantity + action.payload.quantity }
              : item
          ),
        };
      }
      return { ...state, cart: [...state.cart, action.payload] };
    }
    case 'REMOVE_FROM_CART':
      return {
        ...state,
        cart: state.cart.filter(
          (item) =>
            !(
              item.productId === action.payload.productId &&
              item.size === action.payload.size &&
              item.color === action.payload.color
            )
        ),
      };
    case 'UPDATE_QUANTITY': {
      if (action.payload.quantity <= 0) {
        return {
          ...state,
          cart: state.cart.filter(
            (item) =>
              !(
                item.productId === action.payload.productId &&
                item.size === action.payload.size &&
                item.color === action.payload.color
              )
          ),
        };
      }
      return {
        ...state,
        cart: state.cart.map((item) =>
          item.productId === action.payload.productId &&
          item.size === action.payload.size &&
          item.color === action.payload.color
            ? { ...item, quantity: action.payload.quantity }
            : item
        ),
      };
    }
    case 'CLEAR_CART':
      return { ...state, cart: [], appliedCoupon: null };
    case 'TOGGLE_WISHLIST':
      return {
        ...state,
        wishlist: state.wishlist.includes(action.payload)
          ? state.wishlist.filter((id) => id !== action.payload)
          : [...state.wishlist, action.payload],
      };
    case 'MOVE_WISHLIST_TO_CART': {
      const existing = state.cart.find(
        (item) =>
          item.productId === action.payload.productId &&
          item.size === action.payload.size &&
          item.color === action.payload.color
      );
      if (existing) {
        return {
          ...state,
          cart: state.cart.map((item) =>
            item === existing
              ? { ...item, quantity: item.quantity + action.payload.quantity }
              : item
          ),
          wishlist: state.wishlist.filter((id) => id !== action.payload.productId),
        };
      }
      return {
        ...state,
        cart: [...state.cart, action.payload],
        wishlist: state.wishlist.filter((id) => id !== action.payload.productId),
      };
    }
    case 'ADD_ORDER':
      return { ...state, orders: [action.payload, ...state.orders], cart: [], appliedCoupon: null };
    case 'UPDATE_USER':
      return { ...state, user: { ...state.user, ...action.payload } };
    case 'ADD_ADDRESS':
      return { ...state, addresses: [...state.addresses, action.payload] };
    case 'UPDATE_ADDRESS':
      return {
        ...state,
        addresses: state.addresses.map((a, i) =>
          i === action.payload.index ? action.payload.address : a
        ),
      };
    case 'DELETE_ADDRESS':
      return { ...state, addresses: state.addresses.filter((_, i) => i !== action.payload) };
    case 'APPLY_COUPON':
      return { ...state, appliedCoupon: action.payload };
    case 'SET_CART_OPEN':
      return { ...state, isCartOpen: action.payload };
    default:
      return state;
  }
}

interface StoreContextValue extends StoreState {
  addToCart: (productId: string, size: string, color: string, quantity?: number) => void;
  removeFromCart: (productId: string, size: string, color: string) => void;
  updateQuantity: (productId: string, size: string, color: string, quantity: number) => void;
  clearCart: () => void;
  toggleWishlist: (productId: string) => void;
  moveWishlistToCart: (productId: string, size: string, color: string, quantity?: number) => void;
  addOrder: (order: Order) => void;
  updateUser: (data: Partial<User>) => void;
  addAddress: (address: Address) => void;
  updateAddress: (index: number, address: Address) => void;
  deleteAddress: (index: number) => void;
  applyCoupon: (code: string) => { success: boolean; message: string };
  removeCoupon: () => void;
  setCartOpen: (open: boolean) => void;
  cartCount: number;
  cartSubtotal: number;
  cartDiscount: number;
  cartShipping: number;
  cartTotal: number;
}

const StoreContext = createContext<StoreContextValue | null>(null);

export function StoreProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    const saved = loadState();
    if (Object.keys(saved).length > 0) {
      dispatch({ type: 'HYDRATE', payload: saved });
    }
  }, []);

  useEffect(() => {
    saveState(state);
  }, [state]);

  const addToCart = useCallback(
    (productId: string, size: string, color: string, quantity = 1) => {
      dispatch({ type: 'ADD_TO_CART', payload: { productId, size, color, quantity } });
    },
    []
  );

  const removeFromCart = useCallback(
    (productId: string, size: string, color: string) => {
      dispatch({ type: 'REMOVE_FROM_CART', payload: { productId, size, color } });
    },
    []
  );

  const updateQuantity = useCallback(
    (productId: string, size: string, color: string, quantity: number) => {
      dispatch({ type: 'UPDATE_QUANTITY', payload: { productId, size, color, quantity } });
    },
    []
  );

  const clearCart = useCallback(() => dispatch({ type: 'CLEAR_CART' }), []);

  const toggleWishlist = useCallback(
    (productId: string) => dispatch({ type: 'TOGGLE_WISHLIST', payload: productId }),
    []
  );

  const moveWishlistToCart = useCallback(
    (productId: string, size: string, color: string, quantity = 1) => {
      dispatch({ type: 'MOVE_WISHLIST_TO_CART', payload: { productId, size, color, quantity } });
    },
    []
  );

  const addOrder = useCallback((order: Order) => dispatch({ type: 'ADD_ORDER', payload: order }), []);

  const updateUser = useCallback((data: Partial<User>) => dispatch({ type: 'UPDATE_USER', payload: data }), []);

  const addAddress = useCallback((address: Address) => dispatch({ type: 'ADD_ADDRESS', payload: address }), []);

  const updateAddress = useCallback(
    (index: number, address: Address) => dispatch({ type: 'UPDATE_ADDRESS', payload: { index, address } }),
    []
  );

  const deleteAddress = useCallback((index: number) => dispatch({ type: 'DELETE_ADDRESS', payload: index }), []);

  const applyCoupon = useCallback((code: string) => {
    const coupon = getCoupon(code);
    if (!coupon) {
      return { success: false, message: 'Invalid coupon code' };
    }
    const subtotal = state.cart.reduce((sum, item) => {
      const product = getProductById(item.productId);
      return sum + (product ? product.discountPrice * item.quantity : 0);
    }, 0);
    if (subtotal < coupon.minOrder) {
      return {
        success: false,
        message: `Minimum order of ₹${coupon.minOrder.toLocaleString('en-IN')} required`,
      };
    }
    dispatch({ type: 'APPLY_COUPON', payload: coupon });
    return { success: true, message: 'Coupon applied successfully' };
  }, [state.cart]);

  const removeCoupon = useCallback(() => dispatch({ type: 'APPLY_COUPON', payload: null }), []);

  const setCartOpen = useCallback((open: boolean) => dispatch({ type: 'SET_CART_OPEN', payload: open }), []);

  const cartCount = state.cart.reduce((sum, item) => sum + item.quantity, 0);
  const cartSubtotal = state.cart.reduce((sum, item) => {
    const product = getProductById(item.productId);
    return sum + (product ? product.discountPrice * item.quantity : 0);
  }, 0);
  const cartDiscount = state.appliedCoupon
    ? state.appliedCoupon.type === 'percentage'
      ? Math.round((cartSubtotal * state.appliedCoupon.value) / 100)
      : state.appliedCoupon.value
    : 0;
  const cartShipping = cartSubtotal - cartDiscount > 0 && cartSubtotal - cartDiscount < 999 ? 99 : 0;
  const cartTotal = Math.max(0, cartSubtotal - cartDiscount + cartShipping);

  const value: StoreContextValue = {
    ...state,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    toggleWishlist,
    moveWishlistToCart,
    addOrder,
    updateUser,
    addAddress,
    updateAddress,
    deleteAddress,
    applyCoupon,
    removeCoupon,
    setCartOpen,
    cartCount,
    cartSubtotal,
    cartDiscount,
    cartShipping,
    cartTotal,
  };

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
}

export function useStore() {
  const ctx = useContext(StoreContext);
  if (!ctx) throw new Error('useStore must be used within StoreProvider');
  return ctx;
}
