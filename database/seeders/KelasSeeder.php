<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Kelas;
use App\Models\Guru;

class KelasSeeder extends Seeder
{
    public function run(): void
    {
        $tingkatan = ['X', 'XI', 'XII'];
        $jurusan = ['MIPA', 'IPS', 'Bahasa'];
        $guruIds = Guru::pluck('id')->shuffle()->values(); // Acak guru

        $i = 0;
        foreach ($tingkatan as $tingkat) {
            foreach ($jurusan as $jrs) {
                for ($n = 1; $n <= 5; $n++) {
                    Kelas::create([
                        'nama' => "$tingkat $jrs $n",
                        'wali_kelas_id' => $guruIds[$i % $guruIds->count()],
                    ]);
                    $i++;
                }
            }
        }
    }
}
