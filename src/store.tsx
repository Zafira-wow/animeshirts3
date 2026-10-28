import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import type { Gender } from "./data";

export type CartLine = {
  key: string;
  productId: string;
  size: string;
  color: string;
  quantity: number;
  customText?: string;
  customTextColor?: string;
  customModel?: string;
  customBasePrice?: number;
  customSurcharge?: number;
};

type StoreContextValue = {
  cart: CartLine[];
  wishlist: string[];
  gender: Gender | "All";
  cartCount: number;
  setGender: (gender: Gender | "All") => void;
  toggleWishlist: (productId: string) => void;
  addToCart: (line: Omit<CartLine, "key">) => void;
  setQuantity: (key: string, quantity: number) => void;
  removeFromCart: (key: string) => void;
  clearCart: () => void;
};

const StoreContext = createContext<StoreContextValue | null>(null);

function readStorage<T>(key: string, fallback: T): T {
  try {
    const stored = localStorage.getItem(key);
    return stored ? (JSON.parse(stored) as T) : fallback;
  } catch {
    return fallback;
  }
}

export function StoreProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartLine[]>(() =>
    readStorage("zero-rules-cart", []),
  );
  const [wishlist, setWishlist] = useState<string[]>(() =>
    readStorage("zero-rules-wishlist", []),
  );
  const [gender, setGenderState] = useState<Gender | "All">(() =>
    readStorage("zero-rules-gender", "All"),
  );

  useEffect(
    () => localStorage.setItem("zero-rules-cart", JSON.stringify(cart)),
    [cart],
  );
  useEffect(
    () => localStorage.setItem("zero-rules-wishlist", JSON.stringify(wishlist)),
    [wishlist],
  );
  useEffect(
    () => localStorage.setItem("zero-rules-gender", JSON.stringify(gender)),
    [gender],
  );

  const value: StoreContextValue = {
    cart,
    wishlist,
    gender,
    cartCount: cart.reduce((total, line) => total + line.quantity, 0),
    setGender: setGenderState,
    toggleWishlist: (productId) =>
      setWishlist((current) =>
        current.includes(productId)
          ? current.filter((id) => id !== productId)
          : [...current, productId],
      ),
    addToCart: (line) =>
      setCart((current) => {
        const key = `${line.productId}:${line.size}:${line.color}:${line.customModel ?? ""}:${line.customText ?? ""}`;
        const existing = current.find((item) => item.key === key);
        return existing
          ? current.map((item) =>
              item.key === key
                ? {
                    ...item,
                    quantity: Math.min(20, item.quantity + line.quantity),
                  }
                : item,
            )
          : [...current, { ...line, key }];
      }),
    setQuantity: (key, quantity) =>
      setCart((current) =>
        current.map((line) =>
          line.key === key ? { ...line, quantity } : line,
        ),
      ),
    removeFromCart: (key) =>
      setCart((current) => current.filter((line) => line.key !== key)),
    clearCart: () => setCart([]),
  };

  return (
    <StoreContext.Provider value={value}>{children}</StoreContext.Provider>
  );
}

export function useStore() {
  const context = useContext(StoreContext);
  if (!context) throw new Error("useStore must be used within StoreProvider");
  return context;
}
