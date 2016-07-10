/// <reference path="../build/1.0.0/typescriptlib.d.ts" />
/// <reference path="../_definitelytyped/qunit/qunit.d.ts" />

QUnit.module('Month');

QUnit.test('Month navigation', function (a: QUnitAssert) {

    var month = TSL.Month.Now();
    var now = new Date();

    a.ok(now.getMonth() + 1 === month.monthNumber);    

    var nov2015 = new TSL.Month(2015, 11);
    var des2015 = new TSL.Month(2015, 12);

    a.equal(nov2015.addMonths(1).monthNumber, des2015.monthNumber);
   
    a.equal(nov2015.monthNumber, des2015.addMonths(-1).monthNumber);

    a.equal(nov2015.getDates().length, 30);
    a.equal(des2015.getDates().length, 31);
});