import InputError from '@/Components/InputError';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, useForm } from '@inertiajs/react';
import { useState } from 'react';

export default function Login({ status }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: false,
    });

    const [showPassword, setShowPassword] = useState(false);

    const submit = (e) => {
        e.preventDefault();
        post(route('login'), {
            onFinish: () => reset('password'),
        });
    };

    return (
        <GuestLayout>
            <Head title="Login — Dashboard KPI PENS" />

            {/* Glass Card */}
            <div className="bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl p-8 sm:p-10 border border-white/30">

                {/* Logo & Header */}
                <div className="text-center mb-8 animate-slide-up">
                    <div className="flex justify-center mb-4">
                        <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-pens-600 to-pens-700 flex items-center justify-center shadow-lg shadow-pens-500/30">
                            <span className="text-3xl font-extrabold text-gold-400">P</span>
                        </div>
                    </div>
                    <h1 className="text-2xl font-bold text-gray-800">
                        Dashboard <span className="text-pens-500">KPI</span>
                    </h1>
                    <p className="text-sm text-gray-500 mt-1">
                        Politeknik Elektronika Negeri Surabaya
                    </p>
                </div>

                {/* Status Message */}
                {status && (
                    <div className="mb-4 p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-sm font-medium text-emerald-700 text-center animate-fade-in">
                        {status}
                    </div>
                )}

                {/* Form */}
                <form onSubmit={submit} className="space-y-5">
                    {/* Email Field */}
                    <div className="animate-slide-up" style={{ animationDelay: '100ms', animationFillMode: 'both' }}>
                        <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-1.5">
                            Email
                        </label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                                <svg className="w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                                </svg>
                            </div>
                            <input
                                id="email"
                                type="email"
                                name="email"
                                value={data.email}
                                placeholder="nama@pens.ac.id"
                                autoComplete="username"
                                autoFocus
                                onChange={(e) => setData('email', e.target.value)}
                                className="w-full pl-11 pr-4 py-3 rounded-xl border border-gray-200 bg-gray-50/50 text-gray-800 placeholder-gray-400 text-sm focus:outline-none focus:ring-2 focus:ring-pens-500/40 focus:border-pens-500 transition-all duration-200"
                            />
                        </div>
                        <InputError message={errors.email} className="mt-1.5" />
                    </div>

                    {/* Password Field */}
                    <div className="animate-slide-up" style={{ animationDelay: '200ms', animationFillMode: 'both' }}>
                        <label htmlFor="password" className="block text-sm font-semibold text-gray-700 mb-1.5">
                            Password
                        </label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                                <svg className="w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
                                </svg>
                            </div>
                            <input
                                id="password"
                                type={showPassword ? 'text' : 'password'}
                                name="password"
                                value={data.password}
                                placeholder="••••••••"
                                autoComplete="current-password"
                                onChange={(e) => setData('password', e.target.value)}
                                className="w-full pl-11 pr-12 py-3 rounded-xl border border-gray-200 bg-gray-50/50 text-gray-800 placeholder-gray-400 text-sm focus:outline-none focus:ring-2 focus:ring-pens-500/40 focus:border-pens-500 transition-all duration-200"
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-gray-400 hover:text-gray-600 transition-colors"
                            >
                                {showPassword ? (
                                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" />
                                    </svg>
                                ) : (
                                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                    </svg>
                                )}
                            </button>
                        </div>
                        <InputError message={errors.password} className="mt-1.5" />
                    </div>

                    {/* Remember Me */}
                    <div className="flex items-center justify-between animate-slide-up" style={{ animationDelay: '300ms', animationFillMode: 'both' }}>
                        <label className="flex items-center gap-2 cursor-pointer group">
                            <input
                                type="checkbox"
                                name="remember"
                                checked={data.remember}
                                onChange={(e) => setData('remember', e.target.checked)}
                                className="w-4 h-4 rounded border-gray-300 text-pens-500 focus:ring-pens-500/40 transition-colors"
                            />
                            <span className="text-sm text-gray-500 group-hover:text-gray-700 transition-colors">
                                Ingat saya
                            </span>
                        </label>
                    </div>

                    {/* Submit Button */}
                    <div className="animate-slide-up" style={{ animationDelay: '400ms', animationFillMode: 'both' }}>
                        <button
                            type="submit"
                            disabled={processing}
                            className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-pens-600 to-pens-500 text-white font-semibold text-sm shadow-lg shadow-pens-500/30 hover:shadow-xl hover:shadow-pens-500/40 hover:from-pens-700 hover:to-pens-600 focus:outline-none focus:ring-2 focus:ring-pens-500/50 focus:ring-offset-2 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed transform hover:-translate-y-0.5 active:translate-y-0"
                        >
                            {processing ? (
                                <span className="flex items-center justify-center gap-2">
                                    <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"/>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
                                    </svg>
                                    Memproses...
                                </span>
                            ) : (
                                'Masuk'
                            )}
                        </button>
                    </div>
                </form>

                {/* Footer */}
                <div className="mt-6 pt-5 border-t border-gray-100 text-center animate-fade-in" style={{ animationDelay: '500ms', animationFillMode: 'both' }}>
                    <p className="text-xs text-gray-400">
                        Dashboard Pengukuran Kinerja Unit Kerja
                    </p>
                    <p className="text-xs text-gray-400 mt-0.5">
                        © 2026 PENS — Projek Akhir
                    </p>
                </div>
            </div>
        </GuestLayout>
    );
}
