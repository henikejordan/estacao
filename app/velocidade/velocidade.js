'use strict';

angular.module('myApp')

        .config(['$routeProvider', function ($routeProvider) {
                $routeProvider.when('/velocidade', {
                    templateUrl: 'velocidade/velocidade.html',
                    controller: 'VelocidadeCtrl'
                });
            }])

        .controller('VelocidadeCtrl', [function () {

            }]);