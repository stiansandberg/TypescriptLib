class TimeSpan {

    msecPerSecond: number = 1000;
    msecPerMinute: number = 60000;
    msecPerHour: number = 3600000;
    msecPerDay: number = 86400000;
    msecs: number = 0;

    static FromSeconds = function (seconds: number) {
        return new TimeSpan(0, seconds, 0, 0, 0);
    };
    static FromMinutes = function (minutes: number) {
        return new TimeSpan(0, 0, minutes, 0, 0);
    };
    static FromHours = function (hours: number) {
        return new TimeSpan(0, 0, 0, hours, 0);
    };
    static FromDays = function (days: number) {
        return new TimeSpan(0, 0, 0, 0, days);
    };

    constructor(milliseconds: number = 0, seconds: number = 0, minutes: number = 0, hours: number = 0, days: number = 0) {
        this.msecs += (days * this.msecPerDay);
        this.msecs += (hours * this.msecPerHour);
        this.msecs += (minutes * this.msecPerMinute);
        this.msecs += (seconds * this.msecPerSecond);
        this.msecs += milliseconds;
    }
    
    addMilliseconds(milliseconds: number) {
        this.msecs += milliseconds;
    };

    addSeconds(seconds: number) {
        this.msecs += (seconds * this.msecPerSecond);
    };

    addMinutes(minutes: number) {
        this.msecs += (minutes * this.msecPerMinute);
    };

    addHours(hours: number) {
        this.msecs += (hours * this.msecPerHour);
    };

    addDays(days: number) {
        this.msecs += (days * this.msecPerDay);
    };

    subtractMilliseconds(milliseconds: number) {
        this.msecs -= milliseconds;
    };

    subtractSeconds(seconds: number) {
        this.msecs -= (seconds * this.msecPerSecond);
    };

    subtractMinutes(minutes: number) {
        this.msecs -= (minutes * this.msecPerMinute);
    };

    subtractHours(hours: number) {
        this.msecs -= (hours * this.msecPerHour);
    };

    subtractDays(days: number) {
        this.msecs -= (days * this.msecPerDay);
    };

    add(otherTimeSpan: TimeSpan) {
        this.msecs += otherTimeSpan.totalMilliseconds();
    };
    subtract(otherTimeSpan: TimeSpan) {
        this.msecs -= otherTimeSpan.totalMilliseconds();
    };
    equals(otherTimeSpan: TimeSpan) {
        return this.msecs === otherTimeSpan.totalMilliseconds();
    };


    totalMilliseconds(roundDown: boolean = false) {
        var result = this.msecs;
        if (roundDown === true) {
            result = Math.floor(result);
        }
        return result;
    };

    totalSeconds(roundDown: boolean = false) {
        var result = this.msecs / this.msecPerSecond;
        if (roundDown === true) {
            result = Math.floor(result);
        }
        return result;
    };
    totalMinutes(roundDown: boolean = false) {
        var result = this.msecs / this.msecPerMinute;
        if (roundDown === true) {
            result = Math.floor(result);
        }
        return result;
    };
    totalHours(roundDown: boolean = false) {
        var result = this.msecs / this.msecPerHour;
        if (roundDown === true) {
            result = Math.floor(result);
        }
        return result;
    };
    totalDays(roundDown: boolean = false) {
        var result = this.msecs / this.msecPerDay;
        if (roundDown === true) {
            result = Math.floor(result);
        }
        return result;
    };

    milliseconds() {
        return this.msecs % 1000;
    };
    seconds() {
        return Math.floor(this.msecs / this.msecPerSecond) % 60;
    };
    minutes() {
        return Math.floor(this.msecs / this.msecPerMinute) % 60;
    };
    hours() {
        return Math.floor(this.msecs / this.msecPerHour) % 24;
    };
    days() {
        return Math.floor(this.msecs / this.msecPerDay);
    };
}