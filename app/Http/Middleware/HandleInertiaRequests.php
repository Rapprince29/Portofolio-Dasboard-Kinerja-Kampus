<?php

namespace App\Http\Middleware;

use Illuminate\Http\Request;
use Inertia\Middleware;
use App\Models\IndicatorAchievement;

class HandleInertiaRequests extends Middleware
{
    /**
     * The root template that is loaded on the first page visit.
     *
     * @var string
     */
    protected $rootView = 'app';

    /**
     * Determine the current asset version.
     */
    public function version(Request $request): ?string
    {
        return parent::version($request);
    }

    /**
     * Define the props that are shared by default.
     *
     * @return array<string, mixed>
     */
    public function share(Request $request): array
    {
        $user = $request->user();
        $unreadCount = 0;
        $unreadNotifications = [];

        if ($user) {
            $role = strtolower($user->role);

            if ($role === 'unit_kerja') {
                // Unit Kerja: notif saat statusnya berubah oleh Wadir/Direktur
                $items = IndicatorAchievement::where('user_id', $user->id)
                    ->where('is_read', false)
                    ->whereIn('status', ['verified', 'approved', 'rejected'])
                    ->with('indicator')
                    ->orderByDesc('status_changed_at')
                    ->get();

                $unreadCount = $items->count();
                $unreadNotifications = $items->map(fn($a) => [
                    'id'         => $a->id,
                    'code'       => $a->indicator?->code,
                    'status'     => $a->status,
                    'changed_at' => $a->status_changed_at?->diffForHumans(),
                    'reason'     => $a->rejection_reason,
                ]);

            } elseif (in_array($role, ['wadir', 'superadmin'])) {
                // Wadir: notif saat Unit Kerja SUBMIT atau Direktur APPROVED/REJECTED
                $items = IndicatorAchievement::where('is_read_wadir', false)
                    ->whereIn('status', ['submitted', 'approved', 'rejected'])
                    ->with(['indicator', 'user'])
                    ->orderByDesc('updated_at')
                    ->get();

                $unreadCount = $items->count();
                $unreadNotifications = $items->map(fn($a) => [
                    'id'         => $a->id,
                    'code'       => $a->indicator?->code,
                    'status'     => $a->status,
                    'from'       => $a->user?->name,
                    'changed_at' => $a->status == 'submitted' ? $a->created_at?->diffForHumans() : $a->updated_at?->diffForHumans(),
                ]);

            } elseif ($role === 'direktur') {
                // Direktur: notif saat ada capaian yang sudah diverifikasi Wadir
                $items = IndicatorAchievement::where('is_read_direktur', false)
                    ->where('status', 'verified')
                    ->with(['indicator', 'user'])
                    ->orderByDesc('updated_at')
                    ->get();

                $unreadCount = $items->count();
                $unreadNotifications = $items->map(fn($a) => [
                    'id'         => $a->id,
                    'code'       => $a->indicator?->code,
                    'status'     => 'verified',
                    'from'       => $a->user?->name,
                    'changed_at' => $a->updated_at?->diffForHumans(),
                ]);
            }
        }

        return [
            ...parent::share($request),
            'auth' => ['user' => $user],
            'flash' => [
                'success' => fn() => $request->session()->get('success'),
                'error'   => fn() => $request->session()->get('error'),
            ],
            'notifications' => [
                'count' => $unreadCount,
                'items' => $unreadNotifications,
            ],
        ];
    }
}
