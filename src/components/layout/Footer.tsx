import Link from 'next/link';
import Image from 'next/image';
import { Sparkles, Globe, Instagram, MessageCircle, Banknote, Smartphone } from 'lucide-react';

export default function Footer() {
    return (
        <footer className="bg-white border-t border-primary/5 py-16 mt-24">
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
                <div className="grid grid-cols-2 md:grid-cols-5 gap-12">
                    {/* Brand Column */}
                    <div className="col-span-2 space-y-6">
                        <div className="relative w-20 h-20 mb-2 transition-transform hover:scale-105 opacity-90 hover:opacity-100">
                            <Image
                                src="/assets/brand/logo-footer.png"
                                alt="Loyafu"
                                fill
                                className="object-contain object-left"
                            />
                        </div>
                        <p className="text-primary/60 text-sm font-bold leading-relaxed mb-8 max-w-xs">
                            Potenciando tu viaje de belleza con productos que celebran quién eres, ahora mismo.
                        </p>
                        <div className="flex gap-4">
                            <button className="w-10 h-10 rounded-full bg-primary/5 text-primary flex items-center justify-center hover:bg-primary hover:text-white transition-all">
                                <Globe className="w-4 h-4" />
                            </button>
                            <Link
                                href="https://www.instagram.com/loyafu.ve/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-10 h-10 rounded-full bg-primary/5 text-primary flex items-center justify-center hover:bg-primary hover:text-white transition-all"
                            >
                                <Instagram className="w-4 h-4" />
                            </Link>
                            <Link
                                href="https://wa.me/584244096534"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-10 h-10 rounded-full bg-primary/5 text-primary flex items-center justify-center hover:bg-primary hover:text-white transition-all"
                            >
                                <MessageCircle className="w-4 h-4" />
                            </Link>
                        </div>
                    </div>

                    {/* Links Columns */}
                    <div>
                        <h4 className="font-black text-xs uppercase tracking-[0.2em] text-background-dark mb-6">Tienda</h4>
                        <ul className="space-y-4 text-sm font-bold text-primary/60">
                            <li><Link href="/catalog" className="hover:text-primary transition-colors">Cuidado de Piel</Link></li>
                            <li><Link href="/catalog" className="hover:text-primary transition-colors">Cuidado Corporal</Link></li>
                            <li><Link href="/catalog" className="hover:text-primary transition-colors">Kits</Link></li>
                            <li><Link href="/catalog" className="hover:text-primary transition-colors">Más Vendidos</Link></li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="font-black text-xs uppercase tracking-[0.2em] text-background-dark mb-6">Nosotros</h4>
                        <ul className="space-y-4 text-sm font-bold text-primary/60">
                            <li><Link href="/faq" className="hover:text-primary transition-colors">Preguntas Frecuentes</Link></li>
                            <li><Link href="https://www.instagram.com/loyafu.ve/" target="_blank" className="hover:text-primary transition-colors">Instagram</Link></li>
                            <li><Link href="https://wa.me/584244096534" target="_blank" className="hover:text-primary transition-colors">Contacto WhatsApp</Link></li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="font-black text-xs uppercase tracking-[0.2em] text-background-dark mb-6">Ayuda</h4>
                        <ul className="space-y-4 text-sm font-bold text-primary/60">
                            <li><Link href="/policies" className="hover:text-primary transition-colors">Envíos</Link></li>
                            <li><Link href="/policies" className="hover:text-primary transition-colors">Devoluciones</Link></li>
                            <li><Link href="#" className="hover:text-primary transition-colors">Contacto</Link></li>
                            <li><Link href="/faq" className="hover:text-primary transition-colors">Preguntas Frecuentes</Link></li>
                        </ul>
                    </div>
                </div>

                <div className="mt-16 pt-8 border-t border-primary/10 flex flex-col md:flex-row justify-between items-center gap-6 text-[10px] font-black uppercase tracking-widest text-primary/30">
                    <p>© {new Date().getFullYear()} LOYAFU BEAUTY. TODOS LOS DERECHOS RESERVADOS.</p>

                    {/* Payment Methods */}
                    <div className="flex gap-4 items-center opacity-70">
                        <span className="hidden md:block">Aceptamos:</span>
                        <div className="flex gap-2">
                            <div className="px-3 py-1.5 bg-primary/5 rounded border border-primary/10 text-primary flex items-center gap-2">
                                <Banknote className="w-3 h-3" />
                                <span>Efectivo</span>
                            </div>
                            <div className="px-3 py-1.5 bg-primary/5 rounded border border-primary/10 text-primary flex items-center gap-2">
                                <Smartphone className="w-3 h-3" />
                                <span>Pago Móvil</span>
                            </div>
                            <div className="px-3 py-1.5 bg-primary/5 rounded border border-primary/10 text-primary flex items-center gap-2">
                                <span className="text-[9px]">Z</span>
                                <span>Zelle</span>
                            </div>
                        </div>
                    </div>

                    <div className="flex gap-8">
                        <Link href="/policies" className="hover:text-primary">Privacidad</Link>
                        <Link href="/policies" className="hover:text-primary">Términos</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
