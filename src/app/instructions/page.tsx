"use client";

import { Info, BookOpen, MessageCircle, HelpCircle } from 'lucide-react';
import Link from 'next/link';

export default function Instructions() {
    return (
        <div className="max-w-4xl mx-auto px-6 py-12 space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-1000">
            <div className="text-center space-y-4">
                <div className="inline-flex p-3 rounded-2xl bg-primary/10 text-primary mb-2">
                    <BookOpen className="w-8 h-8" />
                </div>
                <h1 className="text-4xl font-black text-background-dark tracking-tighter uppercase italic">Instrucciones de Compra</h1>
                <p className="text-slate-500 font-medium">Todo lo que necesitas saber para comprar en Loyafu</p>
            </div>

            <div className="grid gap-6">
                {[
                    {
                        title: "1. Explora y Selecciona",
                        desc: "Navega por nuestro catálogo y añade tus productos favoritos a la bolsa. Si el producto tiene tonos (como polvos o bases), podrás elegir el que prefieras.",
                        icon: <div className="w-12 h-12 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center font-bold">1</div>
                    },
                    {
                        title: "2. Revisa tu Pedido",
                        desc: "Entra a tu Bolsa de Compras para confirmar las cantidades y tonos seleccionados. El sistema calculará automáticamente si calificas para precios al mayor.",
                        icon: <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center font-bold">2</div>
                    },
                    {
                        title: "3. Paga por WhatsApp",
                        desc: "Haz clic en 'Pagar por WhatsApp'. Se generará un mensaje automático con tu pedido detallado y el total en USD y Bs. Envíanoslo para concretar el pago y envío.",
                        icon: <div className="w-12 h-12 rounded-xl bg-green-50 text-green-600 flex items-center justify-center font-bold">3</div>
                    }
                ].map((step, i) => (
                    <div key={i} className="flex gap-6 p-6 bg-white rounded-3xl border border-primary/10 shadow-sm hover:shadow-md transition-shadow">
                        <div className="flex-shrink-0">{step.icon}</div>
                        <div className="space-y-1">
                            <h3 className="font-black text-background-dark text-lg uppercase tracking-tight">{step.title}</h3>
                            <p className="text-slate-500 leading-relaxed text-sm font-medium">{step.desc}</p>
                        </div>
                    </div>
                ))}
            </div>

            <div className="bg-background-dark text-white p-8 rounded-[2.5rem] shadow-2xl relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-64 h-64 bg-primary/20 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2 group-hover:bg-primary/30 transition-colors" />
                <div className="relative z-10 space-y-6">
                    <div className="flex items-center gap-3">
                        <MessageCircle className="w-6 h-6 text-primary-light" />
                        <h2 className="text-2xl font-black tracking-tighter uppercase">¿Tienes dudas adicionales?</h2>
                    </div>
                    <p className="text-slate-300 font-medium leading-relaxed">
                        Nuestro equipo de atención al cliente está disponible para guiarte en cada paso. Escríbenos directamente por WhatsApp y te responderemos a la brevedad posible.
                    </p>
                    <a
                        href="https://wa.me/584244096534"
                        target="_blank"
                        className="inline-flex bg-white text-background-dark px-8 py-4 rounded-full font-black text-sm uppercase tracking-widest hover:scale-105 active:scale-95 transition-all shadow-xl"
                    >
                        Contactar Soporte
                    </a>
                </div>
            </div>

            <div className="text-center pt-8">
                <Link href="/catalog" className="text-primary font-black uppercase text-xs tracking-[0.2em] hover:opacity-70 transition-opacity">
                    Volver a la tienda
                </Link>
            </div>
        </div>
    );
}
