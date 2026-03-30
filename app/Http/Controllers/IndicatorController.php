<?php

namespace App\Http\Controllers;

use App\Http\Requests\IndicatorInputRequest;
use App\Models\IndicatorAchievement;
use App\Models\IndicatorPic;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Inertia\Response;

class IndicatorController extends Controller
{
    /**
     * Catatan untuk Dosen Pembimbing:
     * Controller ini disediakan khusus untuk manajemen CRUD (Create, Read, Update, Delete)
     * Master Data dari 43 IKU (Indicator), BUKAN untuk input/review Capaian (IndicatorAchievement).
     *
     * Logika pengajuan dan review capaian secara clean architecture 
     * telah dipindahkan 100% ke dalam AchievementController.
     */

    public function index()
    {
        // Fitur masa depan: Admin/Wadir melihat daftar semua Indikator IKU (bukan capaiannya)
        // return Inertia::render('Indicators/MasterList');
    }

    // Bisa ditambahkan create(), store(), dll sesuai rancangan untuk mengelola tabel `indicators`.
}
