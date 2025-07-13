<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Guru;

class GuruSeeder extends Seeder
{
    public function run(): void
    {
        for ($i = 1; $i <= 25; $i++) {
            Guru::create([
                'nip' => str_pad($i, 10, '0', STR_PAD_LEFT),
                'nama' => "Guru ke-$i",
                'no_hp' => '08' . rand(1000000000, 9999999999),
            ]);
        }
    }
}
