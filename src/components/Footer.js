'use client';

import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';

export default function Footer() {
    const { language } = useLanguage();
    const year = new Date().getFullYear();

    return (
        <footer className="border-t border-black/10 px-6 py-6 text-sm text-white bg-black">
            <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-6 text-center md:grid-cols-3">
                <div className="text-center md:text-left">
                    <p className="text-lg tracking-[0.25em]">PFAUNELI</p>
                    <p className="mt-1 text-neutral-500">
                        © {year} PFAUNELI
                    </p>
                </div>

                <div>
                    <Link href="/in-progress" className="hover:underline">
                        {language === 'cz' ? 'Připravujeme' : 'In progress'}
                    </Link>
                </div>

                <div className="text-center md:text-right">
                    <Link href="/terms" className="hover:underline">
                        {language === 'cz' ? 'Obchodní podmínky' : 'Terms & Conditions'}
                    </Link>
                </div>
            </div>
        </footer>
    );
}