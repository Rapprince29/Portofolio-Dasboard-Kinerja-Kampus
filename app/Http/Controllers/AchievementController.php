<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\IndicatorAchievement;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;

class AchievementController extends Controller
{
    public function index(Request $request)
    {
        $user = Auth::user();
        $year = $request->query('year', now()->year);
        $role = strtolower($user->role);

        $query = IndicatorAchievement::with(['indicator', 'user'])
            ->where('year', $year)
            ->orderBy('created_at', 'desc');

        if (in_array($role, ['wadir', 'direktur', 'superadmin'])) {
            $achievements = $query->get();
        } else {
            $achievements = $query->where('user_id', $user->id)->get();
        }

        // Ambil Indikator milik unit kerja ini + target tahun ini, untuk Form & Info Card
        $myIndicators = \App\Models\Indicator::whereHas('pics', function($query) use ($user) {
            $query->where('user_id', $user->id);
        })->with(['targets' => function($q) {
            $q->orderBy('year', 'desc');
        }])->get();

        // Tahun yang benar-benar ada datanya (untuk panduan di filter)
        $availableYears = IndicatorAchievement::selectRaw('DISTINCT year')
            ->orderBy('year', 'desc')
            ->pluck('year')
            ->toArray();

        return \Inertia\Inertia::render('Achievements/Index', [
            'achievements'   => $achievements,
            'myIndicators'   => $myIndicators,
            'currentYear'    => (int)$year,
            'availableYears' => $availableYears,
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'indicator_id' => 'required|exists:indicators,id',
            'year' => 'required|integer',
            'value' => 'nullable|numeric',
            'numerator_value' => 'nullable|numeric',
            'denominator_value' => 'nullable|numeric',
            'description' => 'nullable|string',
            'proof' => 'nullable|file|mimes:pdf,jpg,jpeg,png|max:10240',
        ]);

        // Smart Logic: Hitung otomatis persentase jika ada numerator & denominator
        if ($request->filled('numerator_value') && $request->filled('denominator_value') && $request->denominator_value > 0) {
            $validated['value'] = ($request->numerator_value / $request->denominator_value) * 100;
        }

        if ($request->hasFile('proof')) {
            $path = $request->file('proof')->store('proofs', 'public');
            $validated['proof_path'] = $path;
        }

        $validated['user_id']       = Auth::id();
        $validated['status']         = 'submitted'; // Kembali ke status submitted (Tugas Wadir)
        $validated['is_read_wadir']  = false; // 🔔 Wadir mendapat notifikasi pengajuan baru

        IndicatorAchievement::create($validated);

        return redirect()->back()->with('success', 'Capaian berhasil diajukan dan menunggu verifikasi Wadir.');
    }

    public function destroy(IndicatorAchievement $achievement)
    {
        $user = Auth::user();
        $role = strtolower($user->role);

        // Direktur, Wadir & Superadmin: boleh hapus capaian APAPUN
        if (in_array($role, ['direktur', 'wadir', 'superadmin'])) {
            if ($achievement->proof_path) {
                \Illuminate\Support\Facades\Storage::disk('public')->delete($achievement->proof_path);
            }
            $achievement->delete();
            return redirect()->back()->with('success', 'Capaian berhasil dihapus.');
        }

        // Unit Kerja: hanya boleh hapus milik sendiri dengan status DRAFT saja
        // (rejected tidak boleh dihapus oleh Unit Kerja — itu rekam jejak penting)
        // Unit Kerja: boleh hapus milik sendiri selama belum APPROVED
        if ($achievement->user_id !== $user->id) {
            abort(403, 'Akses ditolak.');
        }

        if ($achievement->status === 'approved') {
            return redirect()->back()->with('error', 'Capaian yang sudah disetujui tidak dapat dihapus oleh Unit Kerja.');
        }

        if ($achievement->proof_path) {
            \Illuminate\Support\Facades\Storage::disk('public')->delete($achievement->proof_path);
        }

        $achievement->delete();
        return redirect()->back()->with('success', 'Capaian berhasil dihapus.');
    }

    /**
     * Wadir verifies a submission.
     */
    public function verify(IndicatorAchievement $achievement)
    {
        $user = Auth::user();
        if (!in_array(strtolower($user->role), ['wadir', 'superadmin'])) { abort(403); }

        $achievement->update([
            'status'             => 'verified',
            'verified_by'        => $user->id,
            'is_read_wadir'      => true,
            'is_read_direktur'   => false, // 🔔 Direktur mendapat notifikasi setelah diverifikasi Wadir
            'is_read'            => false,
            'status_changed_at'  => now(),
        ]);
        return redirect()->back()->with('success', 'Capaian berhasil diverifikasi. Menunggu persetujuan Direktur.');
    }

