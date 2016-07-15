/// <reference path="../../app.ts" />
module TSL.Components {

    class MonthpickerComponentController {

        constructor() {
            this.month = new Date().getMonth() + 1;
        }

        month: number;
        monthNames: Array<string> = ['Januar', 'Februar', 'Mars', 'April', 'Mai', 'Juni', 'Juli', 'August', 'September', 'Oktober', 'November', 'Desember'];
        possibleValues: Array<number> = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
    }


    class MonthpickerComponent {

        replace: boolean = true;
        controller: any = MonthpickerComponentController;
        controllerAs: string = 'mp';
        bindings: any = {
            month: '='
        };
        template: string = '<select class="form-control" ng-model="mp.month" ng-options="(mp.monthNames[item-1]) for item in mp.possibleValues"></select>';
    }


    angular.module('typescriptLib.angular')
        .component('tslMonthpicker', new MonthpickerComponent());
}