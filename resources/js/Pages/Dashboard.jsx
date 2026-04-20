import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, usePage } from '@inertiajs/react';
import { useState, useEffect } from 'react';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    LineElement,
    PointElement,
    ArcElement,
    Title,
    Tooltip,
    Legend,
    Filler,
} from 'chart.js';
import { Bar, Doughnut, Line } from 'react-chartjs-2';

ChartJS.register(CategoryScale, LinearScale, BarElement, LineElement, PointElement, ArcElement, Title, Tooltip, Legend, Filler);

import UnitActivityMonitor from '@/Components/UnitActivityMonitor';
import { router } from '@inertiajs/react';

// ── Helper ─────────────────────────────────────────────────────────────────────
function getKpiColor(pct) {
    if (pct >= 80) return 'green';
    if (pct >= 50) return 'yellow';
    return 'red';
}
function getKpiColorHex(pct) {
    if (pct >= 80) return '#22c55e';
    if (pct >= 50) return '#f59e0b';
    return '#ef4444';
}
function getKpiText(pct) {
    if (pct >= 80) return 'text-emerald-700';
    if (pct >= 50) return 'text-amber-700';
    return 'text-red-700';
}

// ── Animated Number Component ──────────────────────────────────────────────────
function AnimatedNumber({ value, suffix = '', duration = 1000 }) {
    const [display, setDisplay] = useState(0);
    useEffect(() => {
        let start = 0;
        const step = value / (duration / 16);
        const interval = setInterval(() => {
            start += step;
            if (start >= value) { setDisplay(value); clearInterval(interval); }
            else setDisplay(Math.round(start));
        }, 16);
        return () => clearInterval(interval);
    }, [value, duration]);
    return <>{display}{suffix}</>;
}

// ── Circular Progress Component ────────────────────────────────────────────────
function CircularProgress({ percentage, size = 80, strokeWidth = 6 }) {
    const radius = (size - strokeWidth) / 2;
    const circumference = radius * 2 * Math.PI;
    const [offset, setOffset] = useState(circumference);

    useEffect(() => {
        const timer = setTimeout(() => {
            setOffset(circumference - (percentage / 100) * circumference);
        }, 300);
        return () => clearTimeout(timer);
    }, [percentage, circumference]);

    const color = getKpiColorHex(percentage);

    return (
        <svg width={size} height={size} className="transform -rotate-90">
            <circle cx={size / 2} cy={size / 2} r={radius} stroke="#e5e7eb" strokeWidth={strokeWidth} fill="none" />
            <circle
                cx={size / 2} cy={size / 2} r={radius}
                stroke={color}
                strokeWidth={strokeWidth}
                fill="none"
                strokeLinecap="round"
                strokeDasharray={circumference}
                strokeDashoffset={offset}
                style={{ transition: 'stroke-dashoffset 1s ease-in-out' }}
            />
        </svg>
    );
}

