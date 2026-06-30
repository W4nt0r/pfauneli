import { useEffect, useState } from 'react';
import Image from 'next/image';

export default function LoadingScreen({ fade = false, onFinish }) {
    const [step, setStep] = useState(0);
    const [shouldPulse, setShouldPulse] = useState(false);

    const revealTime = 1000;

    useEffect(() => {
        const timers = [
            setTimeout(() => setStep(1), 500),
            setTimeout(() => setStep(2), 1600),
            setTimeout(() => setStep(3), 3000),
            setTimeout(() => setStep(4), 3700),
            setTimeout(() => setStep(5), 4900),
            setTimeout(() => {
                setStep(6);
                setShouldPulse(true);
            }, 5600),
        ];

        return () => timers.forEach(clearTimeout);
    }, []);

    useEffect(() => {
        if (fade && step >= 6) {
            setShouldPulse(false);

            const fadeOutTimer = setTimeout(() => {
                if (onFinish) onFinish();
            }, 700);

            return () => clearTimeout(fadeOutTimer);
        }
    }, [fade, step, onFinish]);

    const canFade = fade && step >= 6;

    return (
        <div
            className={`fixed inset-0 z-50 flex items-center justify-center bg-white transition-opacity duration-700 ${
                canFade ? 'pointer-events-none opacity-0' : 'opacity-100'
            }`}
        >
            <div
                className={`relative h-[22rem] w-[22rem] sm:h-[28rem] sm:w-[28rem] md:h-[34rem] md:w-[34rem] ${
                    shouldPulse ? 'animate-pulse' : ''
                }`}
            >
                {/* LOGO GROUP */}
                <div
                    className={`absolute inset-0 transition-opacity duration-700 ${
                        step >= 3 ? 'opacity-0' : 'opacity-100'
                    }`}
                >
                    <div
                        className="absolute inset-0 overflow-hidden"
                        style={{
                            clipPath:
                                step >= 1
                                    ? 'inset(0 0 0 0)'
                                    : 'inset(0 0 100% 0)',
                            transition: `clip-path ${revealTime}ms ease-out`,
                        }}
                    >
                        <Image
                            src="/images/logoLine.svg"
                            alt="Logo line"
                            fill
                            className="object-contain"
                            priority
                        />
                    </div>

                    <div
                        className="absolute inset-0 overflow-hidden"
                        style={{
                            clipPath:
                                step >= 2
                                    ? 'inset(0 0 0 0)'
                                    : 'inset(100% 0 0 0)',
                            transition: `clip-path ${revealTime}ms ease-out`,
                        }}
                    >
                        <Image
                            src="/images/logoFull.svg"
                            alt="Logo full"
                            fill
                            className="object-contain"
                            priority
                        />
                    </div>
                </div>

                {/* ARTGROUP GROUP */}
                <div
                    className={`absolute inset-0 transition-opacity duration-700 ${
                        step >= 3 ? 'opacity-100' : 'opacity-0'
                    }`}
                >
                    <div
                        className="absolute inset-0 overflow-hidden"
                        style={{
                            clipPath:
                                step >= 4
                                    ? 'inset(0 0 0 0)'
                                    : 'inset(0 0 100% 0)',
                            transition: `clip-path ${revealTime}ms ease-out`,
                        }}
                    >
                        <Image
                            src="/images/loading/artGroupLine.svg"
                            alt="Art group line"
                            fill
                            className="object-contain"
                            priority
                        />
                    </div>

                    <div
                        className="absolute inset-0 overflow-hidden"
                        style={{
                            clipPath:
                                step >= 5
                                    ? 'inset(0 0 0 0)'
                                    : 'inset(100% 0 0 0)',
                            transition: `clip-path ${revealTime}ms ease-out`,
                        }}
                    >
                        <Image
                            src="/images/loading/artGroupFull.svg"
                            alt="Art group full"
                            fill
                            className="object-contain"
                            priority
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}