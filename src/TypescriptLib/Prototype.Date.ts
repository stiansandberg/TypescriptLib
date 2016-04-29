interface Date {
    isToday(): boolean;
    isSameDay(value: Date): boolean;
    addYears(years: number): Date;
    addMonths(months: number): Date;
    addDays(days: number): Date;
    addHours(hours: number): Date;
    addMinutes(minutes: number): Date;
    addSeconds(seconds: number): Date;
    date(): Date;
    format(format: string): string;
    parse(format: string): Date;
    getWeekNumber(): number;
    copy(): Date;
    dayOfWeek(): TSL.DayOfWeek;
    isLeapYear(): boolean;
    getWeek(): TSL.IWeek;
}

Date.prototype.isToday = function (): boolean {
    return this.isSameDay(new Date());
};

Date.prototype.isSameDay = function (otherDate: Date): boolean {
    var date1 = this;
    var date2 = otherDate;
    return (date1.getFullYear() === date2.getFullYear() && date1.getMonth() === date2.getMonth() && date1.getDate() === date2.getDate());
};

Date.prototype.addYears = function (years: number):Date {
    var date:Date = this.copy();
    var newYear = date.getFullYear() + years;
    date.setFullYear(newYear);
    return date;
}

Date.prototype.addMonths = function (months: number): Date {
    var value = this.copy();

    var mo = value.getMonth();
    var yr = value.getFullYear();

    mo = (mo + months) % 12;
    if (0 > mo) {
        yr += (value.getMonth() + months - mo - 12) / 12;
        mo += 12;
    }
    else {
        yr += ((value.getMonth() + months - mo) / 12);
    }

    value.setMonth(mo);
    value.setFullYear(yr);
    return value;

}

Date.prototype.addDays = function (days: number): Date {
    var date = this.copy();
    date.setDate(date.getDate() + days);
    return date;
};

Date.prototype.addHours = function (hours: number): Date {
    var date = this.copy();
    date.setHours(date.getHours() + hours);
    return date;
};

Date.prototype.addMinutes = function (minutes: number): Date {
    var date = this.copy();
    date.setMinutes(date.getMinutes() + minutes);
    return date;
};

Date.prototype.addSeconds = function (seconds: number): Date {
    var date = this.copy();
    date.setSeconds(date.getSeconds() + seconds);
    return date;
};

Date.prototype.copy = function (): Date {
    var d: Date = this;
    return new Date(d.getFullYear(), d.getMonth(), d.getDate(), d.getHours(), d.getMinutes(), d.getSeconds(), d.getMilliseconds());
}

Date.prototype.date = function (): Date {
    var date = this;
    return new Date(date.getFullYear(), date.getMonth(), date.getDate());
};

Date.prototype.format = function (format: string): string {

    var date = this as Date;
    var year: number = date.getFullYear();
    var month: number = date.getMonth() + 1;
    var day: number = date.getDate();
    var hour: number = date.getHours();
    var minute: number = date.getMinutes();
    var second: number = date.getSeconds();
    var millisecon: number = date.getMilliseconds();

    format = format.replaceAll('yyyy', year.toString());
    format = format.replaceAll('yy', year.toString().right(2));

    format = format.replaceAll('MM', month.toString().padLeft(2, '0'));
    format = format.replaceAll('dd', day.toString().padLeft(2, '0'));

    format = format.replaceAll('HH', hour.toString().padLeft(2, '0'));
    format = format.replaceAll('mm', minute.toString().padLeft(2, '0'));

    return format;
}

Date.prototype.dayOfWeek = function (): TSL.DayOfWeek {
    var dow = this.getDay();
    if (dow === 0) return TSL.DayOfWeek.Sunday;
    if (dow === 1) return TSL.DayOfWeek.Monday;
    if (dow === 2) return TSL.DayOfWeek.Tuesday;
    if (dow === 3) return TSL.DayOfWeek.Wednesday;
    if (dow === 4) return TSL.DayOfWeek.Thursday;
    if (dow === 5) return TSL.DayOfWeek.Friday;
    if (dow === 6) return TSL.DayOfWeek.Saturday;
    return null;
}

Date.prototype.isLeapYear = function (): boolean {
    var year: number = this.getFullYear();
    return ((year % 4 == 0) && (year % 100 != 0)) || (year % 400 == 0);
}

Date.prototype.getWeekNumber = function (): number {
    return new TSL.Week(this).weekNumber;
}

Date.prototype.getWeek = function (): TSL.IWeek {
    return new TSL.Week(this);
}