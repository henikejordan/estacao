<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return view('welcome');
});

Route::post('/historico', "DadosController@getHistorico");
Route::get('/culturas', "DadosController@getCulturas");
Route::get('/solos', "DadosController@getSolos");
Route::get('/metodos', "DadosController@getMetodos");
Route::get('/dados', "DadosController@getDados");
Route::post('/evapotranspiracao', "DadosController@evapotranspiracao");
Route::post('/irrigacao', "DadosController@postIrrigacao");