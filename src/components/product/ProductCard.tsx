"use client";

import Image from 'next/image';
import { ShoppingCart, Heart, Sparkles, Percent, AlertCircle } from 'lucide-react';
import { useCartStore, Product } from '@/store/useCartStore';
import { cn } from '@/lib/utils';
import { useFavoritesStore } from '@/store/useFavoritesStore';
import { useProductModalStore } from '@/store/useProductModalStore';
import { getProductDescription, getWholesalePrice } from '@/lib/product-descriptions';
import { useToastStore } from '@/components/ui/Toast';
import { useState, useEffect } from 'react';

// Auto-detect badge from product description
function detectBadge(product: Product): Product['badge'] | undefined {
    const desc = (product.description || '').toLowerCase();
    if (desc.includes('promo') || desc.includes('2 x') || desc.includes('2x') || desc.includes('oferta')) return 'promo';
    if (desc.includes('agotado') || desc.includes('solo disponible una')) return 'agotado';
    return undefined;
}

interface ProductCardProps {
    product: Product;
    index?: number;
}

export default function ProductCard({ product, index = 0 }: ProductCardProps) {
    // Detect badge from data or description
    const badge = product.badge || detectBadge(product);
    const addToCart = useCartStore((state) => state.addItem);
    const currency = useCartStore((state) => state.currency);
    const exchangeRate = useCartStore((state) => state.exchangeRate);

    const [mounted, setMounted] = useState(false);

    // Safety check for hooks
    const isFavoriteFunc = useFavoritesStore((state) => state.isFavorite);
    const toggleFavorite = useFavoritesStore((state) => state.toggleFavorite);
    const openModal = useProductModalStore((state) => state.openModal);

    useEffect(() => {
        setMounted(true);
    }, []);

    const isFavorite = mounted ? isFavoriteFunc(product.id) : false;

    const price = currency === 'USD' ? product.priceUSD : product.priceUSD * exchangeRate;
    const currencySymbol = currency === 'USD' ? '$' : 'Bs.';

    // Calculate wholesale price
    const wholesalePriceStr = getWholesalePrice(product);
    let wholesalePriceDisplay = null;

    if (wholesalePriceStr) {
        const wholesaleUSD = parseFloat(wholesalePriceStr);
        if (!isNaN(wholesaleUSD)) {
            const wholesaleVal = currency === 'USD' ? wholesaleUSD : wholesaleUSD * exchangeRate;
            wholesalePriceDisplay = `${currencySymbol}${wholesaleVal.toFixed(2)}`;
        }
    }

    const showToast = useToastStore((state) => state.showToast);

    const handleAddToCart = (e: React.MouseEvent) => {
        e.stopPropagation();
        addToCart(product);
        showToast(`✓ ${product.name} agregado al carrito`);
    };

    const handleToggleFavorite = (e: React.MouseEvent) => {
        e.stopPropagation();
        toggleFavorite(product);
    };

    const handleCardClick = () => {
        openModal(product);
    };

    return (
        <div
            onClick={handleCardClick}
            className="group relative bg-white rounded-2xl p-4 overflow-hidden transition-all hover:shadow-2xl hover:shadow-primary/10 shadow-xl shadow-primary/5 border border-transparent hover:border-primary/5 cursor-pointer animate-fadeInUp"
            style={{ animationDelay: `${index * 80}ms` }}
        >
            <div className="relative aspect-[4/5] rounded-xl overflow-hidden mb-4 bg-gray-100">
                {/* Badge */}
                {badge && (
                    <span className={cn(
                        "absolute top-3 left-3 z-10 px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-wider flex items-center gap-1 shadow-md",
                        badge === 'nuevo' && "bg-blue-500 text-white",
                        badge === 'promo' && "bg-amber-400 text-amber-900",
                        badge === 'agotado' && "bg-red-500 text-white"
                    )}>
                        {badge === 'nuevo' && <><Sparkles className="w-3 h-3" /> Nuevo</>}
                        {badge === 'promo' && <><Percent className="w-3 h-3" /> Promo</>}
                        {badge === 'agotado' && <><AlertCircle className="w-3 h-3" /> Agotado</>}
                    </span>
                )}
                <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className={cn(
                        "object-cover transition-transform duration-500",
                        product.images && product.images.length > 1 ? "group-hover:opacity-0" : "group-hover:scale-110"
                    )}
                />

                {product.images && product.images.length > 1 && (
                    <Image
                        src={product.images[1]}
                        alt={`${product.name} view 2`}
                        fill
                        className="object-cover absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 scale-105"
                    />
                )}

                {/* Favorite Button */}
                <button
                    onClick={handleToggleFavorite}
                    className={cn(
                        "absolute top-3 right-3 w-8 h-8 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center transition-all shadow-sm z-10",
                        isFavorite ? "text-red-500 bg-red-50 hover:bg-red-100 ring-2 ring-red-100" : "text-primary/40 hover:text-primary hover:bg-white"
                    )}
                >
                    <Heart className={cn("w-4 h-4 transition-transform active:scale-90", isFavorite && "fill-current")} />
                </button>

                {/* Quick Add Slide Up */}
                <div className="absolute inset-x-4 bottom-4 translate-y-full opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 ease-in-out z-20">
                    <button
                        onClick={handleAddToCart}
                        className="w-full bg-primary text-white font-bold py-3 rounded-full shadow-lg shadow-primary/40 flex items-center justify-center gap-2 hover:bg-primary-dark transition-colors"
                    >
                        <ShoppingCart className="w-4 h-4" />
                        Agregar
                    </button>
                </div>
            </div>

            <div className="space-y-1">

                <h3 className="font-bold text-lg text-background-dark group-hover:text-primary transition-colors truncate">
                    {product.name}
                </h3>
                <p className="text-sm text-primary/60 font-medium">{product.category}</p>
                <p className="text-[10px] text-slate-500 mt-1 line-clamp-2 italic">
                    {getProductDescription(product)}
                </p>

                <div className="flex items-center justify-between pt-2">
                    <div className="flex flex-col">
                        {product.priceUSD === 0 ? (
                            <span className="text-sm font-black text-primary bg-primary/10 px-3 py-1 rounded-full">
                                Consultar precio
                            </span>
                        ) : (
                            <>
                                <span className="text-lg font-black text-primary">
                                    {currencySymbol}{price.toFixed(2)}
                                    {currency === 'USD' && (
                                        <span className="text-xs font-medium text-slate-400 ml-1">
                                            / Bs.{(product.priceUSD * exchangeRate).toFixed(2)}
                                        </span>
                                    )}
                                </span>
                                {wholesalePriceDisplay && (
                                    <span className="text-xs font-bold text-green-600 bg-green-50 px-2 py-0.5 rounded-full mt-1 border border-green-100">
                                        Mayor: {wholesalePriceDisplay}
                                    </span>
                                )}
                            </>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
