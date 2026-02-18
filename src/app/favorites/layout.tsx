import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Mis Favoritos | Loyafu',
    description: 'Tu lista de productos favoritos. Guarda tus productos preferidos y encuéntralos fácilmente.',
};

export default function FavoritesLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
