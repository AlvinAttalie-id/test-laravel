<?php

namespace App\Http\Controllers;

use App\Models\Kelas;
use App\Models\Siswa;
use Illuminate\Http\Request;
use Inertia\Inertia;

class SiswaController extends Controller
{
    public function index()
    {
        $siswas = Siswa::with('kelas')->get();

        return Inertia::render('siswa/index', [
            'siswas' => $siswas
        ]);
    }

    public function create()
    {
        $kelas = Kelas::get();

        return Inertia::render('siswa/tambah', [
            'kelas' => $kelas
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'nama' => 'required',
            'nis' => 'required',
            'kelas_id' => 'required',
            'tanggal_lahir' => 'required',
            'alamat' => 'required',
        ]);

        Siswa::create($validated);

        return redirect()->route('siswa.index')->with('success', 'Data Siswa berhasil ditambahkan');
    }

    public function edit($id)
    {
        $siswa = Siswa::find($id);
        $kelas = Kelas::get();

        return Inertia::render('siswa/edit', [
            'siswa' => $siswa,
            'kelas' => $kelas
        ]);
    }

    public function update(Request $request, $id)
    {
        $validated = $request->validate([
            'nama' => 'required',
            'nis' => 'required',
            'kelas_id' => 'required',
            'tanggal_lahir' => 'required',
            'alamat' => 'required',
        ]);

        Siswa::find($id)->update($validated);

        return redirect()->route('siswa.index')->with('success', 'Data Siswa berhasil diubah');
    }

    public function destroy($id)
    {
        Siswa::destroy($id);

        return redirect()->route('siswa.index')->with('success', 'Data Siswa berhasil dihapus');
    }
}
