import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Product } from './useCartStore';

interface FavoritesState {
    favorites: Product[];
    addFavorite: (product: Product) => void;
    removeFavorite: (productId: string) => void;
    toggleFavorite: (product: Product) => void;
    isFavorite: (productId: string) => boolean;
    clearFavorites: () => void;
}

export const useFavoritesStore = create<FavoritesState>()(
    persist(
        (set, get) => ({
            favorites: [],
            addFavorite: (product) =>
                set((state) => {
                    const exists = state.favorites.some((p) => p.id === product.id);
                    if (exists) return state;
                    return { favorites: [...state.favorites, product] };
                }),
            removeFavorite: (productId) =>
                set((state) => ({
                    favorites: state.favorites.filter((p) => p.id !== productId),
                })),
            toggleFavorite: (product) => {
                const state = get();
                const exists = state.favorites.some((p) => p.id === product.id);
                if (exists) {
                    state.removeFavorite(product.id);
                } else {
                    state.addFavorite(product);
                }
            },
            isFavorite: (productId) => {
                const state = get();
                return state.favorites.some((p) => p.id === productId);
            },
            clearFavorites: () => set({ favorites: [] }),
        }),
        {
            name: 'loyafu-favorites-storage',
        }
    )
);
