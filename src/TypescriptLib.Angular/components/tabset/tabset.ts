/// <reference path="../../_definitelytyped/angularjs/angular.d.ts" />

module TSL.Components {

    interface ITab {
        selected: boolean;
    }

    class TabController {
        $onInit: any;
        tslTabset: TabsetController;
        selected: boolean = false;

        constructor() {
            this.$onInit = () => {
                this.tslTabset.addTab(this);
            }
        }
    }

    class TabComponent implements ng.IComponentOptions {
        transclude: boolean = true;
        controller = TabController;
        controllerAs: string = 'tab';
        template: string = '<ng-transclude ng-show="tab.selected"></ng-transclude>';
        bindings: any = {
            label: '='
        };

        require: any = {
            tslTabset: '^tslTabset'
        };
    }


    class TabsetController {
        tabs: Array<ITab> = [];

        select(tab: ITab) {
            angular.forEach(this.tabs, (tab: ITab) => {
                tab.selected = false;
            });
            tab.selected = true;
        }

        addTab(tab: ITab) {
            if (this.tabs.length === 0) {
                this.select(tab);
            }
            this.tabs.push(tab);
        };
    }

    class TabsetComponent implements ng.IComponentOptions {
        transclude: boolean = true;
        controller: any = TabsetController;
        controllerAs: string = 'tabset';
        template: string = '<div class="tslTabs">' +
        '<ul>' +
        '<li ng-repeat="tab in tabset.tabs" ng-class="{ \'tslTabs-selected\' : tab.selected }" ng-click="tabset.select(tab)">{{tab.label}}</li>' +
        '</ul>' +
        '<div class="tslTabs-content" ng-transclude></div>' +
        '</div>';
    }

    angular.module('typescriptLib.angular').component('tslTab', new TabComponent());
    angular.module('typescriptLib.angular').component('tslTabset', new TabsetComponent());
}