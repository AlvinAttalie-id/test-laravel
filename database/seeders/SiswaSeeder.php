<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Siswa;
use App\Models\Kelas;

class SiswaSeeder extends Seeder
{
    public function run(): void
    {
        $kelasIds = Kelas::pluck('id')->toArray();
        for ($i = 1; $i <= 500; $i++) {
            Siswa::create([
                'nis' => str_pad($i, 10, '0', STR_PAD_LEFT),
                'nama' => "Siswa $i",
                'tanggal_lahir' => now()->subYears(rand(16, 18))->subDays(rand(0, 365))->toDateString(),
                'alamat' => "Jl. Contoh No. $i",
                'kelas_id' => $kelasIds[array_rand($kelasIds)],
            ]);
        }
    }
}
