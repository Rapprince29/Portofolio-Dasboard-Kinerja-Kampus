<?php

namespace Database\Seeders;

use App\Models\Indicator;
use App\Models\IndicatorPic;
use App\Models\User;
use Illuminate\Database\Seeder;

class IndicatorPicSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $akademik = User::where('email', 'akademik@pens.ac.id')->first();
        $kemahasiswaan = User::where('email', 'kemahasiswaan@pens.ac.id')->first();

        $indicators = Indicator::all();

        if ($akademik) {
            $akademikList = $indicators->take(22);
            foreach ($akademikList as $ind) {
                IndicatorPic::updateOrCreate([
                    'user_id' => $akademik->id,
                    'indicator_id' => $ind->id,
                ]);
            }
        }

        if ($kemahasiswaan) {
            $kemahasiswaanList = $indicators->skip(22);
            foreach ($kemahasiswaanList as $ind) {
                IndicatorPic::updateOrCreate([
                    'user_id' => $kemahasiswaan->id,
                    'indicator_id' => $ind->id,
                ]);
            }
        }
    }
}
