angular.module('myApp')
        // Optional configuration
        .config(['$routeProvider', 'ChartJsProvider', function ($routeProvider, ChartJsProvider) {
                // Configure all charts
                ChartJsProvider.setOptions({
                    chartColors: ['#FF5252'],
                    responsive: false
                });

                $routeProvider.when('/temperatura_real', {
                    templateUrl: 'temperatura_real/temperatura_real.html',
                    controller: 'TemperaturaRealCtrl'
                });
            }])

        .controller("TemperaturaRealCtrl", ['$scope', '$http', '$timeout', TemperaturaRealCtrl]);

function TemperaturaRealCtrl($scope, $http, $timeout) {
    $timeout.cancel();
    
    $scope.labels = [];
    $scope.series = ['Temperatura'];
    $scope.data = [];

    function getTemperatura(callback) {
        $http.get('http://localhost/estacao/server/public/socket/dados')
                .success(function (data, status, header, config) {
                    callback(data);
                })
                .error(function (data, status, header, config) {
                    console.log('Erro ao carregar os dados!');
                });
    }

    function wrapper() {
        getTemperatura(function (dados) {
            $scope.data.push(dados.temperatura);
            $scope.labels.push(dados.created_at);
            $timeout(wrapper, 1000);
        });
    }

    // Simulate async data update
    $timeout(wrapper, 1000);
}