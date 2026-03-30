import React, { useState, useEffect } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, router, useForm, usePage } from '@inertiajs/react';
import Modal from '@/Components/Modal';

export default function Index({ auth, achievements, myIndicators }) {
    const { flash } = usePage().props;
    const [filterStatus, setFilterStatus] = useState('all');
    const [toast, setToast] = useState(null);

    // Modal pengajuan capaian baru
    const [isModalOpen, setIsModalOpen] = useState(false);

    // Modal alasan penolakan
    const [rejectModal, setRejectModal] = useState(null);
    const [rejectionReason, setRejectionReason] = useState('');

    // Info card IKU yang sedang dipilih di form
    const [selectedIndicator, setSelectedIndicator] = useState(null);

    // Form handling
    const { data, setData, post, processing, errors, reset } = useForm({
        indicator_id: '',
        year: new Date().getFullYear().toString(),
        value: '',
        description: '',
        proof: null,
    });

    // Handler: pilih indikator → update form + tampilkan info card
    const handleIndicatorChange = (e) => {
        const id = e.target.value;
        setData('indicator_id', id);
        const found = myIndicators?.find(ind => String(ind.id) === String(id));
        setSelectedIndicator(found || null);
    };

    const isWadirOrDirektur = ['wadir', 'direktur', 'superadmin'].includes(auth.user.role?.toLowerCase());

    // Handler: buka modal alasan tolak
    const openRejectModal = (item) => {
        setRejectModal({ id: item.id, code: item.indicator?.code });
        setRejectionReason('');
    };

    // Handler: kirim penolakan dengan alasan
    const submitReject = () => {
        router.patch(route('achievements.reject', rejectModal.id), {
            rejection_reason: rejectionReason,
        }, {
            onSuccess: () => setRejectModal(null),
        });
    };

    // Tampilkan toast dari flash message Laravel
    useEffect(() => {
        if (flash?.success) showToast(flash.success, 'success');
        if (flash?.error)   showToast(flash.error, 'error');
    }, [flash]);

    const showToast = (message, type = 'success') => {
        setToast({ message, type });
        setTimeout(() => setToast(null), 4000);
    };

    const submitAchievement = (e) => {
        e.preventDefault();
        post(route('achievements.store'), {
            forceFormData: true, // Wajib untuk upload file (PDF)
            onSuccess: () => {
                closeModal();
                setFilterStatus('all'); // Reset filter agar data baru langsung terlihat
            },
        });
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedIndicator(null);
        reset();
    };

    const getStatusBadge = (status) => {
        const badges = {
            draft: 'bg-gray-100 text-gray-700 border-gray-200',
            submitted: 'bg-blue-50 text-blue-700 border-blue-200',
            verified: 'bg-amber-50 text-amber-700 border-amber-200',
            approved: 'bg-emerald-50 text-emerald-700 border-emerald-200',
            rejected: 'bg-red-50 text-red-700 border-red-200',
        };
        const labels = {
            draft: 'Draft',
            submitted: 'Menunggu Verifikasi',
            verified: 'Verified',
            approved: 'Approved',
            rejected: 'Ditolak',
        };

        return (
            <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold border ${badges[status] || badges.draft}`}>
                {labels[status] || status}
            </span>
        );
    };

    const filteredAchievements = achievements.filter(item => {
        if (filterStatus === 'all') return true;
        return item.status === filterStatus;
    });

    const stats = {
        total: achievements.length,
        approved: achievements.filter(a => a.status === 'approved').length,
        pending: achievements.filter(a => ['submitted', 'verified'].includes(a.status)).length,
    };

    return (
        <AuthenticatedLayout header="Riwayat Capaian Evaluasi">
            <Head title="Riwayat Capaian" />

            {/* ── Toast Notifikasi ── */}
            {toast && (
                <div className={`fixed top-6 right-6 z-[9999] flex items-center gap-3 px-5 py-4 rounded-2xl shadow-2xl text-white font-medium text-sm transition-all duration-300 animate-slide-up ${
                    toast.type === 'success'
                        ? 'bg-emerald-500'
                        : 'bg-red-500'
                }`}>
                    <span className="text-xl">{toast.type === 'success' ? '✅' : '⚠️'}</span>
                    <span>{toast.message}</span>
                    <button onClick={() => setToast(null)} className="ml-2 text-white/70 hover:text-white font-bold text-base">×</button>
                </div>
            )}

            <div className="bg-gradient-to-r from-pens-800 to-blue-900 py-8 px-6 text-white">
                <div className="max-w-7xl mx-auto">
                    <h1 className="text-3xl font-bold">Riwayat Capaian Evaluasi</h1>
                    <p className="text-blue-100 mt-2">Kelola dan pantau pengajuan capaian IKU unit kerja Anda.</p>
                </div>
            </div>

            <div className="max-w-7xl mx-auto p-4 -mt-8">
                {/* Stats Summary */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-500 font-medium">Total Pengajuan</p>
                            <h3 className="text-2xl font-bold text-gray-800">{stats.total}</h3>
                        </div>
                        <div className="bg-blue-50 p-3 rounded-xl text-blue-600 text-xl">📊</div>
                    </div>
                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-500 font-medium">Disetujui</p>
                            <h3 className="text-2xl font-bold text-emerald-600">{stats.approved}</h3>
                        </div>
                        <div className="bg-emerald-50 p-3 rounded-xl text-emerald-600 text-xl">✅</div>
                    </div>
                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-500 font-medium">Menunggu Proses</p>
                            <h3 className="text-2xl font-bold text-amber-600">{stats.pending}</h3>
                        </div>
                        <div className="bg-amber-50 p-3 rounded-xl text-amber-600 text-xl">⏳</div>
                    </div>
                </div>

                {/* Flash Messages */}
                {flash?.success && (
                    <div className="bg-emerald-50 border border-emerald-200 text-emerald-700 px-4 py-3 rounded-xl mb-6 flex items-center">
                        <span className="mr-2">✅</span> {flash.success}
                    </div>
                )}

                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                    <div className="p-6 border-b border-gray-100 flex flex-col sm:flex-row justify-between items-center gap-4">
                        <h2 className="text-lg font-bold text-gray-800">Daftar Pengajuan</h2>
                        <div className="flex items-center gap-3">
                            <select
                                value={filterStatus}
                                onChange={(e) => setFilterStatus(e.target.value)}
                                className="px-4 py-2 border border-gray-200 rounded-xl text-sm bg-gray-50 focus:ring-2 focus:ring-pens-500"
                            >
                                <option value="all">Semua Status</option>
                                <option value="submitted">Menunggu Verifikasi</option>
                                <option value="verified">Verified</option>
                                <option value="approved">Approved</option>
                                <option value="rejected">Ditolak</option>
                            </select>

                            {!isWadirOrDirektur && (
                                <button
                                    onClick={() => setIsModalOpen(true)}
                                    className="px-4 py-2 bg-pens-600 text-white font-medium rounded-xl hover:bg-pens-700 transition-all"
                                >
                                    + Ajukan Capaian
                                </button>
                            )}
                        </div>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead className="bg-gray-50 text-gray-600 text-xs uppercase">
                                <tr>
                                    {isWadirOrDirektur && <th className="px-6 py-4">Unit Kerja</th>}
                                    <th className="px-6 py-4">Indikator</th>
                                    <th className="px-6 py-4 text-center">Tahun</th>
                                    <th className="px-6 py-4 text-center">Nilai</th>
                                    <th className="px-6 py-4">Status</th>
                                    <th className="px-6 py-4 text-center">Aksi</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {filteredAchievements.map((item) => (
                                    <tr key={item.id} className="hover:bg-gray-50/50">
                                        {isWadirOrDirektur && (
                                            <td className="px-6 py-4 font-medium text-gray-800">
                                                {item.user?.name}
                                            </td>
                                        )}
                                        <td className="px-6 py-4">
                                            <div className="font-bold text-pens-700">{item.indicator?.code}</div>
                                            <div className="text-xs text-gray-500 truncate max-w-[200px]">{item.indicator?.description}</div>
                                        </td>
                                        <td className="px-6 py-4 text-center font-semibold">{item.year}</td>
                                        <td className="px-6 py-4 text-center font-bold">{item.value}</td>
                                        <td className="px-6 py-4">
                                            {getStatusBadge(item.status)}
                                            {/* Tampilkan alasan penolakan untuk Unit Kerja */}
                                            {item.status === 'rejected' && item.rejection_reason && (
                                                <div className="mt-1.5 flex items-start gap-1.5 bg-red-50 border border-red-200 rounded-lg px-2.5 py-1.5">
                                                    <span className="text-red-500 text-xs mt-0.5 flex-shrink-0">💬</span>
                                                    <p className="text-xs text-red-700">
                                                        <span className="font-semibold">Alasan: </span>
                                                        {item.rejection_reason}
                                                    </p>
                                                </div>
                                            )}
                                        </td>
                                        <td className="px-6 py-4 text-center">
                                            <div className="flex justify-center items-center gap-1.5 flex-wrap">
                                                {/* Tombol Bukti */}
                                                {item.proof_path && (
                                                    <a href={`/storage/${item.proof_path}`} target="_blank" rel="noopener noreferrer"
                                                        className="px-2.5 py-1 text-xs bg-pens-50 text-pens-600 rounded-lg hover:bg-pens-100 font-semibold border border-pens-200"
                                                        title="Lihat Bukti">
                                                        📎 Bukti
                                                    </a>
                                                )}

                                                {/* ── WADIR: Verifikasi + Tolak (untuk status submitted) ── */}
                                                {auth.user.role?.toLowerCase() === 'wadir' && item.status === 'submitted' && (
                                                    <>
                                                        <button onClick={() => router.patch(route('achievements.verify', item.id))}
                                                            className="px-2.5 py-1 text-xs bg-amber-500 text-white rounded-lg hover:bg-amber-600 font-semibold transition shadow-sm">
                                                            ✅ Verifikasi
                                                        </button>
                                                        <button onClick={() => openRejectModal(item)}
                                                            className="px-2.5 py-1 text-xs bg-red-100 text-red-600 rounded-lg hover:bg-red-200 font-semibold transition border border-red-200">
                                                            ❌ Tolak
                                                        </button>
                                                    </>
                                                )}

                                                {/* ── WADIR: Tolak + Hapus (untuk status verified) ── */}
                                                {auth.user.role?.toLowerCase() === 'wadir' && item.status === 'verified' && (
                                                    <div className="flex gap-2">
                                                        <button onClick={() => openRejectModal(item)}
                                                            className="px-2.5 py-1 text-xs bg-red-100 text-red-600 rounded-lg hover:bg-red-200 font-semibold transition border border-red-200">
                                                            ❌ Tolak
                                                        </button>
                                                        <button onClick={() => { if (confirm('Hapus capaian ini?')) router.delete(route('achievements.destroy', item.id)); }}
                                                            className="px-2.5 py-1 text-xs bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200 font-semibold transition border border-gray-200">
                                                            🗑️ Hapus
                                                        </button>
                                                    </div>
                                                )}

                                                {/* ── DIREKTUR: Approve + Tolak + Hapus (untuk status verified) ── */}
                                                {auth.user.role?.toLowerCase() === 'direktur' && item.status === 'verified' && (
                                                    <div className="flex gap-2">
                                                        <button onClick={() => router.patch(route('achievements.approve', item.id))}
                                                            className="px-2.5 py-1 text-xs bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 font-semibold transition shadow-sm">
                                                            🎉 Setujui
                                                        </button>
                                                        <button onClick={() => openRejectModal(item)}
                                                            className="px-2.5 py-1 text-xs bg-red-50 text-red-500 rounded-lg hover:bg-red-100 font-semibold transition border border-red-200">
                                                            ❌ Tolak
                                                        </button>
                                                        <button onClick={() => { if (confirm('Hapus capaian ini?')) router.delete(route('achievements.destroy', item.id)); }}
                                                            className="px-2.5 py-1 text-xs bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200 font-semibold transition border border-gray-200">
                                                            🗑️ Hapus
                                                        </button>
                                                    </div>
                                                )}

                                                {/* ── DIREKTUR & SUPERADMIN: Tombol Hapus (untuk semua status) ── */}
                                                {['direktur', 'superadmin'].includes(auth.user.role?.toLowerCase()) && item.status !== 'verified' && (
                                                    <button
                                                        onClick={() => {
                                                            if (confirm(`⚠️ Hapus capaian "${item.indicator?.code}" (${item.year})?\n\nTindakan ini tidak dapat dibatalkan dan data akan hilang permanen.`)) {
                                                                router.delete(route('achievements.destroy', item.id));
                                                            }
                                                        }}
                                                        className="px-2.5 py-1 text-xs bg-gray-100 text-gray-500 rounded-lg hover:bg-red-50 hover:text-red-600 transition border border-gray-200 hover:border-red-200"
                                                        title="Hapus capaian yang tidak valid"
                                                    >
                                                        🗑️ Hapus
                                                    </button>
                                                )}

                                                {/* ── SUPERADMIN: Semua aksi sesuai status ── */}
                                                {auth.user.role?.toLowerCase() === 'superadmin' && item.status === 'submitted' && (
                                                    <>
                                                        <button onClick={() => router.patch(route('achievements.verify', item.id))}
                                                            className="px-2.5 py-1 text-xs bg-amber-100 text-amber-700 rounded-lg hover:bg-amber-200 font-semibold border border-amber-200">
                                                            ✅ Verify
                                                        </button>
                                                        <button onClick={() => openRejectModal(item)}
                                                            className="px-2.5 py-1 text-xs bg-red-50 text-red-500 rounded-lg hover:bg-red-100 font-semibold border border-red-200">
                                                            ❌ Tolak
                                                        </button>
                                                    </>
                                                )}
                                                {auth.user.role?.toLowerCase() === 'superadmin' && item.status === 'verified' && (
                                                    <>
                                                        <button onClick={() => router.patch(route('achievements.approve', item.id))}
                                                            className="px-2.5 py-1 text-xs bg-emerald-100 text-emerald-700 rounded-lg hover:bg-emerald-200 font-semibold border border-emerald-200">
                                                            🎉 Approve
                                                        </button>
                                                        <button onClick={() => openRejectModal(item)}
                                                            className="px-2.5 py-1 text-xs bg-red-50 text-red-500 rounded-lg hover:bg-red-100 font-semibold border border-red-200">
                                                            ❌ Tolak
                                                        </button>
                                                    </>
                                                )}

                                                {/* Unit Kerja: boleh hapus yg masih dikirim (Submitted/Verified) sebelum Approved */}
                                                {!isWadirOrDirektur && ['submitted', 'verified'].includes(item.status) && (
                                                    <button onClick={() => { if (confirm('Hapus capaian ini?')) router.delete(route('achievements.destroy', item.id)); }}
                                                        className="px-2.5 py-1 text-xs text-red-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition border border-transparent hover:border-red-200"
                                                        title="Hapus">
                                                        🗑️ Hapus
                                                    </button>
                                                )}

                                                {/* Unit Kerja: hanya boleh hapus yg masih Draft */}
                                                {!isWadirOrDirektur && item.status === 'draft' && (
                                                    <button onClick={() => { if (confirm('Hapus capaian draft ini?')) router.delete(route('achievements.destroy', item.id)); }}
                                                        className="px-2.5 py-1 text-xs text-red-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition border border-transparent hover:border-red-200"
                                                        title="Hapus">
                                                        🗑️
                                                    </button>
                                                )}
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            <Modal show={isModalOpen} onClose={closeModal} maxWidth="lg">
                <div className="p-6">
                    <div className="flex items-center justify-between mb-5 pb-4 border-b border-gray-100">
                        <div>
                            <h2 className="text-xl font-bold text-gray-800">Ajukan Capaian IKU</h2>
                            <p className="text-sm text-gray-500 mt-0.5">Isi data capaian sesuai target IKU yang ditugaskan</p>
                        </div>
                        <button onClick={closeModal} className="text-gray-400 hover:text-gray-600 text-2xl leading-none">&times;</button>
                    </div>
                    <form onSubmit={submitAchievement} className="space-y-4">
                        {/* Pilih Indikator */}
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-1.5">Indikator IKU <span className="text-red-500">*</span></label>
                            <select value={data.indicator_id} onChange={handleIndicatorChange}
                                className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-pens-500 focus:border-pens-500" required>
                                <option value="">— Pilih Indikator IKU —</option>
                                {myIndicators?.map(ind => (
                                    <option key={ind.id} value={ind.id}>
                                        {ind.code} — {ind.description?.substring(0, 60)}{ind.description?.length > 60 ? '...' : ''}
                                    </option>
                                ))}
                            </select>
                            {errors.indicator_id && <p className="text-red-500 text-xs mt-1">{errors.indicator_id}</p>}
                        </div>

                        {/* Info Card IKU */}
                        {selectedIndicator && (
                            <div className="bg-pens-50 border border-pens-200 rounded-xl p-4 space-y-2.5">
                                <div className="flex items-center gap-2">
                                    <span className="px-2.5 py-0.5 bg-pens-600 text-white text-xs font-bold rounded-lg">{selectedIndicator.code}</span>
                                    <span className="text-xs text-pens-700 font-semibold uppercase tracking-wide">
                                        {selectedIndicator.data_type === 'percent' ? 'Persentase (%)' : selectedIndicator.data_type}
                                    </span>
                                </div>
                                <div>
                                    <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">📋 Deskripsi Indikator</p>
                                    <p className="text-sm text-gray-700 leading-relaxed">{selectedIndicator.description}</p>
                                </div>
                                {selectedIndicator.formula && (
                                    <div>
                                        <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">🔢 Formula</p>
                                        <p className="text-sm text-pens-800 bg-white border border-pens-100 rounded-lg px-3 py-2 font-mono">{selectedIndicator.formula}</p>
                                    </div>
                                )}
                                {selectedIndicator.targets?.length > 0 && (
                                    <div className="flex items-center gap-2 flex-wrap pt-1">
                                        <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide">🎯 Target:</span>
                                        {selectedIndicator.targets.slice(0, 3).map(t => (
                                            <span key={t.id} className="px-2.5 py-0.5 bg-white border border-pens-200 rounded-full text-xs font-bold text-pens-700">
                                                {t.year}: {t.target_value}{selectedIndicator.data_type === 'percent' ? '%' : ''}
                                            </span>
                                        ))}
                                    </div>
                                )}
                            </div>
                        )}

                        {/* Tahun & Nilai */}
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-1.5">Tahun <span className="text-red-500">*</span></label>
                                <input type="number" value={data.year} onChange={e => setData('year', e.target.value)}
                                    className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-pens-500"
                                    placeholder="2026" required />
                                {errors.year && <p className="text-red-500 text-xs mt-1">{errors.year}</p>}
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                                    Nilai Realisasi {selectedIndicator?.data_type === 'percent' ? '(%)' : ''} <span className="text-red-500">*</span>
                                </label>
                                <input type="number" step="0.01" value={data.value} onChange={e => setData('value', e.target.value)}
                                    className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-pens-500"
                                    placeholder="Contoh: 85.5" required />
                                {errors.value && <p className="text-red-500 text-xs mt-1">{errors.value}</p>}
                            </div>
                        </div>

                        {/* Catatan */}
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-1.5">Catatan <span className="text-gray-400 font-normal">(opsional)</span></label>
                            <textarea value={data.description} onChange={e => setData('description', e.target.value)}
                                placeholder="Penjelasan singkat mengenai nilai realisasi ini..." rows={2}
                                className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-pens-500" />
                        </div>

                        {/* Upload Bukti */}
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-1.5">Bukti Pendukung <span className="text-gray-400 font-normal">(PDF/Gambar)</span></label>
                            <input type="file" accept="application/pdf,image/*" onChange={e => setData('proof', e.target.files[0])}
                                className="w-full text-sm text-gray-500 file:mr-3 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-pens-50 file:text-pens-700 hover:file:bg-pens-100 border border-gray-200 rounded-xl p-2 cursor-pointer" />
                            {errors.proof && <p className="text-red-500 text-xs mt-1">{errors.proof}</p>}
                        </div>

                        {/* Tombol */}
                        <div className="flex justify-end gap-3 pt-2 border-t border-gray-100">
                            <button type="button" onClick={closeModal}
                                className="px-4 py-2 text-sm font-medium text-gray-600 bg-gray-100 rounded-xl hover:bg-gray-200 transition">Batal</button>
                            <button type="submit" disabled={processing}
                                className="px-5 py-2 text-sm font-semibold text-white bg-pens-600 rounded-xl hover:bg-pens-700 transition shadow-md disabled:opacity-50 flex items-center gap-2">
                                {processing ? '⏳ Menyimpan...' : '📤 Kirim Pengajuan'}
                            </button>
                        </div>
                    </form>
                </div>
            </Modal>

            {/* ── Modal Alasan Penolakan ── */}
            <Modal show={!!rejectModal} onClose={() => setRejectModal(null)} maxWidth="sm">
                <div className="p-6">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="w-10 h-10 bg-red-100 rounded-xl flex items-center justify-center text-xl flex-shrink-0">
                            ❌
                        </div>
                        <div>
                            <h2 className="text-lg font-bold text-gray-800">Tolak Pengajuan</h2>
                            <p className="text-sm text-gray-500">{rejectModal?.code}</p>
                        </div>
                    </div>

                    <div className="bg-amber-50 border border-amber-200 rounded-xl px-3 py-2.5 mb-4 flex items-start gap-2">
                        <span className="text-amber-500 text-sm mt-0.5">💡</span>
                        <p className="text-xs text-amber-700">
                            Alasan penolakan akan ditampilkan kepada Unit Kerja agar mereka bisa memperbaiki pengajuannya.
                        </p>
                    </div>

                    <div className="mb-4">
                        <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                            Alasan Penolakan <span className="text-gray-400 font-normal">(opsional namun disarankan)</span>
                        </label>
                        <textarea
                            value={rejectionReason}
                            onChange={e => setRejectionReason(e.target.value)}
                            placeholder="Contoh: Nilai tidak sesuai target IKU, mohon lampirkan dokumen pendukung yang valid..."
                            rows={4}
                            className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-red-400 focus:border-red-400 resize-none"
                        />
                        <p className="text-xs text-gray-400 mt-1">{rejectionReason.length}/500 karakter</p>
                    </div>

                    <div className="flex justify-end gap-3">
                        <button
                            onClick={() => setRejectModal(null)}
                            className="px-4 py-2 text-sm font-medium text-gray-600 bg-gray-100 rounded-xl hover:bg-gray-200 transition"
                        >
                            Batal
                        </button>
                        <button
                            onClick={submitReject}
                            className="px-4 py-2 text-sm font-semibold text-white bg-red-500 rounded-xl hover:bg-red-600 transition shadow-sm"
                        >
                            ❌ Konfirmasi Tolak
                        </button>
                    </div>
                </div>
            </Modal>
        </AuthenticatedLayout>
    );
}
