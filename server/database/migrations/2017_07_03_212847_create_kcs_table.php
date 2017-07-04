<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateKcsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('kcs', function (Blueprint $table) {
            $table->increments('id');
            $table->decimal('inicial', 3, 2);
            $table->decimal('desenvolvimento', 3, 2);
            $table->decimal('intermediario', 3, 2);
            $table->decimal('final', 3, 2);
            $table->decimal('colheita', 3, 2);
            $table->timestamps();
            $table->integer('id_cultura')->unsigned();
            $table->foreign('id_cultura')->references('id')->on('culturas');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('kcs');
    }
}
