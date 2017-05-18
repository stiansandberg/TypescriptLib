var demoApp = angular.module('demoApp', ['ngRoute', 'typescriptLib.angular']);
angular.element(document).ready(function () {
    angular.bootstrap(document, ['demoApp'], {
        debugInfoEnabled: true
    });
});
var RouteConfig = (function () {
    function RouteConfig($routeProvider, $locationProvider) {
        this.$routeProvider = $routeProvider;
        this.$locationProvider = $locationProvider;
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
    return RouteConfig;
}());
RouteConfig.$inject = ['$routeProvider', '$locationProvider'];
angular.module('demoApp').config(RouteConfig);
var DemoAppController = (function () {
    function DemoAppController() {
        this.now = new Date();
        this.date1 = this.now.addDays(-10);
        this.date2 = this.now.addDays(-20);
        this.date3 = this.now.addDays(-30);
        this.date4 = this.now.addDays(50);
    }
    return DemoAppController;
}());
DemoAppController.$inject = [];
angular.module('demoApp').controller('demoAppController', DemoAppController);
