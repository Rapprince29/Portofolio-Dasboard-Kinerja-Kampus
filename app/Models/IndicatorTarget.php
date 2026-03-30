<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class IndicatorTarget extends Model
{
    protected $fillable = ['indicator_id', 'year', 'target_value'];

    public function indicator() { return $this->belongsTo(Indicator::class); }
}
