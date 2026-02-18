import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Catálogo | Loyafu - Glow Up Essentials',
    description: 'Explora nuestra colección completa de maquillaje, skincare y accesorios. Marcas premium como Salome, Dolce Bella, Ushas y más. Envío a toda Venezuela.',
    openGraph: {
        title: 'Catálogo | Loyafu',
        description: 'Productos premium de cuidado personal y belleza.',
    },
};

export default function CatalogLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
