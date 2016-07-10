module TSL.Components {

    class DaterangepickerComponentController {

        constructor(private $scope: ng.IScope) {

            this.$scope.$watch('dp.start', (date: Date) => {
                if (this.start && this.end) {
                    if (this.start.getTime() > this.end.getTime()) {
                        this.end = this.start;
                    }
                }
            });

            this.$scope.$watch('dp.end', (date: Date) => {
                if (this.start && this.end) {
                    if (this.start.getTime() > this.end.getTime()) {
                        this.start = this.end;
                    }
                }
            });
        }

        start: Date;
        end: Date;
    }

    class DaterangepickerComponent implements ng.IComponentOptions {
        replace: boolean = true;
        controller: any = DaterangepickerComponentController;
        controllerAs: string = 'dp';
        bindings: any = {
            start: '=',
            end: '='
        };
        template: string = '<datepicker date="dp.start"></datepicker><datepicker date="dp.end"></datepicker>';
    }

    angular.module('typescriptLib.angular').component('tslDaterangepicker', new DaterangepickerComponent());
}