"use client";

import { useState } from 'react';
import { X } from 'lucide-react';

export default function TopBanner() {
    const [isVisible, setIsVisible] = useState(true);

    if (!isVisible) return null;

    return (
        <div className="bg-primary text-white text-[10px] md:text-xs font-bold tracking-widest uppercase py-2 px-4 text-center relative z-50">
            <p>
                ✨ Envío Gratis en órdenes mayores a $50 — <span className="underline opacity-80 cursor-pointer hover:opacity-100">Comprar Ahora</span> ✨
            </p>
            <button
                onClick={() => setIsVisible(false)}
                className="absolute right-4 top-1/2 -translate-y-1/2 hover:bg-white/20 rounded-full p-1 transition-colors"
                aria-label="Cerrar anuncio"
            >
                <X className="w-3 h-3" />
            </button>
        </div>
    );
}
