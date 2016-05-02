angular.module('typescriptLib.angular', []);
angular.module('app', ['typescriptLib.angular']);
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