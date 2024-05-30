<?php

namespace App\Providers;

use App\Interfaces\DesenvolvedorRepositoryInterface;
use App\Interfaces\NivelRepositoryInterface;
use App\Repositories\DesenvolvedorRepository;
use App\Repositories\NivelRepository;
use Illuminate\Support\ServiceProvider;

class RepositoryServiceProvider extends ServiceProvider
{
    public function register(): void
    {
        $this->app->bind(NivelRepositoryInterface::class,
                        NivelRepository::class, 
        );
        $this->app->bind(
            DesenvolvedorRepositoryInterface::class,
            DesenvolvedorRepository::class
        );
    }

    /**
     * Bootstrap services.
     */
    public function boot(): void
    {
        //
    }
}
