'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useLanguage } from '@/context/LanguageContext';

export default function AuthModal({ open, mode = 'login', onClose }) {
    const { login, register } = useAuth();
    const { language } = useLanguage();

    const [authMode, setAuthMode] = useState(mode);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const [form, setForm] = useState({
        name: '',
        email: '',
        password: '',
    });

    useEffect(() => {
        if (open) {
            setAuthMode(mode);
            setError('');
        }
    }, [open, mode]);

    if (!open) return null;

    const isLogin = authMode === 'login';

    const submit = async (event) => {
        event.preventDefault();
        setLoading(true);
        setError('');

        try {
            if (isLogin) {
                await login(form.email, form.password);
            } else {
                await register(form.name, form.email, form.password);
            }

            onClose();
        } catch (err) {
            setError(
                language === 'cz'
                    ? 'Přihlášení / registrace se nezdařila.'
                    : 'Login / registration failed.'
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <div
            className="fixed inset-0 z-[80] flex items-center justify-center bg-black/40 px-4 backdrop-blur-sm"
            onClick={onClose}
        >
            <div
                className="relative w-full max-w-md bg-[var(--background)] p-8 text-[var(--foreground)] shadow-2xl"
                onClick={(e) => e.stopPropagation()}
            >
                <button
                    onClick={onClose}
                    className="absolute right-5 top-4 text-3xl font-light"
                >
                    ×
                </button>

                <h2 className="mb-6 text-2xl font-semibold">
                    {isLogin
                        ? language === 'cz'
                            ? 'Přihlášení'
                            : 'Login'
                        : language === 'cz'
                            ? 'Registrace'
                            : 'Register'}
                </h2>

                <form onSubmit={submit} className="space-y-4">
                    {!isLogin && (
                        <input
                            type="text"
                            required
                            placeholder={language === 'cz' ? 'Jméno' : 'Name'}
                            value={form.name}
                            onChange={(e) =>
                                setForm({ ...form, name: e.target.value })
                            }
                            className="w-full rounded-md border border-black px-4 py-2 text-black"
                        />
                    )}

                    <input
                        type="email"
                        required
                        placeholder="Email"
                        value={form.email}
                        onChange={(e) =>
                            setForm({ ...form, email: e.target.value })
                        }
                        className="w-full rounded-md border border-black px-4 py-2 text-black"
                    />

                    <input
                        type="password"
                        required
                        placeholder={language === 'cz' ? 'Heslo' : 'Password'}
                        value={form.password}
                        onChange={(e) =>
                            setForm({ ...form, password: e.target.value })
                        }
                        className="w-full rounded-md border border-black px-4 py-2 text-black"
                    />

                    {error && <p className="text-sm text-red-600">{error}</p>}

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full border border-[var(--foreground)] px-5 py-2 transition-colors hover:bg-[var(--foreground)] hover:text-[var(--background)] disabled:opacity-50"
                    >
                        {loading
                            ? language === 'cz'
                                ? 'Odesílání...'
                                : 'Sending...'
                            : isLogin
                                ? language === 'cz'
                                    ? 'Přihlásit'
                                    : 'Login'
                                : language === 'cz'
                                    ? 'Registrovat'
                                    : 'Register'}
                    </button>
                </form>

                <button
                    onClick={() => {
                        setError('');
                        setAuthMode(isLogin ? 'register' : 'login');
                    }}
                    className="mt-6 text-sm underline"
                >
                    {isLogin
                        ? language === 'cz'
                            ? 'Nemáte účet? Registrovat'
                            : "Don't have an account? Register"
                        : language === 'cz'
                            ? 'Už máte účet? Přihlásit'
                            : 'Already have an account? Login'}
                </button>
            </div>
        </div>
    );
}