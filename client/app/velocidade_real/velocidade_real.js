angular.module('myApp')
        // Optional configuration
        .config(['$routeProvider', 'ChartJsProvider', function ($routeProvider, ChartJsProvider) {
                // Configure all charts
                ChartJsProvider.setOptions({
                    chartColors: ['#FF5252'],
                    responsive: false
                });

                $routeProvider.when('/velocidade_real', {
                    templateUrl: 'velocidade_real/velocidade_real.html',
                    controller: 'VelocidadeRealCtrl'
                });
            }])

        .controller("VelocidadeRealCtrl", ['$scope', '$http', '$timeout', VelocidadeRealCtrl]);

function VelocidadeRealCtrl($scope, $http, $timeout) {
    $timeout.cancel();

    $scope.labels = [];
    $scope.series = ['Velocidade'];
    $scope.data = [];

    function getVelocidade(callback) {
        $http.get('http://localhost/estacao/server/public/socket/dados')
                .success(function (data, status, header, config) {
                    callback(data);
                })
                .error(function (data, status, header, config) {
                    console.log('Erro ao carregar os dados!');
                });
    }

    function wrapper() {
        getVelocidade(function (dados) {
            $scope.data.push(dados.velocidade_vento);
            $scope.labels.push(dados.created_at);
            $timeout(wrapper, 1000);
        });
    }

    // Simulate async data update
    $timeout(wrapper, 1000);
}