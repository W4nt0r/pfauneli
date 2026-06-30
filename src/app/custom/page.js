'use client';

import ArtCategoryPage from '@/components/ArtCategoryPage';
import { useLanguage } from '@/context/LanguageContext';
import artworks from '@/data/custom.json';

export default function CustomPage() {
    
    const { t } = useLanguage();

    return (
        <ArtCategoryPage
            title={t.pages.custom.title}
            description={t.pages.custom.description}
            artworks={artworks}
            titleSrcLight="/images/headlines/customD.svg"
            titleSrcDark="/images/headlines/customL.svg"
        />
    );
}