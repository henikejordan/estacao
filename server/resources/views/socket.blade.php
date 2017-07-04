<!DOCTYPE html>
<html>
    <head>
        <title></title>
        <link rel="stylesheet" type="text/css" href="js/bootstrap/bootstrap.css">

        <!-- Tag <style> criada para alinhamento e padronização dos botões -->
        <style>
            .body
            {	
                text-align: center;
            }
            .botao 
            {    
                width: 200px;
                height: 50px;
                margin-top: 20px;
                margin-left: 20px;
            }
        </style>
    </head>
    <body>
        <div class="body">	
            <h2>Acionamento de LED com Web Socket</h2>		
            <!-- POST - Método utilizado para enviar as informações para o socket criado no arquivo arduino.php -->		
            <form method="POST" action="{{ url('/socket/ligaVerde') }}">
                <p><button class="botao" type="submit" value="lverde_ligado" name="estadoLed">Liga LED Verde</button> 
                </p>
            </form>

            <form method="POST" action="{{ url('/socket/desligaVerde') }}">
                <p><button class="botao" type="submit" value="lverde_desligado" name="estadoLed">Desliga LED Verde</button> 
                </p>
            </form>
        </div>
    </body>
</html>