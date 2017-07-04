angular.module('myApp')
        // Optional configuration
        .config(['$routeProvider', 'ChartJsProvider', function ($routeProvider, ChartJsProvider) {
                // Configure all charts
                ChartJsProvider.setOptions({
                    chartColors: ['#803690']
                });

                $routeProvider.when('/temperatura', {
                    templateUrl: 'temperatura/temperatura.html',
                    controller: 'TemperaturaCtrl'
                });
            }])

        .controller("TemperaturaCtrl", ['$scope', '$http', '$timeout', TemperaturaCtrl]);

function TemperaturaCtrl($scope, $http, $timeout) {
    $timeout.cancel();

    $scope.labels = [];
    $scope.series = ['Temperatura'];
    $scope.data = [];

    $scope.postHistorico = function () {
        $http.post('http://localhost/estacao/server/public/historico', $scope.dados)
                .success(function (data, status, header, config) {
                    $scope.labels = [];
                    $scope.series = ['Temperatura'];
                    $scope.data = [];
                    data.forEach(function (element, index, array) {
                        $scope.data.push(element.temperatura);
                        $scope.labels.push(element.created_at);
                    });
                })
                .error(function (data, status, header, config) {
                    console.log('Erro ao carregar os dados!');
                });
    };
}