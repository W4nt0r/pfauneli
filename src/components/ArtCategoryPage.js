'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

import { useLanguage } from '@/context/LanguageContext';

function SideDetail({ side, src, scrollY }) {
    const isLeft = side === 'left';

    return (
        <div
            className={`pointer-events-none absolute top-0 bottom-0 z-0 overflow-hidden ${
                isLeft ? 'left-1 sm:left-2' : 'right-1 sm:right-2'
            } w-[26px] sm:w-[44px] md:w-[56px] lg:w-[64px]`}
        >
            <div
                className="absolute left-0 w-full h-[300%] bg-repeat-y bg-top"
                style={{
                    top: '-100%',
                    backgroundImage: `url(${src})`,
                    backgroundSize: '100% auto',
                    transformOrigin: 'center',
                }}
            />
        </div>
    );
}

function ArtworkGrid({ artworks }) {
    const { language } = useLanguage();

    const getText = (value) => {
        if (!value) return '';

        if (typeof value === 'string') {
            return value;
        }

        return value[language] || value.en || value.cz || '';
    };

    return (
        <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-2">
            {artworks.map((artwork) => (
                <Link
                    key={artwork.slug}
                    href={artwork.href || `/product/${artwork.slug}`}
                    className="group block overflow-hidden"
                    aria-label={getText(artwork.title)}
                >
                    <article className="relative aspect-square overflow-hidden">
                        <Image
                            src={`/images/artworks/${artwork.slug}/small.webp`}
                            alt={getText(artwork.title)}
                            fill
                            className="
                                object-cover
                                object-center
                                scale-250
                                transition-transform
                                duration-700
                                group-hover:scale-135
                            "
                        />
                    </article>
                </Link>
            ))}
        </div>
    );
}

export default function ArtCategoryPage({
    title,
    description,
    artworks,
    titleSrcLight,
    titleSrcDark,
}) {
    const [dark, setDark] = useState(false);
    const [scrollY, setScrollY] = useState(0);
    const { language } = useLanguage();

    useEffect(() => {
        const checkTheme = () => {
            setDark(document.documentElement.classList.contains('dark-theme'));
        };

        checkTheme();

        const observer = new MutationObserver(checkTheme);
        observer.observe(document.documentElement, { attributes: true });

        const handleScroll = () => setScrollY(window.scrollY);
        window.addEventListener('scroll', handleScroll, { passive: true });

        return () => {
            observer.disconnect();
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const detailSrc = dark
        ? '/images/details/categoryDetailL.svg'
        : '/images/details/categoryDetailD.svg';

    const titleSrc = dark
        ? titleSrcDark
        : titleSrcLight;

    return (
        <main className="relative min-h-screen overflow-hidden bg-white transition-colors duration-500">
            <SideDetail side="left" src={detailSrc} scrollY={scrollY} />
            <SideDetail side="right" src={detailSrc} scrollY={scrollY} />

            <section className="relative z-10 mx-auto min-h-screen bg-white w-[calc(100%-70px)] sm:w-[calc(100%-110px)] md:w-[calc(100%-145px)] lg:w-[calc(100%-170px)] max-w-6xl px-4 py-12 sm:px-8 md:px-12">
                <div className="mx-auto max-w-3xl text-center">
                    <div className="flex items-center justify-center">
                        <Image
                            src={titleSrc}
                            alt={title}
                            width={900}
                            height={300}
                            priority
                            className="h-auto w-full max-w-[220px] sm:max-w-[300px] md:max-w-[380px] object-contain object-center"
                        />
                    </div>

                    <p className="mt-6 text-base leading-relaxed text-neutral-800 sm:text-lg">
                        {description}
                    </p>
                </div>

                <div className="my-10 h-[2px] w-full bg-[var(--foreground)]" />

                {
                    artworks.length == 0 && 
                    <p className="text-center">{language === 'cz' ? 
                        <Link href="/contact" className="hover:underline">Kontaktujte nás</Link> 
                        : 
                        <Link href="/contact" className="hover:underline">Contact us</Link>}
                    </p>
                }
                
                {
                    artworks.length > 0 && <ArtworkGrid artworks={artworks} />
                }
            </section>
        </main>
    );
}