<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Indicator extends Model
{
    protected $fillable = ['code', 'description', 'data_type', 'formula', 'numerator_label', 'denominator_label'];

    public function targets() { return $this->hasMany(IndicatorTarget::class); }
    public function pics() { return $this->hasMany(IndicatorPic::class); }
    public function achievements() { return $this->hasMany(IndicatorAchievement::class); }
}
