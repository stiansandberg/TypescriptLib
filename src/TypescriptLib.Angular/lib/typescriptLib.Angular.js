angular.module('typescriptLib.angular', ['ngAnimate']);
angular.module('app', ['typescriptLib.angular']);
/// <reference path="../../_definitelytyped/angularjs/angular.d.ts" />
/// <reference path="../../_definitelytyped/typescriptlib/typescriptlib.d.ts" />
var TSL;
(function (TSL) {
    var Components;
    (function (Components) {
        var DatepickerController = (function () {
            function DatepickerController($scope) {
                var _this = this;
                this.$scope = $scope;
                this.calendarService = new TSL.Services.CalendarService();
                this.holidayService = new TSL.Services.HolydayService();
                this.holydays = [];
                this.calendarVisible = false;
                angular.element(document).on('click', function () {
                    _this.hideCalendar();
                    _this.$scope.$apply();
                });
            }
            DatepickerController.prototype.select = function (date) {
                this.date = date;
                this.updateCalendar(this.date);
                this.hideCalendar();
            };
            DatepickerController.prototype.showCalendar = function () {
                if (!this.calendarVisible) {
                    this.updateCalendar(this.date);
                    this.calendarVisible = true;
                }
            };
            DatepickerController.prototype.hideCalendar = function () {
                if (this.calendarVisible) {
                    this.calendarVisible = false;
                }
            };
            DatepickerController.prototype.updateCalendar = function (date) {
                this.calendar = this.calendarService.getCalendar(date.getFullYear(), date.getMonth() + 1);
                this.holydays = this.holidayService.getHolydays(date.getFullYear());
            };
            DatepickerController.prototype.getHolidays = function (date) {
                var holydays = [];
                this.holydays.forEach(function (holyday) {
                    if (date.isSameDay(holyday.date)) {
                        holydays.push(holyday);
                    }
                });
                return holydays;
            };
            DatepickerController.prototype.navigateMonth = function (nav) {
                var currentMonth = this.calendar.getMonth();
                var newDate = currentMonth.firstDate().addMonths(nav);
                this.updateCalendar(newDate);
            };
            DatepickerController.prototype.datepickerClick = function ($event, scope) {
                $event.stopPropagation();
            };
            DatepickerController.$inject = ['$scope'];
            return DatepickerController;
        }());
        var DatepickerComponent = (function () {
            function DatepickerComponent() {
                this.controller = DatepickerController;
                this.controllerAs = 'dp';
                this.templateUrl = '/components/datepicker/datepicker.html';
                this.bindings = {
                    min: '<',
                    max: '<',
                    date: '='
                };
            }
            return DatepickerComponent;
        }());
        angular.module('typescriptLib.angular').component('tslDatepicker', new DatepickerComponent());
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
                    address: '=',
                    subject: '='
                };
                this.template = '<a ng-if="$ctrl.subject" href="mailto:{{$ctrl.address}}?subject={{$ctrl.subject}}" title="{{$ctrl.address}}">{{$ctrl.address}}</a>' +
                    '<a ng-if="!$ctrl.subject" href="mailto:{{$ctrl.address}}" title="{{$ctrl.address}}">{{$ctrl.address}}</a>';
            }
            return EmailComponent;
        }());
        angular.module('typescriptLib.angular').component('tslEmail', new EmailComponent());
    })(Components = TSL.Components || (TSL.Components = {}));
})(TSL || (TSL = {}));
/// <reference path="../../_definitelytyped/angularjs/angular.d.ts" />
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
            TabsetController.prototype.select = function (tab) {
                angular.forEach(this.tabs, function (tab) {
                    tab.selected = false;
                });
                tab.selected = true;
            };
            TabsetController.prototype.addTab = function (tab) {
                if (this.tabs.length === 0) {
                    this.select(tab);
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
                this.template = '<div class="tslTabs">' +
                    '<ul>' +
                    '<li ng-repeat="tab in tabset.tabs" ng-class="{ \'tslTabs-selected\' : tab.selected }" ng-click="tabset.select(tab)">{{tab.label}}</li>' +
                    '</ul>' +
                    '<div class="tslTabs-content" ng-transclude></div>' +
                    '</div>';
            }
            return TabsetComponent;
        }());
        angular.module('typescriptLib.angular').component('tslTab', new TabComponent());
        angular.module('typescriptLib.angular').component('tslTabset', new TabsetComponent());
    })(Components = TSL.Components || (TSL.Components = {}));
})(TSL || (TSL = {}));
//# sourceMappingURL=typescriptLib.Angular.js.map