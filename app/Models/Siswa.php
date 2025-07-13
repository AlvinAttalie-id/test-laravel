<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Siswa extends Model
{
    protected $table = 'siswa';

    protected $fillable = ['nis', 'nama', 'alamat', 'kelas_id', 'tanggal_lahir'];

    public function kelas()
    {
        return $this->belongsTo(Kelas::class);
    }
}
