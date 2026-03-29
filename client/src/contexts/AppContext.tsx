/**
 * VitaExpress — AppContext
 * Design: Verdant Wellness — manages auth, cart, and orders state
 * Persistence: localStorage (no backend required)
 */

import React, { createContext, useContext, useEffect, useState } from "react";

// ─── Types ────────────────────────────────────────────────────────────────────

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  createdAt: string;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: "proteico" | "lowcarb" | "vegano" | "detox" | "fitness";
  image: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  available: boolean;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export type PaymentMethod = "pix" | "cartao_credito" | "cartao_debito" | "dinheiro";
export type OrderStatus = "recebido" | "preparando" | "a_caminho" | "entregue" | "cancelado";

export interface Order {
  id: string;
  userId: string;
  items: CartItem[];
  total: number;
  paymentMethod: PaymentMethod;
  status: OrderStatus;
  address: string;
  createdAt: string;
  updatedAt: string;
  notes?: string;
}

// ─── Initial Data ─────────────────────────────────────────────────────────────

export const PRODUCTS: Product[] = [
  {
    id: "p1",
    name: "Bowl de Salmão Grelhado",
    description: "Salmão grelhado com quinoa, abacate, tomate cereja, mix de folhas e molho tahine",
    price: 42.90,
    category: "proteico",
    image: "https://d2xsxph8kpxj0f.cloudfront.net/310519663489084205/UvKr6qSHGGsL9eLKZPKe9u/hero-banner-Aw8eYbgx26NDF9PgNPGzX5.webp",
    calories: 520,
    protein: 38,
    carbs: 32,
    fat: 22,
    available: true,
  },
  {
    id: "p2",
    name: "Bowl de Açaí Premium",
    description: "Açaí orgânico com granola artesanal, banana, morango, blueberry, mel e coco ralado",
    price: 28.90,
    category: "detox",
    image: "https://d2xsxph8kpxj0f.cloudfront.net/310519663489084205/UvKr6qSHGGsL9eLKZPKe9u/bowl-salad-ahxdtkNtcSGwTU7dpqoXv8.webp",
    calories: 380,
    protein: 8,
    carbs: 58,
    fat: 14,
    available: true,
  },
  {
    id: "p3",
    name: "Frango Grelhado Fit",
    description: "Peito de frango grelhado com purê de batata-doce, brócolis no vapor e salada verde",
    price: 36.90,
    category: "fitness",
    image: "https://d2xsxph8kpxj0f.cloudfront.net/310519663489084205/UvKr6qSHGGsL9eLKZPKe9u/grilled-protein-2rpypNgBTXzQRFrCjaUQ95.webp",
    calories: 440,
    protein: 45,
    carbs: 28,
    fat: 12,
    available: true,
  },
  {
    id: "p4",
    name: "Wrap Mediterrâneo",
    description: "Wrap integral com homus, pimentão assado, pepino, espinafre, feta e azeitonas",
    price: 24.90,
    category: "vegano",
    image: "https://d2xsxph8kpxj0f.cloudfront.net/310519663489084205/UvKr6qSHGGsL9eLKZPKe9u/veggie-wrap-UQVFXMbsMuHxLtvQK4bc4U.webp",
    calories: 320,
    protein: 14,
    carbs: 38,
    fat: 12,
    available: true,
  },
  {
    id: "p5",
    name: "Green Detox Smoothie",
    description: "Smoothie verde com espinafre, maçã verde, gengibre, limão e pepino. Rico em antioxidantes",
    price: 18.90,
    category: "detox",
    image: "https://d2xsxph8kpxj0f.cloudfront.net/310519663489084205/UvKr6qSHGGsL9eLKZPKe9u/smoothie-bowl-HP8oGojS8TRt95cwuCJWtL.webp",
    calories: 120,
    protein: 3,
    carbs: 24,
    fat: 1,
    available: true,
  },
  {
    id: "p6",
    name: "Salada Caesar Proteica",
    description: "Alface romana, frango grelhado, croutons integrais, parmesão e molho caesar light",
    price: 32.90,
    category: "proteico",
    image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=600&auto=format&fit=crop",
    calories: 390,
    protein: 35,
    carbs: 22,
    fat: 16,
    available: true,
  },
  {
    id: "p7",
    name: "Omelete de Claras",
    description: "Omelete de claras com espinafre, tomate, cogumelos e queijo cottage. Low carb e proteico",
    price: 26.90,
    category: "lowcarb",
    image: "https://images.unsplash.com/photo-1482049016688-2d3e1b311543?w=600&auto=format&fit=crop",
    calories: 280,
    protein: 32,
    carbs: 8,
    fat: 14,
    available: true,
  },
  {
    id: "p8",
    name: "Poke Bowl Vegano",
    description: "Arroz integral, tofu marinado, edamame, cenoura, pepino, abacate e molho shoyu",
    price: 34.90,
    category: "vegano",
    image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=600&auto=format&fit=crop",
    calories: 460,
    protein: 18,
    carbs: 62,
    fat: 16,
    available: true,
  },
];

const PAYMENT_LABELS: Record<PaymentMethod, string> = {
  pix: "PIX",
  cartao_credito: "Cartão de Crédito",
  cartao_debito: "Cartão de Débito",
  dinheiro: "Dinheiro",
};

