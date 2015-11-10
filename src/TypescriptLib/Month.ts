class Month {

    static Now(): Month {
        var now = new Date();
        return new Month(now.getFullYear(), now.getMonth() + 1);
    }

    static FromDate(date:Date): Month {
        return new Month(date.getFullYear(), date.getMonth() - 1);
    }

    constructor(year: number, month: number) {
        this.monthNumber = month;
        this.year = year;
    }

    private _dates: Array<Date> = [];

    year: number;
    monthNumber: number;

    public getDates(): Array<Date> {
        if (this._dates.length > 0)
            return this._dates;

        var date = new Date(this.year, this.monthNumber - 1, 1);
        var month = date.getMonth();

        while (date.getMonth() != month) {
            this._dates.push(date);
            date = date.addDays(1);
        }

        return this._dates;
    }

    public getPeriod() {
        return new Period(this.firstDate(), this.lastDate());
    }

    public firstDate(): Date {
        var days = this.getDates();
        return days[0];
    }

    public lastDate(): Date {
        var days = this.getDates();
        return days[days.length - 1];
    }

    public addMonths = function (value: number): Month {
        var month = Month.FromDate(this.getDates()[10]);

        if (value === 0)
            return month;

        if (value > 0) {
            for (var i: number = 0; i < value; i++) {
                if (month.monthNumber == 12) {
                    month.year++;
                    month.monthNumber = 1;
                } else {
                    month.monthNumber++;
                }
            }
        }
        else {
            for (var i: number = 0; i < (value * -1); i++) {
                if (month.monthNumber == 1) {
                    month.year--;
                    month.monthNumber = 12;
                } else {
                    month.monthNumber--;
                }
            }
        }
        return month;
    }

    public nextMonth() {
        return this.addMonths(1);
    }

    public prevMonth() {
        return this.addMonths(-1);
    }
}