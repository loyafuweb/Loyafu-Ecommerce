"use client";

import { Sparkles, Star, Zap } from 'lucide-react';

export default function Newsletter() {
    return (
        <section className="px-6 max-w-7xl mx-auto pb-24">
            <div className="bg-primary rounded-3xl p-8 md:p-16 text-center text-white relative overflow-hidden">
                {/* Decorative elements */}
                <div className="absolute -top-10 -left-10 w-40 h-40 bg-white/10 rounded-full blur-2xl"></div>
                <div className="absolute -bottom-10 -right-10 w-64 h-64 bg-white/10 rounded-full blur-2xl"></div>

                <div className="relative z-10 space-y-8">
                    <h2 className="text-4xl md:text-6xl font-black tracking-tight leading-none uppercase font-brand">Únete al Club Loyafu</h2>
                    <p className="text-white/80 max-w-md mx-auto font-medium text-lg">
                        Obtén 15% de descuento en tu primera orden, acceso exclusivo y tips de cuidado de la piel.
                    </p>

                    <form
                        className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto"
                        onSubmit={(e) => { e.preventDefault(); alert("Thanks for joining!"); }}
                    >
                        <input
                            className="flex-1 rounded-full px-8 py-4 text-background-dark border-none focus:ring-4 focus:ring-white/30 text-lg font-bold placeholder:text-gray-400"
                            placeholder="Tu mejor email..."
                            type="email"
                        />
                        <button type="submit" className="bg-background-dark text-white px-8 py-4 rounded-full font-black uppercase text-sm tracking-widest hover:scale-105 transition-transform hover:shadow-lg">
                            Unirme
                        </button>
                    </form>

                    <div className="flex items-center justify-center gap-8 pt-8 opacity-60">
                        <div className="flex flex-col items-center gap-1">
                            <Sparkles className="w-8 h-8" />
                            <span className="text-[10px] font-bold uppercase tracking-widest">Cruelty Free</span>
                        </div>
                        <div className="flex flex-col items-center gap-1">
                            <Star className="w-8 h-8" />
                            <span className="text-[10px] font-bold uppercase tracking-widest">Vegano</span>
                        </div>
                        <div className="flex flex-col items-center gap-1">
                            <Zap className="w-8 h-8" />
                            <span className="text-[10px] font-bold uppercase tracking-widest">Reciclable</span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
