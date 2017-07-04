angular.module('myApp')
        // Optional configuration
        .config(['$routeProvider', 'ChartJsProvider', function ($routeProvider, ChartJsProvider) {
                // Configure all charts
                ChartJsProvider.setOptions({
                    chartColors: ['#FF5252'],
                    responsive: false
                });

                $routeProvider.when('/umidade_real', {
                    templateUrl: 'umidade_real/umidade_real.html',
                    controller: 'UmidadeRealCtrl'
                });
            }])

        .controller("UmidadeRealCtrl", ['$scope', '$http', '$timeout', UmidadeRealCtrl]);

function UmidadeRealCtrl($scope, $http, $timeout) {
    $timeout.cancel();
    
    $scope.labels = [];
    $scope.series = ['Umidade'];
    $scope.data = [];

    function getUmidade(callback) {
        $http.get('http://localhost/estacao/server/public/socket/dados')
                .success(function (data, status, header, config) {
                    callback(data);
                })
                .error(function (data, status, header, config) {
                    console.log('Erro ao carregar os dados!');
                });
    }

    function wrapper() {
        getUmidade(function (dados) {
            $scope.data.push(dados.umidade);
            $scope.labels.push(dados.created_at);
            $timeout(wrapper, 1000);
        });
    }

    // Simulate async data update
    $timeout(wrapper, 1000);
}