'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useLanguage } from '@/context/LanguageContext';
import { useAuth } from '@/context/AuthContext';
import AuthModal from '@/components/AuthModal';

export default function Navbar() {
    const [dark, setDark] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);

    const { language, setLanguage, t } = useLanguage();

    const { user, logout } = useAuth();
    const [authOpen, setAuthOpen] = useState(false);
    const [authMode, setAuthMode] = useState('login');

    useEffect(() => {
        const checkTheme = () => {
            setDark(document.documentElement.classList.contains('dark-theme'));
        };

        checkTheme();

        const observer = new MutationObserver(checkTheme);
        observer.observe(document.documentElement, { attributes: true });

        return () => observer.disconnect();
    }, []);

    useEffect(() => {
        const root = document.documentElement;

        if (dark) {
            root.classList.add('dark-theme');
            localStorage.setItem('theme', 'dark');
        } else {
            root.classList.remove('dark-theme');
            localStorage.setItem('theme', 'light');
        }
    }, [dark]);

    const themeButtonSrc = dark
        ? '/images/logo/logoL.svg'
        : '/images/logoFull.svg';

    const centerLogoSrc = dark
        ? '/images/logo/pfauneliL.svg'
        : '/images/logo.png';

    return (
        <>
            <nav className="relative flex items-center border-b bg-[var(--background)] py-4 transition-colors duration-500">
                <div className="z-20 flex w-[70px] items-center justify-center sm:w-[90px] md:w-[105px]">
                    <button
                        onClick={() => setDark(!dark)}
                        className="cursor-pointer"
                        aria-label="Toggle theme"
                    >
                        <Image
                            src={themeButtonSrc}
                            width={35}
                            height={80}
                            alt="Change theme"
                            className="pointer-events-none h-[44px] w-auto transition-transform duration-200 hover:scale-110 active:scale-95 sm:h-[56px] md:h-[70px]"
                        />
                    </button>
                </div>

                <div className="absolute left-1/2 -translate-x-1/2">
                    <Link href="/">
                        <Image
                            src={centerLogoSrc}
                            alt="PFAUNELI Logo"
                            width={320}
                            height={200}
                            priority
                            className="pointer-events-none"
                        />
                    </Link>
                </div>

                <div className="z-20 ml-auto flex w-[70px] items-center justify-center sm:w-[90px] md:w-[105px]">
                    <button
                        onClick={() => setMenuOpen(true)}
                        className="flex flex-col gap-1.5 p-2"
                        aria-label="Open menu"
                    >
                        <span className="h-[2px] w-7 bg-[var(--foreground)]" />
                        <span className="h-[2px] w-7 bg-[var(--foreground)]" />
                        <span className="h-[2px] w-7 bg-[var(--foreground)]" />
                    </button>
                </div>
            </nav>

            <div
                className={`fixed inset-0 z-40 bg-black/30 backdrop-blur-sm transition-opacity duration-300 ${
                    menuOpen
                        ? 'pointer-events-auto opacity-100'
                        : 'pointer-events-none opacity-0'
                }`}
                onClick={() => setMenuOpen(false)}
            />

            <aside
                className={`fixed right-0 top-0 z-50 h-screen w-[85vw] max-w-sm bg-[var(--background)] px-8 py-8 shadow-2xl transition-transform duration-500 ease-out ${
                    menuOpen ? 'translate-x-0' : 'translate-x-full'
                }`}
            >
                <button
                    onClick={() => setMenuOpen(false)}
                    className="absolute right-7 top-6 text-4xl font-light text-[var(--foreground)]"
                    aria-label="Close menu"
                >
                    ×
                </button>

                <div className="mt-24 flex flex-col gap-8">
                    <Link
                        href="/about"
                        onClick={() => setMenuOpen(false)}
                        className="text-3xl font-light tracking-[0.2em] text-[var(--foreground)]"
                    >
                        {t.nav.about}
                    </Link>

                    <Link
                        href="/contact"
                        onClick={() => setMenuOpen(false)}
                        className="text-3xl font-light tracking-[0.2em] text-[var(--foreground)]"
                    >
                        {t.nav.contact}
                    </Link>

                    <div className="my-2 h-px w-full bg-[var(--foreground)] opacity-40" />

                    <div className="flex items-center gap-4 text-[var(--foreground)]">
                        <span className="text-xl">🇨🇿</span>

                        <button
                            onClick={() => setLanguage(language === 'cz' ? 'en' : 'cz')}
                            className="relative h-7 w-14 rounded-full border border-[var(--foreground)] bg-[var(--background)] px-[2px] transition-colors duration-300"
                            aria-label="Change language"
                        >
                            <span
                                className={`absolute left-[3px] top-1/2 h-5 w-5 -translate-y-1/2 rounded-full bg-[var(--foreground)] transition-transform duration-300 ease-in-out ${
                                    language === 'en'
                                        ? 'translate-x-7'
                                        : 'translate-x-0'
                                }`}
                            />
                        </button>

                        <span className="text-xl">🇬🇧</span>
                    </div>
                </div>
                <AuthModal
                    open={authOpen}
                    mode={authMode}
                    onClose={() => setAuthOpen(false)}
                />
                <div className="my-2 h-px w-full bg-[var(--foreground)] opacity-40" />

                    {user ? (
                        <div className="flex flex-col gap-3 text-[var(--foreground)]">
                            <p className="text-sm opacity-70">
                                {language === 'cz' ? 'Přihlášen jako' : 'Logged in as'}
                            </p>

                            <p className="break-all text-lg">
                                {user.name || user.email}
                            </p>

                            <button
                                onClick={async () => {
                                    await logout();
                                    setMenuOpen(true);
                                }}
                                className="mt-2 border border-[var(--foreground)] px-4 py-2 transition-colors hover:bg-[var(--foreground)] hover:text-[var(--background)]"
                            >
                                {language === 'cz' ? 'Odhlásit' : 'Logout'}
                            </button>
                        </div>
                    ) : (
                        <div className="flex flex-col gap-3">
                            <button
                                onClick={() => {
                                    setAuthMode('login');
                                    setAuthOpen(true);
                                    setMenuOpen(true);
                                }}
                                className="border border-[var(--foreground)] px-4 py-2 transition-colors hover:bg-[var(--foreground)] hover:text-[var(--background)]"
                            >
                                {language === 'cz' ? 'Přihlásit' : 'Login'}
                            </button>

                            <button
                                onClick={() => {
                                    setAuthMode('register');
                                    setAuthOpen(true);
                                    setMenuOpen(true);
                                }}
                                className="border border-[var(--foreground)] px-4 py-2 transition-colors hover:bg-[var(--foreground)] hover:text-[var(--background)]"
                            >
                                {language === 'cz' ? 'Registrovat' : 'Register'}
                            </button>
                        </div>
                    )}
            </aside>
        </>
    );
}