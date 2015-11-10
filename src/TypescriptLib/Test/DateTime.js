/// <reference path="../datetime.ts" />
QUnit.module('DateTime');
QUnit.test('Today', function (a) {
    var today = DateTime.Today();
    var now = new Date();
    a.ok(now.isSameDay(today.getDate()));
});
//QUnit.test('', function (a: QUnitAssert) {
//});
//QUnit.test('', function (a: QUnitAssert) {
//});
//QUnit.test('', function (a: QUnitAssert) {
//});
//QUnit.test('', function (a: QUnitAssert) {
//});
