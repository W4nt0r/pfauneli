'use client';

import terms from '@/data/tac.json';

import { useLanguage } from '@/context/LanguageContext';
import { getLocalized } from '@/lib/getLocalized';

export default function TermsPage() {

    const { language } = useLanguage();

    const localizedTerms = getLocalized(terms, language);

    const localizedContents = getLocalized({
        cz: "Obsah",
        en: "Contents"
    }, language);

    return (
        <main className="min-h-screen bg-white px-6 py-16 text-black">
            <section className="mx-auto max-w-4xl border border-black/20 p-8 shadow-sm">

                <div className="space-y-6 leading-relaxed text-neutral-700 mx-auto text-center">

                    {localizedTerms && localizedTerms.title && (

                        <h1 className="mb-8 text-4xl font-light tracking-wide">
                            {localizedTerms.title}
                        </h1>
                    )}

                    {localizedTerms && localizedTerms.description && localizedTerms.description.map((paragraph, index) => (
                            <p
                                key={index}
                                className="mb-4 leading-relaxed text-neutral-700"
                            >
                                {paragraph}
                            </p>
                        ))
                    }
                
                </div>
                
                <div className="my-10 rounded-lg border border-neutral-200 bg-neutral-50 p-6">
                    <h2 className="mb-4 text-2xl font-semibold text-black">
                        {localizedContents}
                    </h2>

                    <ol className="list-decimal space-y-2 pl-6">
                        {localizedTerms.sections.map((section, index) => (
                            <li key={index}>
                                <a
                                    href={`#section-${index + 1}`}
                                    className="transition-colors hover:text-neutral-500"
                                >
                                    {section.title}
                                </a>
                            </li>
                        ))}
                    </ol>
                </div>

                <div className="space-y-6 leading-relaxed text-neutral-700 mx-auto text-left">

                    {localizedTerms && localizedTerms.sections && (
                        <div>
                            {localizedTerms.sections.map((section, index) => (
                                <section
                                    id={`section-${index + 1}`}
                                    key={index}
                                    className="mb-10 scroll-mt-24"
                                >
                                    <h2 className="mb-2 text-xl font-semibold text-black">
                                        {index + 1}. {section.title}
                                    </h2>

                                    {section.subsections && section.subsections.map((paragraph, paragraphIndex) => (
                                        <div key={paragraphIndex}>
                                            {paragraph.list?.length > 0 && (
                                                <div>
                                                    <b>
                                                        <span className="font-semibold">
                                                            {index + 1}.{paragraphIndex + 1}.
                                                        </span>{" "}
                                                        {paragraph.text}
                                                    </b>
                                                    <ol
                                                        type="a"
                                                        className="list-[lower-alpha] ml-8 mt-2 space-y-1"
                                                    >
                                                        {paragraph.list.map((item, itemIndex) => (
                                                            <li key={itemIndex}>{item}</li>
                                                        ))}
                                                    </ol>
                                                </div>
                                            )}
                                            {!paragraph.list && paragraph.text && (
                                                <p className="mb-4 leading-relaxed text-neutral-700">
                                                    <span className="font-semibold">
                                                        {index + 1}.{paragraphIndex + 1}.
                                                    </span>{" "}
                                                    {paragraph.text}
                                                </p>
                                            )}
                                        </div>
                                    ))}

                                </section>
                            ))}
                        </div>

                    )}
                </div>
            </section>
        </main>
    );
}