<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Vinelab\Http\Client as HttpClient;
use Illuminate\Support\Facades\DB;

class DadosController extends Controller
{
    
    public function getHistorico(Request $request)
    {
        $data_inicial = date("Y-m-d", strtotime($request->data_inicial));
        $data_final = date("Y-m-d", strtotime($request->data_final));
        
        $dados = \App\Dados::where('created_at', '>=', $data_inicial)
                ->where('created_at', '<=', $data_final)
                ->get();
        
        return $dados;
    }
    
    public function getCulturas() 
    {
        $culturas = \App\Cultura::all();
        
        return $culturas;
    }
    
    public function getSolos() 
    {
        $solos = \App\Solo::all();
        
        return $solos;
    }
    
    public function getMetodos() 
    {
        $metodos = \App\Metodo::all();
        
        return $metodos;
    }

    public function getDados()
    {   
        $client = new HttpClient;
        $response = $client->get('http://192.168.1.177');
        $partes = explode(";", $response->content());

        $dados = new \App\Dados;
        $dados->umidade = $partes[0];
        $dados->temperatura = $partes[1];
        $dados->velocidade_vento = $partes[2];
        $dados->save();
        
        return $dados;
    }
    
    public function postIrrigacao(Request $request) 
    {
        $data = date("Y-m-d", strtotime($request->data));
        $cult = $request->cultura;
        $cultura = \App\Cultura::find($cult['id']);
        $cultura->created_at = $data;
        $cultura->save();
    } 

    public function evapotranspiracao(Request $request)
    {
        $eto = 0;
        
        //ponta grossa altitude 969m
        $altitude = $request->altitude;
        
        //ponta grossa latitude 25° 05' 42''
        $latitude = -($request->graus + $request->minutos / 60) * pi() / 180;
        
        //0.16 para regiões continentais e 0.19 para regiões costeiras.
        if ($request->regiao == "Continente") {
            $reg = 0.16;   
        } else {
            $reg = 0.19;
        }
        
        //dia atual do ano
        $j = (int) date("z");
        
        $cult = $request->cultura;
        $solo = $request->solo;
        
        $cultura = \App\Cultura::find($cult['id']);
        $kc = DB::table('kcs')
                    ->where('id_cultura', $cult['id'])
                    ->pluck($request->estadio);
        
        $dataIrrig = date("Y-m-d", strtotime($cultura->created_at));
        $dataAtual = date("Y-m-d", strtotime("+1 days",strtotime(date("Y-m-d"))));
        
        $data1 = new \DateTime($dataAtual);
        $data2 = new \DateTime($dataIrrig);
        $intervalo = $data1->diff($data2);
        
        for ($i = 0; $i < $intervalo->days; $i++) {
            $diainf = date("Y-m-d", strtotime(($i - 1) . " days",strtotime($dataIrrig)));
            $diasup = date("Y-m-d", strtotime(($i + 1) . " days",strtotime($dataIrrig)));
            
            $temp = DB::table('dados')
                    ->where('created_at', '>=', $diainf)
                    ->where('created_at', '<=', $diasup)
                    ->avg('temperatura');

            $tmax = DB::table('dados')
                    ->where('created_at', '>=', $diainf)
                    ->where('created_at', '<=', $diasup)
                    ->max('temperatura');

            $tmin = DB::table('dados')
                    ->where('created_at', '>=', $diainf)
                    ->where('created_at', '<=', $diasup)
                    ->min('temperatura');

            $umidade = DB::table('dados')
                    ->where('created_at', '>=', $diainf)
                    ->where('created_at', '<=', $diasup)
                    ->min('umidade');

            $vel2 = DB::table('dados')
                    ->where('created_at', '>=', $diainf)
                    ->where('created_at', '<=', $diasup)
                    ->min('velocidade_vento');
            
            if(!is_null($temp)) {
                $calcula = new Calcula;
                $eto += $calcula->ETo($temp, $tmax, $tmin, $umidade, $vel2, $altitude, $latitude, $j, $reg) * (float) $kc[0];
            } else {
                $eto += $eto;
            }
        }
        
        if ($eto >= ($solo['cad'] * $cult['f'] * $cult['z'])) {
            return "Precisa irrigar";
        }
        
        return "Não precisa irrigar";
    }
    
}
