"use client";

import { Star, MessageCircle, Quote } from 'lucide-react';

const testimonials = [
    {
        name: 'María G.',
        text: 'Pedí los polvos Salome y me llegaron al día siguiente, demasiado rápido. La atención por WhatsApp fue súper atenta, me ayudaron a escoger los tonos. Repetiré seguro 💜',
        rating: 5,
        badge: 'Cliente frecuente',
    },
    {
        name: 'Laura P.',
        text: 'Arranqué con el combo de $40 para vender en mi local y la verdad los productos se mueven rápido. Ya voy por mi tercer pedido, los márgenes son buenos de verdad.',
        rating: 5,
        badge: 'Emprendedora',
    },
    {
        name: 'Andrea M.',
        text: 'El corrector Salome es lo mejor que he probado, aguanta todo el día sin retoque. Lo recomiendo full, sobre todo para las que trabajamos todo el día.',
        rating: 4,
        badge: 'Verificada',
    },
    {
        name: 'Daniela R.',
        text: 'Me encanta que el carrito te calcula el precio de mayor automático, no tienes que estar preguntando. Hice mi pedido en 5 minutos, súper práctico.',
        rating: 5,
        badge: 'Mayorista',
    },
];

export default function Testimonials() {
    return (
        <section className="py-20 px-6">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="text-center mb-12">
                    <span className="text-xs font-black uppercase tracking-[0.3em] text-primary/50">Lo que dicen nuestras clientas</span>
                    <h2 className="text-3xl md:text-5xl font-black text-background-dark mt-3 tracking-tight">
                        Confianza Real ✨
                    </h2>
                </div>

                {/* Testimonial Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {testimonials.map((t, i) => (
                        <div
                            key={i}
                            className="bg-white rounded-2xl p-6 shadow-lg shadow-primary/5 border border-primary/5 hover:border-primary/15 transition-all hover:shadow-xl group"
                        >
                            {/* Quote icon */}
                            <Quote className="w-8 h-8 text-primary/15 mb-4 group-hover:text-primary/30 transition-colors" />

                            {/* Text */}
                            <p className="text-slate-600 text-sm leading-relaxed mb-6 font-medium">
                                &ldquo;{t.text}&rdquo;
                            </p>

                            {/* Stars */}
                            <div className="flex gap-0.5 mb-3">
                                {[...Array(t.rating)].map((_, j) => (
                                    <Star key={j} className="w-4 h-4 text-amber-400 fill-current" />
                                ))}
                            </div>

                            {/* Author */}
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="font-bold text-background-dark text-sm">{t.name}</p>
                                    <span className="text-[10px] font-bold text-primary/50 uppercase tracking-wider">{t.badge}</span>
                                </div>
                                <div className="w-8 h-8 bg-green-500/10 text-green-500 rounded-full flex items-center justify-center">
                                    <MessageCircle className="w-4 h-4" />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
