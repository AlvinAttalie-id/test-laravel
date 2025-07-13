<?php

namespace App\Http\Controllers;

use App\Models\Guru;
use App\Models\Kelas;
use App\Models\Siswa;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index()
    {
        $totalGuru = Guru::count();
        $totalSiswa = Siswa::count();
        $totalKelas = Kelas::count();

        return Inertia::render('dashboard', [
            'totalGuru' => $totalGuru,
            'totalSiswa' => $totalSiswa,
            'totalKelas' => $totalKelas,
        ]);
    }
}
