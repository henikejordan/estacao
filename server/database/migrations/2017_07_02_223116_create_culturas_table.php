<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateCulturasTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('culturas', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('grupo');
            $table->string('nome');
            $table->decimal('f', 3, 2);
            $table->integer('z');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('culturas');
    }
}
