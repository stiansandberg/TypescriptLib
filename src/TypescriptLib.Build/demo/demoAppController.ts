/// <reference path="demoapp.ts" />
/// <reference path="../build/1.0.0/typescriptlib.d.ts" />

class DemoAppController {
    static $inject = [];
    constructor() {
        this.now = new Date();
        this.date1 = this.now.addDays(-10);
        this.date2 = this.now.addDays(-20);
        this.date3 = this.now.addDays(-30);
        this.date4 = this.now.addDays(50);
    }

    now: Date;
    date1: Date;
    date2: Date;
    date3: Date;
    date4: Date;
}

angular.module('demoApp').controller('demoAppController', DemoAppController)

