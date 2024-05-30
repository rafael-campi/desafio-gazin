<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('desenvolvedors', function (Blueprint $table) {
            $table->id();
            $table->string('nome',255);
            $table->char('sexo',1);
            $table->date('data_nascimento');
            $table->string('hobby', 255);
            $table->integer('nivel_id')->unsigned();
            $table->foreign('nivel_id')->references('id')->on('nivels');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('desenvolvedors');
    }
};
