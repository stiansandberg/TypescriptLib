/// <reference path="../_definitelytyped/angularjs/angular.d.ts" />
/// <reference path="../prototype.array.ts" />
/// <reference path="../prototype.date.ts" />
/// <reference path="../prototype.number.ts" />
/// <reference path="../prototype.string.ts" />
/// <reference path="../_definitelytyped/qunit/qunit.d.ts" />
/// <reference path="../calendarservice.ts" />

QUnit.module('Calendar');

var calendarService = new TSL.Services.CalendarService();

QUnit.test('Calendar', function (a: QUnitAssert) {

    testCalendar(a, calendarService.getCalendar(2015, 5));
    testCalendar(a, calendarService.getCalendar(2015, 8));
    testCalendar(a, calendarService.getCalendar(1977, 2));

    var cal = calendarService.getCalendar(2015, 1);
    cal.weeks.forEach(function (week: TSL.Week) {
        a.ok(week.weekNumber > 0, week.weekNumber.toString());
    });
    a.ok(cal.preDates[0].date.getFullYear() === 2014);
    a.ok(cal.postDates[0].date.getFullYear() === 2015);

    cal = calendarService.getCalendar(2000, 12);
    cal.weeks.forEach(function (week: TSL.Week) {
        a.ok(week.weekNumber > 0, week.weekNumber.toString());
    });
    a.ok(cal.preDates[0].date.getFullYear() === 2000);
    a.ok(cal.postDates[0].date.getFullYear() === 2001);
});

QUnit.test('Calendar holydays', function (a: QUnitAssert) {

    var cal = calendarService.getCalendar(2015, 5);

    var holydaysInMay2015 = 0;
    cal.dates.forEach(function (date: TSL.Services.ICalendarDay) {
        if (date.holydays.length > 0) {
            holydaysInMay2015++;
        }
    });
    a.ok(holydaysInMay2015 === 5);


    cal = calendarService.getCalendar(2015, 2);

    var holydaysInFeb2015 = 0;
    cal.dates.forEach(function (date: TSL.Services.ICalendarDay) {
        if (date.holydays.length > 0) {
            holydaysInFeb2015++;
        }
    });
    a.ok(holydaysInFeb2015 === 0);



    cal = calendarService.getCalendar(2015, 1);
    cal.preDates.forEach(function (date: TSL.Services.ICalendarDay) {
        a.ok(1 == 1, angular.toJson(date));
    })

});

QUnit.test('A bounch of calendars', function (a: QUnitAssert) {

    var date = new Date().addYears(-400);

    for (var i = 0; i < 10; ++i) {

        var rndDays = Math.floor((Math.random() * 200) + 1) + 500;

        date = date.addDays(rndDays);
        var cal = calendarService.getCalendar(date.getFullYear(), date.getMonth()+1);
        testBounchOfCalendars(a, cal);
    }

});

function testBounchOfCalendars(a: QUnitAssert, cal: TSL.Services.Calendar) {

    a.ok(1 === 1, 'calendar: ' + cal.year + '.' + cal.month);
    a.ok(cal.dates.length.between(28, 31), 'dates: ' + cal.dates.length);
    a.ok(cal.preDates.length.between(0, 14), 'preDates: ' + cal.preDates.length);
    a.ok(cal.postDates.length.between(0, 14), 'postDates: ' + cal.postDates.length);
    a.ok(cal.weeks.length === 6);

    a.ok(cal.weeks[0].weekNumber.between(1, 53));
    a.ok(cal.weeks[1].weekNumber.between(1, 53) && cal.weeks[1].weekNumber != cal.weeks[0].weekNumber);
    a.ok(cal.weeks[2].weekNumber.between(1, 53) && cal.weeks[2].weekNumber != cal.weeks[1].weekNumber);
    a.ok(cal.weeks[3].weekNumber.between(1, 53) && cal.weeks[3].weekNumber != cal.weeks[2].weekNumber);
    a.ok(cal.weeks[4].weekNumber.between(1, 53) && cal.weeks[4].weekNumber != cal.weeks[3].weekNumber);
    a.ok(cal.weeks[5].weekNumber.between(1, 53) && cal.weeks[5].weekNumber != cal.weeks[4].weekNumber);
}

function testCalendar(a: QUnitAssert, cal: TSL.Services.Calendar) {

    cal.weeks.forEach(function (week: TSL.Week) {
        a.ok(week.weekNumber > 0, week.weekNumber.toString());
    });

    cal.preDates.forEach(function (date: TSL.Services.ICalendarDay) {
        a.ok(date.date.getMonth() === cal.month - 2, 'preDate ' + date.date.format('dd.MM.yyyy'));
    });
    cal.dates.forEach(function (date: TSL.Services.ICalendarDay) {
        a.ok(date.date.getMonth() === cal.month - 1, 'date ' + date.date.format('dd.MM.yyyy'));
    });
    cal.postDates.forEach(function (date: TSL.Services.ICalendarDay) {
        a.ok(date.date.getMonth() === cal.month, 'postDate ' + date.date.format('dd.MM.yyyy'));
    });

    a.ok(cal.preDates[0].date.dayOfWeek() === TSL.DayOfWeek.Monday);

}