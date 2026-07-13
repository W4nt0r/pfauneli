'use client';

import inProgress from '@/data/in-progress.json';

import { useLanguage } from '@/context/LanguageContext';
import { getLocalized } from '@/lib/getLocalized';

export default function InProgressPage() {
    
    const { language } = useLanguage();

    const localizedInProgress = getLocalized(inProgress, language);

    return (
        <main className="min-h-screen bg-white px-6 py-24 text-black">
            <section className="mx-auto max-w-3xl border border-black/20 p-10 text-center shadow-sm">
                <p className="mb-4 text-sm uppercase tracking-[0.3em] text-neutral-500">
                    PFAUNELI
                </p>

                <h1 className="mb-6 text-4xl font-light tracking-wide">
                    {localizedInProgress.title}
                </h1>

                {localizedInProgress.description && (
                    localizedInProgress.description.map((paragraph, index) => (
                        <p
                            key={index}
                            className="mb-4 leading-relaxed text-neutral-700"
                        >
                            {paragraph}
                        </p>
                    ))
                )}

            </section>
        </main>
    );
}