// ── KPI Indicator Card ─────────────────────────────────────────────────────────
function KpiCard({ indicator, index }) {
    const pct = indicator.pct;
    const color = getKpiColor(pct);

    return (
        <div
            className={`stat-card bg-white relative overflow-hidden animate-slide-up flex flex-col justify-between`}
            style={{ animationDelay: `${index * 50}ms`, animationFillMode: 'both' }}
        >
            <div className={`absolute top-0 left-0 w-1.5 h-full rounded-l-2xl ${
                color === 'green' ? 'bg-emerald-400' :
                color === 'yellow' ? 'bg-amber-400' : 'bg-red-400'
            }`} />

            <div className="flex items-start justify-between ml-3 gap-3 p-1">
                <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                        <span className="text-xs font-bold text-pens-500 bg-pens-50 px-2 py-0.5 rounded-md whitespace-nowrap">
                            {indicator.code}
                        </span>
                    </div>
                    <p className="text-sm text-gray-700 font-medium leading-snug line-clamp-3 mt-1" title={indicator.desc}>
                        {indicator.desc}
                    </p>
                    <p className="text-xs text-gray-400 mt-2 line-clamp-1" title={indicator.unit}>
                        PIC: <span className="font-medium text-gray-500">{indicator.unit}</span>
                    </p>
                </div>
                <div className="flex-shrink-0 ml-1 relative mt-1">
                    <CircularProgress percentage={pct} size={56} strokeWidth={5} />
                    <span className={`absolute inset-0 flex items-center justify-center text-xs font-bold ${getKpiText(pct)}`}>
                        {Math.round(pct)}%
                    </span>
                </div>
            </div>

            <div className="mt-4 ml-3 pt-3 border-t border-gray-50 p-1">
                <div className="flex justify-between text-[11px] text-gray-400 mb-1">
                    <span>Realisasi: {indicator.value}</span>
                    <span>Target: {indicator.target}</span>
                </div>
                <div className="w-full bg-gray-100 rounded-full h-1.5 overflow-hidden">
                    <div
                        className={`h-1.5 rounded-full transition-all duration-1000 ease-out ${
                            color === 'green' ? 'bg-emerald-400' :
                            color === 'yellow' ? 'bg-amber-400' : 'bg-red-400'
                        }`}
                        style={{ width: `${Math.min(pct, 100)}%` }}
                    />
                </div>
            </div>
        </div>
    );
}

