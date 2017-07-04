angular.module('myApp')
        // Optional configuration
        .config(['$routeProvider', 'ChartJsProvider', function ($routeProvider, ChartJsProvider) {
                // Configure all charts
                ChartJsProvider.setOptions({
                    chartColors: ['#FF5252'],
                    responsive: false
                });

                $routeProvider.when('/velocidade', {
                    templateUrl: 'velocidade/velocidade.html',
                    controller: 'VelocidadeCtrl'
                });
            }])

        .controller("VelocidadeCtrl", ['$scope', '$http', '$timeout', VelocidadeCtrl]);

function VelocidadeCtrl($scope, $http, $timeout) {
    $timeout.cancel();

    $scope.labels = [];
    $scope.series = ['Velocidade'];
    $scope.data = [];

    $scope.postHistorico = function () {
        $http.post('http://localhost/estacao/server/public/historico', $scope.dados)
                .success(function (data, status, header, config) {
                    $scope.labels = [];
                    $scope.series = ['Velocidade'];
                    $scope.data = [];
                    data.forEach(function (element, index, array) {
                        $scope.data.push(element.velocidade_vento);
                        $scope.labels.push(element.created_at);
                    });
                })
                .error(function (data, status, header, config) {
                    console.log('Erro ao carregar os dados!');
                });
    };
}