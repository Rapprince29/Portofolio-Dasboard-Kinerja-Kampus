<?php

namespace App\Services;

use App\Models\Indicator;
use App\Models\IndicatorAchievement;
use App\Models\User;

class DashboardService
{
    /**
     * Get all necessary data to be rendered on the Dashboard.
     *
     * @param User $user
     * @param int|string $currentYear
     * @return array
     */
    public function getDashboardData(User $user, $currentYear): array
    {
        $isWadirOrDirektur = $this->isWadirOrDirektur($user);

        $indicators = $this->fetchIndicators($user, $isWadirOrDirektur);
        $achievements = $this->fetchAchievements($user, $isWadirOrDirektur, $currentYear);

        $chartData = $this->processChartData($indicators, $achievements, $user, $isWadirOrDirektur);
        $yearlyTrends = $this->calculateYearlyTrends($indicators, $user, $isWadirOrDirektur, $currentYear);

        return [
            'currentYear' => $currentYear,
            'indicators' => $chartData['processedIndicators'],
            'overallAvg' => $chartData['overallAvg'],
            'stats' => $chartData['stats'],
            'yearlyTrends' => $yearlyTrends
        ];
    }

    /**
     * Check if the user role is Wadir, Direktur or Superadmin.
     */
    private function isWadirOrDirektur(User $user): bool
    {
        return in_array(strtolower($user->role), ['wadir', 'direktur', 'superadmin']);
    }

    /**
     * Fetch indicators based on user role.
     */
    private function fetchIndicators(User $user, bool $isWadirOrDirektur)
    {
        // BUG FIX: Change relationship from 'indicatorPics' to 'pics'
        $indicatorsQuery = Indicator::with(['pics.user.unit']);
        
        if (!$isWadirOrDirektur) {
            $indicatorsQuery->whereHas('pics', function($q) use ($user) {
                $q->where('user_id', $user->id);
            });
        }
        
        return $indicatorsQuery->get();
    }

    /**
     * Fetch achievements for the current year based on user role.
     */
    private function fetchAchievements(User $user, bool $isWadirOrDirektur, $currentYear)
    {
        $achievementsQuery = IndicatorAchievement::where('year', $currentYear);
        
        if (!$isWadirOrDirektur) {
            // Unit Kerja melihat apa yang mereka submit sendiri
            $achievementsQuery->where('user_id', $user->id);
        } else {
            // Atasan hanya memproses data yang sudah divalidasi/disetujui minimal oleh tingkat Wadir
            $achievementsQuery->whereIn('status', ['verified', 'approved']);
        }
        
        return $achievementsQuery->get();
    }

    /**
     * Process data for indicators to be displayed on charts.
     */
    private function processChartData($indicators, $achievements, User $user, bool $isWadirOrDirektur): array
    {
        $processedIndicators = [];
        $totalSum = 0;
        $achievedCount = 0;
        $onTrackCount = 0;
        $belowTargetCount = 0;

        foreach ($indicators as $ind) {
            // Filter capaian untuk indikator ini
            $indAchievements = $achievements->where('indicator_id', $ind->id);
            
            $computedValue = 0;
            if ($indAchievements->count() > 0) {
                // Rata-rata capaian jika dikerjakan >1 unit
                $computedValue = $indAchievements->avg('value');
            }

            // Target default 100 untuk implementasi saat ini karena target_value bisa bervariasi
            $target = 100;

            // Persentase keberhasilan
            $pct = $target > 0 ? ($computedValue / $target) * 100 : 0;
            $pct = round($pct, 2);

            // Tentukan label PIC
            $picLabels = $this->getPicLabels($ind, $user, $isWadirOrDirektur);

            // Klasifikasi pencapaian target
            if ($pct >= 80) $achievedCount++;
            else if ($pct >= 50) $onTrackCount++;
            else $belowTargetCount++;

            $totalSum += $pct;

            $processedIndicators[] = [
                'id' => $ind->id,
                'code' => $ind->code,
                'desc' => $ind->description,
                'target' => $target,
                'value' => round($computedValue, 2),
                'unit' => $picLabels,
                'pct' => $pct
            ];
        }

        $overallAvg = count($indicators) > 0 ? round($totalSum / count($indicators)) : 0;

        return [
            'processedIndicators' => $processedIndicators,
            'overallAvg' => $overallAvg,
            'stats' => [
                'total' => count($indicators),
                'achieved' => $achievedCount,
                'onTrack' => $onTrackCount,
                'belowTarget' => $belowTargetCount,
            ]
        ];
    }

    /**
     * Get labels for PICs based on role logic.
     */
    private function getPicLabels(Indicator $ind, User $user, bool $isWadirOrDirektur): string
    {
        if (!$isWadirOrDirektur) {
            return $user->unit ? $user->unit->name : $user->name;
        }

        $uniqueUnits = [];
        
        // BUG FIX: Change relationship from 'indicatorPics' to 'pics'
        foreach ($ind->pics as $pic) {
            if ($pic->user && $pic->user->unit) {
                $uniqueUnits[] = $pic->user->unit->name;
            }
        }
        
        return empty($uniqueUnits) ? '-' : implode(', ', array_unique($uniqueUnits));
    }

    /**
     * Calculate yearly trends for the last 5 years.
     */
    private function calculateYearlyTrends($indicators, User $user, bool $isWadirOrDirektur, $currentYear): array
    {
        $pastYears = [];
        for ($i = 4; $i >= 0; $i--) {
            $pastYears[] = (int)$currentYear - $i;
        }

        $trendData = [];
        $trendAchQuery = IndicatorAchievement::whereIn('year', $pastYears);
        
        if (!$isWadirOrDirektur) {
            $trendAchQuery->where('user_id', $user->id);
        } else {
            $trendAchQuery->whereIn('status', ['verified', 'approved']);
        }
        
        $allPasts = $trendAchQuery->get();

        foreach ($pastYears as $y) {
            $yearAch = $allPasts->where('year', $y);
            $yearSum = 0;
            
            foreach ($indicators as $ind) {
                $filterInd = $yearAch->where('indicator_id', $ind->id);
                $cV = $filterInd->count() > 0 ? $filterInd->avg('value') : 0;
                $pct = ($cV / 100) * 100; // default target 100
                $yearSum += $pct;
            }
            $trendData[] = count($indicators) > 0 ? round($yearSum / count($indicators), 2) : 0;
        }

        return [
            'labels' => $pastYears,
            'data' => $trendData,
            'targets' => array_fill(0, count($pastYears), 100)
        ];
    }
}
