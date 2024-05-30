<?php

namespace Database\Factories;

use App\Models\Desenvolvedor;
use App\Models\Nivel;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Desenvolvedor>
 */
class DesenvolvedorFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    protected $model = Desenvolvedor::class;
    public function definition(): array
    {
        return [
            "nivel_id" => Nivel::factory()->create()->id,
            "nome"=> "Nome do Desenvolvedor 1",
            "sexo"=> "M",
            "data_nascimento"=> "1990-01-01",
            "hobby"=> "Programação"
        ];
    }
}
