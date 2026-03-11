import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Mi Carrito | Loyafu',
    description: 'Revisa y completa tu pedido. Envío nacional disponible desde $20. Pago por WhatsApp.',
};

export default function CartLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
