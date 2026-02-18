import Link from 'next/link';
import { HelpCircle, Clock, MapPin, DollarSign, MessageCircle } from 'lucide-react';

export default function FAQ() {
    return (
        <div className="pt-32 pb-16 px-6 max-w-4xl mx-auto">
            <h1 className="text-4xl font-black text-background-dark mb-2">Preguntas Frecuentes</h1>
            <p className="text-slate-500 mb-12">
                Resolvemos tus dudas más comunes al instante.
            </p>

            <div className="grid md:grid-cols-2 gap-8">
                {/* Horarios */}
                <div className="bg-white p-8 rounded-3xl shadow-sm border border-primary/5 hover:border-primary/20 transition-all">
                    <div className="flex items-center gap-4 mb-4">
                        <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center text-primary">
                            <Clock className="w-5 h-5" />
                        </div>
                        <h3 className="text-xl font-bold text-background-dark">Horario de Atención</h3>
                    </div>
                    <p className="text-slate-600">
                        <strong>Lunes a Viernes:</strong> 10:00am - 4:00pm<br />
                        <strong>Sábados:</strong> 11:00am - 4:00pm<br />
                        <span className="text-xs text-slate-400 mt-2 block">(Online y Tienda Física)</span>
                    </p>
                </div>

                {/* Ubicación */}
                <div className="bg-white p-8 rounded-3xl shadow-sm border border-primary/5 hover:border-primary/20 transition-all">
                    <div className="flex items-center gap-4 mb-4">
                        <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center text-primary">
                            <MapPin className="w-5 h-5" />
                        </div>
                        <h3 className="text-xl font-bold text-background-dark">Ubicación</h3>
                    </div>
                    <p className="text-slate-600">
                        Estamos ubicados en Valencia, Estado Carabobo. Realizamos entregas personales (Delivery) en la ciudad y envíos nacionales.
                    </p>
                </div>

                {/* Pagos */}
                <div className="bg-white p-8 rounded-3xl shadow-sm border border-primary/5 hover:border-primary/20 transition-all">
                    <div className="flex items-center gap-4 mb-4">
                        <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center text-primary">
                            <DollarSign className="w-5 h-5" />
                        </div>
                        <h3 className="text-xl font-bold text-background-dark">Métodos de Pago</h3>
                    </div>
                    <ul className="space-y-2 text-slate-600">
                        <li>• <strong>Divisas</strong> (Efectivo y Zelle)</li>
                        <li>• <strong>Pago Móvil</strong> (Tasa BCV del día)</li>
                    </ul>
                </div>

                {/* Catálogo */}
                <div className="bg-white p-8 rounded-3xl shadow-sm border border-primary/5 hover:border-primary/20 transition-all">
                    <div className="flex items-center gap-4 mb-4">
                        <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center text-primary">
                            <MessageCircle className="w-5 h-5" />
                        </div>
                        <h3 className="text-xl font-bold text-background-dark">¿Cómo comprar?</h3>
                    </div>
                    <p className="text-slate-600 mb-4">
                        Puedes armar tu pedido aquí en la web o consultar nuestro catálogo en WhatsApp donde indicamos disponibilidad de tonos y combos.
                    </p>
                    <Link href="/items" className="text-primary font-bold hover:underline">
                        Ir a la Tienda &rarr;
                    </Link>
                </div>
            </div>

            <div className="mt-16 bg-primary/5 rounded-3xl p-8 text-center">
                <h3 className="text-2xl font-bold text-background-dark mb-4">¿Aún tienes dudas?</h3>
                <p className="text-slate-500 mb-8 max-w-lg mx-auto">
                    Si no encontraste la respuesta que buscabas, escríbenos a nuestro WhatsApp y te atenderemos con gusto.
                </p>
                <a
                    href="https://wa.me/584244096534"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 bg-primary text-white px-8 py-3 rounded-full font-bold shadow-lg shadow-primary/20 hover:scale-105 transition-transform"
                >
                    <MessageCircle className="w-5 h-5" /> Contactar Soporte
                </a>
            </div>
        </div>
    );
}
