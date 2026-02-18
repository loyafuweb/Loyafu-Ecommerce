"use client";

import { create } from 'zustand';
import { CheckCircle, ShoppingBag, X } from 'lucide-react';
import { useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';

// Toast store
interface ToastState {
    message: string;
    visible: boolean;
    showToast: (message: string) => void;
    hideToast: () => void;
}

export const useToastStore = create<ToastState>((set) => ({
    message: '',
    visible: false,
    showToast: (message: string) => {
        set({ message, visible: true });
    },
    hideToast: () => set({ visible: false }),
}));

// Toast UI component
export default function Toast() {
    const { message, visible, hideToast } = useToastStore();
    const timerRef = useRef<NodeJS.Timeout | null>(null);

    useEffect(() => {
        if (visible) {
            if (timerRef.current) clearTimeout(timerRef.current);
            timerRef.current = setTimeout(() => {
                hideToast();
            }, 2500);
        }
        return () => {
            if (timerRef.current) clearTimeout(timerRef.current);
        };
    }, [visible, hideToast]);

    if (!visible) return null;

    return (
        <div
            className={cn(
                "fixed bottom-24 left-1/2 -translate-x-1/2 z-[60] animate-toast-in",
            )}
        >
            <div className="flex items-center gap-3 bg-background-dark text-white px-6 py-4 rounded-2xl shadow-2xl shadow-black/30 min-w-[280px]">
                <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
                    <CheckCircle className="w-5 h-5" />
                </div>
                <span className="text-sm font-bold flex-1">{message}</span>
                <button
                    onClick={hideToast}
                    className="text-white/50 hover:text-white transition-colors"
                >
                    <X className="w-4 h-4" />
                </button>
            </div>
        </div>
    );
}
