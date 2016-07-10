/// <reference path="../build/1.0.0/typescriptlib.d.ts" />
/// <reference path="../_definitelytyped/qunit/qunit.d.ts" />

QUnit.module('Validation');

QUnit.test('isNullOrEmpty', (a: QUnitAssert) => {

    var nullValues: Array<any> = [null, NaN, [], {}, new Object(), new Object(null), Object.create(null), new Array(0)];
    var notNullValues: Array<any> = [-1, 0, 1, 2, 'test', [1, 2], new Object(1), new Array(1), Object.create({ a: 1 })];

    var i = 0;
    for (i = 0; i < nullValues.length; i++) {
        a.equal(TSL.Validation.isNullOrEmpty(nullValues[i]), true);
    }

    i = 0;
    for (i = 0; i < notNullValues.length; i++) {
        a.equal(TSL.Validation.isNullOrEmpty(notNullValues[i]), false);
    }
});

QUnit.test('isEmail', function (a: QUnitAssert) {
    var validEmail: Array<string> = ['stian@stian.net'];
    var invalidEmail: Array<string> = ['d@d.b'];

    var i = 0;
    for (i = 0; i < validEmail.length; i++) {
        a.equal(TSL.Validation.isEmail(validEmail[i]), true);
    }

    i = 0;
    for (i = 0; i < invalidEmail.length; i++) {
        a.equal(TSL.Validation.isEmail(invalidEmail[i]), false);
    }
});

QUnit.test('isFloat', (a: QUnitAssert) => {
    var validFloats: Array<any> = [1.0, 1.1, 2.2, 3.3, 123.3, 321];
    var invalidFloats: Array<any> = [null, 'a', NaN, { a: 1 }, [1, 2]];

    var i = 0;
    for (i = 0; i < validFloats.length; i++) {
        a.equal(TSL.Validation.isNumber(validFloats[i]), true);
    }

    i = 0;
    for (i = 0; i < invalidFloats.length; i++) {
        a.equal(TSL.Validation.isNumber(invalidFloats[i]), false);
    }
});

QUnit.test('isInt', (a: QUnitAssert) => {
    var validInts: Array<any> = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 100, 1000, 999, 234, 1234, 6354, 3457, 12345, 48, -1, -2, -3, -4];
    var invalidInts: Array<any> = [1.1, 'a', NaN, { a: 1 }, [1, 2]];

    var i = 0;
    for (i = 0; i < validInts.length; i++) {
        a.equal(TSL.Validation.isInt(validInts[i]), true);
    }

    i = 0;
    for (i = 0; i < invalidInts.length; i++) {
        a.equal(TSL.Validation.isInt(invalidInts[i]), false);
    }
});

QUnit.test('containsOnly', (a: QUnitAssert) => {
    a.equal(TSL.Validation.containsOnly('stian', '[a-z]'), true);
    a.equal(TSL.Validation.containsOnly('stian', 'naits'), true);
    a.equal(TSL.Validation.containsOnly('stian', '[A-Z]'), false);
    a.equal(TSL.Validation.containsOnly('stian', '[A-Z]', true), true);
});

QUnit.test('isInrange', (a: QUnitAssert) => {
    
    a.equal(TSL.Validation.isInRange(1, 1, 1), true);
    a.equal(TSL.Validation.isInRange(1, 1.1, 1), false);
    a.equal(TSL.Validation.isInRange(1.1, 1.0, 1.1), true);
    a.equal(TSL.Validation.isInRange(-1, -1.1, -0.9), true);

});

QUnit.test('isIpAddress', (a: QUnitAssert) => {


    var validIps: Array<any> = ['123.123.123.123','1.1.1.1','8.8.8.8','255.255.255.255','192.168.0.1'];
    var invalidIps: Array<any> = [1,'1.1.1','123.123.123.256','test','123.123','321.3.3.3'];

    var i = 0;
    for (i = 0; i < validIps.length; i++) {
        a.equal(TSL.Validation.isIpAddress(validIps[i]), true);
    }

    i = 0;
    for (i = 0; i < invalidIps.length; i++) {
        a.equal(TSL.Validation.isIpAddress(invalidIps[i]), false);
    }

});

