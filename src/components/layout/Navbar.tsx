"use client";

import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { Menu, X, Search, ShoppingBag, ArrowRight, RefreshCw, Heart, Sparkles } from 'lucide-react';
import { useCartStore } from '@/store/useCartStore';
import { useFavoritesStore } from '@/store/useFavoritesStore';
import { cn } from '@/lib/utils';
// import Logo from '@/components/ui/Logo'; // Removed in favor of image logo

export default function Navbar() {
    const pathname = usePathname();
    const router = useRouter();
    const setExchangeRate = useCartStore((state) => state.setExchangeRate);
    const [isOpen, setIsOpen] = useState(false);
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [cartAnimate, setCartAnimate] = useState(false);
    const [favAnimate, setFavAnimate] = useState(false);
    const [bcvRate, setBcvRate] = useState<number | null>(null);

    const cartItems = useCartStore((state) => state.items);
    const cartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

    const favorites = useFavoritesStore((state) => state.favorites);
    const favCount = favorites.length;

    // Dynamic Scroll Effect
    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        handleScroll();
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Fetch BCV Rate
    useEffect(() => {
        const fetchRate = async () => {
            try {
                // Attempt to fetch from API
                const res = await fetch('https://ve.dolarapi.com/v1/dolares/oficial', {
                    next: { revalidate: 3600 } // Cache for 1 hour
                });
                if (res.ok) {
                    const data = await res.json();
                    if (data && data.promedio) {
                        setBcvRate(data.promedio);
                        setExchangeRate(data.promedio);
                        return;
                    }
                }
            } catch (error) {
                console.warn("Could not fetch BCV rate, using fallback.", error);
            }
            // Fallback rate if API fails (e.g. 60.00) or just leave as null
            // setBcvRate(60.00); 
        };
        fetchRate();
    }, []);

    // Cart Animation Trigger
    useEffect(() => {
        if (cartCount > 0) {
            setCartAnimate(true);
            const timer = setTimeout(() => setCartAnimate(false), 300);
            return () => clearTimeout(timer);
        }
    }, [cartCount]);

    // Fav Animation Trigger
    useEffect(() => {
        if (favCount > 0) {
            setFavAnimate(true);
            const timer = setTimeout(() => setFavAnimate(false), 300);
            return () => clearTimeout(timer);
        }
    }, [favCount]);

    // Close mobile menu on route change
    useEffect(() => {
        setIsOpen(false);
        setIsSearchOpen(false);
    }, [pathname]);

    const isActive = (path: string) => pathname === path;

    const handleSearch = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            const term = e.currentTarget.value.trim();
            if (term) {
                router.push(`/catalog?q=${encodeURIComponent(term)}`);
                setIsSearchOpen(false);
            }
        }
    };

    return (
        <>
            <nav className={cn(
                "fixed left-0 right-0 z-40 transition-all duration-500 ease-in-out",
                scrolled ? "top-4" : "top-0"
            )}>
                <div className={cn(
                    "mx-auto transition-all duration-500 ease-in-out flex items-center justify-between",
                    scrolled
                        ? "w-[95%] max-w-5xl bg-white/80 backdrop-blur-xl rounded-2xl md:rounded-full shadow-2xl shadow-primary/10 border border-primary/20 px-3 md:px-6 py-1.5 md:py-1"
                        : "w-full max-w-7xl px-4 md:px-6 py-2 bg-transparent"
                )}>

                    {/* Logo Section */}
                    <div className="flex items-center gap-8">
                        <Link href="/" className="flex items-center gap-2 group">
                            {/* Replaced Text Logo with Image Logo */}
                            <div className={cn(
                                "relative w-36 h-12 md:w-64 md:h-20 transition-transform duration-300 group-hover:scale-105",
                            )}>
                                <Image
                                    src="/assets/brand/logo-main.png"
                                    alt="Loyafu Logo"
                                    fill
                                    className="object-contain"
                                    priority
                                />
                            </div>
                        </Link>

                        {/* Desktop Links with Active State & Dropdown */}
                        <div className="hidden md:flex items-center gap-1">
                            <Link
                                href="/catalog"
                                className={cn(
                                    "px-4 py-2 rounded-full text-sm font-bold transition-all",
                                    isActive('/catalog') ? "bg-primary/10 text-primary" : "text-slate-700 hover:text-primary hover:bg-primary/5"
                                )}
                            >
                                Tienda
                            </Link>


                            <Link
                                href="/#promociones"
                                className={cn(
                                    "px-4 py-2 rounded-full text-sm font-bold transition-all",
                                    isActive('/#promociones') ? "bg-primary/10 text-primary" : "text-slate-700 hover:text-primary hover:bg-primary/5"
                                )}
                            >
                                Promociones
                            </Link>
                        </div>
                    </div>

                    {/* Mobile Menu Open - Brand Tagline (fills empty space) */}
                    {isOpen && (
                        <div className="md:hidden absolute left-1/2 -translate-x-1/2 flex items-center gap-1.5 animate-in fade-in duration-500">
                            <Sparkles className="w-3.5 h-3.5 text-primary" />
                            <span className="text-xs font-bold text-primary/60 tracking-widest uppercase whitespace-nowrap">Glow Up</span>
                        </div>
                    )}

                    {/* Actions Section */}
                    <div className="flex items-center gap-1.5 sm:gap-3">

                        {/* BCV Rate Badge */}
                        {bcvRate && (
                            <div className="hidden lg:flex items-center gap-1.5 px-3 py-1.5 bg-primary/10 text-primary border border-primary/20 rounded-full font-bold text-xs shadow-sm animate-in fade-in duration-700">
                                <RefreshCw className="w-3 h-3" />
                                <span>BCV: {bcvRate.toFixed(2)} Bs</span>
                            </div>
                        )}

                        {/* Search Bar - Desktop */}
                        <div className={cn(
                            "hidden sm:flex bg-primary/5 hover:bg-primary/10 rounded-full px-4 py-2 items-center gap-2 border border-primary/10 focus-within:ring-2 focus-within:ring-primary/20 transition-all cursor-text group",
                            isOpen && "opacity-0 pointer-events-none"
                        )}>
                            <Search className="w-4 h-4 text-primary/60 group-hover:text-primary transition-colors" />
                            <input
                                className="bg-transparent border-none focus:ring-0 text-sm p-0 w-24 lg:w-40 placeholder:text-primary/40 text-primary font-bold focus:outline-none"
                                placeholder="Buscar..."
                                type="text"
                                onKeyDown={handleSearch}
                            />
                        </div>

                        {/* Mobile Search Toggle */}
                        <button
                            className={cn(
                                "sm:hidden p-2 rounded-full bg-white/70 backdrop-blur-sm border border-primary/10 shadow-sm hover:bg-primary/10 text-primary transition-all",
                                isOpen && "opacity-0 pointer-events-none"
                            )}
                            onClick={() => setIsSearchOpen(!isSearchOpen)}
                        >
                            <Search className="w-4 h-4" />
                        </button>

                        {/* Favorites Button with Animation */}
                        <Link
                            href="/favorites"
                            className={cn(
                                "relative bg-white/70 backdrop-blur-sm p-2 sm:p-2.5 rounded-full border border-primary/10 shadow-sm hover:bg-red-50 hover:text-red-500 hover:border-red-200 transition-all text-background-dark group",
                                favAnimate && "animate-bounce",
                                isOpen && "opacity-0 pointer-events-none"
                            )}
                        >
                            <Heart className={cn("w-4 h-4 sm:w-5 sm:h-5 group-hover:fill-current transition-all", favCount > 0 ? "text-red-500 fill-current" : "")} />
                            {favCount > 0 && (
                                <span className="absolute -top-1 -right-1 flex h-4 w-4 sm:h-5 sm:w-5 items-center justify-center rounded-full bg-red-500 text-[9px] sm:text-[10px] font-bold text-white border-2 border-white shadow-sm">
                                    {favCount}
                                </span>
                            )}
                        </Link>

                        {/* Cart Button with Animation */}
                        <Link
                            href="/cart"
                            className={cn(
                                "relative bg-white/70 backdrop-blur-sm p-2 sm:p-2.5 rounded-full border border-primary/10 shadow-sm hover:bg-primary/20 hover:border-primary/30 transition-all text-background-dark group",
                                cartAnimate && "animate-bounce",
                                isOpen && "opacity-0 pointer-events-none"
                            )}
                        >
                            {/* Micro-interaction Sticker */}
                            <div className="absolute -top-6 -right-4 w-10 h-10 pointer-events-none hidden group-hover:block animate-in fade-in zoom-in duration-300">
                                <Image src="/assets/brand/sticker-03.png" alt="Yaaas" width={40} height={40} className="object-contain rotate-12" />
                            </div>

                            <ShoppingBag className="w-4 h-4 sm:w-5 sm:h-5 group-hover:text-primary transition-colors" />
                            {cartCount > 0 && (
                                <span className="absolute -top-1 -right-1 flex h-4 w-4 sm:h-5 sm:w-5 items-center justify-center rounded-full bg-primary text-[9px] sm:text-[10px] font-bold text-white border-2 border-white shadow-sm">
                                    {cartCount}
                                </span>
                            )}
                        </Link>

                        {/* Mobile Menu Toggle */}
                        <button
                            className="md:hidden bg-white/70 backdrop-blur-sm p-2 rounded-full border border-primary/10 shadow-sm hover:bg-primary/20 hover:border-primary/30 transition-all text-background-dark"
                            onClick={() => setIsOpen(!isOpen)}
                        >
                            {isOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
                        </button>
                    </div>
                </div>

                {/* Mobile Search Bar Expandable */}
                {isSearchOpen && (
                    <div className="absolute top-full left-0 right-0 p-4 bg-white/95 backdrop-blur-xl border-t border-b border-primary/10 animate-in slide-in-from-top-2">
                        <div className="flex items-center gap-3 bg-primary/5 p-3 rounded-xl border border-primary/10">
                            <Search className="w-5 h-5 text-primary" />
                            <input
                                className="bg-transparent border-none focus:ring-0 text-base w-full placeholder:text-primary/50 text-primary font-bold focus:outline-none"
                                placeholder="¿Qué buscas hoy?..."
                                type="text"
                                autoFocus
                                onKeyDown={handleSearch}
                            />
                            <button onClick={() => setIsSearchOpen(false)} className="p-1">
                                <X className="w-4 h-4 text-primary/50" />
                            </button>
                        </div>
                    </div>
                )}
            </nav >

            {/* Mobile Menu Overlay */}
            {
                isOpen && (
                    <div className="fixed inset-0 z-30 bg-background-light/95 backdrop-blur-2xl pt-20 px-6 md:hidden animate-in fade-in slide-in-from-top-10 duration-300 flex flex-col">
                        {/* Background Pattern */}
                        <div className="absolute inset-0 z-[-1] opacity-[0.07] pointer-events-none">
                            <Image src="/assets/brand/pattern.jpg" alt="pattern" fill className="object-cover" />
                        </div>

                        {/* Decorative accent line */}
                        <div className="absolute top-16 left-6 right-6 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />

                        <div className="space-y-5 flex-1 overflow-y-auto flex flex-col justify-center items-center pb-8">
                            {/* Navigation Links */}
                            {[
                                { href: '/catalog?sort=new', label: 'NOVEDADES', icon: <Sparkles className="w-5 h-5" /> },
                                { href: '/catalog', label: 'TIENDA', icon: <ShoppingBag className="w-5 h-5" /> },
                                { href: '/favorites', label: 'FAVORITOS', icon: <Heart className="w-5 h-5" /> },
                                { href: '/#promociones', label: 'PROMOS', icon: <ArrowRight className="w-5 h-5" /> },
                            ].map((item, i) => (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    onClick={() => setIsOpen(false)}
                                    className={cn(
                                        "relative group flex items-center gap-3 text-3xl sm:text-4xl font-black font-brand transition-all duration-300 hover:scale-105",
                                        isActive(item.href)
                                            ? "text-primary"
                                            : "text-background-dark hover:text-primary"
                                    )}
                                    style={{ animationDelay: `${i * 50}ms` }}
                                >
                                    {/* Active indicator dot */}
                                    {isActive(item.href) && (
                                        <span className="absolute -left-6 w-2 h-2 rounded-full bg-primary shadow-lg shadow-primary/50" />
                                    )}
                                    <span className="relative z-10">{item.label}</span>
                                    {/* Fav count badge inline */}
                                    {item.href === '/favorites' && favCount > 0 && (
                                        <span className="flex items-center justify-center w-7 h-7 rounded-full bg-red-500 text-white text-xs font-sans font-bold shadow-lg">
                                            {favCount}
                                        </span>
                                    )}
                                    {/* Underline effect on hover */}
                                    <span className="absolute -bottom-1 left-0 right-0 h-1 bg-primary/20 rounded-full scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
                                </Link>
                            ))}

                            {/* Mobile BCV Rate */}
                            {bcvRate && (
                                <div className="pt-6">
                                    <div className="inline-flex items-center gap-2 px-5 py-2.5 bg-primary/10 text-primary border border-primary/20 rounded-xl font-bold text-sm shadow-sm">
                                        <RefreshCw className="w-4 h-4" />
                                        <span>Tasa BCV: {bcvRate.toFixed(2)} Bs</span>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Socials & Footer in Menu */}
                        <div className="py-6 space-y-3 border-t border-primary/10">
                            <p className="text-xs font-bold text-slate-400 uppercase tracking-[0.2em] text-center">Síguenos</p>
                            <div className="flex justify-center gap-4">
                                <a href="https://instagram.com/loyafu.ve" target="_blank" className="w-11 h-11 rounded-full bg-white border border-primary/10 flex items-center justify-center text-primary shadow-md hover:shadow-lg hover:scale-110 hover:border-primary/30 transition-all">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5" /><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" /><line x1="17.5" x2="17.51" y1="6.5" y2="6.5" /></svg>
                                </a>
                                <a href="https://wa.me/584244096534" target="_blank" className="w-11 h-11 rounded-full bg-white border border-primary/10 flex items-center justify-center text-green-500 shadow-md hover:shadow-lg hover:scale-110 hover:border-green-300 transition-all">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><path d="M16.95 7.05a10 10 0 0 0-14.1 0 10 10 0 0 0 .53 14.65L3 22l4.8-1.5a10 10 0 0 0 14.15-5.45" /></svg>
                                </a>
                            </div>
                        </div>
                    </div>
                )
            }
        </>
    );
}
