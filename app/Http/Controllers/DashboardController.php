<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Indicator;
use App\Models\IndicatorAchievement;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index(Request $request, \App\Services\DashboardService $dashboardService)
    {
        /** @var \App\Models\User $user */
        $user = auth()->user();
        $currentYear = $request->query('year', date('Y'));

        // ====================================
        // Clean Code: Delegate logic to Data Service
        // ====================================
        $dashboardData = $dashboardService->getDashboardData($user, $currentYear);

        return Inertia::render('Dashboard', $dashboardData);
    }
}
