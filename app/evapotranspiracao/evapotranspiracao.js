angular.module('myApp')
        .config(['$routeProvider', function ($routeProvider) {
                $routeProvider.when('/evapotranspiracao', {
                    templateUrl: 'evapotranspiracao/evapotranspiracao.html',
                    controller: 'EvapotranspiracaoCtrl'
                });
            }])

        .controller('EvapotranspiracaoCtrl', EvapotranspiracaoCtrl);

function EvapotranspiracaoCtrl($scope, $http, appConfig) {
    var carrega = function () {
        $http.get(appConfig.serverApiBaseUrl + '/fornecedor')
                .success(function (data, status, header, config) {
                    $scope.fornecedores = data;
                    console.log(data);
                })
                .error(function (data, status, header, config) {
                    console.log('Erro ao carregar os dados!');
                });
    };

    carrega();
}