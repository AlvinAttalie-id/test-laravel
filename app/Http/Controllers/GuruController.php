<?php

namespace App\Http\Controllers;

use App\Models\Guru;
use Illuminate\Http\Request;
use Inertia\Inertia;

class GuruController extends Controller
{
    public function index()
    {
        $gurus = Guru::with('kelas')->get();

        return Inertia::render('guru/index', [
            'gurus' => $gurus
        ]);
    }

    public function create()
    {
        return Inertia::render('guru/tambah');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'nama' => 'required',
            'nip' => 'required',
            'no_hp' => 'required',
        ]);

        Guru::create($validated);

        return redirect()->route('guru.index')->with('success', 'Data guru berhasil ditambahkan');
    }

    public function edit($id)
    {
        $gurus = Guru::findOrFail($id);

        return Inertia::render('guru/edit', [
            'gurus' => $gurus
        ]);
    }

    public function update(Request $request, $id)
    {
        $validated = $request->validate([
            'nama' => 'required',
            'nip' => 'required',
            'no_hp' => 'required',
        ]);

        Guru::findOrFail($id)->update($validated);

        return redirect()->route('guru.index')->with('success', 'Data guru berhasil diubah');
    }

    public function destroy($id)
    {
        Guru::findOrFail($id)->delete();

        return redirect()->route('guru.index')->with('success', 'Data guru berhasil dihapus');
    }
}
