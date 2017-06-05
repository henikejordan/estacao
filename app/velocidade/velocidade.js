'use strict';

angular.module('myApp.velocidade', ['ngRoute'])

        .config(['$routeProvider', function ($routeProvider) {
                $routeProvider.when('/velocidade', {
                    templateUrl: 'velocidade/velocidade.html',
                    controller: 'VelocidadeCtrl'
                });
            }])

        .controller('VelocidadeCtrl', [function () {

            }]);