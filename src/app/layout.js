import './globals.css';
import ClientLayout from './ClientLayout';

export const metadata = {
    title: {
        default: 'PFAUNELI',
        template: '%s | PFAUNELI',
    },
    description: 'PFAUNELI Art Group',
};

export default function RootLayout({ children }) {
    return (
        <html lang="cs" className="h-full">
            <body className="flex min-h-screen h-full flex-col bg-white font-sans text-black">
                <ClientLayout>
                    {children}
                </ClientLayout>
            </body>
        </html>
    );
}

// 'use client';

// import './globals.css';
// import { useEffect, useState } from 'react';
// import LoadingScreen from '@/components/LoadingScreen';
// import Navbar from '@/components/Navbar';
// import Footer from '@/components/Footer';
// import { LanguageProvider } from '@/context/LanguageContext';

// export default function RootLayout({ children }) {
//     const [showLoader, setShowLoader] = useState(true);
//     const [canFade, setCanFade] = useState(false);

//     useEffect(() => {
//         const hasLoaded = sessionStorage.getItem('hasLoaded');

//         if (hasLoaded) {
//             setShowLoader(false);
//             return;
//         }

//         const showSplashMinTime = 3000;
//         const start = Date.now();

//         const finishLoading = () => {
//             const elapsed = Date.now() - start;
//             const remaining = Math.max(showSplashMinTime - elapsed, 0);

//             setTimeout(() => {
//                 sessionStorage.setItem('hasLoaded', 'true');
//                 setCanFade(true);
//             }, remaining);
//         };

//         if (document.readyState === 'complete') {
//             finishLoading();
//         } else {
//             window.addEventListener('load', finishLoading);
//             return () => window.removeEventListener('load', finishLoading);
//         }
//     }, []);

//     return (
//         <html lang="en" className="h-full">
//             <body className="flex min-h-screen h-full flex-col bg-white font-sans text-black">
//                 <LanguageProvider>
//                     {showLoader && (
//                         <LoadingScreen
//                             onFinish={() => setShowLoader(false)}
//                             fade={canFade}
//                         />
//                     )}

//                     <Navbar />

//                     <main className="flex-1">
//                         {children}
//                     </main>

//                     <Footer />
//                 </LanguageProvider>
//             </body>
//         </html>
//     );
// }