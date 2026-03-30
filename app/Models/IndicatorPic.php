<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class IndicatorPic extends Model
{
    protected $fillable = ['indicator_id', 'user_id'];

    public function indicator() { return $this->belongsTo(Indicator::class); }
    public function user() { return $this->belongsTo(User::class); }
}
