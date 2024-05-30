<?php

namespace App\Repositories;

use App\Interfaces\NivelRepositoryInterface;
use App\Models\Nivel;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;

class NivelRepository implements NivelRepositoryInterface
{
    public function index(array $filters = [], ?string $orderByColumn = null, string $orderByDirection ='asc', int $perPage = 20, int $page = 1): LengthAwarePaginator
    {

        
        $query = Nivel::query();

        if (!empty($filters['nivel'])) {
            $query->whereRaw('LOWER(nivel) like ?', ['%' . strtolower($filters['nivel']) . '%']);
        }
        if ($orderByColumn !== null) {
            $query->orderBy($orderByColumn, $orderByDirection);
        }
       

        return $query->paginate($perPage, ['*'], 'page', $page);
    }

    public function getById($id)
    {
        return Nivel::findOrFail($id);
    }

    public function store(array $data)
    {
        return Nivel::create($data);
    }

    public function update(array $data, $id)
    {
        return Nivel::whereId($id)->update($data);
    }

    public function delete($id)
    {
        
        return Nivel::destroy($id);
    }
}
