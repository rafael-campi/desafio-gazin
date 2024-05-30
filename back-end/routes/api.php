<?php

use App\Http\Controllers\DesenvolvedorController;
use App\Http\Controllers\NivelController;

use Illuminate\Support\Facades\Route;


Route::get('/', function () {
    return response()->json(['message' => "success"], 200);
});

Route::apiResource('/niveis', NivelController::class);

Route::apiResource('/desenvolvedores', DesenvolvedorController::class);