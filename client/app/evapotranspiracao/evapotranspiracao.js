angular.module('myApp')

        .config(['$routeProvider', 'ChartJsProvider', function ($routeProvider, ChartJsProvider) {
                // Configure all charts
                ChartJsProvider.setOptions({
                    chartColors: ['#00988c']
                });
                
                $routeProvider.when('/evapotranspiracao', {
                    templateUrl: 'evapotranspiracao/evapotranspiracao.html',
                    controller: 'EvapotranspiracaoCtrl'
                });
            }])

        .controller('EvapotranspiracaoCtrl', ['$scope', '$http', '$timeout', EvapotranspiracaoCtrl]);

function EvapotranspiracaoCtrl($scope, $http, $timeout) {
    $timeout.cancel();

    $scope.opcao;
    $scope.ll;
    $scope.lb;

    $scope.labels = [];
    $scope.series = ['ETc'];
    $scope.data = [];

    $scope.metodos = [];
    $scope.culturas = [];
    $scope.solos = [];

    getMetodos();
    getCulturas();
    getSolos();

    function getMetodos() {
        $http.get('http://localhost/estacao/server/public/metodos')
                .success(function (data, status, header, config) {
                    $scope.metodos = data;
                })
                .error(function (data, status, header, config) {
                    console.log('Erro ao carregar os dados!');
                });
    }

    function getCulturas() {
        $http.get('http://localhost/estacao/server/public/culturas')
                .success(function (data, status, header, config) {
                    $scope.culturas = data;
                })
                .error(function (data, status, header, config) {
                    console.log('Erro ao carregar os dados!');
                });
    }

    function getSolos() {
        $http.get('http://localhost/estacao/server/public/solos')
                .success(function (data, status, header, config) {
                    $scope.solos = data;
                })
                .error(function (data, status, header, config) {
                    console.log('Erro ao carregar os dados!');
                });
    }

    $scope.postEvapotranspiracao = function () {
        $http.post('http://localhost/estacao/server/public/evapotranspiracao', $scope.dados)
                .success(function (data, status, header, config) {
                    $scope.opcao = data.opcao;
                    $scope.ll = data.ll;
                    $scope.lb = data.lb;

                    $scope.labels = [];
                    $scope.series = ['ETc'];
                    $scope.data = [];
                    data.etc.forEach(function (element, index, array) {
                        $scope.data.push(element);
                    });
                    data.created.forEach(function (element, index, array) {
                        $scope.labels.push(element);
                    });
                })
                .error(function (data, status, header, config) {
                    console.log('Erro ao carregar os dados!');
                });
    };
}