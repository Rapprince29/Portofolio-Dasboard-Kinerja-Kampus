import { Link } from '@inertiajs/react';

export default function GuestLayout({ children }) {
    return (
        <div className="min-h-screen flex items-center justify-center relative overflow-hidden">
            {/* Background Image */}
            <div
                className="absolute inset-0 bg-cover bg-center"
                style={{ backgroundImage: `url('/images/login-bg.png')` }}
            />

            {/* Animated Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-pens-800/70 via-pens-600/50 to-gold-500/30 animate-fade-in" />

            {/* Floating Decorative Blobs */}
            <div className="absolute top-10 left-10 w-72 h-72 bg-pens-500/20 rounded-full blur-3xl animate-pulse-slow" />
            <div className="absolute bottom-10 right-10 w-96 h-96 bg-gold-400/15 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '1.5s' }} />
            <div className="absolute top-1/2 left-1/3 w-48 h-48 bg-pens-400/10 rounded-full blur-2xl animate-pulse-slow" style={{ animationDelay: '3s' }} />

            {/* Login Card */}
            <div className="relative z-10 w-full max-w-md px-4 animate-scale-in">
                {children}
            </div>
        </div>
    );
}
