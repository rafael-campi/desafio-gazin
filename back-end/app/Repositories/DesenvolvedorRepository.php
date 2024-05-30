<?php

namespace App\Repositories;

use App\Interfaces\DesenvolvedorRepositoryInterface;
use App\Models\Desenvolvedor;
use Illuminate\Support\Collection;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;


class DesenvolvedorRepository implements DesenvolvedorRepositoryInterface
{
    public function index(array $filters = [], ?string $orderByColumn = null, string $orderByDirection ='asc', int $perPage = 20, int $page = 1): LengthAwarePaginator
    {
        $query = Desenvolvedor::query();
        if (!empty($filters['nome'])) {
            $query->whereRaw('LOWER(nome) like ?', ['%' . strtolower($filters['nome']) . '%']);
        }
        if ($orderByColumn !== null) {
            $query->orderBy($orderByColumn, $orderByDirection);
        }


        return $query->paginate($perPage, ['*'], 'page', $page);
    }

    public function getById($id)
    {
        return Desenvolvedor::findOrFail($id);
    }

    public function store(array $data)
    {
        return Desenvolvedor::create($data);
    }

    public function update(array $data, $id)
    {
        return Desenvolvedor::whereId($id)->update($data);
    }

    public function delete($id)
    {
        return Desenvolvedor::destroy($id);
    }
}
