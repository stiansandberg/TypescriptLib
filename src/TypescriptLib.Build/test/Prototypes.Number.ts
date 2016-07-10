/// <reference path="../build/1.0.0/typescriptlib.d.ts" />
/// <reference path="../_definitelytyped/qunit/qunit.d.ts" />

QUnit.module('Prototypes.Number');

QUnit.test('floor', function (a: QUnitAssert) {
    for (var i = 0; i < 100; ++i) {
        var rndNumber = Math.floor((Math.random() * 10000) + 1) * Math.random();
        var floor = rndNumber.floor();
        a.ok(Math.floor(rndNumber) === floor, 'floor ' + rndNumber + ' eq ' + floor);
    }
});

QUnit.test('ceil', function (a: QUnitAssert) {
    for (var i = 0; i < 100; ++i) {
        var rndNumber = Math.floor((Math.random() * 10000) + 1) * Math.random();
        var ceil = rndNumber.ceil();
        a.ok(Math.ceil(rndNumber) === ceil, 'ceil ' + rndNumber + ' eq ' + ceil);
    }
});

QUnit.test('percent', function (a: QUnitAssert) {

    var testAddPercent = function (num: number, percent: number, expect: number) {
        a.ok((num).addPercent(percent) === expect, num + ' + ' + percent + '% er ' + expect);
    }
    var testPercentageOf = function (num: number, total: number, expect: number) {
        a.ok((num).percentageOf(total) === expect, expect + '% av ' + total + ' er ' + num);
    }

    testAddPercent(100, 10, 110);
    testAddPercent(50, 10, 55);
    testAddPercent(10, 1, 10.1);
    testAddPercent(100, -10, 90);

    testPercentageOf(100, 200, 50);
    testPercentageOf(50, 200, 25);
    testPercentageOf(20, 200, 10);
    testPercentageOf(100, 100, 100);
    testPercentageOf(50, 100, 50);
    testPercentageOf(20, 100, 20);
});

QUnit.test('between', function (a: QUnitAssert) {
    a.ok((2).between(1, 100));
    a.ok((2).between(2, 2));
    a.ok((2).between(2, 3));
    a.ok((2).between(1.9, 2));

    a.ok((0.9).between(1, 100) === false);
    a.ok((1).between(2, 2) === false);
    a.ok((3.1).between(2, 3) === false);
    a.ok((1.89).between(1.9, 2) === false);
});

QUnit.test('in,', function (a: QUnitAssert) {
    a.ok((1).in([1, 2, 3]));
    a.ok((2).in([1, 2, 3]));
    a.ok((3).in([1, 2, 3]));
    a.ok((4).in([1, 2, 3]) === false);
});