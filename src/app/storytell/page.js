'use client';

import StorytellPage from '@/components/StorytellPage';
import { useLanguage } from '@/context/LanguageContext';
import chapters from '@/data/storytell.json';

export default function Page() {
    
    const { t } = useLanguage();

    return (
        <StorytellPage
            title="Storytell"
            description={t.pages.storytell.description}
            chapters={chapters}
            titleSrcLight="/images/headlines/storytellD.svg"
            titleSrcDark="/images/headlines/storytellL.svg"
        />
    );
}