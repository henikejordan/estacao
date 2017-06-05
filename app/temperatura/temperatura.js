angular.module('myApp')
        // Optional configuration
        .config(['$routeProvider', 'ChartJsProvider', function ($routeProvider, ChartJsProvider) {
                // Configure all charts
                ChartJsProvider.setOptions({
                    chartColors: ['#FF5252', '#FF8A80'],
                    responsive: false
                });
                // Configure all line charts
                ChartJsProvider.setOptions('line', {
                    showLines: false
                });

                $routeProvider.when('/temperatura', {
                    templateUrl: 'temperatura/temperatura.html',
                    controller: 'TemperaturaCtrl'
                });
            }])

        .controller("TemperaturaCtrl", ['$scope', '$timeout', TemperaturaCtrl]);

function TemperaturaCtrl($scope, $timeout) {
    $scope.labels = ["January", "February", "March", "April", "May", "June", "July"];
    $scope.series = ['Series A', 'Series B'];
    $scope.data = [
        [65, 59, 80, 81, 56, 55, 40],
        [28, 48, 40, 19, 86, 27, 90]
    ];
    $scope.onClick = function (points, evt) {
        console.log(points, evt);
    };
    
    var aux = 0;
    
    function wrapper() {
        $scope.data = [
            [aux, 48, 40, 19, 86, 27, 90],
            [65, 59, 80, 81, 56, 55, 40]
        ];
        aux += 10;
        $timeout(wrapper, 3000);
    }

    // Simulate async data update
    $timeout(wrapper, 3000);
}