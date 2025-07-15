<?php

namespace App\Http\Controllers;

use App\Models\Guru;
use App\Models\Kelas;
use App\Models\Siswa;
use Illuminate\Http\Request;
use Inertia\Inertia;

class KelasController extends Controller
{
    public function index()
    {
        $kelases = Kelas::with('wali_kelas')->get();

        return Inertia::render('kelas/index', [
            'kelases' => $kelases
        ]);
    }

    public function siswa(Kelas $kelas)
    {
        $kelas->load('wali_kelas'); // pastikan wali_kelas ikut dikirim

        $siswas = Siswa::with('kelas')->where('kelas_id', $kelas->id)->get();

        return Inertia::render('kelas/siswa-kelas', [
            'kelas' => $kelas,
            'siswas' => $siswas,
        ]);
    }

    public function create()
    {
        $wali = Guru::get();

        return Inertia::render('kelas/tambah', [
            'wali' => $wali
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'nama' => 'required',
            'wali_kelas_id' => 'required',
        ]);

        Kelas::create($validated);

        return redirect()->route('kelas.index')->with('success', 'Data kelas berhasil ditambahkan');
    }

    public function edit($id)
    {
        $kelases = Kelas::find($id);
        $wali = Guru::get();

        return Inertia::render('kelas/edit', [
            'kelases' => $kelases,
            'wali' => $wali
        ]);
    }

    public function update(Request $request, $id)
    {
        $validated = $request->validate([
            'nama' => 'required',
            'wali_kelas_id' => 'required',
        ]);

        Kelas::findOrFail($id)->update($validated);

        return redirect()->route('kelas.index')->with('success', 'Data kelas berhasil diubah');
    }

    public function destroy($id)
    {
        Kelas::findOrFail($id)->delete();

        return redirect()->route('kelas.index')->with('success', 'Data kelas berhasil dihapus');
    }
}
