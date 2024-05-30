<?php

namespace App\Models;

use App\Exceptions\DesenvolvedoresAssociadosException;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Nivel extends Model
{
    use HasFactory;
    protected $fillable=[
        'nivel'
    ];

    public function desenvolvedors(){
        return $this->hasMany(Desenvolvedor::class,'nivel_id');
    }

    public function getAssociadosAttribute(): int
    {
        return $this->desenvolvedors()->count();
    }

    // Método para verificar se existem desenvolvedores associados
    public function temDesenvolvedoresAssociados()
    {
        return $this->desenvolvedors()->exists();
    }

    // Sobrescrevendo o método destroy para verificar se pode excluir
    public static function destroy($ids)
    {
        foreach ((array) $ids as $id) {
            $nivel = static::findOrFail($id);

            if ($nivel->temDesenvolvedoresAssociados()) {
                throw new DesenvolvedoresAssociadosException('Não é possível excluir o nível "' . $nivel->nivel . '", pois existem desenvolvedores associados.');
            }

            $nivel->delete();
        }
    }
}
