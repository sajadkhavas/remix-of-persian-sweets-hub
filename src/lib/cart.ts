import type { ShippingScope } from "@/data/types";
import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface CartItem {
  id: string;
  slug: string;
  name: string;
  priceToman: number;
  quantity: number;
  image?: string;
  emoji?: string;
  weightGrams?: number;
  requiresCooling?: boolean;
  shippingScope?: ShippingScope;
  shippingNote?: string;
}

interface CartStore {
  items: CartItem[];
  addItem: (item: Omit<CartItem, "quantity">, quantity?: number) => void;
  removeItem: (id: string) => void;
  updateQty: (id: string, qty: number) => void;
  clearCart: () => void;
  totalItems: () => number;
  totalPrice: () => number;
}

function normalizeCity(city: string) {
  return city.trim().replace(/ي/g, "ی").replace(/ك/g, "ک").replace(/\s+/g, " ");
}

export function isCoolingDeliveryCity(city: string): boolean {
  const normalized = normalizeCity(city);
  return normalized === "تهران" || normalized === "کرج";
}

export function cartHasCoolingItems(items: CartItem[]): boolean {
  return items.some((item) => item.requiresCooling === true || item.shippingScope === "tehran-karaj");
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      addItem: (item, quantity = 1) => {
        const normalizedQuantity =
          Number.isFinite(quantity) && quantity >= 1 ? Math.floor(quantity) : 1;
        const existing = get().items.find((i) => i.id === item.id);
        if (existing) {
          set((s) => ({
            items: s.items.map((i) =>
              i.id === item.id ? { ...i, ...item, quantity: i.quantity + normalizedQuantity } : i,
            ),
          }));
        } else {
          set((s) => ({ items: [...s.items, { ...item, quantity: normalizedQuantity }] }));
        }
      },
      removeItem: (id) => set((s) => ({ items: s.items.filter((i) => i.id !== id) })),
      updateQty: (id, qty) => {
        if (qty <= 0) {
          get().removeItem(id);
          return;
        }
        set((s) => ({
          items: s.items.map((i) => (i.id === id ? { ...i, quantity: qty } : i)),
        }));
      },
      clearCart: () => set({ items: [] }),
      totalItems: () => get().items.reduce((sum, i) => sum + i.quantity, 0),
      totalPrice: () => get().items.reduce((sum, i) => sum + i.priceToman * i.quantity, 0),
    }),
    { name: "winimi-cart" },
  ),
);
