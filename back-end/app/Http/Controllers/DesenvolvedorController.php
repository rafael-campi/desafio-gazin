<?php

namespace App\Http\Controllers;

use App\Classes\ApiResponseClass;
use App\Http\Controllers\Controller;
use App\Http\Requests\StoreDesenvolvedorRequest;
use App\Http\Requests\UpdateDesenvolvedorRequest;
use App\Http\Resources\DesenvolvedorResource;
use App\Interfaces\DesenvolvedorRepositoryInterface;
use App\Models\Desenvolvedor;
use Exception;
use Illuminate\Support\Facades\DB;
use Illuminate\Http\Request;
use OpenApi\Annotations as OA;

/**
 *  @OA\Schema(
 *     schema="Desenvolvedores",
 *     type="object",
 *     description="Modelo de Desenvolvedores",
 *     @OA\Property(
 *         property="id",
 *         type="integer",
 *         description="ID do desenvolvedor"
 *     ),
 *  @OA\Property(
 *         property="nome",
 *         type="string",
 *         description="Nome do desenvolvedor"
 *     ),
 *  @OA\Property(
 *         property="sexo",
 *         type="char",
 *         description="Sexo do desenvolvedor"
 *     ),
 *  @OA\Property(
 *         property="data_nascimento",
 *         type="date",
 *         description="Data de nascimento do desenvolvedor"
 *     ),
 *     @OA\Property(
 *         property="hobby",
 *         type="string",
 *         description="Hobby  do desenvolvedor"
 *     ),
 *       @OA\Property(
 *         property="nivel_id",
 *         type="integer",
 *         description="Nivel do desenvolvedor"
 *     ),
 *     @OA\Property(
 *         property="nivel",
 *         ref="#/components/schemas/Nivel"
 *     ),
 *     @OA\Property(
 *         property="idade",
 *         type="integer",
 *         description="Idade do desenvolvedor"
 *     )
 * )
 */
class DesenvolvedorController extends Controller
{
    private DesenvolvedorRepositoryInterface $desenvolvedorRepositoryInterface;

    public function __construct(DesenvolvedorRepositoryInterface $desenvolvedorRepositoryInterface)
    {
        $this->desenvolvedorRepositoryInterface = $desenvolvedorRepositoryInterface;
    }

    /**
     * @OA\Get(
     *     path="/api/desenvolvedores",
     *     summary="Lista todos os desenvolvedores",
     *     tags={"Desenvolvedores"},
     *     @OA\Parameter(
     *         name="nome",
     *         in="query",
     *         required=false,
     *         @OA\Schema(
     *             type="string"
     *         ),
     *         description="Nome do desenvolvedor"
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Lista de níveis",
     *         @OA\JsonContent(
     *             type="array",
     *             @OA\Items(
     *                 @OA\Property(property="id", type="integer"),
     *                 @OA\Property(property="nome", type="string"),
     *                 @OA\Property(property="sexo", type="string"),
     *                 @OA\Property(property="data_nascimento", type="string", format="date"),
     *                 @OA\Property(property="hobby", type="string"),
     *                 @OA\Property(property="nivel", ref="#/components/schemas/Nivel"),
     *                 @OA\Property(property="idade", type="integer")
     *             )
     *         )
     *     ),
     *     @OA\Response(
     *         response=401,
     *         description="Não autorizado"
     *     ),
     * )
     */
    public function index(Request $request)
    {
        $filters = $request->only(['nome']);
        $orderByColumn = $request->input('order_by_column');
        $orderByDirection = $request->input('order_by_direction', 'asc');

        $data = $this->desenvolvedorRepositoryInterface->index($filters, $orderByColumn, $orderByDirection);

        return ApiResponseClass::sendResponse(DesenvolvedorResource::collection($data), '', 200);
    }

    /**
     * @OA\Post(
     *     path="/api/desenvolvedores",
     *     summary="Cria um novo desenvolvedor",
     *     tags={"Desenvolvedores"},
     *     @OA\RequestBody(
     *         required=true,
     *         @OA\JsonContent(
     *             type="object",
     *             @OA\Property(property="nome", type="string", example="John Doe"),
     *             @OA\Property(property="sexo", type="string", example="M"),
     *             @OA\Property(property="data_nascimento", type="string", format="date", example="1990-01-01"),
     *             @OA\Property(property="hobby", type="string", example="Leitura"),
     *             @OA\Property(property="nivel_id", type="integer", example=1)
     *         )
     *     ),
     *     @OA\Response(
     *         response=201,
     *         description="Desenvolvedor criado com sucesso",
     *         @OA\JsonContent(ref="#/components/schemas/Desenvolvedores")
     *         )
     *     ),
     *     @OA\Response(
     *         response=401,
     *         description="Não autorizado"
     *     )
     * )
     */

