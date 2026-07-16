'use client';

import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

import { useLanguage } from '@/context/LanguageContext';
import { getLocalized } from '@/lib/getLocalized';

function CardVisual({
    labelSrc,
    ornamentSrc,
    descriptionSrc,
    bgColor,
    fgColor,
    hoverable = false,
    alt = '',
}) {
    return (
        <div
            className="relative h-full w-full overflow-hidden border-[3px] transition-colors duration-500"
            style={{
                backgroundColor: bgColor,
                borderColor: fgColor,
            }}
        >
            <div className="grid h-full items-center grid-cols-[55px_minmax(0,1fr)_55px] sm:grid-cols-[75px_minmax(0,1fr)_75px] md:grid-cols-[92px_minmax(0,1fr)_92px]">
                <div className="relative h-full">
                    <Image
                        src={ornamentSrc}
                        alt=""
                        fill
                        className="pointer-events-none object-cover object-right scale-x-[-1]"
                        priority
                    />
                </div>

                <div className="relative z-10 flex h-full items-center justify-center px-4 sm:px-6 md:px-8">
                    <div
                        className={`relative flex w-full flex-col items-center justify-center transition-transform duration-300 ${
                            hoverable ? 'group-hover:scale-110' : ''
                        }`}
                    >
                        <div className="flex w-full justify-center">
                            <Image
                                src={labelSrc}
                                alt={alt}
                                width={900}
                                height={300}
                                priority
                                className="pointer-events-none h-auto w-full max-w-[260px] sm:max-w-[320px] md:max-w-[360px] lg:max-w-[420px] object-contain"
                            />
                        </div>

                        {descriptionSrc && (
                            <div className="flex w-full items-center justify-center">
                                <Image
                                    src={descriptionSrc}
                                    alt={`${alt} description`}
                                    width={410}
                                    height={37}
                                    priority
                                    className="
                                        pointer-events-none
                                        absolute
                                        top-1/2
                                        mt-8
                                        h-[18px]
                                        w-auto
                                        max-w-full
                                        object-contain
                                        sm:h-[10px]
                                        md:h-[18px]
                                        lg:h-[20px]
                                    "
                                />
                            </div>
                        )}
                    </div>
                </div>

                <div className="relative h-full">
                    <Image
                        src={ornamentSrc}
                        alt=""
                        fill
                        className="pointer-events-none object-cover object-left"
                        priority
                    />
                </div>
            </div>
        </div>
    );
}

export default function HomePage() {
    const cardRefs = useRef([]);
    const [dark, setDark] = useState(false);
    const [activeCard, setActiveCard] = useState(null);
    const router = useRouter();

    const { language } = useLanguage();

    useEffect(() => {
        const checkTheme = () => {
            setDark(document.documentElement.classList.contains('dark-theme'));
        };

        checkTheme();

        const observer = new MutationObserver(checkTheme);
        observer.observe(document.documentElement, { attributes: true });

        return () => observer.disconnect();
    }, []);

    const minDelay = 700;

    const handleCardClick = (e, href, index) => {
        e.preventDefault();

        const cardEl = cardRefs.current[index];
        if (!cardEl) return;

        const rect = cardEl.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const radius = Math.max(
            Math.hypot(x, y),
            Math.hypot(rect.width - x, y),
            Math.hypot(x, rect.height - y),
            Math.hypot(rect.width - x, rect.height - y)
        );

        setActiveCard({
            index,
            x,
            y,
            radius,
        });

        setTimeout(() => {
            router.push(href);
        }, minDelay);
    };

    const cards = [
        {
            key: 'consumer',
            href: '/consumer',
            labelLight: '/images/headlines/consumerL.svg',
            labelDark: '/images/headlines/consumerD.svg',
            descriptions: {
                en: {
                    light: '/images/headlines/consumer_L_en.svg',
                    dark: '/images/headlines/consumer_D_en.svg'
                },
                cz: {
                    light: '/images/headlines/consumer_L_cz.svg',
                    dark: '/images/headlines/consumer_D_cz.svg'
                }
            }
        },
        {
            key: 'storytell',
            href: '/storytell',
            labelLight: '/images/headlines/storytellL.svg',
            labelDark: '/images/headlines/storytellD.svg',
            descriptions: {
                en: {
                    light: '/images/headlines/storytell_L_en.svg',
                    dark: '/images/headlines/storytell_D_en.svg'
                },
                cz: {
                    light: '/images/headlines/storytell_L_cz.svg',
                    dark: '/images/headlines/storytell_D_cz.svg'
                }
            }
        },
        {
            key: 'custom',
            href: '/custom',
            labelLight: '/images/headlines/customL.svg',
            labelDark: '/images/headlines/customD.svg',
            descriptions: {
                en: {
                    light: '/images/headlines/custom_L_en.svg',
                    dark: '/images/headlines/custom_D_en.svg'
                },
                cz: {
                    light: '/images/headlines/custom_L_cz.svg',
                    dark: '/images/headlines/custom_D_cz.svg'
                }
            }
        },
    ];

    const normalOrnamentSrc = dark
        ? '/images/details/headlineDetailL.svg'
        : '/images/details/headlineDetailD.svg';

    const invertedOrnamentSrc = dark
        ? '/images/details/headlineDetailD.svg'
        : '/images/details/headlineDetailL.svg';

    const normalBg = 'var(--background)';
    const normalFg = 'var(--foreground)';

    const invertedBg = 'var(--invertedBackground)';
    const invertedFg = 'var(--invertedForeground)';

    return (
        <div className="h-full w-full">
            <div className="grid h-full w-full grid-cols-1 gap-0 lg:grid-cols-3">
                {cards.map((c, index) => {
                    const isActive = activeCard?.index === index;
                    const baseLabelSrc = dark ? c.labelLight : c.labelDark;
                    const invertedLabelSrc = dark ? c.labelDark : c.labelLight;

                    const localizedDescription = getLocalized(c.descriptions, language);
                    const descriptionSrc = dark
                        ? localizedDescription?.light
                        : localizedDescription?.dark;

                    const invertedDescriptionSrc = dark
                        ? localizedDescription?.dark
                        : localizedDescription?.light;

                    return (
                        <button
                            key={c.key}
                            onClick={(e) => handleCardClick(e, c.href, index)}
                            className="group block h-full w-full text-left"
                        >
                            <div
                                ref={(el) => {
                                    cardRefs.current[index] = el;
                                }}
                                className="relative h-full w-full overflow-hidden"
                            >
                                <CardVisual
                                    labelSrc={baseLabelSrc}
                                    alt={c.key}
                                    ornamentSrc={normalOrnamentSrc}
                                    descriptionSrc={descriptionSrc}
                                    bgColor={normalBg}
                                    fgColor={normalFg}
                                    hoverable={!isActive}
                                />

                                <div
                                    className="pointer-events-none absolute inset-0 z-20"
                                    style={{
                                        clipPath: isActive
                                            ? `circle(${activeCard.radius}px at ${activeCard.x}px ${activeCard.y}px)`
                                            : 'circle(0px at 50% 50%)',
                                        transition: 'clip-path 700ms ease-out',
                                    }}
                                >
                                    <CardVisual
                                        labelSrc={invertedLabelSrc}
                                        alt={c.key}
                                        ornamentSrc={invertedOrnamentSrc}
                                        descriptionSrc={invertedDescriptionSrc}
                                        bgColor={invertedBg}
                                        fgColor={invertedFg}
                                        hoverable={false}
                                    />
                                </div>
                            </div>
                        </button>
                    );
                })}
            </div>
        </div>
    );
}