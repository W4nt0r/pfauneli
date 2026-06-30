'use client';

import { useEffect, useState } from 'react';
import { LanguageProvider } from '@/context/LanguageContext';
import LoadingScreen from '@/components/LoadingScreen';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function ClientLayout({ children }) {
    const [showLoader, setShowLoader] = useState(true);
    const [canFade, setCanFade] = useState(false);

    useEffect(() => {
        const hasLoaded = sessionStorage.getItem('hasLoaded');

        if (hasLoaded) {
            setShowLoader(false);
            return;
        }

        const showSplashMinTime = 6200;
        const start = Date.now();

        const finishLoading = () => {
            const elapsed = Date.now() - start;
            const remaining = Math.max(showSplashMinTime - elapsed, 0);

            setTimeout(() => {
                sessionStorage.setItem('hasLoaded', 'true');
                setCanFade(true);
            }, remaining);
        };

        if (document.readyState === 'complete') {
            finishLoading();
        } else {
            window.addEventListener('load', finishLoading);
            return () => window.removeEventListener('load', finishLoading);
        }
    }, []);

    return (
        <LanguageProvider>
            {showLoader && (
                <LoadingScreen
                    fade={canFade}
                    onFinish={() => setShowLoader(false)}
                />
            )}

            <div className="flex min-h-screen flex-col">
                <Navbar />

                <main className="flex-1">
                    {children}
                </main>

                <Footer />
            </div>
        </LanguageProvider>
    );
}