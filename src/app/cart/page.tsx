"use client";

import Image from 'next/image';
import Link from 'next/link';
import { Minus, Plus, Trash2, Truck, ArrowRight, ShieldCheck, Leaf, MessageCircle, ShoppingBag } from 'lucide-react';
import { useCartStore } from '@/store/useCartStore';
import { cn } from '@/lib/utils';
import { useEffect, useState } from 'react';

export default function Cart() {
    const { items, removeItem, updateQuantity, getTotal, currency, exchangeRate } = useCartStore();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return null;

    const totalUSD = getTotal();
    const totalBs = totalUSD * exchangeRate;
    const currencySymbol = currency === 'USD' ? '$' : 'Bs.';
    const displayTotal = currency === 'USD' ? totalUSD : totalBs;

    // Free shipping threshold
    const FREE_SHIPPING_THRESHOLD = 50;
    const progress = Math.min((totalUSD / FREE_SHIPPING_THRESHOLD) * 100, 100);
    const remainingForFreeShipping = Math.max(FREE_SHIPPING_THRESHOLD - totalUSD, 0);

    const handleQuantityChange = (id: string, current: number, delta: number) => {
        const newQuantity = current + delta;
        if (newQuantity < 1) return;
        updateQuantity(id, newQuantity);
    };

    const generateWhatsAppLink = () => {
        const phone = "584244096534"; // Replace with actual business number
        let message = "Hola! Quiero realizar el siguiente pedido en Loyafu:\n\n";

        items.forEach(item => {
            const isWholesale = item.wholesalePrice && item.wholesaleMin && item.quantity >= item.wholesaleMin;
            const price = isWholesale ? item.wholesalePrice : item.priceUSD;
            const displayPrice = currency === 'USD' ? price : price! * exchangeRate;

            message += `- (${item.quantity}) ${item.name} - ${currencySymbol}${(displayPrice! * item.quantity).toFixed(2)}`;
            if (isWholesale) message += " (Mayorista)";
            message += "\n";
        });

        const currentTotal = currency === 'USD' ? totalUSD : totalBs;
        message += `\nTotal: ${currencySymbol}${currentTotal.toFixed(2)}`;
        if (exchangeRate > 0) {
            message += ` / Bs.${totalBs.toFixed(2)}`;
        }
        message += `\n\n(Tasa ref: ${exchangeRate.toFixed(2)})`;

        return `https://wa.me/${phone}?text=${encodeURIComponent(message)}%0A%0A%E2%9C%A8%20*DATOS%20DE%20ENV%C3%8DO*%20(Por%20favor%20completar):%0A%F0%9F%91%A4%20Nombre:%20%0A%F0%9F%86%94%20C%C3%A9dula:%20%0A%F0%9F%93%9E%20Tel%C3%A9fono:%20%0A%F0%9F%93%A7%20Correo:%20%0A%F0%9F%93%8D%20Direcci%C3%B3n%20(Agencia/Estado/Ciudad):%20`;
    };

    if (items.length === 0) {
        return (
            <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-6">
                <div className="w-24 h-24 bg-primary/5 rounded-full flex items-center justify-center mb-6">
                    <ShoppingBag className="w-10 h-10 text-primary/40" />
                </div>
                <h1 className="text-3xl font-black text-background-dark mb-4">Tu bolsa está vacía</h1>
                <p className="text-slate-500 max-w-md mb-8">
                    Parece que aún no has agregado nada. Explora nuestras colecciones y encuentra tus favoritos.
                </p>
                <Link
                    href="/catalog"
                    className="bg-primary text-white px-8 py-4 rounded-full font-bold shadow-lg shadow-primary/20 hover:scale-105 transition-transform"
                >
                    Ir a la Tienda
                </Link>
            </div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto px-6 pt-32 pb-12">
            <div className="flex flex-col lg:flex-row gap-12">

                {/* Left Column: Cart Content */}
                <div className="flex-1 space-y-8">
                    <div>
                        <h1 className="text-4xl font-extrabold mb-2 text-background-dark">Mi Bolsa de Compras</h1>
                        <p className="text-slate-500 font-medium">
                            Tienes {items.length} artículos en tu carrito.
                        </p>
                    </div>

                    {/* Free Shipping Progress */}
                    {totalUSD < FREE_SHIPPING_THRESHOLD ? (
                        <div className="bg-white p-6 rounded-3xl shadow-sm border border-primary/5">
                            <div className="flex justify-between items-center mb-4">
                                <span className="text-sm font-bold flex items-center gap-2 text-slate-700">
                                    <Truck className="w-5 h-5 text-primary" /> Progreso de Envío Gratis
                                </span>
                                <span className="text-sm font-black text-primary">
                                    ¡Faltan ${remainingForFreeShipping.toFixed(2)}!
                                </span>
                            </div>
                            <div className="h-3 w-full bg-primary/10 rounded-full overflow-hidden">
                                <div
                                    className="h-full bg-gradient-to-r from-primary to-purple-400 rounded-full transition-all duration-500 shadow-[0_0_15px_rgba(140,43,238,0.5)]"
                                    style={{ width: `${progress}%` }}
                                />
                            </div>
                        </div>
                    ) : (
                        <div className="bg-green-50 p-4 rounded-2xl flex items-center gap-3 border border-green-100 text-green-700">
                            <div className="bg-green-100 p-2 rounded-full">
                                <Truck className="w-5 h-5" />
                            </div>
                            <span className="font-bold text-sm">¡Genial! Tienes envío gratis en este pedido.</span>
                        </div>
                    )}


                    {/* Cart Items List */}
                    <div className="space-y-4">
                        {items.map((item) => {
                            const isWholesale = item.wholesalePrice && item.wholesaleMin && item.quantity >= item.wholesaleMin;
                            const priceUSD = isWholesale ? item.wholesalePrice! : item.priceUSD;
                            const itemPrice = currency === 'USD' ? priceUSD : priceUSD * exchangeRate;
                            const itemTotal = itemPrice * item.quantity;

                            // Calculate savings if wholesale is applied
                            const regularPrice = currency === 'USD' ? item.priceUSD : item.priceUSD * exchangeRate;
                            const savings = (regularPrice - itemPrice) * item.quantity;

                            return (
                                <div key={item.id} className="group bg-white p-4 rounded-3xl flex flex-col sm:flex-row items-center gap-6 border border-transparent hover:border-primary/20 transition-all shadow-xl shadow-primary/5 relative overflow-hidden">

                                    {/* Wholesale Badge */}
                                    {isWholesale && (
                                        <div className="absolute top-0 right-0 bg-gradient-to-l from-purple-600 to-primary text-white text-[10px] font-black px-3 py-1 rounded-bl-xl shadow-sm z-10">
                                            MAYORISTA
                                        </div>
                                    )}

                                    <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-2xl overflow-hidden bg-gray-100 flex-shrink-0 relative">
                                        <Image src={item.image} fill className="object-cover" alt={item.name} />
                                    </div>
                                    <div className="flex-1 text-center sm:text-left space-y-2 w-full">
                                        <h3 className="font-bold text-lg text-background-dark leading-tight">{item.name}</h3>
                                        <p className="text-sm text-slate-500">{item.category}</p>

                                        {/* Wholesale Nudge */}
                                        {item.wholesaleMin && !isWholesale && (
                                            <p className="text-xs text-primary font-bold">
                                                ¡Lleva {item.wholesaleMin} o más y paga solo {currencySymbol}{(currency === 'USD' ? item.wholesalePrice! : item.wholesalePrice! * exchangeRate).toFixed(2)} c/u!
                                            </p>
                                        )}

                                        <div className="flex flex-wrap justify-center sm:justify-start items-center gap-4 pt-2">
                                            <div className="flex items-center bg-background-light rounded-full p-1 border border-primary/5">
                                                <button
                                                    onClick={() => handleQuantityChange(item.id, item.quantity, -1)}
                                                    className="w-8 h-8 rounded-full hover:bg-white flex items-center justify-center transition-colors text-slate-600 disabled:opacity-50"
                                                    disabled={item.quantity <= 1}
                                                >
                                                    <Minus className="w-4 h-4" />
                                                </button>
                                                <span className="px-4 font-bold text-slate-700 min-w-[30px] text-center">{item.quantity}</span>
                                                <button
                                                    onClick={() => handleQuantityChange(item.id, item.quantity, 1)}
                                                    className="w-8 h-8 rounded-full hover:bg-white flex items-center justify-center transition-colors text-slate-600"
                                                >
                                                    <Plus className="w-4 h-4" />
                                                </button>
                                            </div>
                                            <button
                                                onClick={() => removeItem(item.id)}
                                                className="text-xs font-bold text-red-400 hover:text-red-500 flex items-center gap-1 px-2 py-1 hover:bg-red-50 rounded-lg transition-colors"
                                            >
                                                <Trash2 className="w-4 h-4" /> Eliminar
                                            </button>
                                        </div>
                                    </div>
                                    <div className="text-right w-full sm:w-auto flex flex-col justify-between items-end px-4 sm:px-0">
                                        <span className="sm:hidden text-slate-500 font-medium">Total:</span>
                                        <p className="text-xl font-extrabold text-primary">
                                            {currencySymbol}{itemTotal.toFixed(2)}
                                        </p>
                                        {isWholesale && savings > 0 && (
                                            <span className="text-xs font-bold text-green-600 bg-green-100 px-2 py-0.5 rounded-full">
                                                Ahorras {currencySymbol}{savings.toFixed(2)}
                                            </span>
                                        )}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* Right Column: Order Summary */}
                <div className="lg:w-[400px] space-y-6">
                    <div className="bg-white rounded-[2rem] p-8 shadow-xl shadow-primary/5 border border-primary/5 sticky top-28">
                        <h3 className="text-2xl font-black mb-8 text-background-dark">Resumen del Pedido</h3>

                        <div className="space-y-4 mb-8">
                            <div className="flex justify-between text-slate-500 font-medium">
                                <span>Subtotal USD</span>
                                <span className="font-bold text-background-dark">${totalUSD.toFixed(2)}</span>
                            </div>
                            {currency === 'VES' && (
                                <div className="flex justify-between text-slate-500 font-medium">
                                    <span>Tasa de Cambio</span>
                                    <span className="font-bold text-primary">{exchangeRate.toFixed(2)} Bs/$</span>
                                </div>
                            )}

                            <div className="pt-4 border-t border-dashed border-gray-200">
                                <div className="flex justify-between items-center">
                                    <span className="text-lg font-bold text-background-dark">Total Estimado</span>
                                    <div className="text-right">
                                        <div className="text-3xl font-black text-primary">
                                            {currencySymbol}{displayTotal.toFixed(2)}
                                        </div>
                                        {currency === 'VES' ? (
                                            <div className="text-xs text-slate-400 font-bold">Ref: ${totalUSD.toFixed(2)}</div>
                                        ) : (
                                            <div className="text-xs text-slate-400 font-bold">Ref: Bs.{totalBs.toFixed(2)}</div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="bg-primary/5 p-4 rounded-xl mb-4">
                            <label className="flex items-start gap-3 cursor-pointer group">
                                <div className="relative flex items-center">
                                    <input
                                        type="checkbox"
                                        className="peer h-5 w-5 cursor-pointer appearance-none rounded-md border-2 border-primary/20 bg-white transition-all checked:border-primary checked:bg-primary hover:border-primary/50"
                                        id="policy-agreement"
                                    />
                                    <div className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-white opacity-0 transition-opacity peer-checked:opacity-100">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" viewBox="0 0 20 20" fill="currentColor">
                                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                        </svg>
                                    </div>
                                </div>
                                <span className="text-xs text-slate-600 font-medium leading-tight">
                                    Confirmo que he leído y acepto las <Link href="/policies" target="_blank" className="text-primary font-bold hover:underline">Políticas de Compra</Link>, incluyendo las condiciones de envío y garantía.
                                </span>
                            </label>
                        </div>

                        <a
                            href={generateWhatsAppLink()}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-full bg-[#25D366] text-white py-5 rounded-full font-black text-lg shadow-lg shadow-green-200 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-3 hover:bg-[#20bd5a]"
                        >
                            Completar en WhatsApp <MessageCircle className="w-6 h-6" />
                        </a>

                        <p className="text-center text-[10px] text-slate-400 mt-4 px-4">
                            Al proceder, serás redirigido/a a WhatsApp con los detalles de tu pedido para coordinar el pago.
                        </p>

                        <div className="mt-8 grid grid-cols-2 gap-4">
                            <div className="flex flex-col items-center text-center p-3 rounded-2xl bg-primary/5 text-primary/70">
                                <ShieldCheck className="w-5 h-5 mb-1" />
                                <span className="text-[10px] font-bold uppercase tracking-tighter">Compra Segura</span>
                            </div>
                            <div className="flex flex-col items-center text-center p-3 rounded-2xl bg-primary/5 text-primary/70">
                                <Leaf className="w-5 h-5 mb-1" />
                                <span className="text-[10px] font-bold uppercase tracking-tighter">Calidad Garantizada</span>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}
