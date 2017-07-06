angular.module('myApp')
        // Optional configuration
        .config(['$routeProvider', 'ChartJsProvider', function ($routeProvider, ChartJsProvider) {
                // Configure all charts
                ChartJsProvider.setOptions({
                    chartColors: ['#803690']
                });

                $routeProvider.when('/irrigacao', {
                    templateUrl: 'irrigacao/irrigacao.html',
                    controller: 'IrrigacaoCtrl'
                });
            }])

        .controller("IrrigacaoCtrl", ['$scope', '$http', '$timeout', IrrigacaoCtrl]);

function IrrigacaoCtrl($scope, $http, $timeout) {
    $timeout.cancel();

    $scope.sucesso;
    $scope.erro;
    $scope.culturas = [];

    getCulturas();

    function getCulturas() {
        $http.get('http://localhost/estacao/server/public/culturas')
                .success(function (data, status, header, config) {
                    $scope.culturas = data;
                })
                .error(function (data, status, header, config) {
                    console.log('Erro ao carregar os dados!');
                });
    }

    $scope.postIrrigacao = function () {
        $http.post('http://localhost/estacao/server/public/irrigacao', $scope.dados)
                .success(function (data, status, header, config) {
                    $scope.sucesso = 'Dados enviados com sucesso!';
                })
                .error(function (data, status, header, config) {
                    $scope.erro = 'Erro ao carregar os dados!';
                });
    };
}