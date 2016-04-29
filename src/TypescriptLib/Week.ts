module TSL {

    export interface IWeek {
        weekNumber: number;
        getDates(): Array<Date>;
        getFirstDate(): Date;
        getLastDate(): Date;
        getPeriod(): IPeriod;
        addWeeks(weeks: number): IWeek;
    }

    export class Week implements IWeek{

        static ThisWeek(): IWeek {
            return new Week(new Date());
        }

        constructor(date: Date) {
            this._date = date.date();
            this.weekNumber = this._isocalendar1(date);
        }

        private _date: Date;
        private _dates: Array<Date> = [];

        weekNumber: number = 0;

        public getDates(): Array<Date> {
            if (this._dates.length > 0)
                return this._dates;

            var firstDayOfWeek = this._date.addDays((this._date.dayOfWeek() * -1) + 1);
            var dates: Array<Date> = [];
            dates.push(firstDayOfWeek.addDays(0));
            dates.push(firstDayOfWeek.addDays(1));
            dates.push(firstDayOfWeek.addDays(2));
            dates.push(firstDayOfWeek.addDays(3));
            dates.push(firstDayOfWeek.addDays(4));
            dates.push(firstDayOfWeek.addDays(5));
            dates.push(firstDayOfWeek.addDays(6));
            this._dates = dates;
            return this._dates;
        }

        public getFirstDate(): Date {
            var days = this.getDates();
            return days[0];
        }

        public getLastDate(): Date {
            var days = this.getDates();
            return days[days.length - 1];
        }

        public getPeriod(): IPeriod {
            return new Period(this.getFirstDate(), this.getLastDate());
        }

        public addWeeks(weeks: number): IWeek {
            var dates = this.getDates();
            var date = dates[3].addDays(weeks * 7);
            return new Week(date);
        }

        private _gregdaynumber(year: number, month: number, day: number): number {
            if (month < 3) {
                year--;
                month = month + 12
            };
            return (365.25 * year).floor() - (year / 100).floor() + (year / 400).floor() + (30.6 * (month + 1)).floor() + day - 62;
        }

        private _isocalendar1(date: Date): number {

            var year = date.getFullYear();
            var month = date.getMonth();
            var day = date.getDate();
            var wday = date.getDay();
            var weekday = ((wday + 6) % 7) + 1;
            var d0 = this._gregdaynumber(year, 1, 0);
            var weekday0 = ((d0 + 4) % 7) + 1;

            var d = this._gregdaynumber(year, month + 1, day);
            var isoweeknr = ((d - d0 + weekday0 + 6) / 7).floor() - ((weekday0 + 3) / 7).floor();

            if ((month == 11) && ((day - weekday) > 27)) {
                isoweeknr = 1;
            }
            if ((month == 0) && ((weekday - day) > 3)) {
                d0 = this._gregdaynumber(year - 1, 1, 0);
                weekday0 = ((d0 + 4) % 7) + 1;
                isoweeknr = ((d - d0 + weekday0 + 6) / 7).floor() - ((weekday0 + 3) / 7).floor();
            }
            return isoweeknr;
        }
    }
}