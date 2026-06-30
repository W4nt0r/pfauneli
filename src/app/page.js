'use client';

import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

function CardVisual({
    labelSrc,
    ornamentSrc,
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
                        className={`relative flex w-full items-center justify-center transition-transform duration-300 ${
                            hoverable ? 'group-hover:scale-110' : ''
                        }`}
                    >
                        <Image
                            src={labelSrc}
                            alt={alt}
                            width={900}
                            height={300}
                            priority
                            className="pointer-events-none h-auto w-full max-w-[260px] sm:max-w-[320px] md:max-w-[360px] lg:max-w-[420px] max-h-[28%] object-contain"
                        />
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
        },
        {
            key: 'storytell',
            href: '/storytell',
            labelLight: '/images/headlines/storytellL.svg',
            labelDark: '/images/headlines/storytellD.svg',
        },
        {
            key: 'custom',
            href: '/custom',
            labelLight: '/images/headlines/customL.svg',
            labelDark: '/images/headlines/customD.svg',
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