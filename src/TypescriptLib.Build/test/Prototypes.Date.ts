/// <reference path="../build/1.0.0/typescriptlib.d.ts" />
/// <reference path="../_definitelytyped/qunit/qunit.d.ts" />

QUnit.module('Prototypes.Date');

/*
    isToday(): boolean;
    isSameDay(value: Date): boolean;
    addMonths(months: number): Date;
    addDays(days: number): Date;
    addHours(hours: number): Date;
    addMinutes(minutes: number): Date;
    addSeconds(seconds: number): Date;
    date(): Date;
    format(format: string): string;
    getWeekNumber(): number;
    copy(): Date;
    dayOfWeek(): DayOfWeek;
    isLeapYear(): boolean;
    getWeek(): Week;
    getDateTime(): DateTime;
*/

var birthdate = new Date(1977, 1, 15, 18, 20, 0);

QUnit.test('isToday', function (a: QUnitAssert) {
    a.ok(new Date().isToday());
});

QUnit.test('isSameDay', function (a: QUnitAssert) {
    a.ok(birthdate.isSameDay(new Date(1977, 1, 15)));
});

QUnit.test('addYears', function (a: QUnitAssert) {
    a.ok(birthdate.addYears(2).getFullYear() === 1979);
    a.ok(birthdate.addYears(40).getFullYear() === 2017);
    a.ok(birthdate.addYears(-100).getFullYear() === 1877)
});

QUnit.test('addMonths', function (a: QUnitAssert) {
    a.ok(birthdate.addMonths(1) != null);
    a.ok(birthdate.addMonths(1).isSameDay(new Date(1977, 2, 15)));
    a.ok(new Date(2015, 11, 31).addMonths(1).isSameDay(new Date(2016, 0, 31)));
});

QUnit.test('addDays', function (a: QUnitAssert) {

    a.ok(birthdate.addDays(1).isSameDay(new Date(1977, 1, 16)));
    a.ok(birthdate.addDays(10).isSameDay(new Date(1977, 1, 25)));
    a.ok(birthdate.addDays(-10).isSameDay(new Date(1977, 1, 5)));

    a.ok(new Date(2015, 11, 31).addDays(1).toString() === new Date(2016, 0, 1).toString());

    a.ok(new Date(2015, 1, 28).addDays(1).toString() === new Date(2015, 2, 1).toString());
    a.ok(new Date(2020, 1, 29).addDays(1).toString() === new Date(2020, 2, 1).toString()); // 2020 er Skuddår
});

QUnit.test('addHours', function (a: QUnitAssert) {
    a.ok(birthdate.addHours(1).getHours() === 19);
    a.ok(birthdate.addHours(10).isSameDay(new Date(1977, 1, 16)));
    a.ok(new Date(2015, 11, 31, 18).addHours(20).isSameDay(new Date(2016, 0, 1)));
});

QUnit.test('addMinutes', function (a: QUnitAssert) {
    a.ok(birthdate.addMinutes(1) > birthdate);
    a.ok(birthdate.addMinutes(10).isSameDay(new Date(1977, 1, 15)));
    a.ok(new Date(2015, 11, 31, 23, 50).addMinutes(20).isSameDay(new Date(2016, 0, 1)));
});

QUnit.test('addSeconds', function (a: QUnitAssert) {
    a.ok(birthdate.addSeconds(1) > birthdate);
    a.ok(birthdate.addSeconds(10).isSameDay(new Date(1977, 1, 15)));
    a.ok(new Date(2015, 11, 31, 23, 59, 30).addSeconds(31).isSameDay(new Date(2016, 0, 1)));
});

QUnit.test('date', function (a: QUnitAssert) {
    a.ok(birthdate.date().toString() === new Date(1977, 1, 15, 0, 0, 0).toString());
});

QUnit.test('format', function (a: QUnitAssert) {
    a.ok(birthdate.format('yy') === '77');
    a.ok(birthdate.format('yyyy') === '1977');
    a.ok(birthdate.format('MM') === '02');
    a.ok(birthdate.format('dd') === '15');
    a.ok(birthdate.format('HH') === '18');
    a.ok(birthdate.format('mm') === '20');

    a.ok(birthdate.format('dd.MM.yyyy HH:mm') === '15.02.1977 18:20');
});

QUnit.test('getWeekNumber', function (a: QUnitAssert) {
    a.ok(birthdate.getWeekNumber() === 7);
    a.ok(new Date(2015, 10, 9).getWeekNumber() === 46);
    a.ok(new Date(2020, 0, 1).getWeekNumber() === 1);
    a.ok(new Date(1977, 1, 15).getWeekNumber() === 7);
    a.ok(new Date(1976, 11, 31).getWeekNumber() === 53);
    a.ok(new Date(1976, 11, 27).getWeekNumber() === 53);
    a.ok(new Date(1976, 11, 24).getWeekNumber() === 52);
    a.ok(new Date(1976, 1, 15).getWeekNumber() === 7);
});

QUnit.test('copy', function (a: QUnitAssert) {
    a.ok(birthdate.copy().toString() === birthdate.toString());
});

QUnit.test('dayOfWeek', function (a: QUnitAssert) {
    a.ok(birthdate.dayOfWeek() === TSL.DayOfWeek.Tuesday);
    a.ok(new Date(1977, 1, 15).dayOfWeek() == TSL.DayOfWeek.Tuesday);
    a.ok(new Date(2015, 10, 9).dayOfWeek() == TSL.DayOfWeek.Monday);
});

QUnit.test('isLeapYear', function (a: QUnitAssert) {

    var leapYears = [
        1804, 1872, 1944, 2012, 2080, 2152, 1808, 1876, 1948, 2016, 2084, 2156,
        1812, 1880, 1952, 2020, 2088, 2160, 1816, 1884, 1956, 2024, 2092, 2164,
        1820, 1888, 1960, 2028, 2096, 2168, 1824, 1892, 1964, 2032, 2104, 2172,
        1828, 1896, 1968, 2036, 2108, 2176, 1832, 1904, 1972, 2040, 2112, 2180,
        1836, 1908, 1976, 2044, 2116, 2184, 1840, 1912, 1980, 2048, 2120, 2188,
        1844, 1916, 1984, 2052, 2124, 2192, 1848, 1920, 1988, 2056, 2128, 2196,
        1852, 1924, 1992, 2060, 2132, 1856, 1928, 1996, 2064, 2136, 1860, 1932,
        2000, 2068, 2140, 1864, 1936, 2004, 2072, 2144, 1868, 1940, 2008, 2076];

    var year = 1804;
    while (year < 2079) {
        if (leapYears.contains(year)) {
            a.ok(new Date(year, 2, 2).isLeapYear(), year + ' er skuddår');
        }
        else {
            a.ok(new Date(year, 2, 2).isLeapYear()===false, year + ' er ikke skuddår');
        }
        year++;
    }
});

QUnit.test('getWeek', function (a: QUnitAssert) {
    a.ok(birthdate.getWeek().weekNumber === 7);
});
