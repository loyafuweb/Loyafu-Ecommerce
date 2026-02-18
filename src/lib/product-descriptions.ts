import { Product } from "@/store/useCartStore";

const CATEGORY_DESCRIPTIONS: Record<string, string> = {
    'Salome Makeup': 'Maquillaje de alta calidad con acabados profesionales y larga duración.',
    'Dolce Bella': 'Cosméticos innovadores que resaltan tu belleza natural con fórmulas suaves.',
    'Importado': 'Selección exclusiva de las mejores marcas internacionales para ti.',
    'Aria Cosmetics': 'Descubre la magia del color con productos diseñados para impactar.',
    'Ushas': 'Tendencias virales y colores vibrantes para expresar tu estilo único.',
    'Brochas': 'Herramientas de precisión para un maquillaje impecable y difuminado perfecto.',
    'Cuidado Del Cabello': 'Tratamientos intensivos para restaurar, nutrir y embellecer tu cabello.',
    'Otros': 'Accesorios y complementos esenciales para perfeccionar tu rutina de belleza.',
    'Bolsas de boutique': 'Presentación elegante y profesional para tus productos.',
    'Combos': 'Paquetes completos seleccionados para maximizar tu inversión y belleza.'
};

const KEYWORD_DESCRIPTIONS: Record<string, string> = {
    'polvo': 'Acabado mate y aterciopelado que controla el brillo durante todo el día.',
    'base': 'Cobertura construible que unifica el tono y disimula imperfecciones.',
    'labial': 'Color intenso y confort para unos labios irresistibles.',
    'rimel': 'Volumen y longitud extremos para una mirada impactante.',
    'mascara': 'Volumen y longitud extremos para una mirada impactante.',
    'corrector': 'Cubre ojeras e imperfecciones con un acabado natural y luminoso.',
    'rubor': 'Un toque de color saludable para iluminar tus mejillas.',
    'iluminador': 'Resalta tus facciones con un brillo radiante y natural.',
    'delineador': 'Precisión absoluta para definir tu mirada con trazos perfectos.',
    'sombra': 'Pigmentación intensa y fácil difuminado para crear looks infinitos.',
    'brocha': 'Cerdas suaves y diseño ergonómico para una aplicación profesional.',
    'keratina': 'Alisado y restauración profunda para un cabello sedoso y manejable.',
    'mascarilla': 'Hidratación intensiva que revitaliza y repara el daño.',
    'shampoo': 'Limpieza suave que protege y fortalece tu cabello.',
    'bolsa': 'Empaque resistente y estético, ideal para regalos o ventas.',
};

export function getProductDescription(product: Product): string {
    // If the product already has a meaningful description (more than just price info), use it.
    // Many current descriptions start with "Mayor: $..." or "Precio único...".
    // We want to APPEND to this or PREPEND a generic description if it's just pricing.

    // Check if description exists
    const hasDescription = !!product.description;
    const isPricingOnly = hasDescription && (product.description!.toLowerCase().includes('mayor:') || product.description!.toLowerCase().includes('precio'));

    let genericDesc = '';

    // match by keyword in name first (more specific)
    const nameLower = product.name.toLowerCase();
    for (const [keyword, desc] of Object.entries(KEYWORD_DESCRIPTIONS)) {
        if (nameLower.includes(keyword)) {
            genericDesc = desc;
            break;
        }
    }

    // if no keyword match, use category description
    if (!genericDesc) {
        genericDesc = CATEGORY_DESCRIPTIONS[product.category] || 'Producto de excelente calidad para tu rutina de belleza.';
    }

    if (!hasDescription) {
        return genericDesc;
    }

    // If it has description but it looks like just pricing/technical info, prepend the generic desc.
    // If it seems like a real description, maybe leave it or append.
    // For now, let's prepend generic description to existing pricing info for richer context.

    // If the current description is very short, definitely add more.
    if (product.description!.length < 50 || isPricingOnly) {
        return `${genericDesc} ${product.description}`;
    }

    return product.description!;
}

export function getWholesalePrice(product: Product): string | null {
    if (!product.description) return null;

    // Regex to match "Mayor: $X.XX" or "Mayor $X.XX" or "Promo: 2 x $5.00"
    // We prioritize "Mayor:" patterns
    const mayorMatch = product.description.match(/Mayor:?\s*\$([0-9.]+)/i);

    if (mayorMatch && mayorMatch[1]) {
        return mayorMatch[1];
    }

    return null;
}
