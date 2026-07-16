'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { useLanguage } from '@/context/LanguageContext';
import { getLocalized } from '@/lib/getLocalized';

import { Cormorant_Garamond } from 'next/font/google';

export const cormorant = Cormorant_Garamond({
    subsets: ['latin'],
    weight: ['300', '400', '500', '600', '700'],
});

function InfoTooltip({ text }) {
    const [open, setOpen] = useState(false);
    const [position, setPosition] = useState({
        left: 0,
        top: 0,
        placement: 'bottom',
    });

    const buttonRef = useRef(null);
    const tooltipWidth = 224; // Tailwind w-56
    const viewportPadding = 12;
    const tooltipGap = 8;

    const updatePosition = () => {
        if (!buttonRef.current) return;

        const rect = buttonRef.current.getBoundingClientRect();

        // Start centered underneath the info icon.
        let left = rect.left + rect.width / 2 - tooltipWidth / 2;

        // Keep the tooltip inside the viewport horizontally.
        left = Math.max(
            viewportPadding,
            Math.min(left, window.innerWidth - tooltipWidth - viewportPadding)
        );

        // Show above the icon if there is not enough room underneath.
        const estimatedTooltipHeight = 130;
        const spaceBelow = window.innerHeight - rect.bottom;
        const placement =
            spaceBelow < estimatedTooltipHeight + tooltipGap
                ? 'top'
                : 'bottom';

        const top =
            placement === 'bottom'
                ? rect.bottom + tooltipGap
                : rect.top - tooltipGap;

        setPosition({
            left,
            top,
            placement,
        });
    };

    const showTooltip = () => {
        updatePosition();
        setOpen(true);
    };

    const hideTooltip = () => {
        setOpen(false);
    };

    useEffect(() => {
        if (!open) return;

        const handlePositionChange = () => updatePosition();

        window.addEventListener('resize', handlePositionChange);
        window.addEventListener('scroll', handlePositionChange, true);

        return () => {
            window.removeEventListener('resize', handlePositionChange);
            window.removeEventListener('scroll', handlePositionChange, true);
        };
    }, [open]);

    return (
        <span
            className="relative ml-1 inline-flex align-middle"
            onMouseEnter={showTooltip}
            onMouseLeave={hideTooltip}
        >
            <button
                ref={buttonRef}
                type="button"
                onClick={() => {
                    if (open) {
                        hideTooltip();
                    } else {
                        showTooltip();
                    }
                }}
                onBlur={hideTooltip}
                className="flex h-4 w-4 cursor-help items-center justify-center rounded-full border border-black text-[10px] leading-none"
                aria-label="Show information"
                aria-expanded={open}
            >
                i
            </button>

            <span
                className={`fixed z-50 w-56 border border-black bg-white p-3 text-xs font-normal leading-relaxed text-black shadow-lg transition-opacity duration-200 ${
                    open
                        ? 'pointer-events-auto opacity-100'
                        : 'pointer-events-none opacity-0'
                }`}
                style={{
                    left: `${position.left}px`,
                    top: `${position.top}px`,
                    transform:
                        position.placement === 'top'
                            ? 'translateY(-100%)'
                            : 'none',
                }}
                role="tooltip"
            >
                {text}
            </span>
        </span>
    );
}

