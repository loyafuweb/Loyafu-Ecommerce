'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Instagram } from 'lucide-react';

interface InstagramMedia {
    id: string;
    caption: string;
    media_type: 'IMAGE' | 'VIDEO' | 'CAROUSEL_ALBUM';
    media_url: string;
    thumbnail_url?: string;
    permalink: string;
}

const MOCK_FEED = [
    {
        id: 'mock-1',
        media_type: 'IMAGE',
        media_url: 'https://images.unsplash.com/photo-1552693673-1bf958298935?auto=format&fit=crop&q=80&w=1000',
        permalink: 'https://instagram.com',
        caption: 'Glow up with our new collection! ✨ #loyafu #skincare',
    },
    {
        id: 'mock-2',
        media_type: 'IMAGE',
        media_url: 'https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?auto=format&fit=crop&q=80&w=1000',
        permalink: 'https://instagram.com',
        caption: 'Self care sunday vibes 🧖‍♀️',
    },
    {
        id: 'mock-3',
        media_type: 'IMAGE',
        media_url: 'https://images.unsplash.com/photo-1596462502278-27bfdd403348?auto=format&fit=crop&q=80&w=1000',
        permalink: 'https://instagram.com',
        caption: 'Texture tuesday 💧',
    },
    {
        id: 'mock-4',
        media_type: 'IMAGE',
        media_url: 'https://images.unsplash.com/photo-1515688594390-b649af70d282?auto=format&fit=crop&q=80&w=1000',
        permalink: 'https://instagram.com',
        caption: 'Join the community! Link in bio.',
    }
];

export default function InstagramFeed() {
    const [posts, setPosts] = useState<any[]>(MOCK_FEED);

    useEffect(() => {
        const fetchInstagramParams = async () => {
            const token = process.env.NEXT_PUBLIC_INSTAGRAM_TOKEN;
            if (!token) return;

            try {
                // Determine if it's a basic display API or Graph API 
                // For simple user media, Basic Display API is clearer but requires periodic refreshment.
                // Assuming basic long-lived token from user.
                const res = await fetch(`https://graph.instagram.com/me/media?fields=id,caption,media_type,media_url,thumbnail_url,permalink&access_token=${token}`);
                if (!res.ok) throw new Error('Failed to fetch from Instagram');

                const data = await res.json();

                if (data.data) {
                    const filtered = data.data
                        .slice(0, 4);
                    setPosts(filtered);
                }
            } catch (error) {
                console.error("Instagram fetch error:", error);
            }
        };

        fetchInstagramParams();
    }, []);

    return (
        <section className="bg-brand-pattern bg-cover bg-center py-24 px-6 relative after:absolute after:inset-0 after:bg-white/90 after:backdrop-blur-[2px]">
            <div className="max-w-7xl mx-auto relative z-10">
                <div className="text-center mb-16 space-y-4">
                    <h2 className="text-4xl md:text-5xl font-black tracking-tight text-background-dark font-brand uppercase">VIRAL EN REDES</h2>
                    <p className="text-background-dark/60 max-w-lg mx-auto font-medium">
                        Etiquétanos <Link href="https://www.instagram.com/loyafu.ve/" target="_blank" className="font-bold text-primary hover:underline">@loyafu.ve</Link> para aparecer en el Glow Feed.
                    </p>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {posts.map((post, index) => (
                        <Link
                            key={post.id}
                            href={post.permalink}
                            target="_blank"
                            className={`aspect-[9/16] rounded-xl overflow-hidden relative group block bg-slate-100 ${index % 2 !== 0 ? 'md:translate-y-8' : ''}`}
                        >
                            <Image
                                src={post.media_type === 'VIDEO' ? (post.thumbnail_url || post.media_url) : post.media_url}
                                fill
                                className="object-cover transition-transform duration-700 group-hover:scale-110"
                                alt={post.caption ? post.caption.slice(0, 30) : 'Instagram Post'}
                                unoptimized
                            />

                            {/* Overlay */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-6 flex flex-col justify-end">
                                <div className="bg-white/10 backdrop-blur-md p-2 rounded-full w-fit mb-2">
                                    <Instagram className="w-5 h-5 text-white" />
                                </div>
                                <p className="text-white text-xs font-bold line-clamp-2 leading-relaxed">
                                    {post.caption || 'Ver en Instagram'}
                                </p>
                            </div>

                            {/* Video Indicator */}
                            {post.media_type === 'VIDEO' && (
                                <div className="absolute top-3 right-3 bg-black/50 p-2 rounded-full backdrop-blur-sm">
                                    <div className="w-0 h-0 border-t-[4px] border-t-transparent border-l-[6px] border-l-white border-b-[4px] border-b-transparent ml-0.5" />
                                </div>
                            )}
                        </Link>
                    ))}
                </div>

                <div className="mt-20 text-center">
                    <Link
                        href="https://www.instagram.com/loyafu.ve/"
                        target="_blank"
                        className="inline-flex items-center gap-2 px-8 py-3 bg-background-dark text-white rounded-full font-bold hover:bg-primary transition-colors duration-300 shadow-xl shadow-primary/10 hover:shadow-primary/30"
                    >
                        <Instagram className="w-5 h-5" />
                        Seguir en Instagram
                    </Link>
                </div>
            </div>
        </section>
    );
}
