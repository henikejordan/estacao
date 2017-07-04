angular.module('myApp', ['ngRoute', 'chart.js'])
        .config(['$locationProvider', '$routeProvider', function ($locationProvider, $routeProvider) {
                $locationProvider.hashPrefix('!');
                $routeProvider.otherwise({redirectTo: '/temperatura'});
            }])

        .factory('appConfig', function () {
            var apiUrl = 'http://localhost/estacao/server/public';
            return {
                serverApiBaseUrl: apiUrl
            };
        });
