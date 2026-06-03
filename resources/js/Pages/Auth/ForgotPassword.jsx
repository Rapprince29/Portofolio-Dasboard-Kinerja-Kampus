import InputError from '@/Components/InputError';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, Link, useForm } from '@inertiajs/react';

export default function ForgotPassword({ status }) {
    const { data, setData, post, processing, errors } = useForm({
        email: '',
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('password.email'));
    };

    return (
        <GuestLayout>
            <Head title="Lupa Password — Dashboard KPI PENS" />

            {/* Glass Card */}
            <div className="bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl p-8 sm:p-10 border border-white/30">

                {/* Logo & Header */}
                <div className="text-center mb-6 animate-slide-up">
                    <div className="flex justify-center mb-4">
                        <img 
                            src="/images/pens-logo.png" 
                            alt="Logo PENS" 
                            className="w-16 h-16 object-contain drop-shadow-md animate-fade-in" 
                        />
                    </div>
                    <h1 className="text-2xl font-bold text-gray-800">
                        Lupa <span className="text-pens-500">Password?</span>
                    </h1>
                    <p className="text-sm text-gray-500 mt-2 leading-relaxed max-w-sm mx-auto">
                        Masukkan alamat email akun Anda dan kami akan mengirimkan link untuk mereset password.
                    </p>
                </div>

                {/* Status Message (Success) */}
                {status && (
                    <div className="mb-5 p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-sm font-medium text-emerald-700 text-center animate-fade-in flex items-center justify-center gap-2">
                        <svg className="w-5 h-5 text-emerald-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
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

                    {/* Submit Button */}
                    <div className="animate-slide-up" style={{ animationDelay: '200ms', animationFillMode: 'both' }}>
                        <button
                            type="submit"
                            disabled={processing}
                            className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-pens-600 to-pens-500 text-white font-semibold text-sm shadow-lg shadow-pens-500/30 hover:shadow-xl hover:shadow-pens-500/40 hover:from-pens-700 hover:to-pens-600 focus:outline-none focus:ring-2 focus:ring-pens-500/50 focus:ring-offset-2 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed transform hover:-translate-y-0.5 active:translate-y-0 flex items-center justify-center gap-2"
                        >
                            {processing ? (
                                <span className="flex items-center justify-center gap-2">
                                    <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"/>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
                                    </svg>
                                    Mengirim...
                                </span>
                            ) : (
                                <>
                                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                                    </svg>
                                    Kirim Link Reset Password
                                </>
                            )}
                        </button>
                    </div>
                </form>

                {/* Back to Login */}
                <div className="mt-6 pt-5 border-t border-gray-100 text-center animate-fade-in" style={{ animationDelay: '300ms', animationFillMode: 'both' }}>
                    <Link
                        href={route('login')}
                        className="inline-flex items-center gap-1.5 text-sm text-pens-500 hover:text-pens-700 font-medium transition-colors hover:underline"
                    >
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
                        </svg>
                        Kembali ke Login
                    </Link>
                </div>
            </div>
        </GuestLayout>
    );
}
