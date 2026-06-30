'use client';

import { useLanguage } from '@/context/LanguageContext';

export default function ContactPage() {
    const { language } = useLanguage();

    const text = {
        cz: {
            title: 'Kontakt',
            description: 'V případě zájmu o dílo nebo spolupráci nás můžete kontaktovat zde:',
            name: 'Jméno',
            email: 'Email',
            phone: 'Telefon',
        },
        en: {
            title: 'Contact',
            description: 'For artwork inquiries or collaboration, you can contact us here:',
            name: 'Name',
            email: 'Email',
            phone: 'Phone',
        },
    };

    const content = text[language] || text.cz;

    return (
        <main className="min-h-screen bg-white px-6 py-16 text-black">
            <section className="mx-auto max-w-3xl border border-black/20 p-8 shadow-sm">
                <h1 className="mb-6 text-4xl font-light tracking-wide">
                    {content.title}
                </h1>

                <p className="mb-10 leading-relaxed text-neutral-700">
                    {content.description}
                </p>

                <div className="space-y-5 text-lg">
                    <p>
                        <span className="block text-sm uppercase tracking-[0.2em] text-neutral-500">
                            {content.name}
                        </span>
                        PFAUNELI
                    </p>

                    <p>
                        <span className="block text-sm uppercase tracking-[0.2em] text-neutral-500">
                            {content.email}
                        </span>
                        <a href="mailto:info@pfauneli.cz" className="hover:underline">
                            info@pfauneli.cz
                        </a>
                    </p>

                    <p>
                        <span className="block text-sm uppercase tracking-[0.2em] text-neutral-500">
                            {content.phone}
                        </span>
                        <a href="tel:+420608909549" className="hover:underline">
                            +420 608 909 549
                        </a>
                    </p>
                </div>
            </section>
        </main>
    );
}