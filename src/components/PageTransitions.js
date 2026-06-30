'use client';

import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function PageTransition({ children }) {
    const pathname = usePathname();
    const [visible, setVisible] = useState(true);

    useEffect(() => {
        setVisible(false);

        const timer = setTimeout(() => {
            setVisible(true);
        }, 50);

        return () => clearTimeout(timer);
    }, [pathname]);

    return (
        <div
            className={`min-h-full w-full transition-opacity duration-700 ease-out ${
                visible ? 'opacity-100' : 'opacity-0'
            }`}
        >
            {children}
        </div>
    );
}