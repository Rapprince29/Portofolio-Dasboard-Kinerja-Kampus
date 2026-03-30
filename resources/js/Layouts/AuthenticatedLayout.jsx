import Dropdown from '@/Components/Dropdown';
import { Link, usePage, router } from '@inertiajs/react';
import { useState, useEffect, useRef } from 'react';

const navigation = [
    { name: 'Dashboard', href: 'dashboard', icon: DashboardIcon, roles: ['superadmin', 'direktur', 'wadir', 'unit_kerja'] },
    { name: 'Capaian', href: 'achievements.index', icon: AchievementIcon, roles: ['superadmin', 'direktur', 'wadir'] },
    { name: 'Input & Riwayat', href: 'achievements.index', icon: InputIcon, roles: ['unit_kerja'] },
];

function DashboardIcon({ className }) {
    return (
        <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z" />
        </svg>
    );
}

function UserIcon({ className }) {
    return (
        <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
        </svg>
    );
}

function IndicatorIcon({ className }) {
    return (
        <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 0 1 3 19.875v-6.75ZM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V8.625ZM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V4.125Z" />
        </svg>
    );
}

function InputIcon({ className }) {
    return (
        <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
        </svg>
    );
}

function AchievementIcon({ className }) {
    return (
        <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0z" />
        </svg>
    );
}

function MenuIcon({ className }) {
    return (
        <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
        </svg>
    );
}

function CloseIcon({ className }) {
    return (
        <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
        </svg>
    );
}

