QUnit.module('Week');

var hs = new Services.HolydayService();

QUnit.test('Weeknumber', function (a: QUnitAssert) {

    a.equal(new Date(2015, 0, 1).getWeekNumber(), 1);
    a.equal(new Date(2015, 0, 6).getWeekNumber(), 2);
    a.equal(new Date(2015, 0, 18).getWeekNumber(), 3);
    a.equal(new Date(2015, 0, 19).getWeekNumber(), 4);
    a.equal(new Date(2015, 0, 26).getWeekNumber(), 5);
    a.equal(new Date(2015, 0, 31).getWeekNumber(), 5);
    a.equal(new Date(2015, 1, 1).getWeekNumber(), 5);
    a.equal(new Date(2015, 11, 31).getWeekNumber(), 53);
    a.equal(new Date(2015, 11, 1).getWeekNumber(), 49);
    a.equal(new Date(2016, 0, 1).getWeekNumber(), 53);
    a.equal(new Date(2016, 0, 3).getWeekNumber(), 53);
    a.equal(new Date(2016, 0, 4).getWeekNumber(), 1);
    a.equal(new Date(2000, 0, 1).getWeekNumber(), 52);
    a.equal(new Date(2000, 0, 2).getWeekNumber(), 52);
    a.equal(new Date(2000, 0, 3).getWeekNumber(), 1);
    a.equal(new Date(2000, 0, 4).getWeekNumber(), 1);
    a.equal(new Date(1999, 11, 31).getWeekNumber(), 52);
    a.equal(new Date(1999, 11, 24).getWeekNumber(), 51);
    a.equal(new Date(1999, 11, 1).getWeekNumber(), 48);
    a.equal(new Date(1889, 3, 15).getWeekNumber(), 16);
    a.equal(new Date(1977, 1, 15).getWeekNumber(), 7);
});