const STATUS_LABELS: Record<OrderStatus, string> = {
  recebido: "Pedido Recebido",
  preparando: "Preparando",
  a_caminho: "A Caminho",
  entregue: "Entregue",
  cancelado: "Cancelado",
};

// ─── Context ──────────────────────────────────────────────────────────────────

interface AppContextType {
  // Auth
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => boolean;
  register: (data: Omit<User, "id" | "createdAt"> & { password: string }) => boolean;
  logout: () => void;
  updateProfile: (data: Partial<User>) => void;

  // Cart
  cart: CartItem[];
  addToCart: (product: Product, quantity?: number) => void;
  removeFromCart: (productId: string) => void;
  updateCartQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  cartTotal: number;
  cartCount: number;

  // Orders
  orders: Order[];
  placeOrder: (paymentMethod: PaymentMethod, address: string, notes?: string) => Order | null;
  cancelOrder: (orderId: string) => void;

  // Helpers
  PAYMENT_LABELS: typeof PAYMENT_LABELS;
  STATUS_LABELS: typeof STATUS_LABELS;
}

const AppContext = createContext<AppContextType | null>(null);

// ─── Provider ─────────────────────────────────────────────────────────────────

function loadFromStorage<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
}

function saveToStorage(key: string, value: unknown) {
  localStorage.setItem(key, JSON.stringify(value));
}

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(() =>
    loadFromStorage<User | null>("vita_user", null)
  );
  const [cart, setCart] = useState<CartItem[]>(() =>
    loadFromStorage<CartItem[]>("vita_cart", [])
  );
  const [orders, setOrders] = useState<Order[]>(() =>
    loadFromStorage<Order[]>("vita_orders", [])
  );

  // Persist state
  useEffect(() => { saveToStorage("vita_user", user); }, [user]);
  useEffect(() => { saveToStorage("vita_cart", cart); }, [cart]);
  useEffect(() => { saveToStorage("vita_orders", orders); }, [orders]);

  // ── Auth ──────────────────────────────────────────────────────────────────

  const login = (email: string, password: string): boolean => {
    const users = loadFromStorage<Array<User & { password: string }>>("vita_users", []);
    const found = users.find((u) => u.email === email && u.password === password);
    if (found) {
      const { password: _, ...userData } = found;
      setUser(userData);
      return true;
    }
    return false;
  };

  const register = (data: Omit<User, "id" | "createdAt"> & { password: string }): boolean => {
    const users = loadFromStorage<Array<User & { password: string }>>("vita_users", []);
    if (users.find((u) => u.email === data.email)) return false;
    const newUser: User & { password: string } = {
      ...data,
      id: `u_${Date.now()}`,
      createdAt: new Date().toISOString(),
    };
    users.push(newUser);
    saveToStorage("vita_users", users);
    const { password: _, ...userData } = newUser;
    setUser(userData);
    return true;
  };

  const logout = () => {
    setUser(null);
    setCart([]);
  };

  const updateProfile = (data: Partial<User>) => {
    if (!user) return;
    const updated = { ...user, ...data };
    setUser(updated);
    // Update in users list too
    const users = loadFromStorage<Array<User & { password: string }>>("vita_users", []);
    const idx = users.findIndex((u) => u.id === user.id);
    if (idx >= 0) {
      users[idx] = { ...users[idx], ...data };
      saveToStorage("vita_users", users);
    }
  };

  // ── Cart ──────────────────────────────────────────────────────────────────

  const addToCart = (product: Product, quantity = 1) => {
    setCart((prev) => {
      const existing = prev.find((i) => i.product.id === product.id);
      if (existing) {
        return prev.map((i) =>
          i.product.id === product.id
            ? { ...i, quantity: i.quantity + quantity }
            : i
        );
      }
      return [...prev, { product, quantity }];
    });
  };

  const removeFromCart = (productId: string) => {
    setCart((prev) => prev.filter((i) => i.product.id !== productId));
  };

  const updateCartQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCart((prev) =>
      prev.map((i) => (i.product.id === productId ? { ...i, quantity } : i))
    );
  };

  const clearCart = () => setCart([]);

  const cartTotal = cart.reduce((sum, i) => sum + i.product.price * i.quantity, 0);
  const cartCount = cart.reduce((sum, i) => sum + i.quantity, 0);

  // ── Orders ────────────────────────────────────────────────────────────────

  const placeOrder = (paymentMethod: PaymentMethod, address: string, notes?: string): Order | null => {
    if (!user || cart.length === 0) return null;
    const newOrder: Order = {
      id: `ord_${Date.now()}`,
      userId: user.id,
      items: [...cart],
      total: cartTotal,
      paymentMethod,
      status: "recebido",
      address,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      notes,
    };
    setOrders((prev) => [newOrder, ...prev]);
    clearCart();
    return newOrder;
  };

  const cancelOrder = (orderId: string) => {
    setOrders((prev) =>
      prev.map((o) =>
        o.id === orderId && o.status === "recebido"
          ? { ...o, status: "cancelado", updatedAt: new Date().toISOString() }
          : o
      )
    );
  };

  return (
    <AppContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        login,
        register,
        logout,
        updateProfile,
        cart,
        addToCart,
        removeFromCart,
        updateCartQuantity,
        clearCart,
        cartTotal,
        cartCount,
        orders,
        placeOrder,
        cancelOrder,
        PAYMENT_LABELS,
        STATUS_LABELS,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useApp must be used within AppProvider");
  return ctx;
}