export default function AuthenticatedLayout({ header, children }) {
    const { auth, notifications } = usePage().props;
    const user = auth.user;
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [bellOpen, setBellOpen] = useState(false);

    const notifCountSSR = notifications?.count || 0;
    const notifItemsSSR = notifications?.items || [];

    // State lokal untuk polling — override data SSR setelah polling pertama
    const [liveCount, setLiveCount]   = useState(notifCountSSR);
    const [liveItems, setLiveItems]   = useState(notifItemsSSR);
    const [isNewNotif, setIsNewNotif] = useState(false);     // Signature unik untuk mendeteksi perubahan isi (ID + Status)
    const prevNotifSigRef = useRef(JSON.stringify(notifItemsSSR.map(i => i.id + i.status)));
    const isMarkingRead   = useRef(false); // Kunci agar polling tidak menimpa data saat "mark-read"

    // Gunakan data live jika sudah ada, fallback ke SSR
    const notifCount = liveCount;
    const notifItems = liveItems;

    // Polling setiap 5 detik — berhenti otomatis saat tab di-minimize
    useEffect(() => {
        let interval = null;

        const poll = async () => {
            // Jangan poll kalau tab tidak aktif ATAU sedang proses mark-read
            if (document.hidden || isMarkingRead.current) return;

            try {
                const res = await fetch(route('notifications.count'), {
                    headers: { 'Accept': 'application/json' },
                    credentials: 'same-origin',
                });
                if (!res.ok) return;
                const data = await res.json();

                // Deteksi perubahan: berdasarkan Signature (isi berubah atau jumlah bertambah)
                const currentSig = JSON.stringify(data.items.map(i => i.id + i.status));
                
                if (currentSig !== prevNotifSigRef.current && data.count > 0) {
                    setIsNewNotif(true);
                    setTimeout(() => setIsNewNotif(false), 3000);
                }

                prevNotifSigRef.current = currentSig;
                setLiveCount(data.count);
                setLiveItems(data.items);
            } catch (_) { /* abaikan error jaringan */ }
        };

        const startPolling = () => {
            poll(); // langsung cek saat tab aktif kembali
            interval = setInterval(poll, 5_000); // ⚡ Setiap 5 detik (Super Cepat!)
        };

        const stopPolling = () => {
            if (interval) clearInterval(interval);
        };

        // Mulai/berhenti polling berdasarkan visibility tab
        const handleVisibility = () => {
            if (document.hidden) {
                stopPolling();
            } else {
                startPolling();
            }
        };

        document.addEventListener('visibilitychange', handleVisibility);
        startPolling(); // mulai saat pertama dibuka

        return () => {
            stopPolling();
            document.removeEventListener('visibilitychange', handleVisibility);
        };
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    // Sinkronisasi data lokal jika props dari server berubah (misal: setelah Inertia visit)
    useEffect(() => {
        setLiveCount(notifCountSSR);
        setLiveItems(notifItemsSSR);
        prevNotifSigRef.current = JSON.stringify(notifItemsSSR.map(i => i.id + i.status));
    }, [notifCountSSR, notifItemsSSR]);

    const handleBellClick = () => {
        const isOpening = !bellOpen;
        setBellOpen(isOpening);

        // Tandai semua sebagai terbaca HANYA saat MEMBUKA lonceng
        if (isOpening && notifCount > 0) {
            isMarkingRead.current = true; // 🔒 Kunci polling sejenak
            
            // Tandai semua sebagai terbaca HANYA saat MEMBUKA lonceng
            // Tidak mengosongkan items secara instan agar user sempat membaca
            router.post(route('notifications.mark-read'), {}, {
                preserveScroll: true,
                preserveState: true,
                onSuccess: () => {
                    // Beri jeda 1 detik agar DB benar-benar commit sebelum polling hidup lagi
                    setTimeout(() => {
                        isMarkingRead.current = false; // 🔓 Buka kunci
                    }, 1000);
                },
                onError: () => {
                    isMarkingRead.current = false;
                }
            });
        }
    };

    const statusLabel = {
        // Unit Kerja melihat perubahan statusnya
        verified: { text: 'Diverifikasi Wadir ✅', color: 'text-amber-600 bg-amber-50 border-amber-200', icon: '✅' },
        approved: { text: 'Disetujui Direktur 🎉', color: 'text-emerald-600 bg-emerald-50 border-emerald-200', icon: '🎉' },
        rejected: { text: 'Ditolak ❌', color: 'text-red-600 bg-red-50 border-red-200', icon: '❌' },
        // Wadir melihat pengajuan baru
        submitted: { text: 'Pengajuan Baru 🆕', color: 'text-blue-600 bg-blue-50 border-blue-200', icon: '🆕' },
    };

    // Label judul notif sesuai role
    const bellTitle = {
        unit_kerja: '🔔 Update Status Capaian',
        wadir:      '🔔 Pengajuan Menunggu Verifikasi',
        direktur:   '🔔 Capaian Siap Disetujui',
        superadmin: '🔔 Pengajuan Baru',
    };

    const roleBadge = {
        superadmin: { label: 'Superadmin', color: 'bg-gold-400 text-pens-800' },
        direktur: { label: 'Direktur', color: 'bg-purple-500 text-white' },
        wadir: { label: 'Wadir / Verifikator', color: 'bg-blue-400 text-white' },
        unit_kerja: { label: 'Unit Kerja', color: 'bg-emerald-400 text-white' },
    };

    const badge = roleBadge[user.role] || roleBadge.unit_kerja;

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Mobile sidebar overlay */}
            {sidebarOpen && (
                <div className="fixed inset-0 z-40 lg:hidden" onClick={() => setSidebarOpen(false)}>
                    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" />
                </div>
            )}

            {/* Sidebar */}
            <aside className={`
                fixed top-0 left-0 z-50 h-full w-64 bg-gradient-to-b from-pens-700 via-pens-600 to-pens-800
                transform transition-transform duration-300 ease-in-out
                ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
                lg:translate-x-0
            `}>
                {/* Logo Area */}
                <div className="flex items-center justify-between px-6 py-5 border-b border-white/10">
                    <Link href="/" className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-gold-400 to-gold-500 flex items-center justify-center shadow-lg">
                            <span className="text-pens-800 font-extrabold text-lg">P</span>
                        </div>
                        <div>
                            <h1 className="text-white font-bold text-sm leading-tight">Dashboard KPI</h1>
                            <p className="text-pens-300 text-xs">PENS</p>
                        </div>
                    </Link>
                    <button onClick={() => setSidebarOpen(false)} className="lg:hidden text-white/60 hover:text-white">
                        <CloseIcon className="w-5 h-5" />
                    </button>
                </div>

                {/* Navigation */}
                <nav className="mt-6 px-4 space-y-1">
                    <p className="px-4 text-xs font-semibold text-pens-300 uppercase tracking-wider mb-3">Menu Utama</p>
                    {navigation.filter(item => item.roles.includes(user.role)).map((item) => {
                        const isActive = route().current(item.href);
                        return (
                            <Link
                                key={item.name}
                                href={route(item.href)}
                                className={`sidebar-link ${isActive ? 'sidebar-link-active' : 'sidebar-link-inactive'}`}
                            >
                                <item.icon className="w-5 h-5 flex-shrink-0" />
                                {item.name}
                            </Link>
                        );
                    })}

                    <Link
                        href={route('profile.edit')}
                        className={`sidebar-link ${route().current('profile.edit') ? 'sidebar-link-active' : 'sidebar-link-inactive'}`}
                    >
                        <UserIcon className="w-5 h-5 flex-shrink-0" />
                        Profil Saya
                    </Link>
                </nav>

                {/* User Card at Bottom */}
                <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-white/10">
                    <div className="flex items-center gap-3 px-2 mb-3">
                        <div className="w-9 h-9 rounded-full bg-gradient-to-br from-gold-300 to-gold-500 flex items-center justify-center">
                            <span className="text-pens-800 font-bold text-sm">{user.name.charAt(0)}</span>
                        </div>
                        <div className="flex-1 min-w-0">
                            <p className="text-white text-sm font-medium truncate">{user.name}</p>
                            <span className={`inline-block mt-0.5 px-2 py-0.5 rounded-full text-[10px] font-semibold ${badge.color}`}>
                                {badge.label}
                            </span>
                        </div>
                    </div>
                    <Link
                        href={route('logout')}
                        method="post"
                        as="button"
                        className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-white/10 text-pens-200 hover:bg-red-500/20 hover:text-red-300 transition-all duration-200 text-sm font-medium"
                    >
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9" />
                        </svg>
                        Log Out
                    </Link>
                </div>
            </aside>

            {/* Main Content */}
            <div className="lg:pl-64">
                {/* Top Bar */}
                <header className="sticky top-0 z-30 bg-white/80 backdrop-blur-md border-b border-gray-200/50">
                    <div className="flex items-center justify-between px-4 sm:px-6 lg:px-8 h-16">
                        <div className="flex items-center gap-4">
                            <button onClick={() => setSidebarOpen(true)} className="lg:hidden text-gray-500 hover:text-gray-700">
                                <MenuIcon className="w-6 h-6" />
                            </button>
                            {header && (
                                <h2 className="text-lg font-semibold text-gray-800">{header}</h2>
                            )}
                        </div>
                        <div className="flex items-center gap-4">
                            <div className="hidden sm:flex items-center gap-2 text-sm text-gray-500">
                                <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                                Online
                            </div>

                            {/* ── Bell Notification (semua role) ── */}
                            <div className="relative">
                                <button
                                    onClick={handleBellClick}
                                    className="relative p-2 rounded-xl text-gray-500 hover:text-pens-600 hover:bg-pens-50 transition-colors"
                                    title="Notifikasi"
                                >
                                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0" />
                                    </svg>
                                    {notifCount > 0 && (
                                        <span className={`absolute -top-0.5 -right-0.5 w-5 h-5 bg-red-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center ${isNewNotif ? 'animate-ping' : 'animate-bounce'}`}>
                                            {notifCount > 9 ? '9+' : notifCount}
                                        </span>
                                    )}
                                </button>

                                {bellOpen && (
                                    <>
                                        <div className="fixed inset-0 z-40" onClick={() => setBellOpen(false)} />
                                        <div className="absolute right-0 mt-2 w-80 bg-white rounded-2xl shadow-2xl border border-gray-100 z-50 overflow-hidden">
                                            <div className="px-4 py-3 border-b border-gray-100 flex items-center justify-between">
                                                <h3 className="font-bold text-gray-800 text-sm">
                                                    {bellTitle[user.role?.toLowerCase()] || '🔔 Notifikasi'}
                                                </h3>
                                                <span className="text-xs text-gray-400">{notifItems.length} notifikasi</span>
                                            </div>
                                            <div className="max-h-72 overflow-y-auto">
                                                {notifItems.length === 0 ? (
                                                    <div className="py-8 text-center text-gray-400">
                                                        <p className="text-2xl mb-1">🎉</p>
                                                        <p className="text-sm">Semua sudah terbaca!</p>
                                                    </div>
                                                ) : (
                                                    notifItems.map((notif) => (
                                                        <Link key={notif.id} href={route('achievements.index')}
                                                            onClick={() => setBellOpen(false)}
                                                            className="flex items-start gap-3 px-4 py-3 border-b border-gray-50 hover:bg-gray-50 transition-colors cursor-pointer">
                                                            <span className="text-xl flex-shrink-0 mt-0.5">
                                                                {statusLabel[notif.status]?.icon || '📋'}
                                                            </span>
                                                            <div className="flex-1 min-w-0">
                                                                <p className="text-sm font-semibold text-gray-800">{notif.code}</p>
                                                                {/* Untuk Wadir/Direktur: tampilkan dari siapa */}
                                                                {notif.from && (
                                                                    <p className="text-xs text-gray-500">dari {notif.from}</p>
                                                                )}
                                                                <span className={`text-xs font-medium px-2 py-0.5 rounded-full border inline-block mt-0.5 ${statusLabel[notif.status]?.color}`}>
                                                                    {statusLabel[notif.status]?.text}
                                                                </span>
                                                                <p className="text-xs text-gray-400 mt-1">{notif.changed_at}</p>
                                                            </div>
                                                        </Link>
                                                    ))
                                                )}
                                            </div>
                                            <div className="px-4 py-2 border-t border-gray-100 text-center">
                                                <Link href={route('achievements.index')} onClick={() => setBellOpen(false)}
                                                    className="text-xs text-pens-600 hover:text-pens-800 font-medium">
                                                    Lihat semua riwayat capaian →
                                                </Link>
                                            </div>
                                        </div>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                </header>

                {/* Page Content */}
                <main className="p-4 sm:p-6 lg:p-8">
                    {children}
                </main>
            </div>
        </div>
    );
}
