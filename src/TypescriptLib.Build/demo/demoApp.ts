/// <reference path="../_definitelytyped/angularjs/angular.d.ts" />

var demoApp = angular.module('demoApp', ['ngRoute', 'typescriptLib.angular']);

angular.element(document).ready(() => {
    angular.bootstrap(document, ['demoApp'], {
        debugInfoEnabled: true        
    });
});
 