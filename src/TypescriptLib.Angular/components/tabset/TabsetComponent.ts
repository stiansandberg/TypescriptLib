module TSL.Components {

    interface ITab {
        selected: boolean;
    }

    export interface ITabSelectedEventArgs {
        tabIndex: number;
    }

    class TabController {

        constructor() {
            this.$onInit = () => {
                this.tslTabset.addTab(this);
            }
        }

        $onInit: any;
        $postLink: any;

        tslTabset: TabsetController;
        selected: boolean = false;
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
        onSelect: (tabIndex: any) => void;

        select(tab: ITab, index: number) {
            angular.forEach(this.tabs, (tab: ITab) => {
                tab.selected = false;
            });
            tab.selected = true;

            var eventArgs: ITabSelectedEventArgs = {
                tabIndex: index
            };
            this.onSelect({ $event: eventArgs });
        }

        addTab(tab: ITab) {
            if (this.tabs.length === 0) {
                this.select(tab, 0);
            }
            this.tabs.push(tab);
        };
    }

    class TabsetComponent implements ng.IComponentOptions {
        transclude: boolean = true;
        controller: any = TabsetController;
        controllerAs: string = 'tabset';
        bindings: any = {
            onSelect: '&'
        };
        template: string = '<div class="tabset">' +
        '<ul class="tabs">' +
        '<li ng-repeat="tab in tabset.tabs" ng-class="{ \'selected\' : tab.selected }" ng-click="tabset.select(tab, $index)">{{tab.label}}</li>' +
        '</ul>' +
        '<div class="tab" ng-transclude></div>' +
        '</div>';
    }

    angular.module('typescriptLib.angular').component('tslTabset', new TabsetComponent());
    angular.module('typescriptLib.angular').component('tslTab', new TabComponent());
}