"use client";

import { useProductModalStore } from '@/store/useProductModalStore';
import { useCartStore } from '@/store/useCartStore';
import { useFavoritesStore } from '@/store/useFavoritesStore';
import { getProductDescription, getWholesalePrice } from '@/lib/product-descriptions';
import { X, ShoppingBag, Heart, Star, Check } from 'lucide-react';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import { useEffect, useState } from 'react';

export default function ProductModal() {
    const { isOpen, selectedProduct, closeModal } = useProductModalStore();
    const addToCart = useCartStore((state) => state.addItem);
    const currency = useCartStore((state) => state.currency);
    const exchangeRate = useCartStore((state) => state.exchangeRate);

    // Safety check: hooks need to be called unconditionally, but logic depends on selectedProduct
    const isFavoriteStore = useFavoritesStore((state) => state.isFavorite);
    const toggleFavoriteStore = useFavoritesStore((state) => state.toggleFavorite);

    const [isFavorite, setIsFavorite] = useState(false);
    const [addedToCart, setAddedToCart] = useState(false);

    // Sync local state when product changes
    useEffect(() => {
        if (selectedProduct) {
            setIsFavorite(isFavoriteStore(selectedProduct.id));
            setAddedToCart(false); // Reset cart state on new product
        }
    }, [selectedProduct, isFavoriteStore, isOpen]);

    // Handle closing on Escape key
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') closeModal();
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [closeModal]);

    if (!isOpen || !selectedProduct) return null;

    const price = currency === 'USD' ? selectedProduct.priceUSD : selectedProduct.priceUSD * exchangeRate;
    const currencySymbol = currency === 'USD' ? '$' : 'Bs.';

    const wholesalePriceStr = getWholesalePrice(selectedProduct);
    let wholesalePriceDisplay = null;

    if (wholesalePriceStr) {
        const wholesaleUSD = parseFloat(wholesalePriceStr);
        if (!isNaN(wholesaleUSD)) {
            const wholesaleVal = currency === 'USD' ? wholesaleUSD : wholesaleUSD * exchangeRate;
            wholesalePriceDisplay = `${currencySymbol}${wholesaleVal.toFixed(2)}`;
        }
    }

    const handleAddToCart = () => {
        addToCart(selectedProduct);
        setAddedToCart(true);
        setTimeout(() => setAddedToCart(false), 2000);
    };

    const handleToggleFavorite = () => {
        toggleFavoriteStore(selectedProduct);
        setIsFavorite(!isFavorite); // Optimistic update
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black/40 backdrop-blur-sm animate-in fade-in duration-300"
                onClick={closeModal}
            />

            {/* Modal Content */}
            <div className="relative w-full max-w-4xl bg-white rounded-3xl overflow-hidden shadow-2xl animate-in zoom-in-95 duration-300 flex flex-col md:flex-row max-h-[90vh] md:max-h-[600px]">

                {/* Close Button Mobile - Absolute on top right */}
                <button
                    onClick={closeModal}
                    className="absolute top-4 right-4 z-20 p-2 bg-white/80 backdrop-blur-md rounded-full text-slate-500 hover:text-slate-800 transition-colors md:hidden"
                >
                    <X className="w-6 h-6" />
                </button>

                {/* Left: Image Gallery (Simple for now) */}
                <div className="w-full md:w-1/2 bg-gray-50 relative min-h-[300px] md:min-h-full">
                    <Image
                        src={selectedProduct.image}
                        alt={selectedProduct.name}
                        fill
                        className="object-cover"
                    />
                    {/* Badge if available later */}
                    {/* <div className="absolute top-6 left-6 bg-primary text-white px-3 py-1 text-xs font-bold uppercase tracking-wider rounded-full">
                        Best Seller
                    </div> */}
                </div>

                {/* Right: Product Details */}
                <div className="w-full md:w-1/2 p-6 md:p-10 flex flex-col overflow-y-auto">
                    {/* Header */}
                    <div className="flex justify-between items-start mb-2">
                        <div>
                            <p className="text-primary font-bold text-sm uppercase tracking-wider mb-1">
                                {selectedProduct.category}
                            </p>
                            <h2 className="text-2xl md:text-3xl font-black text-background-dark leading-tight">
                                {selectedProduct.name}
                            </h2>
                        </div>
                        <button
                            onClick={closeModal}
                            className="hidden md:block p-2 text-slate-400 hover:text-slate-800 transition-colors"
                        >
                            <X className="w-6 h-6" />
                        </button>
                    </div>

                    {/* Ratings */}
                    <div className="flex items-center gap-2 mb-6">
                        <div className="flex text-yellow-400">
                            {[...Array(5)].map((_, i) => (
                                <Star key={i} className="w-4 h-4 fill-current" />
                            ))}
                        </div>
                        <span className="text-sm text-slate-400 font-medium">(128 reseñas)</span>
                    </div>

                    {/* Price */}
                    <div className="mb-6">
                        <div className="flex flex-col gap-1">
                            <div className="flex flex-wrap items-center gap-4">
                                <span className="text-3xl font-black text-primary flex items-baseline gap-2">
                                    {currencySymbol}{price.toFixed(2)}
                                    {currency === 'USD' && (
                                        <span className="text-lg font-medium text-slate-400">
                                            / Bs.{(selectedProduct.priceUSD * exchangeRate).toFixed(2)}
                                        </span>
                                    )}
                                </span>
                                {wholesalePriceDisplay && (
                                    <span className="text-sm font-bold text-green-600 bg-green-50 px-3 py-1 rounded-full border border-green-100 flex items-center gap-1">
                                        Mayor: <span className="text-lg">{wholesalePriceDisplay}</span>
                                    </span>
                                )}
                            </div>
                        </div>
                        {currency === 'VES' && (
                            <div className="mt-1">
                                <span className="text-sm text-slate-400 font-medium">
                                    (Ref. ${selectedProduct.priceUSD.toFixed(2)})
                                </span>
                            </div>
                        )}
                    </div>

                    {/* Description */}
                    <div className="prose prose-sm text-slate-600 mb-8 flex-grow">
                        <p>{getProductDescription(selectedProduct)}</p>

                        {/* Features list mimicking premium product features */}
                        <ul className="list-none space-y-2 pl-0 mt-4">
                            <li className="flex items-center gap-2">
                                <Check className="w-4 h-4 text-green-500" />
                                <span>Alta durabilidad</span>
                            </li>
                            <li className="flex items-center gap-2">
                                <Check className="w-4 h-4 text-green-500" />
                                <span>Cruelty-free & Vegano</span>
                            </li>
                            <li className="flex items-center gap-2">
                                <Check className="w-4 h-4 text-green-500" />
                                <span>Enviquecimiento con vitaminas</span>
                            </li>
                        </ul>
                    </div>

                    {/* Actions */}
                    <div className="border-t border-slate-100 pt-6 mt-auto space-y-4">
                        <div className="flex gap-4">
                            <button
                                onClick={handleAddToCart}
                                className={cn(
                                    "flex-1 py-4 rounded-xl font-bold text-lg flex items-center justify-center gap-2 transition-all shadow-lg hover:shadow-xl active:scale-95",
                                    addedToCart
                                        ? "bg-green-500 text-white hover:bg-green-600 shadow-green-200"
                                        : "bg-background-dark text-white hover:bg-black shadow-slate-200"
                                )}
                            >
                                {addedToCart ? (
                                    <>
                                        <Check className="w-5 h-5" /> Agregado
                                    </>
                                ) : (
                                    <>
                                        <ShoppingBag className="w-5 h-5" /> Agregar al Carrito
                                    </>
                                )}
                            </button>

                            <button
                                onClick={handleToggleFavorite}
                                className={cn(
                                    "p-4 rounded-xl border-2 transition-all flex items-center justify-center active:scale-95",
                                    isFavorite
                                        ? "border-red-500 bg-red-50 text-red-500"
                                        : "border-slate-200 hover:border-primary hover:text-primary text-slate-400"
                                )}
                            >
                                <Heart className={cn("w-6 h-6", isFavorite && "fill-current")} />
                            </button>
                        </div>
                        <p className="text-center text-xs text-slate-400 font-medium">
                            Envío gratis en compras mayores a $50
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
