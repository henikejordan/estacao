angular.module('myApp')
        // Optional configuration
        .config(['$routeProvider', 'ChartJsProvider', function ($routeProvider, ChartJsProvider) {
                // Configure all charts
                ChartJsProvider.setOptions({
                    chartColors: ['#FF5252'],
                    responsive: false
                });

                $routeProvider.when('/temperatura', {
                    templateUrl: 'temperatura/temperatura.html',
                    controller: 'TemperaturaCtrl'
                });
            }])

        .controller("TemperaturaCtrl", ['$scope', '$http', '$timeout', TemperaturaCtrl]);

function TemperaturaCtrl($scope, $http, $timeout) {
    $scope.labels = ["January", "February", "March", "April"];
    $scope.series = ['Series A'];
    $scope.data = [0, 0, 0, 0];

    function getVelocidade(callback) {
        $http.get('http://192.168.1.177/')
                .success(function (data, status, header, config) {
                    callback(data.velocidade);
                })
                .error(function (data, status, header, config) {
                    console.log('Erro ao carregar os dados!');
                });
    }

    function wrapper() {
        getVelocidade(function (vel) {
            console.log(vel);
            $scope.data = [vel, 20, 15, 2];
            $timeout(wrapper, 2000);
        });
    }

    // Simulate async data update
    $timeout(wrapper, 2000);
}