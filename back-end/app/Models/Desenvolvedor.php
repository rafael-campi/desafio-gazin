<?php

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Desenvolvedor extends Model
{
    use HasFactory;
    protected $fillable = [
        "nome",
        "sexo",
        "data_nascimento",
        "hobby",
        "nivel_id" 
    ];
    
    public function getIdadeAttribute(): int {
        return (int) Carbon::parse($this->attributes['data_nascimento'])->age;
    }

    public function nivel(): BelongsTo{
        return $this->belongsTo(Nivel::class,'nivel_id');
    }
   
}
