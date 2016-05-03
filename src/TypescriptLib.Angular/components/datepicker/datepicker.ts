/// <reference path="../../_definitelytyped/angularjs/angular.d.ts" />
/// <reference path="../../_definitelytyped/typescriptlib/typescriptlib.d.ts" />

module TSL.Components {

    interface IDatepickerBindings {
        min?: Date;
        max?: Date;
        date?: Date;
    }

    class DatepickerController {

        static $inject = ['$scope'];

        $onDestroy: any;
        date: Date;
        min: Date;
        max: Date;

        calendar: Services.ICalendar;
        calendarService: TSL.Services.ICalendarService = new TSL.Services.CalendarService();
        holidayService: TSL.Services.IHolydayService = new TSL.Services.HolydayService();
        holydays: Array<TSL.Services.IHolyday> = [];
        calendarVisible: boolean = false;

        constructor(private $scope: ng.IScope) {
            
            angular.element(document).on('click', () => {
                this.hideCalendar();
                this.$scope.$apply();
            });
        }

        select(date: Date) {
            this.date = date;
            this.updateCalendar(this.date);
            this.hideCalendar();
        }

        showCalendar() {
            if (!this.calendarVisible) {
                this.updateCalendar(this.date);
                this.calendarVisible = true;
            }
        }

        hideCalendar() {
            if (this.calendarVisible) {
                this.calendarVisible = false;
            }
        }

        updateCalendar(date: Date) {
            this.calendar = this.calendarService.getCalendar(date.getFullYear(), date.getMonth() + 1);
            this.holydays = this.holidayService.getHolydays(date.getFullYear());
        }

        getHolidays(date: Date) {
            var holydays = [];
            this.holydays.forEach((holyday: Services.IHolyday) => {
                if (date.isSameDay(holyday.date)) {
                    holydays.push(holyday);
                }
            });
            return holydays;
        }

        navigateMonth(nav: number) {
            var currentMonth = this.calendar.getMonth();
            var newDate = currentMonth.firstDate().addMonths(nav);
            this.updateCalendar(newDate);
        }

        datepickerClick($event: ng.IAngularEvent, scope: any) {
            $event.stopPropagation();
        }
    }

    class DatepickerComponent implements ng.IComponentOptions {

        controller: any = DatepickerController;
        controllerAs: string = 'dp';
        templateUrl: string = '/components/datepicker/datepicker.html';

        bindings: any = {
            min: '<',
            max: '<',
            date: '='
        };
    }

    angular.module('typescriptLib.angular').component('tslDatepicker', new DatepickerComponent());
}