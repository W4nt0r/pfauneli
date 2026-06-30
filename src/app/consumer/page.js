'use client';

import ArtCategoryPage from '@/components/ArtCategoryPage';
import { useLanguage } from '@/context/LanguageContext';
import artworks from '@/data/consumer.json';

export default function ConsumerPage() {
    const { t } = useLanguage();

    return (
        <ArtCategoryPage
            title={t.pages.consumer.title}
            description={t.pages.consumer.description}
            artworks={artworks}
            titleSrcLight="/images/headlines/consumerD.svg"
            titleSrcDark="/images/headlines/consumerL.svg"
        />
    );
}