"use client";

export default function ProductCardSkeleton() {
    return (
        <div className="bg-white rounded-2xl p-4 shadow-xl shadow-primary/5 border border-transparent animate-pulse">
            {/* Image skeleton */}
            <div className="aspect-[4/5] rounded-xl bg-gray-200 mb-4" />

            <div className="space-y-2">
                {/* Stars */}
                <div className="flex gap-1">
                    {[...Array(5)].map((_, i) => (
                        <div key={i} className="w-3 h-3 bg-gray-200 rounded-full" />
                    ))}
                </div>

                {/* Title */}
                <div className="h-5 bg-gray-200 rounded-full w-3/4" />

                {/* Category */}
                <div className="h-4 bg-gray-100 rounded-full w-1/3" />

                {/* Description */}
                <div className="h-3 bg-gray-100 rounded-full w-full" />
                <div className="h-3 bg-gray-100 rounded-full w-2/3" />

                {/* Price */}
                <div className="pt-2">
                    <div className="h-6 bg-primary/10 rounded-full w-1/3" />
                </div>
            </div>
        </div>
    );
}