export default function ArtworkDetail({
    title,
    imageMedium,
    imageFull,
    description,
    detailsText,
    year,
    dimensions,
    medium,
    available,
    price,
    details = [],
    hasArtworkThemeSwitch = false,
    artworkImages = null,
}) {
    const { language } = useLanguage();
    const [artworkMode, setArtworkMode] = useState('light');

    const [dark, setDark] = useState(false);

    useEffect(() => {
        const checkTheme = () => {
            setDark(document.documentElement.classList.contains('dark-theme'));
        };

        checkTheme();

        const observer = new MutationObserver(checkTheme);
        observer.observe(document.documentElement, { attributes: true });

        return () => observer.disconnect();
    }, []);

    const [orderOpen, setOrderOpen] = useState(false);
    const [orderLoading, setOrderLoading] = useState(false);
    const [orderSuccess, setOrderSuccess] = useState(false);
    const [orderError, setOrderError] = useState('');
    const [orderForm, setOrderForm] = useState({
        name: '',
        surname: '',
        email: '',
        phone: '',
    });

    const localizedTitle = getLocalized(title, language, title);
    const localizedDescription = getLocalized(description, language);
    const localizedDetailsText = getLocalized(detailsText, language);
    const localizedMedium = getLocalized(medium, language);
    const localizedDimensions = getLocalized(dimensions, language);

    const localizedDetails = getLocalized({ cz: 'Detaily', en: 'Details' }, language);
    const localizedOpenInFullResolution = getLocalized({ cz: 'Otevřít v plném rozlišení', en: 'Open in full resolution' }, language);
    const localizedLight = getLocalized({ cz: 'Světlý', en: 'Light' }, language);
    const localizedDark = getLocalized({ cz: 'Tmavý', en: 'Dark' }, language);
    const localizedBack = getLocalized({ cz: 'Zpět', en: 'Back' }, language);
    const localizedDimensionsHeader = getLocalized({ cz: 'Rozměry', en: 'Dimensions' }, language);
    const localizedYear = getLocalized({ cz: 'Rok', en: 'Year' }, language);
    const localizedMediumHeader = getLocalized({ cz: 'Materiál', en: 'Medium' }, language);
    const localizedAvailable = getLocalized({ cz: 'Dostupnost', en: 'Availability' }, language);
    const localizedPrice = getLocalized({ cz: 'Cena', en: 'Price' }, language);

    useEffect(() => {
        document.title = `${localizedTitle} | PFAUNELI`;
    }, [localizedTitle]);

    const selectedMainImage =
        hasArtworkThemeSwitch && artworkImages
            ? artworkImages[artworkMode]
            : imageMedium;

    const selectedFullImage =
        hasArtworkThemeSwitch && artworkImages
            ? artworkImages[artworkMode]
            : imageFull;

    const submitOrder = async (event) => {
        event.preventDefault();

        setOrderLoading(true);
        setOrderError('');

        try {
            const response = await fetch('https://api.ika-map.com/pfauneli/order', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    ...orderForm,
                    artworkTitle: localizedTitle,
                }),
            });

            const data = await response.json();

            if (!response.ok || !data.success) {
                throw new Error(data.message || 'Failed to send order');
            }

            setOrderSuccess(true);
            setOrderForm({
                name: '',
                surname: '',
                email: '',
                phone: '',
            });
        } catch (error) {
            setOrderError(
                language === 'cz'
                    ? 'Objednávku se nepodařilo odeslat. Zkuste to prosím později.'
                    : 'Failed to send order request. Please try again later.'
            );
        } finally {
            setOrderLoading(false);
        }
    };

    return (
        <main className="min-h-screen bg-white px-6 py-10 text-black">
            <button
                onClick={() => window.history.back()}
                className="mb-8 inline-block hover:underline"
            >
                ← {localizedBack}
            </button>

            <section className="grid grid-cols-1 gap-10 lg:grid-cols-2">
                <div>
                    <div className="flex justify-center">
                        <Image
                            src={selectedMainImage}
                            alt={localizedTitle}
                            width={1600}
                            height={2000}
                            priority
                            sizes="(max-width: 1024px) 100vw, 50vw"
                            className="h-auto max-h-[85vh] w-auto transition-opacity duration-500"
                        />
                    </div>

                    {hasArtworkThemeSwitch && artworkImages && (
                        <div className="mt-4 flex justify-center gap-3">
                            <button
                                onClick={() => setArtworkMode('light')}
                                className={`border px-4 py-2 transition-colors ${
                                    artworkMode === 'light'
                                        ? 'bg-black text-white'
                                        : 'bg-white text-black hover:bg-neutral-100'
                                }`}
                            >
                                {localizedLight}
                            </button>

                            <button
                                onClick={() => setArtworkMode('dark')}
                                className={`border px-4 py-2 transition-colors ${
                                    artworkMode === 'dark'
                                        ? 'bg-black text-white'
                                        : 'bg-white text-black hover:bg-neutral-100'
                                }`}
                            >
                                {localizedDark}
                            </button>
                        </div>
                    )}
                </div>

                <div className="lg:sticky lg:top-24">

                    <h1 className="mb-6 text-4xl font-semibold">
                        {localizedTitle}
                    </h1>
                    {localizedDescription && (
                        <p className="mb-8 leading-relaxed">
                            {localizedDescription && localizedDescription.text && localizedDescription.text.map((paragraph, index) => (
                                <span key={index}>
                                    {paragraph}
                                    {index !== localizedDescription.text.length - 1 && <br />}
                                    {index === localizedDescription.text.length - 1 &&
                                        localizedDescription.info &&
                                        InfoTooltip({ text: localizedDescription.info })}
                                </span>
                            ))}
                        </p>
                    )}

                    <div className="space-y-2 text-sm">
                        {localizedDimensions && localizedDimensions.value && (
                            <p>
                                <strong>{localizedDimensionsHeader}: </strong> {localizedDimensions.value}
                                {localizedDimensions.info && <InfoTooltip text={localizedDimensions.info} />}
                            </p>
                        )}

                        {medium && localizedMedium && (
                            <p>
                                <strong>{localizedMediumHeader}:</strong> {localizedMedium.value} 
                                {localizedMedium.info && <InfoTooltip text={localizedMedium.info} />}
                            </p>
                        )}

                        {/* {typeof available === 'boolean' && (
                            <p>
                                <strong>{localizedAvailable}:</strong>{' '}
                                {available
                                    ? getLocalized({ cz: 'Dostupný', en: 'Available' }, language)
                                    : getLocalized({ cz: 'Nedostupný', en: 'Not available' }, language)}
                            </p>
                        )} */}

                        {price && (
                            <p>
                                <strong>{localizedPrice}: </strong> {price.value}
                                {price.info && <InfoTooltip text={getLocalized(price.info, language)}/>}
                            </p>
                        )}

                        {/* {year && (
                            <p>
                                <strong>{localizedYear}:</strong> {year}
                            </p>
                        )} */}
                    </div>

                    {available && (
                        <button
                            onClick={() => {
                                setOrderOpen(true);
                                setOrderSuccess(false);
                                setOrderError('');
                            }}
                            className="mt-8 block border border-black px-5 py-2 transition-colors hover:bg-black hover:text-white"
                        >
                            {language === 'cz' ? 'Objednat' : 'Order'}
                        </button>
                    )}
                    {!available && (
                        <button
                            className="mt-8 block border border-black px-5 py-2 transition-colors hover:bg-black hover:text-white"
                        >
                            {language === 'cz' ? 'Prodané' : 'Sold'}
                        </button>
                    )}

                    {selectedFullImage && (
                        <a
                            href={selectedFullImage}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="mt-8 inline-block border border-black px-5 py-2 transition-colors hover:bg-black hover:text-white"
                        >
                            {localizedOpenInFullResolution}
                        </a>
                    )}
                </div>
            </section>

            {(localizedDetailsText || details.length > 0) && (
                <section className="mt-20">
                    <h2 className="mb-6 text-center text-3xl font-semibold">
                        {localizedDetails}
                    </h2>

                    {localizedDetailsText && (
                        <p className="mx-auto mb-10 max-w-3xl text-center leading-relaxed">
                            {localizedDetailsText}
                        </p>
                    )}

                    {details.length > 0 && (
                        <div className="mx-auto flex max-w-[1800px] flex-wrap justify-center gap-6">
                            {details.map((detail, index) => (
                                <div
                                    key={detail}
                                    className="w-full overflow-hidden md:w-[calc(50%-12px)] xl:w-[calc(33.333%-16px)]"
                                >
                                    <Image
                                        src={detail}
                                        alt={`${localizedTitle} detail ${index + 1}`}
                                        width={1200}
                                        height={1200}
                                        loading="lazy"
                                        sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
                                        className="h-auto w-full transition-transform duration-500 hover:scale-[1.02]"
                                    />
                                </div>
                            ))}
                        </div>
                    )}
                </section>
            )}

            {orderOpen && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4 backdrop-blur-sm"
                    onClick={() => {
                        setOrderOpen(false);
                        setOrderSuccess(false);
                        setOrderError('');
                    }}
                >
                    <div
                        className="relative w-full max-w-md p-8 text-[var(--foreground)] shadow-2xl bg-[var(--background)]"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <button
                            onClick={() => {
                                setOrderOpen(false);
                                setOrderSuccess(false);
                                setOrderError('');
                            }}
                            className="absolute right-5 top-4 text-3xl font-light cursor-pointer"
                        >
                            {
                                dark ? 
                                    <Image 
                                        src={"/images/logo/logoL.svg"} 
                                        alt="Close" 
                                        width={30} 
                                        height={30} 
                                        className="mr-2" />
                                    :
                                    <Image 
                                        src={"/images/logoFull.svg"} 
                                        alt="Close" 
                                        width={30} 
                                        height={30} 
                                        className="mr-2" />
                            }
                        </button>

                        <h2 className="mb-6 text-2xl font-semibold">
                            {language === 'cz' ? 
                                dark ?
                                    <Image 
                                        src={"/images/order/orderL-cz.svg"} 
                                        alt="Artwork order" 
                                        width={200} 
                                        height={200} 
                                        className="mr-2" />
                                    :
                                    <Image 
                                        src={"/images/order/orderD-cz.svg"} 
                                        alt="Artwork order" 
                                        width={200} 
                                        height={200} 
                                        className="mr-2" />
                            : 
                                dark ?
                                    <Image 
                                        src={"/images/order/orderL-en.svg"} 
                                        alt="Artwork order" 
                                        width={200}
                                        height={200}
                                        className="mr-2" />
                                    :
                                    <Image 
                                        src={"/images/order/orderD-en.svg"} 
                                        alt="Artwork order" 
                                        width={200}
                                        height={200}
                                        className="mr-2" />
                            }
                        </h2>

                        {orderSuccess ? (
                            <div className="space-y-4">
                                <p className="text-green-700">
                                    {language === 'cz'
                                        ? 'Žádost byla úspěšně odeslána. Potvrzení bylo zasláno na váš email.'
                                        : 'Your request was sent successfully. Confirmation was sent to your email.'}
                                </p>

                                <button
                                    onClick={() => setOrderOpen(false)}
                                    className="w-full border border-black px-5 py-2 transition-colors hover:bg-black hover:text-white"
                                >
                                    OK
                                </button>
                            </div>
                        ) : (
                            <form onSubmit={submitOrder} className="space-y-4">
                                <input
                                    type="text"
                                    required
                                    placeholder={language === 'cz' ? 'Jméno' : 'Name'}
                                    value={orderForm.name}
                                    onChange={(e) =>
                                        setOrderForm({ ...orderForm, name: e.target.value })
                                    }
                                    className="w-full border border-black px-4 py-2 rounded-md"
                                />

                                <input
                                    type="text"
                                    required
                                    placeholder={language === 'cz' ? 'Příjmení' : 'Surname'}
                                    value={orderForm.surname}
                                    onChange={(e) =>
                                        setOrderForm({ ...orderForm, surname: e.target.value })
                                    }
                                    className="w-full border border-black px-4 py-2 rounded-md"
                                />

                                <input
                                    type="email"
                                    required
                                    placeholder="Email"
                                    value={orderForm.email}
                                    onChange={(e) =>
                                        setOrderForm({ ...orderForm, email: e.target.value })
                                    }
                                    className="w-full border border-black px-4 py-2 rounded-md"
                                />

                                <input
                                    type="tel"
                                    required
                                    placeholder={language === 'cz' ? 'Telefon' : 'Phone'}
                                    value={orderForm.phone}
                                    onChange={(e) =>
                                        setOrderForm({ ...orderForm, phone: e.target.value })
                                    }
                                    className="w-full border border-black px-4 py-2 rounded-md"
                                />

                                {orderError && (
                                    <p className="text-sm text-red-600">{orderError}</p>
                                )}

                                <button
                                    type="submit"
                                    disabled={orderLoading}
                                    className="w-full border border-black px-5 py-2 transition-colors disabled:cursor-not-allowed disabled:opacity-50 "
                                >
                                    {orderLoading
                                        ? language === 'cz'
                                            ? 'Odesílání...'
                                            : 'Sending...'
                                        : 
                                        dark ? 
                                            <Image
                                                src="/images/order/okL.svg"
                                                alt="OK"
                                                width={36}
                                                height={36}
                                                className="mx-auto"
                                            />
                                        :
                                            <Image
                                                src="/images/order/okD.svg"
                                                alt="OK"
                                                width={36}
                                                height={36}
                                                className="mx-auto"
                                            />
                                    }
                                </button>
                            </form>
                        )}
                    </div>
                </div>
            )}
        </main>
    );
}