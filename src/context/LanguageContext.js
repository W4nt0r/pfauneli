'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { translations } from '@/i18n/translations';

const LanguageContext = createContext();

export function LanguageProvider({ children }) {
    const [language, setLanguage] = useState('cz');

    useEffect(() => {
        const saved = localStorage.getItem('language');

        if (saved === 'cz' || saved === 'en') {
            setLanguage(saved);
        }
    }, []);

    const changeLanguage = (newLanguage) => {
        setLanguage(newLanguage);
        localStorage.setItem('language', newLanguage);
    };

    return (
        <LanguageContext.Provider
            value={{
                language,
                setLanguage: changeLanguage,
                t: translations[language],
            }}
        >
            {children}
        </LanguageContext.Provider>
    );
}

export function useLanguage() {
    return useContext(LanguageContext);
}