// ── Main Dashboard ─────────────────────────────────────────────────────────────
export default function Dashboard({ currentYear, indicators, overallAvg, stats, yearlyTrends, unitActivity, availableYears }) {
    const { auth } = usePage().props;
    const [yearInput, setYearInput] = useState(String(currentYear));

    const handleYearChange = (e) => {
        setYearInput(e.target.value);
    };

    const applyYearFilter = (e) => {
        // Terapkan filter saat Enter atau saat input kehilangan fokus
        if ((e.type === 'keydown' && e.key !== 'Enter') ) return;
        const val = parseInt(yearInput);
        if (!isNaN(val) && val > 1900 && val < 2100) {
            router.get(route('dashboard'), { year: val }, { preserveState: true });
        }
    };

    // Line Chart
    const lineChartData = {
        labels: yearlyTrends.labels.map(String),
        datasets: [
            {
                label: 'Rata-rata Realisasi (%)',
                data: yearlyTrends.data,
                borderColor: '#1e56a0',
                backgroundColor: 'rgba(30, 86, 160, 0.08)',
                pointBackgroundColor: '#1e56a0',
                pointBorderColor: '#fff',
                pointBorderWidth: 2,
                pointRadius: 5,
                tension: 0.4,
                fill: true,
            },
            {
                label: 'Target Dasar (%)',
                data: yearlyTrends.targets,
                borderColor: '#f5c542',
                backgroundColor: 'rgba(245, 197, 66, 0.05)',
                pointBackgroundColor: '#f5c542',
                borderDash: [5, 5],
                pointBorderColor: '#fff',
                pointBorderWidth: 2,
                pointRadius: 4,
                tension: 0.4,
                fill: false,
            },
        ],
    };

    // Doughnut data
    const statusDoughnut = {
        labels: ['Tercapai (≥80%)', 'Dalam Proses (50-79%)', 'Di Bawah Target (<50%)'],
        datasets: [{
            data: [stats.achieved, stats.onTrack, stats.belowTarget],
            backgroundColor: ['#22c55e', '#f59e0b', '#ef4444'],
            borderWidth: 0,
            hoverOffset: 8,
        }],
    };

    // Bar Chart
    const barData = {
        labels: indicators.map(i => i.code),
        datasets: [
            {
                label: 'Realisasi (%)',
                data: indicators.map(i => i.value),
                backgroundColor: indicators.map(i => {
                    if (i.pct >= 80) return 'rgba(34,197,94,0.7)';
                    if (i.pct >= 50) return 'rgba(245,158,11,0.7)';
                    return 'rgba(239,68,68,0.7)';
                }),
                borderRadius: 4,
                barPercentage: 0.6,
            },
            {
                label: 'Target (%)',
                data: indicators.map(i => i.target),
                backgroundColor: 'rgba(30,86,160,0.15)',
                borderColor: 'rgba(30,86,160,0.3)',
                borderWidth: 1,
                borderRadius: 4,
                barPercentage: 0.6,
            },
        ],
    };

    return (
        <AuthenticatedLayout header={`Dashboard Kinerja Tahun ${currentYear}`}>
            <Head title={`Dashboard Kinerja ${currentYear}`} />

            {/* ── Welcome Banner ── */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 animate-fade-in mt-6 mb-8">
                <div className="bg-gradient-to-r from-pens-600 via-pens-500 to-pens-700 rounded-2xl p-6 sm:p-8 text-white relative overflow-hidden shadow-xl">
                    <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/5 rounded-full" />
                    <div className="absolute -bottom-16 -left-8 w-48 h-48 bg-gold-400/10 rounded-full" />

                    <div className="relative z-10 flex flex-col sm:flex-row justify-between items-start sm:items-center">
                        <div>
                            <h1 className="text-2xl sm:text-3xl font-bold">
                                Selamat Datang, {auth.user.name} 👋
                            </h1>
                            <p className="text-pens-200 mt-2 text-sm sm:text-base max-w-xl line-height-relaxed">
                                Realtime Dashboard Pengukuran Kinerja Unit Kerja — Politeknik Elektronika Negeri Surabaya. Evaluasi data kinerja periode tahun {currentYear}.
                            </p>
                        </div>
                        
                        <div className="mt-4 sm:mt-0 flex flex-col sm:items-end gap-3">
                            <div className="bg-white/10 px-4 py-2 rounded-xl border border-white/20 backdrop-blur-sm flex flex-col gap-1.5">
                                <span className="text-xs uppercase tracking-wider text-pens-200 font-bold">Tahun Evaluasi:</span>
                                <div className="flex items-center gap-2">
                                    <input
                                        type="number"
                                        list="available-years-dashboard"
                                        value={yearInput}
                                        onChange={handleYearChange}
                                        onKeyDown={applyYearFilter}
                                        onBlur={applyYearFilter}
                                        placeholder="Ketik tahun..."
                                        className="w-24 bg-pens-700/50 border border-white/30 text-white text-sm rounded-lg p-1.5 px-2 outline-none focus:ring-2 focus:ring-gold-400 font-mono"
                                    />
                                    <datalist id="available-years-dashboard">
                                        {(availableYears || []).map(y => (
                                            <option key={y} value={y} />
                                        ))}
                                    </datalist>
                                    <button
                                        onClick={() => {
                                            const val = parseInt(yearInput);
                                            if (!isNaN(val)) router.get(route('dashboard'), { year: val }, { preserveState: true });
                                        }}
                                        className="bg-gold-400 text-pens-900 text-xs font-black px-2.5 py-1.5 rounded-lg hover:bg-yellow-300 transition whitespace-nowrap"
                                    >Tampilkan →</button>
                                </div>
                                {availableYears?.length > 0 && (
                                    <p className="text-[10px] text-pens-300">
                                        Ada data: {availableYears.join(', ')}
                                    </p>
                                )}
                            </div>

                            {['wadir', 'direktur', 'superadmin'].includes(auth.user.role?.toLowerCase()) ? (
                                <div className="bg-emerald-500/20 px-3 py-1.5 rounded-lg border border-emerald-400/30 flex items-center gap-2">
                                    <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                                    <span className="text-xs font-bold text-emerald-50 font-mono tracking-tight uppercase">MODE: Agregat Institusi (Full Access)</span>
                                </div>
                            ) : (
                                <div className="bg-blue-500/20 px-3 py-1.5 rounded-lg border border-blue-400/30 flex items-center gap-2">
                                    <span className="w-2 h-2 rounded-full bg-blue-400"></span>
                                    <span className="text-xs font-bold text-blue-50 font-mono tracking-tight uppercase">MODE: Capaian Unit Pribadi</span>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* ── Summary Stats ── */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                    {[
                        { label: 'Total Indikator (IKU) Anda', value: stats.total, icon: '📊', color: 'from-pens-500 to-pens-600' },
                        { label: 'Tercapai (≥80%)', value: stats.achieved, icon: '✅', color: 'from-emerald-500 to-emerald-600' },
                        { label: 'Dalam Proses (50-79%)', value: stats.onTrack, icon: '⏳', color: 'from-amber-500 to-amber-600' },
                        { label: 'Di Bawah Target (<50%)', value: stats.belowTarget, icon: '⚠️', color: 'from-red-500 to-red-600' },
                    ].map((stat, idx) => (
                        <div key={idx} className="stat-card bg-white p-5 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4 hover:shadow-md transition-shadow">
                            <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center text-xl shadow-inner text-white flex-shrink-0`}>
                                {stat.icon}
                            </div>
                            <div>
                                <p className="text-2xl font-black text-gray-800 tracking-tight">
                                    <AnimatedNumber value={stat.value} />
                                </p>
                                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mt-0.5">{stat.label}</p>
                            </div>
                        </div>
                    ))}
                </div>

                {/* ── Charts Row ── */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
                    {/* Line Chart - Tren */}
                    <div className="lg:col-span-2 stat-card bg-white p-6 rounded-2xl shadow-md border border-gray-100">
                        <h3 className="text-sm font-bold text-gray-800 mb-5 flex items-center gap-2">
                            <span className="w-1.5 h-5 bg-pens-500 rounded-full" />
                            Tren Capaian Kinerja Keseluruhan (Historis {yearlyTrends.labels.length} Tahun)
                        </h3>
                        <div className="h-64 flex items-center justify-center w-full">
                            <Line
                                data={lineChartData}
                                options={{
                                    responsive: true,
                                    maintainAspectRatio: false,
                                    plugins: {
                                        legend: { position: 'bottom', labels: { usePointStyle: true, padding: 20, font: { size: 11 } } },
                                    },
                                    scales: {
                                        y: { beginAtZero: true, max: 110, grid: { color: 'rgba(0,0,0,0.04)' }, ticks: { font: { size: 11 } } },
                                        x: { grid: { display: false }, ticks: { font: { size: 11 } } },
                                    },
                                }}
                            />
                        </div>
                    </div>

                    {/* Doughnut Chart - Status */}
                    <div className="stat-card bg-white p-6 rounded-2xl shadow-md border border-gray-100 relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-gray-50 rounded-full -mr-10 -mt-10 max-w-full italic" />
                        <h3 className="text-sm font-bold text-gray-800 mb-4 flex items-center gap-2 relative z-10">
                            <span className="w-1.5 h-5 bg-gold-400 rounded-full" />
                            Status Kecukupan Target IKU
                        </h3>
                        <div className="flex items-center justify-center py-2 relative z-10">
                            <div className="relative" style={{ width: 160, height: 160 }}>
                                <Doughnut
                                    data={statusDoughnut}
                                    options={{
                                        responsive: true,
                                        cutout: '72%',
                                        plugins: { legend: { display: false } },
                                    }}
                                />
                                <div className="absolute inset-0 flex flex-col items-center justify-center drop-shadow-sm">
                                    <span className="text-2xl font-black text-gray-800 tracking-tighter"><AnimatedNumber value={overallAvg} />%</span>
                                    <span className="text-[10px] font-black text-pens-500 tracking-widest uppercase">Skor Global</span>
                                </div>
                            </div>
                        </div>
                        <div className="mt-5 space-y-2.5 relative z-10">
                            {[
                                { label: 'Target Terlampaui', value: stats.achieved, color: 'bg-emerald-400' },
                                { label: 'Sedang Berjalan', value: stats.onTrack, color: 'bg-amber-400' },
                                { label: 'Di Bawah Target', value: stats.belowTarget, color: 'bg-red-400' },
                            ].map((s, i) => (
                                <div key={i} className="flex items-center justify-between text-xs bg-gray-50/70 border border-gray-100 px-3 py-1.5 rounded-lg">
                                    <div className="flex items-center gap-2">
                                        <div className={`w-2 h-2 rounded-full ${s.color}`} />
                                        <span className="text-gray-500 font-bold">{s.label}</span>
                                    </div>
                                    <span className="font-black text-gray-800">{s.value} <span className="text-[10px] text-gray-400 italic">IKU</span></span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* NEW: Monitoring Keaktifan Unit (Only for pimpinan) */}
                {unitActivity && (
                        <div className="lg:col-span-3 lg:grid lg:grid-cols-3 gap-6">
                            <div className="lg:col-span-1">
                                <UnitActivityMonitor activities={unitActivity} />
                            </div>
                            <div className="lg:col-span-2">
                                <div className="stat-card bg-white p-6 rounded-2xl shadow-md border border-gray-100 h-full overflow-hidden">
                                     <h3 className="text-sm font-bold text-gray-800 mb-5 flex items-center gap-2">
                                        <span className="w-1.5 h-5 bg-pens-500 rounded-full" />
                                        Analisis Sebaran Realisasi IKU Per Indikator ({currentYear})
                                    </h3>
                                    <div className="h-[300px]">
                                        <Bar
                                            data={barData}
                                            options={{
                                                responsive: true,
                                                maintainAspectRatio: false,
                                                plugins: { legend: { display: false } },
                                                scales: {
                                                    y: { beginAtZero: true, max: 110, grid: { color: 'rgba(0,0,0,0.04)' } },
                                                    x: { grid: { display: false }, ticks: { font: { size: 10 }, maxRotation: 45, minRotation: 45 } },
                                                }
                                            }}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* IF NO unitActivity (usually for Unit Kerja view) */}
                    {!unitActivity && (
                         <div className="lg:col-span-2">
                            <div className="stat-card bg-white p-6 rounded-2xl shadow-md border border-gray-100 h-full">
                                <h3 className="text-sm font-bold text-gray-800 mb-5 flex items-center gap-2">
                                    <span className="w-1.5 h-5 bg-pens-500 rounded-full" />
                                    Visualisasi Perbandingan Target vs Capaian IKU Unit Kerja Anda ({currentYear})
                                </h3>
                                <div className="h-[280px]">
                                    <Bar
                                        data={barData}
                                        options={{
                                            responsive: true,
                                            maintainAspectRatio: false,
                                            plugins: { legend: { display: false } },
                                            scales: {
                                                y: { beginAtZero: true, max: 110, grid: { color: 'rgba(0,0,0,0.04)' } },
                                                x: { grid: { display: false } },
                                            }
                                        }}
                                    />
                                </div>
                            </div>
                         </div>
                    )}

                {/* ── KPI Cards Grid ── */}
                <div className="mb-5 flex flex-col sm:flex-row sm:items-end justify-between border-b pb-4">
                    <div>
                        <h3 className="text-xl font-bold text-gray-800 mb-1">Rincian Kartu Nilai Indikator</h3>
                        <p className="text-sm text-gray-500">Mewakili {indicators.length} indikator yang menjadi wewenang Anda.</p>
                    </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5 mb-12">
                    {indicators.map((indicator, idx) => (
                        <div key={indicator.id} className="p-4 bg-white rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                            <KpiCard indicator={indicator} index={idx} />
                        </div>
                    ))}
                    {indicators.length === 0 && (
                        <div className="col-span-full py-16 text-center text-gray-400 bg-gray-50 rounded-2xl border-2 border-dashed border-gray-200">
                            <p className="text-2xl mb-2">📭</p>
                            <p className="font-medium text-gray-500">Tidak ada indikator kinerja yang ditemukan untuk Anda di tahun {currentYear}.</p>
                            <p className="text-sm">Data kosong atau Anda belum dilimpahkan target oleh admin.</p>
                        </div>
                    )}
                </div>

                {/* ── Footer Info ── */}
                <div className="text-center text-xs font-medium text-gray-400 py-6 border-t border-gray-200 mt-4">
                    Dashboard Sistem Informasi Pengukuran Kinerja Unit Kerja PENS © {currentYear}
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
