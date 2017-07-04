angular.module('myApp')

        .config(['$routeProvider', function ($routeProvider) {
                $routeProvider.when('/evapotranspiracao', {
                    templateUrl: 'evapotranspiracao/evapotranspiracao.html',
                    controller: 'EvapotranspiracaoCtrl'
                });
            }])

        .controller('EvapotranspiracaoCtrl', EvapotranspiracaoCtrl);

function EvapotranspiracaoCtrl($scope, $http, $timeout) {
    $timeout.cancel();

    $scope.irrigar;
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
                    $scope.irrigar = data;
                })
                .error(function (data, status, header, config) {
                    console.log('Erro ao carregar os dados!');
                });
    };
}