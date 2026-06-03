<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ResearchGroup extends Model
{
    protected $fillable = ['name'];

    public function achievements()
    {
        return $this->hasMany(IndicatorAchievement::class);
    }
}
