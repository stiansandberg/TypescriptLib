module TSL.Components {

    class YearpickerComponentController {

        static $inject = ['$scope'];

        constructor(private $scope: ng.IScope) {

            var self = this;

            this.$scope.$watch('yp.year', (year: number) => {

                if (year) {
                    self.possibleValues = [];
                    for (var i = -14; i < 15; i++) {
                        self.possibleValues.push(year + i);
                    }
                }

            });

            self.year = new Date().getFullYear();
        }

        year: number;
        possibleValues: Array<number> = [];
    }


    class YearpickerComponent {

        replace: boolean = true;
        controller: any = YearpickerComponentController;
        controllerAs: string = 'yp';
        bindings: any = {
            year: '='
        };
        template: string = '<select class="form-control" ng-model="yp.year" ng-options="item for item in yp.possibleValues"></select>';
    }


    angular.module('typescriptLib.angular').component('tslYearpicker', new YearpickerComponent());
}