    /**
     * Direktur approves a submission.
     */
    public function approve(IndicatorAchievement $achievement)
    {
        $user = Auth::user();
        if (!in_array(strtolower($user->role), ['direktur', 'superadmin'])) { abort(403); }

        $achievement->update([
            'status'             => 'approved',
            'is_read_direktur'   => true,    // Direktur sudah aksi
            'is_read_wadir'      => false,   // 🔔 Beri tahu Wadir: "Data yang kamu verifikasi sudah di-Approve"
            'is_read'            => false,   // 🔔 Beri tahu Unit Kerja: "Selamat, data disetujui!"
            'status_changed_at'  => now(),
        ]);
        return redirect()->back()->with('success', 'Pencapaian berhasil disetujui Direktur.');
    }

    /**
     * Reject a submission.
     */
    public function reject(Request $request, IndicatorAchievement $achievement)
    {
        $request->validate([
            'rejection_reason' => 'nullable|string|max:500',
        ]);

        $achievement->update([
            'status'             => 'rejected',
            'rejection_reason'   => $request->rejection_reason,
            'is_read'           => false, // 🔔 Notif feedback ke Unit Kerja
            'is_read_wadir'     => false, // 🔔 Notif feedback ke Wadir
            'is_read_direktur'  => true,
            'status_changed_at'  => now(),
        ]);
        return redirect()->back()->with('success', 'Capaian ditolak. Alasan telah dikirim ke Unit Kerja.');
    }

    /**
     * Mark all unread notifications as read (dipanggil saat user klik ikon lonceng).
     */
    public function markNotificationsRead(Request $request)
    {
        $user = Auth::user();
        $role = trim(strtolower($user->role));
        $updatedRows = 0;

        Log::info("Marking read for user: " . $user->name . " (Role: " . $role . ")");

        if ($role === 'unit_kerja') {
            $updatedRows = IndicatorAchievement::where('user_id', $user->id)
                ->where('is_read', false)
                ->update(['is_read' => true]);

        } elseif (in_array($role, ['wadir', 'superadmin'])) {
            $updatedRows = IndicatorAchievement::where('is_read_wadir', false)
                ->update(['is_read_wadir' => true]);

        } elseif ($role === 'direktur') {
            $updatedRows = IndicatorAchievement::where('is_read_direktur', false)
                ->update(['is_read_direktur' => true]);
        }

        Log::info("Rows successfully updated in DB: " . $updatedRows);

        // Langsung redirect saja, Inertia akan otomatis refresh props 'notifications'
        return redirect()->back();
    }

    /**
     * Endpoint ringan khusus polling (dipanggil setiap 30 detik oleh frontend).
     * Hanya mengembalikan jumlah notif + data minimal — tidak load full page.
     */
    public function getNotificationCount()
    {
        $user = Auth::user();
        $role = strtolower($user->role);

        $count = 0;
        $items = [];

        if ($role === 'unit_kerja') {
            $rows = IndicatorAchievement::where('user_id', $user->id)
                ->where('is_read', false)
                ->whereIn('status', ['verified', 'approved', 'rejected'])
                ->with('indicator:id,code')
                ->orderByDesc('status_changed_at')
                ->get(['id', 'indicator_id', 'status', 'rejection_reason', 'status_changed_at']);

            $count = $rows->count();
            $items = $rows->map(fn($a) => [
                'id'         => $a->id,
                'code'       => $a->indicator?->code,
                'status'     => $a->status,
                'changed_at' => $a->status_changed_at?->diffForHumans(),
                'reason'     => $a->rejection_reason,
            ]);

        } elseif (in_array($role, ['wadir', 'superadmin'])) {
            // Wadir: notif saat ada Unit Kerja baru SUBMIT atau Direktur APPROVED/REJECTED data yang dia verifikasi sebelumnya
            $rows = IndicatorAchievement::where('is_read_wadir', false)
                ->whereIn('status', ['submitted', 'approved', 'rejected'])
                ->with(['indicator:id,code', 'user:id,name'])
                ->orderByDesc('updated_at')
                ->get(['id', 'indicator_id', 'user_id', 'status', 'created_at', 'updated_at']);

            $count = $rows->count();
            $items = $rows->map(fn($a) => [
                'id'         => $a->id,
                'code'       => $a->indicator?->code,
                'status'     => $a->status,
                'from'       => $a->user?->name,
                'changed_at' => $a->status == 'submitted' ? $a->created_at?->diffForHumans() : $a->updated_at?->diffForHumans(),
            ]);

            } else {
                // Direktur: notif saat ada capaian yang sudah diverifikasi Wadir
                $items = IndicatorAchievement::where('is_read_direktur', false)
                    ->where('status', 'verified')
                    ->with(['indicator', 'user'])
                    ->orderByDesc('updated_at')
                    ->get();

                $count = $items->count();
                $items = $items->map(fn($a) => [
                    'id'         => $a->id,
                    'code'       => $a->indicator?->code,
                    'status'     => 'verified',
                    'from'       => $a->user?->name,
                    'changed_at' => $a->updated_at?->diffForHumans(),
                ]);
            }

        return response()->json(['count' => $count, 'items' => $items]);
    }
}
