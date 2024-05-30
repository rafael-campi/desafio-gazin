<?php

namespace Tests\Feature;

use App\Models\Nivel;
use Tests\TestCase;
use Illuminate\Foundation\Testing\RefreshDatabase;

class NivelControllerTest extends TestCase
{
    use RefreshDatabase;

    public function test_can_get_all_niveis()
    {
        Nivel::factory()->count(4)->create(); 

        $response = $this->getJson('/api/niveis');

        $response->assertJsonCount(4, 'data');
    }

    public function test_can_create_nivel()
    {
        $data = [
            'nivel' => 'Administrador'
        ];

        $response = $this->postJson('/api/niveis', $data);

        $response->assertStatus(201); // Verifica se o status da resposta é 201 (Created)

        $this->assertDatabaseHas('nivels', $data); // Verifica se os dados foram inseridos no banco de dados
    }

    public function test_can_update_nivel()
    {
        $nivel = Nivel::factory()->create();

        $data = [
            'nivel' => 'Administrador update'
        ];

        $response = $this->putJson("/api/niveis/{$nivel->id}", $data);

        $response->assertStatus(201); // Verifica se o status da resposta é 200 (OK)

        $this->assertDatabaseHas('nivels', $data); // Verifica se os dados foram atualizados no banco de dados
    }

    public function test_can_delete_nivel()
    {
        $nivel = Nivel::factory()->create();

        $response = $this->deleteJson("/api/niveis/{$nivel->id}");

        $response->assertStatus(204); // Verifica se o status da resposta é 204 (No Content)

        $this->assertDatabaseMissing('nivels', ['id' => $nivel->id]); // Verifica se o registro foi removido do banco de dados
    }
}
