<?php

namespace App\Http\Controllers;

class Calcula
{

    public function ETo($temp, $tmax, $tmin, $umidade, $vel2, $altitude, $latitude, $j, $reg) 
    {           
        return (0.408 * $this->delta($temp) * ($this->rn($temp, $tmin, $tmax, $umidade, $altitude, $latitude, $j, $reg) - 0) + 
                (($this->gama($altitude) * 900 * $vel2 * ($this->es($temp) - $this->ea($temp, $umidade))) / ($temp + 273))) /
                ($this->delta($temp) + $this->gama($altitude) * (1 + 0.34 * $vel2));
    }

    public function delta($temp) 
    {
        return (4098 * (0.6108 * exp((17.27 * $temp) / ($temp + 237.3)))) / pow($temp + 237.3, 2);
    }

    public function gama($altitude) 
    {
        return 0.665 * 0.001 * $this->patm($altitude);
    }

    public function patm($altitude) 
    {        
        return 101.3 * pow((293 - 0.0065 * $altitude) / 293, 5.26);
    }

    public function ea($temp, $umidade) 
    {   
        return $this->es($temp) * $umidade / 100;
    }

    public function es($temp) 
    {
        return 0.6108 * exp((17.27 * $temp) / ($temp + 237.3));
    }

    public function rn($temp, $tmin, $tmax, $umidade, $altitude, $latitude, $j, $reg) 
    {
        return $this->rns($tmin, $tmax, $latitude, $j, $reg) - $this->rnl($temp, $tmin, $tmax, $umidade, $altitude, $latitude, $j, $reg);
    }

    public function rns($tmin, $tmax, $latitude, $j, $reg) 
    {
        return 0.77 * $this->rs($tmin, $tmax, $latitude, $j, $reg);
    }

    public function rnl($temp, $tmin, $tmax, $umidade, $altitude, $latitude, $j, $reg) 
    {        
        return 0.001 * 0.001 * 0.001 * 4.903 * ((pow($tmax + 273.16, 4) + pow($tmin + 273.16, 4)) / 2) *
                (0.34 - 0.14 * pow($this->ea($temp, $umidade), 0.5)) * (1.35 * $this->rs($tmin, $tmax, $latitude, $j, $reg) / $this->rso($altitude, $latitude, $j) - 0.35);
    }

    public function rso($altitude, $latitude, $j) 
    {        
        return (0.75 + 2 * 0.00001 * $altitude) * $this->ra($latitude, $j);
    }

    public function ra($latitude, $j) 
    {        
        return 118.08 / pi() * $this->dr($j) * ($this->ws($latitude, $j) * sin($latitude) * sin($this->lambda($j)) + 
                cos($latitude) * cos($this->lambda($j) * sin($this->ws($latitude, $j))));
    }

    public function rs($tmin, $tmax, $latitude, $j, $reg) 
    {   
        return $reg * $this->ra($latitude, $j) * pow($tmax - $tmin, 0.5);
    }

    public function dr($j) 
    {        
        return 1 + 0.033 * cos(2 * pi() / 365 * $j);
    }

    public function lambda($j) 
    {   
        return 0.409 * sin(2 * pi() / 365 * $j - 1.39);
    }

    public function ws($latitude, $j) 
    {        
        $x = 0.00001;
        if ($this->x($latitude, $j) > 0) {
            $x = $this->x($latitude, $j);
        }

        return pi() / 2 - atan(-1 * tan($latitude) * tan($this->lambda($j)) / pow($x, 0.5));
    }

    public function x($latitude, $j) 
    {        
        return 1 - pow(tan($latitude), 2) * pow(tan($this->lambda($j)), 2);
    }

}
