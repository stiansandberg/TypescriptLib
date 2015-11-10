class DateTime {

    public static Today(): DateTime {
        var now = new Date();
        return new DateTime(now.getFullYear(), now.getMonth() + 1, now.getDate(), 0, 0, 0);
    }

    public static Now(): DateTime {
        var now = new Date();
        return new DateTime(now.getFullYear(), now.getMonth() + 1, now.getDate(), now.getHours(), now.getMinutes(), now.getSeconds());
    }

    public static FromDate(date:Date): DateTime
    {
        return new DateTime(date.getFullYear(), date.getMonth() + 1, date.getDate(), date.getHours(), date.getMinutes(), date.getSeconds());
    }

    constructor(year: number, month: number, day: number, hour?: number, minute?: number, second?: number) {
        this._date.setFullYear(year, month - 1, day);
        if (hour) this._date.setHours(hour);
        if (minute) this._date.setMinutes(minute);
        if (second) this._date.setSeconds(second);
    }

    private _date: Date = new Date(1970, 0, 1, 0, 0, 0, 0);
    public get (): Date { return this._date; }

    public get second(): number { return this._date.getSeconds(); }
    public set second(value: number) { this._date.setSeconds(value); }
    public get minute(): number { return this._date.getMinutes(); }
    public set minute(value: number) { this._date.setMinutes(value); }
    public get hour(): number { return this._date.getHours(); }
    public set hour(value: number) { this._date.setHours(value); }
    public get day(): number { return this._date.getDate(); }
    public set day(value: number) { this._date.setDate(value); }
    public get month(): number { return this._date.getMonth() + 1; }
    public set month(value: number) { this._date.setMonth(value - 1); }
    public get year(): number { return this._date.getFullYear(); }
    public set year(value: number) { this._date.setFullYear(value, this.month - 1, this.day); }

    public addYears = function (years: number): DateTime {
        var date = this._date.copy();

        date.setFullYear(this._date.getFullYear() + years);
        return DateTime.FromDate(date);
    }

    public addMonths = function (months: number): DateTime {
        return DateTime.FromDate(this._date.addMonths(months));
    }

    public addDays = function (days: number): DateTime {
        return DateTime.FromDate(this._date.addDays(days));
    }

    public addHours = function (hours: number): DateTime {
        return DateTime.FromDate(this._date.addHours(hours));
    }

    public addMinutes = function (minutes: number): DateTime {
        return DateTime.FromDate(this._date.addMinutes(minutes));
    }

    public addSeconds = function (seconds: number): DateTime {
        return DateTime.FromDate(this._date.addSeconds(seconds));
    }
    
    public isLeapYear = function (): boolean {
        return this._date.isLeapYear();
    }

    public isWeekend = function (): boolean {
        var d = this._date.getDay();
        return d == 0 || d == 6;
    }

    public get dayOfWeek(): DayOfWeek {
        var dayOfWeek = this._date.getDay();
        if (dayOfWeek == 0) return DayOfWeek.Sunday;
        if (dayOfWeek == 1) return DayOfWeek.Monday;
        if (dayOfWeek == 2) return DayOfWeek.Tuesday;
        if (dayOfWeek == 3) return DayOfWeek.Wednesday;
        if (dayOfWeek == 4) return DayOfWeek.Thursday;
        if (dayOfWeek == 5) return DayOfWeek.Friday;
        if (dayOfWeek == 6) return DayOfWeek.Saturday;
        if (dayOfWeek == 7) return DayOfWeek.Sunday;
        return null;
    }

    public get shortname(): string {
        return this.format('ddd');
    }

    public getMonth = function (): Month {
        return new Month(this.year, this.month);
    }

    public format(f: string): string {

        var d: Date = this._date;
        var year: number = d.getFullYear();
        var month: number = d.getMonth() + 1;
        var day: number = d.getDate();
        var hour: number = d.getHours();
        var minute: number = d.getMinutes();
        var second: number = d.getSeconds();
            
        // predefined formats
        //f = this.replaceAll(f, 'server', CRM1.i18n.predefinedDateFormats.server);
        //f = this.replaceAll(f, 'datetime', CRM1.i18n.predefinedDateFormats.dateTime);
        //f = this.replaceAll(f, 'date', CRM1.i18n.predefinedDateFormats.date);
        //f = this.replaceAll(f, 'longtime', CRM1.i18n.predefinedDateFormats.longTime);
        //f = this.replaceAll(f, 'time', CRM1.i18n.predefinedDateFormats.time);

        f = this.replaceAll(f, 'yyyy', year);
        f = this.replaceAll(f, 'yy', year.toString().substring(2, 4));

        //f = this.replaceAll(f, 'MMMM', CRM1.i18n.months[month]);
        //f = this.replaceAll(f, 'MMM', CRM1.i18n.monthsShort[month]);
        f = this.replaceAll(f, 'MM', this.padNum(month));

        //f = this.replaceAll(f, 'dddd', CRM1.i18n.weekdays[this._date.getDay()]);
        //f = this.replaceAll(f, 'ddd', CRM1.i18n.weekdaysShort[this._date.getDay()]);
        f = this.replaceAll(f, 'dd', this.padNum(day));

        f = this.replaceAll(f, 'HH', this.padNum(hour));
        f = this.replaceAll(f, 'mm', this.padNum(minute));
        f = this.replaceAll(f, 'ss', this.padNum(second));

        return f;
    }

    public clone = function (): DateTime {
        return new DateTime(this.year, this.month, this.day, this.hour, this.minute, this.second);
    }

    public isToday = function (): boolean {
        return this._date.isToday();
    }

    public isFirstDayOfWeek = function () { return this.dayOfWeek === DayOfWeek.Monday };
    public isLastDayOfWeek = function () { return this.dayOfWeek === DayOfWeek.Sunday };
    
    private _addTicsToDate = function (ticks: number): void {
        this._date = new Date(this._date.getTime() + (ticks));
    }

    private padNum = function (num: number): string {
        if (num < 10)
            return '0' + num.toString();
        return num.toString();
    }

    private replaceAll = function (string: string, find: string, replace: any): string {
        if (!string || string.length == 0)
            return string;
        return string.replace(new RegExp(this.escapeRegExp(find), 'g'), replace);
    }

    private escapeRegExp = function (string: string): string {
        return string.replace(/([.*+?^=!:${}()|\[\]\/\\])/g, "\\$1");
    }

    public get dayHash(): string {
        return this.year.toString() + this.month.toString() + this.day.toString();
    }
    public get timeHash(): string {
        return this.hour.toString() + this.minute.toString();
    }

    public getDate() {
        return this._date;
    }
    public toString() {
        return this._date.toString();
    }
}
