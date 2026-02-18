import Link from 'next/link';
import { ShieldCheck, Truck, Clock, AlertCircle } from 'lucide-react';

export default function Policies() {
    return (
        <div className="pt-32 pb-16 px-6 max-w-4xl mx-auto">
            <h1 className="text-4xl font-black text-background-dark mb-2">Políticas de Compra</h1>
            <p className="text-slate-500 mb-12">
                Por favor, lee detenidamente nuestras condiciones para asegurar una experiencia transparente y feliz.
            </p>

            <div className="space-y-12">
                {/* General Policies */}
                <section className="bg-white p-8 rounded-3xl shadow-sm border border-primary/5">
                    <div className="flex items-center gap-4 mb-6">
                        <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center text-primary">
                            <ShieldCheck className="w-6 h-6" />
                        </div>
                        <h2 className="text-2xl font-bold text-background-dark">Condiciones Generales</h2>
                    </div>
                    <ul className="space-y-4 text-slate-600 list-disc pl-5 marker:text-primary">
                        <li>
                            <strong className="text-background-dark">Cambios y Devoluciones:</strong> No realizamos devoluciones de dinero. No se realizan cambios de mercancía.
                        </li>
                        <li>
                            <strong className="text-background-dark">Defectos de Fábrica:</strong> Si el producto tiene defecto, se puede sustituir por otro igual. Debes informarlo máximo a los <span className="font-bold text-primary">2 días posteriores</span> a la recepción.
                        </li>
                        <li>
                            <strong className="text-background-dark">Reservas:</strong> Para apartar un pedido debes cancelar la totalidad del mismo.
                        </li>
                        <li>
                            <strong className="text-background-dark">Precios al Mayor:</strong> Aplican al llevar la cantidad mínima del mismo producto indicada en el catálogo.
                        </li>
                        <li>
                            <strong className="text-background-dark">Disponibilidad:</strong> En nuestro catálogo de WhatsApp se indica cómo se vende cada producto (tonos variados, uno de cada tono) y su disponibilidad. Verifica esto para agilizar tu compra.
                        </li>
                        <li>
                            <strong className="text-background-dark">Atención:</strong> Los mensajes son respondidos por orden de llegada. No atendemos llamadas telefónicas, sin excepción.
                        </li>
                    </ul>
                </section>

                {/* Delivery Policies */}
                <section className="bg-white p-8 rounded-3xl shadow-sm border border-primary/5">
                    <div className="flex items-center gap-4 mb-6">
                        <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center text-primary">
                            <Clock className="w-6 h-6" />
                        </div>
                        <h2 className="text-2xl font-bold text-background-dark">Delivery (Valencia)</h2>
                    </div>
                    <ul className="space-y-4 text-slate-600 list-disc pl-5 marker:text-primary">
                        <li>Debes enviar tu ubicación exacta por Google Maps para cotizar el servicio.</li>
                        <li>
                            <strong className="text-background-dark">Ubicación GPS:</strong> No debes moverte del punto enviado. De ser así, el delivery tendrá un costo adicional.
                        </li>
                        <li>
                            <strong className="text-background-dark">Tiempos:</strong> Si hay lluvia, el servicio puede demorar más. Agradecemos tu paciencia.
                        </li>
                        <li>Al cancelar, confirma el pago enviando el capture o foto de los billetes (no aceptamos billetes en mal estado).</li>
                    </ul>
                </section>

                {/* Shipping Policies */}
                <section className="bg-white p-8 rounded-3xl shadow-sm border border-primary/5">
                    <div className="flex items-center gap-4 mb-6">
                        <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center text-primary">
                            <Truck className="w-6 h-6" />
                        </div>
                        <h2 className="text-2xl font-bold text-background-dark">Envíos Nacionales</h2>
                    </div>
                    <ul className="space-y-4 text-slate-600 list-disc pl-5 marker:text-primary">
                        <li>Trabajamos con <strong>MRW y Zoom</strong> con cobro a destino.</li>
                        <li>Los envíos se realizan en un lapso de <strong>3 días hábiles</strong> (Lunes a Viernes).</li>
                        <li>Monto mínimo de compra para envíos: <strong>Ref. $20.00</strong>.</li>
                        <li>
                            <strong className="text-background-dark">Datos Requeridos:</strong>
                            <ul className="pl-5 mt-2 space-y-2 list-none text-sm bg-slate-50 p-4 rounded-xl">
                                <li>• Nombre Completo</li>
                                <li>• Cédula</li>
                                <li>• Teléfono</li>
                                <li>• Correo Electrónico</li>
                                <li>• Dirección de Oficina (Estado, Ciudad, Municipio, Agencia)</li>
                            </ul>
                        </li>
                    </ul>
                </section>

                <div className="bg-primary/5 p-6 rounded-2xl flex gap-4 items-start text-sm text-primary/80">
                    <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
                    <p>
                        <strong>Nota Importante:</strong> Al realizar el pago de cualquier pedido, asumimos que has leído y aceptado todas nuestras políticas de compra, envío y garantía.
                    </p>
                </div>

            </div>
        </div>
    );
}
