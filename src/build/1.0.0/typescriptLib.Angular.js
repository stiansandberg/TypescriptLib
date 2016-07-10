var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
angular.module('typescriptLib.angular', ['ngAnimate']);
angular.module('app', ['typescriptLib.angular']);
var TSL;
(function (TSL) {
    var Components;
    (function (Components) {
        var TabController = (function () {
            function TabController() {
                var _this = this;
                this.selected = false;
                this.$onInit = function () {
                    _this.tslTabset.addTab(_this);
                };
            }
            return TabController;
        }());
        var TabComponent = (function () {
            function TabComponent() {
                this.transclude = true;
                this.controller = TabController;
                this.controllerAs = 'tab';
                this.template = '<ng-transclude ng-show="tab.selected"></ng-transclude>';
                this.bindings = {
                    label: '='
                };
                this.require = {
                    tslTabset: '^tslTabset'
                };
            }
            return TabComponent;
        }());
        var TabsetController = (function () {
            function TabsetController() {
                this.tabs = [];
            }
            TabsetController.prototype.select = function (tab, index) {
                angular.forEach(this.tabs, function (tab) {
                    tab.selected = false;
                });
                tab.selected = true;
                var eventArgs = {
                    tabIndex: index
                };
                this.onSelect({ $event: eventArgs });
            };
            TabsetController.prototype.addTab = function (tab) {
                if (this.tabs.length === 0) {
                    this.select(tab, 0);
                }
                this.tabs.push(tab);
            };
            ;
            return TabsetController;
        }());
        var TabsetComponent = (function () {
            function TabsetComponent() {
                this.transclude = true;
                this.controller = TabsetController;
                this.controllerAs = 'tabset';
                this.bindings = {
                    onSelect: '&'
                };
                this.template = '<div class="tslTabset">' +
                    '<ul class="tabs">' +
                    '<li ng-repeat="tab in tabset.tabs" ng-class="{ \'selected\' : tab.selected }" ng-click="tabset.select(tab, $index)">{{tab.label}}</li>' +
                    '</ul>' +
                    '<div class="tab" ng-transclude></div>' +
                    '</div>';
            }
            return TabsetComponent;
        }());
        angular.module('typescriptLib.angular').component('tslTabset', new TabsetComponent());
        angular.module('typescriptLib.angular').component('tslTab', new TabComponent());
    })(Components = TSL.Components || (TSL.Components = {}));
})(TSL || (TSL = {}));
/// <reference path="../../_definitelytyped/angularjs/angular.d.ts" />
var TSL;
(function (TSL) {
    var Components;
    (function (Components) {
        var EmailComponent = (function () {
            function EmailComponent() {
                this.bindings = {
                    address: '<',
                    subject: '<'
                };
                this.template = '<a ng-if="$ctrl.subject" href="mailto:{{$ctrl.address}}?subject={{$ctrl.subject}}" title="{{$ctrl.address}}">{{$ctrl.address}}</a>' +
                    '<a ng-if="!$ctrl.subject" href="mailto:{{$ctrl.address}}" title="{{$ctrl.address}}">{{$ctrl.address}}</a>';
            }
            return EmailComponent;
        }());
        angular.module('typescriptLib.angular').component('tslEmail', new EmailComponent());
    })(Components = TSL.Components || (TSL.Components = {}));
})(TSL || (TSL = {}));
/// <reference path="../../_definitelytyped/typescriptlib/typescriptlib.d.ts" />
var TSL;
(function (TSL) {
    var Components;
    (function (Components) {
        var DatetimepickerComponentController = (function () {
            function DatetimepickerComponentController($scope) {
                var _this = this;
                this.$scope = $scope;
                this.yearSelectorValue = new Date().getFullYear();
                this.monthSelectorValue = new Date().getMonth() + 1;
                this.hasTimePicker = false;
                this.calendarVisible = false;
                this.dropdownShowHideStyle = { 'display': 'none' };
                this.calendarService = new TSL.Services.CalendarService();
                this.$scope.$watch('dp.date', function (date) {
                    if (date && (date.getMonth())) {
                        _this.updateCalendar(date);
                        _this.updateTimeValue(date);
                    }
                });
                this.$scope.$watchGroup(['dp.yearSelectorValue', 'dp.monthSelectorValue'], function (newValues, oldValues) {
                    if (!newValues)
                        return;
                    if (oldValues[0] === newValues[0] && oldValues[1] === newValues[1])
                        return;
                    _this.updateCalendar(new Date(newValues[0], newValues[1] - 1, 1));
                });
                this.updateCalendar(new Date());
                this.hasTimePicker = true;
            }
            DatetimepickerComponentController.prototype.updateCalendar = function (date) {
                this.calendar = this.calendarService.getCalendar(date.getFullYear(), date.getMonth() + 1);
                this.yearSelectorValue = date.getFullYear();
                this.monthSelectorValue = date.getMonth() + 1;
            };
            DatetimepickerComponentController.prototype.navigateCalendar = function (navigate) {
                var month = this.calendar.getMonth().addMonths(navigate);
                this.updateCalendar(month.firstDate());
            };
            DatetimepickerComponentController.prototype.selectDate = function (date) {
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
            };
            DatetimepickerComponentController.prototype.isSelected = function (date) {
                if (!date || !this.date)
                    return false;
                return date.isSameDay(this.date);
            };
            DatetimepickerComponentController.prototype.isHolyday = function (date) {
                if (!date)
                    return false;
                for (var i = 0; i < this.calendar.dates.length; i++) {
                    var cd = this.calendar.dates[i];
                    if (cd.holydays.length > 0 && cd.date.isSameDay(date)) {
                        return true;
                    }
                }
                return false;
            };
            DatetimepickerComponentController.prototype.isToday = function (date) {
                if (!date)
                    return false;
                return date.isSameDay(new Date);
            };
            DatetimepickerComponentController.prototype.isCurrentMonth = function (date) {
                if (!date)
                    return false;
                return this.calendar.dates[15].date.getMonth() === date.getMonth();
            };
            DatetimepickerComponentController.prototype.showCalendar = function () {
                if (this.date) {
                    this.updateCalendar(this.date);
                    this.yearSelectorValue = this.date.getFullYear();
                    this.monthSelectorValue = this.date.getMonth() + 1;
                }
                this.calendarVisible = true;
                this.dropdownShowHideStyle = { 'max-height': 'auto' };
            };
            DatetimepickerComponentController.prototype.hideCalendar = function () {
                this.calendarVisible = false;
                this.dropdownShowHideStyle = { 'max-height': '0', 'display': 'none' };
            };
            DatetimepickerComponentController.prototype.toggleCalendar = function () {
                if (this.calendarVisible == true) {
                    this.hideCalendar();
                }
                else {
                    this.showCalendar();
                }
            };
            DatetimepickerComponentController.prototype.updateTimeValue = function (value) {
                if (!value || value.length == 0) {
                    this.date.setHours(0);
                    this.date.setMinutes(0);
                    return;
                }
                var time = { hour: 0, minute: 0 };
                var hour = 0;
                var minute = 0;
                if (this.isDate(value)) {
                    time = { hour: value.getHours(), minute: value.getMinutes() };
                }
                else if (value) {
                    time = this.parseTimeString(value);
                }
                this.timeValue = this.twoDigits(time.hour) + ':' + this.twoDigits(time.minute);
                this.date.setHours(time.hour);
                this.date.setMinutes(time.minute);
                this.date.setSeconds(0);
            };
            DatetimepickerComponentController.prototype.timeValueKeyUp = function (e, value) {
                if (value && value.length === 4 && this.isNumeric(value)) {
                    this.updateTimeValue(value);
                }
            };
            DatetimepickerComponentController.prototype.twoDigits = function (value) {
                if (value < 10)
                    return '0' + value.toString();
                return value.toString();
            };
            DatetimepickerComponentController.prototype.parseTimeString = function (value) {
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
            };
            DatetimepickerComponentController.prototype.isDate = function (value) {
                if (!value)
                    return false;
                return (typeof value.getMonth === 'function');
            };
            DatetimepickerComponentController.prototype.isNumeric = function (value) {
                return (/^\d+$/.test(value));
            };
            DatetimepickerComponentController.$inject = ['$scope'];
            return DatetimepickerComponentController;
        }());
        var DatetimepickerComponent = (function () {
            function DatetimepickerComponent() {
                this.replace = true;
                this.controller = DatetimepickerComponentController;
                this.controllerAs = 'dp';
                this.bindings = {
                    date: '=',
                    min: '<',
                    max: '<'
                };
                this.templateUrl = '/components/datepicker/datepicker.html';
            }
            return DatetimepickerComponent;
        }());
        var DatepickerComponentController = (function (_super) {
            __extends(DatepickerComponentController, _super);
            function DatepickerComponentController($scope) {
                _super.call(this, $scope);
                this.$scope = $scope;
                this.hasTimePicker = false;
            }
            DatepickerComponentController.$inject = ['$scope'];
            return DatepickerComponentController;
        }(DatetimepickerComponentController));
        var DatepickerComponent = (function () {
            function DatepickerComponent() {
                this.replace = true;
                this.controller = DatepickerComponentController;
                this.controllerAs = 'dp';
                this.bindings = {
                    date: '=',
                    min: '<',
                    max: '<'
                };
                //templateUrl: string = '/components/datepicker/datepicker.html';
                this.template = '<div class="btn-group tslDatepicker"> <div class="date-control"> <button type="button" class="btn btn-default dropdown-toggle" ng-click="dp.toggleCalendar()">{{(dp.date | date) || \'Velg dato\'}}<span class="caret"></span> </button> <div class="dropdown-menu" ng-style="dp.dropdownShowHideStyle"> <table class="navigation"> <tr> <td class="nav"><a class="btn btn-default" ng-click="dp.navigateCalendar(-1)">&lt;</a></td><td><monthpicker month="dp.monthSelectorValue"></monthpicker></td><td><yearpicker year="dp.yearSelectorValue"></yearpicker></td><td class="nav"><a class="btn btn-default" ng-click="dp.navigateCalendar(+1)">&gt;</a></td></tr></table> <table class="calendar"> <thead> <tr class="days"> <th>Uke</th> <th>Ma</th> <th>Ti</th> <th>On</th> <th>To</th> <th>Fr</th> <th>Lø</th> <th>Sø</th> </tr></thead> <tbody> <tr ng-repeat="week in dp.calendar.weeks"> <td class="weeknumber"> <small>{{week.weekNumber}}</small> </td><td ng-repeat="i in [0,1,2,3,4,5,6]" ng-class="{\'today\':dp.isToday(week._dates[i]), \'holyday\': dp.isHolyday(week._dates[i]),\'selected\': dp.isSelected(week._dates[i]),\'notCurrentMonth\': !dp.isCurrentMonth(week._dates[i])}" ng-click="dp.selectDate(week._dates[i])">{{week._dates[i].getDate()}}</td></tr></tbody> <tfoot> <tr> <td colspan="8"> <a ng-click="dp.selectDate(dp.now)">{{dp.now|date}}</a> </td></tr></tfoot> </table> </div></div><div class="time-control"> <div ng-if="dp.hasTimePicker"> <input type="text" class="form-control" ng-model="dp.timeValue" ng-blur="dp.updateTimeValue(dp.timeValue)" ng-keyup="dp.timeValueKeyUp($event, dp.timeValue)" maxlength="5"/> </div></div></div>';
            }
            return DatepickerComponent;
        }());
        angular.module('typescriptLib.angular').component('tslDatetimepicker', new DatetimepickerComponent());
        angular.module('typescriptLib.angular').component('tslDatepicker', new DatepickerComponent());
    })(Components = TSL.Components || (TSL.Components = {}));
})(TSL || (TSL = {}));
var TSL;
(function (TSL) {
    var Components;
    (function (Components) {
        var DaterangepickerComponentController = (function () {
            function DaterangepickerComponentController($scope) {
                var _this = this;
                this.$scope = $scope;
                this.$scope.$watch('dp.start', function (date) {
                    if (_this.start && _this.end) {
                        if (_this.start.getTime() > _this.end.getTime()) {
                            _this.end = _this.start;
                        }
                    }
                });
                this.$scope.$watch('dp.end', function (date) {
                    if (_this.start && _this.end) {
                        if (_this.start.getTime() > _this.end.getTime()) {
                            _this.start = _this.end;
                        }
                    }
                });
            }
            return DaterangepickerComponentController;
        }());
        var DaterangepickerComponent = (function () {
            function DaterangepickerComponent() {
                this.replace = true;
                this.controller = DaterangepickerComponentController;
                this.controllerAs = 'dp';
                this.bindings = {
                    start: '=',
                    end: '='
                };
                this.template = '<datepicker date="dp.start"></datepicker><datepicker date="dp.end"></datepicker>';
            }
            return DaterangepickerComponent;
        }());
        angular.module('typescriptLib.angular').component('tslDaterangepicker', new DaterangepickerComponent());
    })(Components = TSL.Components || (TSL.Components = {}));
})(TSL || (TSL = {}));
var TSL;
(function (TSL) {
    var Components;
    (function (Components) {
        var MonthpickerComponentController = (function () {
            function MonthpickerComponentController($scope) {
                this.$scope = $scope;
                this.monthNames = ['Januar', 'Februar', 'Mars', 'April', 'Mai', 'Juni', 'Juli', 'August', 'September', 'Oktober', 'November', 'Desember'];
                this.possibleValues = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
                this.month = new Date().getMonth() + 1;
            }
            MonthpickerComponentController.$inject = ['$scope'];
            return MonthpickerComponentController;
        }());
        var MonthpickerComponent = (function () {
            function MonthpickerComponent() {
                this.replace = true;
                this.controller = MonthpickerComponentController;
                this.controllerAs = 'mp';
                this.bindings = {
                    month: '='
                };
                this.template = '<select class="form-control" ng-model="mp.month" ng-options="(mp.monthNames[item-1]) for item in mp.possibleValues"></select>';
            }
            return MonthpickerComponent;
        }());
        angular.module('typescriptLib.angular').component('tslMonthpicker', new MonthpickerComponent());
    })(Components = TSL.Components || (TSL.Components = {}));
})(TSL || (TSL = {}));
var TSL;
(function (TSL) {
    var Components;
    (function (Components) {
        var YearpickerComponentController = (function () {
            function YearpickerComponentController($scope) {
                this.$scope = $scope;
                this.possibleValues = [];
                var self = this;
                this.$scope.$watch('yp.year', function (year) {
                    if (year) {
                        self.possibleValues = [];
                        for (var i = -14; i < 15; i++) {
                            self.possibleValues.push(year + i);
                        }
                    }
                });
                self.year = new Date().getFullYear();
            }
            YearpickerComponentController.$inject = ['$scope'];
            return YearpickerComponentController;
        }());
        var YearpickerComponent = (function () {
            function YearpickerComponent() {
                this.replace = true;
                this.controller = YearpickerComponentController;
                this.controllerAs = 'yp';
                this.bindings = {
                    year: '='
                };
                this.template = '<select class="form-control" ng-model="yp.year" ng-options="item for item in yp.possibleValues"></select>';
            }
            return YearpickerComponent;
        }());
        angular.module('typescriptLib.angular').component('tslYearpicker', new YearpickerComponent());
    })(Components = TSL.Components || (TSL.Components = {}));
})(TSL || (TSL = {}));
//# sourceMappingURL=typescriptLib.Angular.js.map