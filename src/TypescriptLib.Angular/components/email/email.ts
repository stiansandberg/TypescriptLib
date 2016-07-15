/// <reference path="../../_definitelytyped/angularjs/angular.d.ts" />
/// <reference path="../../app.ts" />

module TSL.Components {

    class EmailComponent implements ng.IComponentOptions {
        public bindings: any = {
            address: '<',
            subject: '<'
        };
        public template: string = '<a ng-if="$ctrl.subject" href="mailto:{{$ctrl.address}}?subject={{$ctrl.subject}}" title="{{$ctrl.address}}">{{$ctrl.address}}</a>' +
        '<a ng-if="!$ctrl.subject" href="mailto:{{$ctrl.address}}" title="{{$ctrl.address}}">{{$ctrl.address}}</a>';
    }

    angular.module('typescriptLib.angular')
        .component('tslEmail', new EmailComponent());
}