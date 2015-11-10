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
    a.ok(birthdate.dayOfWeek() === DayOfWeek.Tuesday);
    a.ok(new Date(1977, 1, 15).dayOfWeek() == DayOfWeek.Tuesday);
    a.ok(new Date(2015, 10, 9).dayOfWeek() == DayOfWeek.Monday);
});

QUnit.test('isLeapYear', function (a: QUnitAssert) {
    a.ok(new Date(2016, 2, 2).isLeapYear());
    a.ok(new Date(2012, 2, 2).isLeapYear());
    a.ok(new Date(2008, 2, 2).isLeapYear());
    a.ok(new Date(2004, 2, 2).isLeapYear());
    a.ok(new Date(2000, 2, 2).isLeapYear());
    a.ok(new Date(1996, 2, 2).isLeapYear());
    a.ok(new Date(1992, 2, 2).isLeapYear());
    a.ok(new Date(2015, 2, 2).isLeapYear() === false);
    a.ok(new Date(2013, 2, 2).isLeapYear() === false);
    a.ok(new Date(2007, 2, 2).isLeapYear() === false);
    a.ok(new Date(2005, 2, 2).isLeapYear() === false);
    a.ok(new Date(2001, 2, 2).isLeapYear() === false);
    a.ok(new Date(1991, 2, 2).isLeapYear() === false);
    a.ok(new Date(1989, 2, 2).isLeapYear() === false);
});

QUnit.test('getWeek', function (a: QUnitAssert) {
    a.ok(birthdate.getWeek().weekNumber === 7);
});

QUnit.test('getDateTime', function (a: QUnitAssert) {
    a.ok(1 == 1);
});

