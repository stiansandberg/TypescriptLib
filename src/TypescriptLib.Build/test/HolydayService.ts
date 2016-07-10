/// <reference path="../build/1.0.0/typescriptlib.d.ts" />
/// <reference path="../_definitelytyped/qunit/qunit.d.ts" />

QUnit.module('Holydays');

var hs = new TSL.Services.HolydayService();

QUnit.test('Easter', function (a: QUnitAssert) {

    validateHolydays(a, 2015, '02.04', '06.04', '14.05', '25.05');
    validateHolydays(a, 1977, '07.04', '11.04', '19.05', '30.05');
    validateHolydays(a, 2020, '09.04', '13.04', '21.05', '01.06');

    var holydays2015 = hs.getHolydays(2015);
    a.ok(holydays2015.length < 20);

});

function validateHolydays(assert: QUnitAssert, year: number, skjærtorsdag: string, andrePåskedag: string, kristiHimelfart: string, andrePinsedag: string) {

    skjærtorsdag += '.' + year.toString();
    andrePåskedag += '.' + year.toString();
    kristiHimelfart += '.' + year.toString();
    andrePinsedag += '.' + year.toString();

    var list = new TSL.Collections.List<TSL.Services.IHolyday>(hs.getHolydays(year));
    assert.ok(list.singleOrDefault(h=> h.date.format('dd.MM.yyyy') == skjærtorsdag).description === 'Skjærtorsdag', skjærtorsdag + ' Skjærtorsdag');
    assert.ok(list.singleOrDefault(h=> h.date.format('dd.MM.yyyy') == andrePåskedag).description === 'Andre påskedag', andrePåskedag + ' Andre påskedag');
    assert.ok(list.singleOrDefault(h=> h.date.format('dd.MM.yyyy') == kristiHimelfart).description === 'Kristi himmelfartsdag', kristiHimelfart + ' Kristi himmelfartsdag');
    assert.ok(list.singleOrDefault(h=> h.date.format('dd.MM.yyyy') == andrePinsedag).description === 'Andre pinsedag', andrePinsedag + ' Andre pinsedag');
}