import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface Product {
    id: string;
    name: string;
    priceUSD: number;
    image: string;
    images?: string[];
    description?: string;
    category: string;
    wholesalePrice?: number;
    wholesaleMin?: number;
    badge?: 'nuevo' | 'promo' | 'agotado';
}

interface CartItem extends Product {
    quantity: number;
}

interface CartState {
    items: CartItem[];
    currency: 'USD' | 'VES';
    exchangeRate: number; // VES per USD
    addItem: (product: Product) => void;
    removeItem: (productId: string) => void;
    updateQuantity: (productId: string, quantity: number) => void;
    setCurrency: (currency: 'USD' | 'VES') => void;
    setExchangeRate: (rate: number) => void;
    clearCart: () => void;
    getCartTotal: () => { totalUSD: number; totalVES: number };
    getTotal: () => number;
}

export const useCartStore = create<CartState>()(
    persist(
        (set, get) => ({
            items: [],
            currency: 'USD',
            exchangeRate: 36.5, // Default mock rate, to be updated via API
            addItem: (product) =>
                set((state) => {
                    const existingItem = state.items.find((item) => item.id === product.id);
                    if (existingItem) {
                        return {
                            items: state.items.map((item) =>
                                item.id === product.id
                                    ? { ...item, quantity: item.quantity + 1 }
                                    : item
                            ),
                        };
                    }
                    return { items: [...state.items, { ...product, quantity: 1 }] };
                }),
            removeItem: (productId) =>
                set((state) => ({
                    items: state.items.filter((item) => item.id !== productId),
                })),
            updateQuantity: (productId, quantity) =>
                set((state) => ({
                    items: state.items.map((item) =>
                        item.id === productId ? { ...item, quantity: Math.max(1, quantity) } : item
                    ),
                })),
            setCurrency: (currency) => set({ currency }),
            setExchangeRate: (rate) => set({ exchangeRate: rate }),
            clearCart: () => set({ items: [] }),
            getCartTotal: () => {
                const state = get();
                const totalUSD = state.items.reduce((sum, item) => {
                    const price = (item.wholesalePrice && item.wholesaleMin && item.quantity >= item.wholesaleMin)
                        ? item.wholesalePrice
                        : item.priceUSD;
                    return sum + price * item.quantity;
                }, 0);
                return {
                    totalUSD,
                    totalVES: totalUSD * state.exchangeRate,
                };
            },
            getTotal: () => {
                const state = get();
                return state.items.reduce((sum, item) => {
                    const price = (item.wholesalePrice && item.wholesaleMin && item.quantity >= item.wholesaleMin)
                        ? item.wholesalePrice
                        : item.priceUSD;
                    return sum + price * item.quantity;
                }, 0);
            },
        }),
        {
            name: 'loyafu-cart-storage',
            partialize: (state) => ({ items: state.items, currency: state.currency }),
        }
    )
);