    public function store(StoreDesenvolvedorRequest $request)
    {
        DB::beginTransaction();
        try {
            $desenvolvedor = $this->desenvolvedorRepositoryInterface->store($request->all());

            DB::commit();
            return ApiResponseClass::sendResponse(new DesenvolvedorResource($desenvolvedor), 'Product Create Successful', 201);
        } catch (\Exception $ex) {
            return ApiResponseClass::rollback($ex);
        }
    }

    /**
     * @OA\Get(
     *     path="/api/desenvolvedores/{id}",
     *     summary="Exibe um desenvolvedor específico",
     *     tags={"Desenvolvedores"},
     *     @OA\Parameter(
     *         name="id",
     *         in="path",
     *         required=true,
     *         @OA\Schema(
     *             type="integer"
     *         ),
     *         description="ID do desenvolvedor"
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Desenvolvedor encontrado",
     *         @OA\JsonContent(ref="#/components/schemas/Desenvolvedores")
     *     ),
     *     @OA\Response(
     *         response=404,
     *         description="Desenvolvedor não encontrado"
     *     ),
     *     @OA\Response(
     *         response=401,
     *         description="Não autorizado"
     *     )
     * )
     */
    public function show($id)
    {
        $desenvolvedor = $this->desenvolvedorRepositoryInterface->getById($id);

        return ApiResponseClass::sendResponse(new DesenvolvedorResource($desenvolvedor), '', 200);
    }

    /**
     * Show the form for editing the specified resource.
     */


    /**
     * @OA\Put(
     *     path="/api/desenvolvedores/{id}",
     *     summary="Atualiza um desenvolvedor específico",
     *     tags={"Desenvolvedores"},
     *     @OA\Parameter(
     *         name="id",
     *         in="path",
     *         required=true,
     *         @OA\Schema(
     *             type="integer"
     *         ),
     *         description="ID do desenvolvedor"
     *     ),
     *     @OA\RequestBody(
     *         required=true,
     *         @OA\JsonContent(
     *             type="object",
     *             @OA\Property(property="nome", type="string", example="John Doe"),
     *             @OA\Property(property="sexo", type="string", example="M"),
     *             @OA\Property(property="data_nascimento", type="string", format="date", example="1990-01-01"),
     *             @OA\Property(property="hobby", type="string", example="Leitura"),
     *             @OA\Property(property="nivel_id", type="integer", example=1)
     *         )
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Desenvolvedor atualizado com sucesso",
     *         @OA\JsonContent(ref="#/components/schemas/Desenvolvedores")
     *     ),
     *     @OA\Response(
     *         response=401,
     *         description="Não autorizado"
     *     ),
     *     @OA\Response(
     *         response=404,
     *         description="Desenvolvedor não encontrado"
     *     )
     * )
     */
    public function update(UpdateDesenvolvedorRequest $request, $id)
    {

        DB::beginTransaction();
        try {
            $product = $this->desenvolvedorRepositoryInterface->update($request->all(), $id);

            DB::commit();
            return ApiResponseClass::sendResponse('Product Update Successful', '', 201);
        } catch (\Exception $ex) {
            return ApiResponseClass::rollback($ex);
        }
    }

    /**
     * @OA\Delete(
     *     path="/api/desenvolvedores/{id}",
     *     summary="Remove um desenvolvedor específico",
     *     tags={"Desenvolvedores"},
     *     @OA\Parameter(
     *         name="id",
     *         in="path",
     *         required=true,
     *         @OA\Schema(
     *             type="integer"
     *         ),
     *         description="ID do desenvolvedor"
     *     ),
     *     @OA\Response(
     *         response=204,
     *         description="Desenvolvedor removido com sucesso"
     *     ),
     *     @OA\Response(
     *         response=401,
     *         description="Não autorizado"
     *     ),
     * )
     */
    public function destroy($id)
    {
        DB::beginTransaction();
        try {
            $desenvolvedor = $this->desenvolvedorRepositoryInterface->delete($id);


            if (!$desenvolvedor)
                ApiResponseClass::throw(new Exception('Erro'));
            DB::commit();
            return ApiResponseClass::sendResponse('Product Delete Successful', '', 204);
        } catch (\Exception $ex) {
            return ApiResponseClass::rollback($ex);
        }
    }
}
