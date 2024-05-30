<?php

namespace App\Http\Resources;

use App\Models\Nivel;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class DesenvolvedorResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    protected $foo;

    public function foo($value)
    {
        $this->foo = $value;
        return $this;
    }
    public function toArray(Request $request): array
    {
        return [
            'id'=> $this->id,
            'nome' => $this->nome,
            'sexo' => $this->sexo,
            'data_nascimento' => $this->data_nascimento,
            'hobby' => $this->hobby,
            'nivel' => new NivelResource($this->nivel),
            'idade' => $this->idade
        ];
    }
}
