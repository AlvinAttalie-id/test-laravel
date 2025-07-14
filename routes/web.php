<?php

use App\Http\Controllers\DashboardController;
use Inertia\Inertia;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\GuruController;
use App\Http\Controllers\JadwalPelajaranController;
use App\Http\Controllers\KelasController;
use App\Http\Controllers\MapelController;
use App\Http\Controllers\NilaiController;
use App\Http\Controllers\SiswaController;
use App\Http\Controllers\UserController;

Route::get('/home', function () {
    return Inertia::render('welcome');
})->name('home');

Route::redirect('/', '/dashboard');

Route::middleware(['auth'])->group(function () {
    Route::get('/dashboard', [DashboardController::class, 'index'])->name('dashboard');

    Route::prefix('users')->group(function () {
        Route::get('/', [UserController::class, 'index']);
    });

    Route::prefix('guru')->group(function () {
        Route::get('/', [GuruController::class, 'index'])->name('guru.index');
        Route::get('/create', [GuruController::class, 'create'])->name('guru.create');
        Route::post('', [GuruController::class, 'store'])->name('guru.store');
        Route::get('/edit/{id}', [GuruController::class, 'edit'])->name('guru.edit');
        Route::post('/update/{id}', [GuruController::class, 'update'])->name('guru.update');
        Route::delete('/delete/{id}', [GuruController::class, 'destroy'])->name('guru.destroy');
    });

    Route::prefix('kelas')->group(function () {
        Route::get('/', [KelasController::class, 'index'])->name('kelas.index');
        Route::get('/create', [KelasController::class, 'create'])->name('kelas.create');
        Route::post('', [KelasController::class, 'store'])->name('kelas.store');
        Route::get('/{kelas}/siswa', [KelasController::class, 'siswa'])->name('kelas.siswa');
        Route::get('/{guru}/kelas', [GuruController::class, 'kelas'])->name('guru.kelas');
        Route::get('/edit/{id}', [KelasController::class, 'edit'])->name('kelas.edit');
        Route::post('/update/{id}', [KelasController::class, 'update'])->name('kelas.update');
        Route::delete('/delete/{id}', [KelasController::class, 'destroy'])->name('kelas.destroy');
    });

    Route::prefix('siswa')->group(function () {
        Route::get('/', [SiswaController::class, 'index'])->name('siswa.index');
        Route::get('/create', [SiswaController::class, 'create'])->name('siswa.create');
        Route::post('', [SiswaController::class, 'store'])->name('siswa.store');
        Route::get('/edit/{id}', [SiswaController::class, 'edit'])->name('siswa.edit');
        Route::post('/update/{id}', [SiswaController::class, 'update'])->name('siswa.update');
        Route::delete('/delete/{id}', [SiswaController::class, 'destroy'])->name('siswa.destroy');
    });
});

require __DIR__ . '/settings.php';
require __DIR__ . '/auth.php';
