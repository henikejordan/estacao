angular.module('myApp', ['ngRoute', 'chart.js'])
        .config(['$locationProvider', '$routeProvider', function ($locationProvider, $routeProvider) {
                $locationProvider.hashPrefix('!');
                $routeProvider.otherwise({redirectTo: '/temperatura'});
            }])

        .factory('appConfig', function () {
            var apiUrl = 'http://localhost/laravel5.3/server/public';
            return {
                serverApiBaseUrl: apiUrl
            };
        });
