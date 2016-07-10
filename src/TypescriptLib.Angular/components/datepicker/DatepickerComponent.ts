/// <reference path="../../_definitelytyped/typescriptlib/typescriptlib.d.ts" />

module TSL.Components {

    interface ITime {
        hour: number;
        minute: number;
    }

    class DatetimepickerComponentController {

        static $inject = ['$scope'];
        constructor(public $scope: ng.IScope) {

            this.$scope.$watch('dp.date', (date: Date) => {
                if (date && (date.getMonth())) {
                    this.updateCalendar(date);
                    this.updateTimeValue(date);
                }
            });

            this.$scope.$watchGroup(['dp.yearSelectorValue', 'dp.monthSelectorValue'], (newValues: Array<number>, oldValues: Array<number>) => {
                if (!newValues)
                    return;

                if (oldValues[0] === newValues[0] && oldValues[1] === newValues[1])
                    return;

                this.updateCalendar(new Date(newValues[0], newValues[1] - 1, 1));
            });

            this.updateCalendar(new Date());
            this.hasTimePicker = true;
        }

        yearSelectorValue: number = new Date().getFullYear();
        monthSelectorValue: number = new Date().getMonth() + 1;

        timeValue: string;
        hasTimePicker: boolean = false;
        calendarVisible: boolean = false;
        now: Date;
        dropdownShowHideStyle: any = { 'display': 'none' };
        calendarService: TSL.Services.CalendarService = new TSL.Services.CalendarService();
        calendar: TSL.Services.Calendar;
        date: Date;
        min: Date;
        max: Date;

        updateCalendar(date: Date): void {
            this.calendar = this.calendarService.getCalendar(date.getFullYear(), date.getMonth() + 1);
            this.yearSelectorValue = date.getFullYear();
            this.monthSelectorValue = date.getMonth() + 1;
        }

        navigateCalendar(navigate: number) {
            var month = this.calendar.getMonth().addMonths(navigate);
            this.updateCalendar(month.firstDate());
        }

        selectDate(date: Date) {

            var hour = 0;
            var minute = 0;
            if (this.isDate(this.date)) {
                hour = this.date.getHours();
                minute = this.date.getMinutes();
            }

            // do not update time (hour/minute)
            var newDate = new Date(date.getFullYear(), date.getMonth(), date.getDate(), hour, minute);

            this.date = newDate;
            this.updateCalendar(newDate);
            this.hideCalendar();
        }

        isSelected(date: Date) {
            if (!date || !this.date)
                return false;
            return date.isSameDay(this.date);
        }

        isHolyday(date: Date): boolean {
            if (!date)
                return false;

            for (var i = 0; i < this.calendar.dates.length; i++) {
                var cd = this.calendar.dates[i];
                if (cd.holydays.length > 0 && cd.date.isSameDay(date)) {
                    return true;
                }
            }
            return false;
        }

        isToday(date: Date): boolean{
            if (!date)
                return false;
            return date.isSameDay(new Date);
        }

        isCurrentMonth(date: Date) {
            if (!date)
                return false;
            return this.calendar.dates[15].date.getMonth() === date.getMonth();
        }

        showCalendar() {
            if (this.date) {
                this.updateCalendar(this.date);
                this.yearSelectorValue = this.date.getFullYear();
                this.monthSelectorValue = this.date.getMonth() + 1;
            }
            this.calendarVisible = true;
            this.dropdownShowHideStyle = { 'max-height': 'auto' };
        }

        hideCalendar() {
            this.calendarVisible = false;
            this.dropdownShowHideStyle = { 'max-height': '0', 'display': 'none' };
        }

        toggleCalendar() {
            if (this.calendarVisible == true) {
                this.hideCalendar();
            } else {
                this.showCalendar();
            }
        }

        updateTimeValue(value: any) {

            if (!value || value.length == 0) {
                this.date.setHours(0);
                this.date.setMinutes(0);
                return;
            }
            var time: ITime = { hour: 0, minute: 0 };

            var hour: number = 0;
            var minute: number = 0;

            if (this.isDate(value)) {
                time = { hour: (value as Date).getHours(), minute: (value as Date).getMinutes() };
            }
            else if (value) {
                time = this.parseTimeString(value);
            }

            this.timeValue = this.twoDigits(time.hour) + ':' + this.twoDigits(time.minute);
            this.date.setHours(time.hour);
            this.date.setMinutes(time.minute);
            this.date.setSeconds(0);
        }

        timeValueKeyUp(e: any, value: string) {
            if (value && value.length === 4 && this.isNumeric(value)) {
                this.updateTimeValue(value);
            }
        }

        private twoDigits(value: number): string {
            if (value < 10)
                return '0' + value.toString();
            return value.toString();
        }

        private parseTimeString(value: string): ITime {

            var hour = 0;
            var minute = 0;

            if ((value.indexOf(':') > -1) && (value.length < 6)) {
                var parts = value.split(':');
                if (parts.length === 2) {
                    hour = parseInt(parts[0]);
                    minute = parseInt(parts[1]);
                }
            }
            else if ((value.indexOf('.') > -1) && (value.length < 6)) {
                var parts = value.split('.');
                if (parts.length === 2) {
                    hour = parseInt(parts[0]);
                    minute = parseInt(parts[1]);
                }
            }
            else if (value.length === 4 && this.isNumeric(value)) {
                // 4 numbers
                hour = parseInt(value.substring(0, 2));
                minute = parseInt(value.substring(2, 4));
            }

            return { hour: hour, minute: minute };
        }

        private isDate(value: any) {
            if (!value)
                return false;
            return (typeof value.getMonth === 'function');
        }

        private isNumeric(value: string): boolean {
            return (/^\d+$/.test(value));
        }

    }

    class DatetimepickerComponent implements ng.IComponentOptions {
        replace: boolean = true;
        controller: any = DatetimepickerComponentController;
        controllerAs: string = 'dp';
        bindings: any = {
            date: '=',
            min: '<',
            max: '<'
        };
        templateUrl: string = '/components/datepicker/datepicker.html';
    }

    class DatepickerComponentController extends DatetimepickerComponentController {
        static $inject = ['$scope'];
        constructor(public $scope: ng.IScope) {
            super($scope);
            this.hasTimePicker = false;
        }
    }

    class DatepickerComponent implements ng.IComponentOptions {
        replace: boolean = true;
        controller: any = DatepickerComponentController;
        controllerAs: string = 'dp';
        bindings: any = {
            date: '=',
            min: '<',
            max: '<'
        };
        templateUrl: string = '/components/datepicker/datepicker.html';
    }


    angular.module('typescriptLib.angular').component('tslDatetimepicker', new DatetimepickerComponent());
    angular.module('typescriptLib.angular').component('tslDatepicker', new DatepickerComponent());
}