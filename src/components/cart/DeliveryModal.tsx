import { useState, useEffect } from 'react';
import { X, MapPin, AlertCircle, Send } from 'lucide-react';
import { DeliveryDetails } from '@/store/useCartStore';

interface DeliveryModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: (details: DeliveryDetails) => void;
    initialData?: DeliveryDetails | null;
}

export function DeliveryModal({ isOpen, onClose, onConfirm, initialData }: DeliveryModalProps) {
    const [senderName, setSenderName] = useState('');
    const [senderPhone, setSenderPhone] = useState('');
    const [receiverName, setReceiverName] = useState('');
    const [receiverPhone, setReceiverPhone] = useState('');

    useEffect(() => {
        if (isOpen && initialData) {
            setSenderName(initialData.senderName);
            setSenderPhone(initialData.senderPhone);
            setReceiverName(initialData.receiverName);
            setReceiverPhone(initialData.receiverPhone);
        } else if (isOpen) {
            // Reset when opened without data
            setSenderName('');
            setSenderPhone('');
            setReceiverName('');
            setReceiverPhone('');
        }
    }, [isOpen, initialData]);

    if (!isOpen) return null;

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onConfirm({
            senderName,
            senderPhone,
            receiverName,
            receiverPhone,
            needsLocationLink: true // Always true for delivery
        });
    };

    // Auto-fill receiver with sender if they leave it blank (or we can just let them type)
    const copySenderToReceiver = () => {
        setReceiverName(senderName);
        setReceiverPhone(senderPhone);
    };

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />

            <div className="relative w-full max-w-lg bg-[#18131e] border border-[#ffffff10] rounded-[2rem] shadow-[0_20px_60px_-15px_rgba(157,51,247,0.3)] overflow-hidden animate-in fade-in zoom-in-95 duration-300">
                {/* Visual Flair */}
                <div className="absolute -top-20 -left-20 w-40 h-40 bg-primary/20 rounded-full blur-[80px] pointer-events-none" />

                <div className="flex items-center justify-between p-6 border-b border-white/5">
                    <div>
                        <h2 className="text-xl font-black text-white italic uppercase tracking-tighter">Datos de Envío</h2>
                        <p className="text-slate-400 text-xs mt-1">Ingresa la información para tu delivery o envío.</p>
                    </div>
                    <button onClick={onClose} className="p-2 bg-white/5 rounded-full text-slate-400 hover:text-white hover:bg-white/10 transition-colors">
                        <X className="w-5 h-5" />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="p-6 space-y-6">

                    {/* Quien Envia */}
                    <div className="space-y-4">
                        <h3 className="font-brand uppercase tracking-widest text-[#a8a3b5] font-black text-xs flex items-center gap-2">
                            <span className="w-1.5 h-1.5 bg-primary rounded-full" />
                            Persona que realiza el pedido
                        </h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div className="space-y-1.5">
                                <label className="text-[10px] uppercase font-bold text-slate-500 tracking-wider">Nombre y Apellido</label>
                                <input
                                    required
                                    type="text"
                                    value={senderName}
                                    onChange={e => setSenderName(e.target.value)}
                                    className="w-full bg-[#251e30] border border-white/5 rounded-xl px-4 py-3 text-sm text-white placeholder:text-slate-600 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/50 transition-all font-medium"
                                    placeholder="Ej. Ana Pérez"
                                />
                            </div>
                            <div className="space-y-1.5">
                                <label className="text-[10px] uppercase font-bold text-slate-500 tracking-wider">Teléfono</label>
                                <input
                                    required
                                    type="tel"
                                    value={senderPhone}
                                    onChange={e => setSenderPhone(e.target.value)}
                                    className="w-full bg-[#251e30] border border-white/5 rounded-xl px-4 py-3 text-sm text-white placeholder:text-slate-600 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/50 transition-all font-medium"
                                    placeholder="Ej. 0424-1234567"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Quien Recibe */}
                    <div className="border-t border-white/5 pt-6 space-y-4">
                        <div className="flex justify-between items-center">
                            <h3 className="font-brand uppercase tracking-widest text-[#a8a3b5] font-black text-xs flex items-center gap-2">
                                <span className="w-1.5 h-1.5 bg-[#1fe96c] rounded-full" />
                                Persona que recibe
                            </h3>
                            <button
                                type="button"
                                onClick={copySenderToReceiver}
                                className="text-[9px] uppercase font-black tracking-wider text-primary hover:text-primary-light transition-colors"
                            >
                                Copiar datos de quien envía
                            </button>
                        </div>
                        <p className="text-[10px] text-slate-500 mt-0 italic">No siempre recibe la misma persona que realiza la compra.</p>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div className="space-y-1.5">
                                <label className="text-[10px] uppercase font-bold text-slate-500 tracking-wider">Nombre y Apellido</label>
                                <input
                                    required
                                    type="text"
                                    value={receiverName}
                                    onChange={e => setReceiverName(e.target.value)}
                                    className="w-full bg-[#251e30] border border-white/5 rounded-xl px-4 py-3 text-sm text-white placeholder:text-slate-600 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/50 transition-all font-medium"
                                    placeholder="Ej. Carlos Ruiz"
                                />
                            </div>
                            <div className="space-y-1.5">
                                <label className="text-[10px] uppercase font-bold text-slate-500 tracking-wider">Teléfono</label>
                                <input
                                    required
                                    type="tel"
                                    value={receiverPhone}
                                    onChange={e => setReceiverPhone(e.target.value)}
                                    className="w-full bg-[#251e30] border border-white/5 rounded-xl px-4 py-3 text-sm text-white placeholder:text-slate-600 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/50 transition-all font-medium"
                                    placeholder="Ej. 0412-7654321"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Additional info banner */}
                    <div className="bg-[#2a2435] rounded-xl p-4 border flex items-start gap-3 border-orange-500/20 text-orange-200">
                        <MapPin className="w-5 h-5 text-orange-400 mt-0.5 shrink-0" />
                        <div className="space-y-1">
                            <p className="text-[11px] font-bold uppercase tracking-widest text-orange-400">Ubicación y Costos</p>
                            <p className="text-xs text-orange-200/80 leading-relaxed font-medium">Deberás enviar tu <strong>ubicación actual por Google Maps</strong> vía WhatsApp.</p>
                            <p className="text-[10px] text-orange-400/80 italic pt-1 flex items-center gap-1.5">
                                <AlertCircle className="w-3 h-3" />
                                Nota: El delivery tiene un costo adicional calculado según la zona.
                            </p>
                        </div>
                    </div>

                    <div className="pt-4 flex gap-3">
                        <button
                            type="button"
                            onClick={onClose}
                            className="flex-1 px-4 py-3.5 rounded-xl text-xs font-black uppercase tracking-widest text-slate-400 hover:bg-white/5 transition-all"
                        >
                            Cancelar
                        </button>
                        <button
                            type="submit"
                            className="flex-1 bg-primary text-white px-4 py-3.5 rounded-xl text-xs font-black uppercase tracking-widest shadow-[0_8px_16px_rgba(157,51,247,0.3)] flex items-center justify-center gap-2 hover:bg-primary-dark transition-all active:scale-95"
                        >
                            Confirmar Envío
                            <Send className="w-3.5 h-3.5" />
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
