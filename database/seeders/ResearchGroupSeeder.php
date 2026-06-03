<?php

namespace Database\Seeders;

use App\Models\ResearchGroup;
use Illuminate\Database\Seeder;

class ResearchGroupSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $groups = [
            'Biosignal and Medical Instrumentation',
            'Intelligent Control & Robotics',
            'Embedded Artificial Intelligent System',
            'Aquacultural Engineering Applied Technology',
            'Smart Sensors-Devices and Applied Systems',
            'Optimal Technologies for Instrumentation-Sensor-Circuit-Control System Design',
            'Telecommunication Support Technology for Easy Mobility (Tasty) Research Group',
            'Wireless Communication Research Group',
            'Mobile Network and Pervasive Computing',
            'Underwater Vehicle and Communication',
            'Telecommunication Signal Processing',
            'Mobile Communication and Security',
            'Smart Grid Technology',
            'High Voltage And Energy Storage',
            'Green Energy Transportation & Applications',
            'Power Electronics for Energy Conservation',
            'Power Quality and Applied Control',
            'Intelligent System Applications for Power System (ISAP)',
            'T ROVIAP (Robotic Vehicle and Its Applications)',
            'Intelligent Mechatronics & Robotics',
            'Sensor Fusion',
            'Kontrol Mekatronika',
            'Thermal Engineering',
            'Marine Energy Conversion',
            'Bio-Electrochemical System',
            'Green Electrification',
            'Data Centric Artificial Intelligent and e-Business System',
            'Health Informatics',
            'Agile Product Development',
            'Network and Cyber Security',
            'Knowledge Engineering (Knowing)',
            'Mobile Sensing & Edge Computing Technology (MSECT)',
            'Pervasive Computing',
            'Industrial Robotic and IoT (IRIT)',
            'Health and Bio Engineering (HeBring)',
            'Cyber-Physical Systems',
            'Social Robotics and Smart System Applications',
            'Digital Media',
            'Multimedia Imaging',
            'Edutainment Computing',
            'Game For Education And Cultural Heritage (Game Edu)',
            'Serious Game (SEGA)',
            'Multimedia Interaktif dan Animasi',
            'Human Centric Multimedia',
            'Data Science for SDG\'s Applied Solutions'
        ];

        foreach ($groups as $group) {
            ResearchGroup::firstOrCreate(['name' => $group]);
        }
    }
}
