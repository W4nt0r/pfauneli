'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { getLocalized } from '@/lib/getLocalized';

import { useLanguage } from '@/context/LanguageContext';

function SideDetail({ side, src }) {
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

function ArtworkGrid({ artworks, chapterIndex }) {
    const { language } = useLanguage();

    const getText = (value) => {
        if (!value) return '';

        if (typeof value === 'string') {
            return value;
        }

        return value[language] || value.en || value.cz || '';
    };

    return (
        <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
            {artworks.map((artwork, artworkIndex) => {
                const artworkNumber = `${chapterIndex}.${artworkIndex + 1}`;

                return (
                    <Link
                        key={artwork.slug}
                        href={artwork.href || `/product/${artwork.slug}`}
                        className="group block overflow-hidden"
                        aria-label={getText(artwork.title)}
                    >
                        <article className="relative aspect-square overflow-hidden bg-neutral-100">
                            <div
                                className="
                                    pointer-events-none
                                    absolute
                                    inset-0
                                    z-10
                                    flex
                                    items-center
                                    justify-center
                                    text-[7rem]
                                    font-extralight
                                    leading-none
                                    text-white/35
                                    mix-blend-difference
                                    transition-opacity
                                    duration-500
                                    group-hover:opacity-70
                                    sm:text-[9rem]
                                    lg:text-[11rem]
                                "
                            >
                                {artworkNumber}
                            </div>

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
                );
            })}
        </div>
    );
}

export default function StorytellPage({
    title,
    description,
    chapters,
    titleSrcLight,
    titleSrcDark,
}) {
    const [dark, setDark] = useState(false);
    const { language } = useLanguage();

    useEffect(() => {
        const checkTheme = () => {
            setDark(document.documentElement.classList.contains('dark-theme'));
        };

        checkTheme();

        const observer = new MutationObserver(checkTheme);
        observer.observe(document.documentElement, { attributes: true });

        return () => {
            observer.disconnect();
        };
    }, []);

    const getText = (value) => {
        if (!value) return '';

        if (typeof value === 'string') {
            return value;
        }

        return value[language] || value.en || value.cz || '';
    };

    const detailSrc = dark
        ? '/images/details/categoryDetailL.svg'
        : '/images/details/categoryDetailD.svg';

    const titleSrc = dark
        ? titleSrcDark
        : titleSrcLight;

    const localizedChapterDescriptions = getLocalized()

    return (
        <main className="relative min-h-screen overflow-hidden bg-white transition-colors duration-500">
            <SideDetail side="left" src={detailSrc} />
            <SideDetail side="right" src={detailSrc} />

            <section className="relative z-10 mx-auto min-h-screen bg-white w-[calc(100%-70px)] sm:w-[calc(100%-110px)] md:w-[calc(100%-145px)] lg:w-[calc(100%-170px)] max-w-none px-4 py-12 sm:px-8 md:px-12">
                <div className="mx-auto max-w-3xl text-center">
                    <div className="flex items-center justify-center">
                        <Image
                            src={titleSrc}
                            alt={title}
                            width={900}
                            height={300}
                            priority
                            className="h-auto w-full max-w-[220px] object-contain object-center sm:max-w-[300px] md:max-w-[380px]"
                        />
                    </div>

                    <p className="mt-6 text-base leading-relaxed text-neutral-800 sm:text-lg">
                        {description}
                    </p>

                    <div>
                        <Link href="/in-progress" className="hover:underline">
                            {language === 'cz' ? 'Připravujeme' : 'In progress'}
                        </Link>
                    </div>

                </div>

                <div className="my-10 h-[2px] w-full bg-[var(--foreground)]" />

                <div className="space-y-20">
                    {chapters.map((chapter, index) => (
                        <section key={chapter.title?.en || chapter.title?.cz || index}>
                            <div className="mb-10 text-center">
                                <h2 className="text-2xl font-semibold text-black sm:text-3xl">
                                    {getText(chapter.title)}
                                </h2>

                                <div className="mx-auto mt-4 h-[2px] w-48 bg-[var(--foreground)]" />

                                {chapter.description && (
                                    <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-neutral-700">
                                        {getLocalized(chapter.description, language).map((text, index) => (
                                            <span key={index}>{text}<br /></span>
                                        ))}
                                    </p>
                                )}
                            </div>

                            <ArtworkGrid
                                artworks={chapter.artworks || []}
                                chapterIndex={index}
                            />
                        </section>
                    ))}
                </div>
            </section>
        </main>
    );
}