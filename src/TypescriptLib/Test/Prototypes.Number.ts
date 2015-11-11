QUnit.module('Prototypes.Number');


QUnit.test('percent', function (a: QUnitAssert) {
    a.ok((100).addPercent(10) === 110);
    a.ok((50).addPercent(10) === 55);
    a.ok((10).addPercent(1) === 10.1);
    a.ok((100).addPercent(-10) === 90);
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