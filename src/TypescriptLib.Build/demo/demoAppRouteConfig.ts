/// <reference path="demoapp.ts" />
/// <reference path="../_definitelytyped/angularjs/angular-route.d.ts" />

class RouteConfig {
    static $inject = ['$routeProvider', '$locationProvider'];
    constructor(private $routeProvider: ng.route.IRouteProvider, private $locationProvider: ng.ILocationProvider) {

        this.$routeProvider
            .when('/datepicker', {
                templateUrl: 'views/datepicker.html'
            })
            .when('/tabset', {
                templateUrl: 'views/tabset.html'
            })
            .otherwise({
                templateUrl: 'views/index.html'
            });
    }
}

angular.module('demoApp').config(RouteConfig);