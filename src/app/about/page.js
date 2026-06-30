'use client';

import { useLanguage } from '@/context/LanguageContext';

export default function AboutPage() {
    const { language } = useLanguage();

    const text = {
        cz: {
            title: 'O nás',
            paragraphs: [
                'Pfauneli je tvůrčí kolektiv na pomezí umění, hry a zážitku.',
                'Vytváříme díla, která vznikají z napětí a harmonie mezi materiály, hrou světla a struktur. Každé dílo představuje jedinečný svět emocí.',
                'Naše díla nemají končit jen u pohledu. Mají se prožívat. Proto do nich vkládáme hádanky, hlavolamy a skryté vrstvy, čímž chceme aktivně zapojit diváka a vytvořit prostor pro vlastní interpretaci.',
                'Život je hrou, umění je umět si hrát. Tak hrajme.',
            ],
        },
        en: {
            title: 'About us',
            paragraphs: [
                'Pfauneli is a creative collective on the border of art, play and experience.',
                'We create works that arise from the tension and harmony between materials, play of light and structures. Each painting represents a unique world of emotions.',
                'Our works are not meant to end with just a look. They are meant to be experienced. That is why we insert puzzles, brain teasers and hidden layers into them, in order to actively involve the viewer and create space for interpretation and interaction between them and us.',
                'In the future, we want to create together with the community. You can expect an evironment where you will participate in co-decisions about themes, materials and the color spectrum and become part of the creation itself.',
                "Life is a game, art is knowing how to play. So let's play",
            ],
        },
    };

    const content = text[language] || text.cz;

    return (
        <main className="min-h-screen bg-white px-6 py-16 text-black">
            <section className="mx-auto max-w-3xl border border-black/20 p-8 shadow-sm">
                <h1 className="mb-6 text-4xl font-light tracking-wide">
                    {content.title}
                </h1>

                <div className="space-y-5 text-neutral-700 leading-relaxed">
                    {content.paragraphs.map((paragraph) => (
                        <p key={paragraph}>{paragraph}</p>
                    ))}
                </div>
            </section>
        </main>
    );
}