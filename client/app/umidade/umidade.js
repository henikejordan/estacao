angular.module('myApp')
        // Optional configuration
        .config(['$routeProvider', 'ChartJsProvider', function ($routeProvider, ChartJsProvider) {
                // Configure all charts
                ChartJsProvider.setOptions({
                    chartColors: ['#FF5252'],
                    responsive: false
                });

                $routeProvider.when('/umidade', {
                    templateUrl: 'umidade/umidade.html',
                    controller: 'UmidadeCtrl'
                });
            }])

        .controller("UmidadeCtrl", ['$scope', '$http', '$timeout', UmidadeCtrl]);

function UmidadeCtrl($scope, $http, $timeout) {
    $timeout.cancel();

    $scope.labels = [];
    $scope.series = ['Umidade'];
    $scope.data = [];

    $scope.postHistorico = function () {
        $http.post('http://localhost/estacao/server/public/historico', $scope.dados)
                .success(function (data, status, header, config) {
                    $scope.labels = [];
                    $scope.series = ['Umidade'];
                    $scope.data = [];
                    data.forEach(function (element, index, array) {
                        $scope.data.push(element.umidade);
                        $scope.labels.push(element.created_at);
                    });
                })
                .error(function (data, status, header, config) {
                    console.log('Erro ao carregar os dados!');
                });
    };
}