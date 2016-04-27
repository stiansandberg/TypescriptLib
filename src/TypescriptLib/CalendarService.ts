/// <reference path="list.ts" />
/// <reference path="holydayservice.ts" />
/// <reference path="week.ts" />
/// <reference path="month.ts" />

module TSL.Services {

    export interface ICalendarDay {
        date: Date;
        holydays: Array<Services.IHolyday>;
    }

    export class CalendarService {

        holydayService: Services.HolydayService = null;

        constructor() {
            this.holydayService = new Services.HolydayService();
        }

        getCalendar(year: number, month: number): Calendar {
            var calendar = new Calendar();
            calendar.year = year;
            calendar.month = month;
            var firstDayOfMonth = new Date(year, month - 1, 1);

            var offset = -5;
            calendar.weeks.push(new Week(firstDayOfMonth.addDays(offset)));
            calendar.weeks.push(new Week(firstDayOfMonth.addDays(offset + 7)));
            calendar.weeks.push(new Week(firstDayOfMonth.addDays(offset + 14)));
            calendar.weeks.push(new Week(firstDayOfMonth.addDays(offset + 21)));
            calendar.weeks.push(new Week(firstDayOfMonth.addDays(offset + 28)));
            calendar.weeks.push(new Week(firstDayOfMonth.addDays(offset + 35)));

            var holydayList = this.holydayService.getHolydays(year).toList() as Collections.List<IHolyday>;
            var minYear = calendar.weeks[0].getDates()[0].getFullYear();
            var maxYear = calendar.weeks[5].getDates()[6].getFullYear();

            if (minYear !== year) {
                holydayList.addRange(this.holydayService.getHolydays(minYear));
            }
            if (maxYear !== year) {
                holydayList.addRange(this.holydayService.getHolydays(maxYear));
            }
            
            for (var w = 0; w < calendar.weeks.length; w++) {
                var week = calendar.weeks[w];
                var weekDates = week.getDates();
                for (var d = 0; d < weekDates.length; d++) {
                    var date = weekDates[d];

                    if (date.getMonth() === month - 1) {
                        calendar.dates.push({ date: date, holydays: holydayList.where(h=> h.date.isSameDay(date)).toArray() });
                    } else {
                        if (date < firstDayOfMonth) {
                            calendar.preDates.push({ date: date, holydays: holydayList.where(h=> h.date.isSameDay(date)).toArray() });
                        } else {
                            calendar.postDates.push({ date: date, holydays: holydayList.where(h=> h.date.isSameDay(date)).toArray() });
                        }
                    }

                }
            }

            return calendar;
        }
    }

    export class Calendar {
        year: number;
        month: number;
        weeks: Array<Week> = [];
        dates: Array<ICalendarDay> = [];
        preDates: Array<ICalendarDay> = [];
        postDates: Array<ICalendarDay> = [];

        getMonth(): Month {
            return new Month(this.year, this.month);
        }
    }
}