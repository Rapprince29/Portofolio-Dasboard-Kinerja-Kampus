<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class IndicatorAchievement extends Model
{
    protected $fillable = [
        'indicator_id', 'user_id', 'year', 'value', 'numerator_value', 'denominator_value', 'status', 'verified_by',
        'description', 'proof_path', 'rejection_reason',
        'is_read', 'is_read_wadir', 'is_read_direktur', 'status_changed_at',
    ];

    protected $casts = [
        'is_read'           => 'boolean',
        'is_read_wadir'     => 'boolean',
        'is_read_direktur'  => 'boolean',
        'status_changed_at' => 'datetime',
    ];

    public function indicator() { return $this->belongsTo(Indicator::class); }
    public function user() { return $this->belongsTo(User::class); }
    public function verifier() { return $this->belongsTo(User::class, 'verified_by'); }
}
