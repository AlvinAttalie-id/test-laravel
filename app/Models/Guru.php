<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Guru extends Model
{
    protected $table = 'guru';
    protected $fillable = ['nip', 'nama', 'no_hp'];

    public function kelas()
    {
        return $this->hasMany(Kelas::class, 'wali_kelas_id');
    }
}
