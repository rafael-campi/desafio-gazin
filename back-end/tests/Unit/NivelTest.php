<?php

namespace Tests\Unit;

use App\Models\Nivel;
use App\Models\Desenvolvedor;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class NivelTest extends TestCase
{
    use RefreshDatabase;

    public function testTemDesenvolvedoresAssociados()
    {
        // Cria um nível sem desenvolvedores associados
        $nivelSemDesenvolvedores = Nivel::factory()->create();

        // Verifica se temDesenvolvedoresAssociados retorna false
        $this->assertFalse($nivelSemDesenvolvedores->temDesenvolvedoresAssociados());

        // Cria um nível com desenvolvedores associados
        $nivelComDesenvolvedores = Nivel::factory()->has(Desenvolvedor::factory()->count(10))->create();

        // Verifica se temDesenvolvedoresAssociados retorna true
        $this->assertTrue($nivelComDesenvolvedores->temDesenvolvedoresAssociados());
    }
}
