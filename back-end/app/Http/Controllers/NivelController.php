<?php

namespace App\Http\Controllers;

use App\Models\Nivel;
use App\Http\Controllers\Controller;
use App\Http\Requests\StoreNivelRequest;
use App\Http\Requests\UpdateNivelRequest;
use App\Classes\ApiResponseClass;
use App\Http\Resources\NivelResource;
use App\Interfaces\NivelRepositoryInterface;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Exceptions\DesenvolvedoresAssociadosException;
use OpenApi\Annotations as OA;

/**
 * @OA\Info(
 *     title="API",
 *     version="1.0.0",
 *     description="API feita para registrar niveis e desenvolvedores",
 *     @OA\Contact(
 *         email="rafael.g.campi@gmail.com"
 *     )
 * )
 * * @OA\Schema(
 *     schema="Nivel",
 *     type="object",
 *     description="Modelo de Nível",
 *     @OA\Property(
 *         property="id",
 *         type="integer",
 *         description="ID do nível"
 *     ),
 *     @OA\Property(
 *         property="nivel",
 *         type="string",
 *         description="Nome do nível"
 *     )
 * )
 */
class NivelController extends Controller
{
    private NivelRepositoryInterface $nivelRepositoryInterface;
    public function __construct(NivelRepositoryInterface $nivelRepositoryInterface)
    {
        $this->nivelRepositoryInterface = $nivelRepositoryInterface;
    }
    
    /**
     * @OA\Get(
     *     path="/api/niveis",
     *     summary="Lista todos os níveis",
     *     tags={"Niveis"},
     *     @OA\Parameter(
     *         name="nivel",
     *         in="query",
     *         required=false,
     *         @OA\Schema(
     *             type="string"
     *         ),
     *         description="Nome do nível"
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Lista de níveis",
     *         @OA\JsonContent(
     *             type="array",
     *             @OA\Items(ref="#/components/schemas/Nivel")
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
        $filters = $request->only(['nivel', 'created_at']);
        $orderByColumn = $request->input('order_by_column');
        $orderByDirection = $request->input('order_by_direction', 'asc');
        $data = $this->nivelRepositoryInterface->index($filters, $orderByColumn, $orderByDirection);
        

        return ApiResponseClass::sendResponse(NivelResource::collection($data), '', 200);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    /**
     * @OA\Post(
     *     path="/api/niveis",
     *     summary="Cria um novo nível",
     *     tags={"Niveis"},
     *     @OA\RequestBody(
     *         required=true,
     *         @OA\JsonContent(ref="#/components/schemas/Nivel")
     *     ),
     *     @OA\Response(
     *         response=201,
     *         description="Nível criado com sucesso",
     *         @OA\JsonContent(ref="#/components/schemas/Nivel")
     *     ),
     *     @OA\Response(
     *         response=401,
     *         description="Não autorizado"
     *     )
     * )
     */
    public function store(StoreNivelRequest $request)
    {
        $newNivel = [
            'nivel' => $request->nivel
        ];
        DB::beginTransaction();
        try {
            $nivel = $this->nivelRepositoryInterface->store($newNivel);

            DB::commit();
            return ApiResponseClass::sendResponse(new NivelResource($nivel), 'Product Create Successful', 201);
        } catch (\Exception $ex) {
            return ApiResponseClass::rollback($ex);
        }
    }

    /**
     * Display the specified resource.
     */
    /**
     * @OA\Get(
     *     path="/api/niveis/{id}",
     *     summary="Exibe um nível específico",
     *     tags={"Niveis"},
     *     @OA\Parameter(
     *         name="id",
     *         in="path",
     *         required=true,
     *         @OA\Schema(
     *             type="integer"
     *         ),
     *         description="ID do nível"
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Nível encontrado",
     *         @OA\JsonContent(ref="#/components/schemas/Nivel")
     *     ),
     *     @OA\Response(
     *         response=404,
     *         description="Nível não encontrado"
     *     ),
     *     @OA\Response(
     *         response=401,
     *         description="Não autorizado"
     *     )
     * )
     */
    public function show($id)
    {
        $nivel = $this->nivelRepositoryInterface->getById($id);

        return ApiResponseClass::sendResponse(new NivelResource($nivel), '', 200);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Nivel $nivel)
    {
        //
    }

    /**
     * @OA\Put(
     *     path="/api/niveis/{id}",
     *     summary="Atualiza um nível específico",
     *     tags={"Niveis"},
     *     @OA\Parameter(
     *         name="id",
     *         in="path",
     *         required=true,
     *         @OA\Schema(
     *             type="integer"
     *         ),
     *         description="ID do nível"
     *     ),
     *     @OA\RequestBody(
     *         required=true,
     *         @OA\JsonContent(ref="#/components/schemas/Nivel")
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Nível atualizado com sucesso",
     *         @OA\JsonContent(ref="#/components/schemas/Nivel")
     *     ),
     *     @OA\Response(
     *         response=401,
     *         description="Não autorizado"
     *     ),
     *     @OA\Response(
     *         response=404,
     *         description="Nível não encontrado"
     *     )
     * )
     */
    public function update(UpdateNivelRequest $request, $id)
    {
        $updateNivel = [
            'nivel' => $request->nivel,

        ];
        DB::beginTransaction();
        try {
            $nivel = $this->nivelRepositoryInterface->update($updateNivel, $id);
            DB::commit();
            return ApiResponseClass::sendResponse('Product Update Successful', $nivel, 201);
        } catch (\Exception $ex) {
            DB::rollback();
            return ApiResponseClass::rollback($ex);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    /**
     * @OA\Delete(
     *     path="/api/niveis/{id}",
     *     summary="Remove um nível específico",
     *     tags={"Niveis"},
     *     @OA\Parameter(
     *         name="id",
     *         in="path",
     *         required=true,
     *         @OA\Schema(
     *             type="integer"
     *         ),
     *         description="ID do nível"
     *     ),
     *     @OA\Response(
     *         response=204,
     *         description="Nível removido com sucesso"
     *     ),
     *     @OA\Response(
     *         response=401,
     *         description="Não autorizado"
     *     ),
     *     @OA\Response(
     *         response=404,
     *         description="Nível não encontrado"
     *     )
     * )
     */
    public function destroy($id)
    {
        DB::beginTransaction();
        try {
            $this->nivelRepositoryInterface->delete($id);
            
            DB::commit();
            return ApiResponseClass::sendResponse('Product Delete Successful', '', 204);
        } catch (DesenvolvedoresAssociadosException $ex) {
            return ApiResponseClass::rollback($ex, $ex->getMessage());
        } catch (\Exception $ex) {
            return ApiResponseClass::rollback($ex);
        }
    }
}
