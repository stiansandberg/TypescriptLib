﻿class TimeSpan {

    msecPerSecond: number = 1000;
    msecPerMinute: number = 60000;
    msecPerHour: number = 3600000;
    msecPerDay: number = 86400000;
    msecs: number = 0;

    static FromDates = function (firstDate: Date, secondDate: Date): TimeSpan {
        var differenceMsecs = secondDate.valueOf() - firstDate.valueOf();
        return new TimeSpan(differenceMsecs, 0, 0, 0, 0);
    };

    static FromSeconds = function (seconds: number): TimeSpan {
        return new TimeSpan(0, seconds, 0, 0, 0);
    };
    static FromMinutes = function (minutes: number): TimeSpan {
        return new TimeSpan(0, 0, minutes, 0, 0);
    };
    static FromHours = function (hours: number): TimeSpan {
        return new TimeSpan(0, 0, 0, hours, 0);
    };
    static FromDays = function (days: number): TimeSpan {
        return new TimeSpan(0, 0, 0, 0, days);
    };

    constructor(milliseconds: number = 0, seconds: number = 0, minutes: number = 0, hours: number = 0, days: number = 0) {
        this.msecs += (days * this.msecPerDay);
        this.msecs += (hours * this.msecPerHour);
        this.msecs += (minutes * this.msecPerMinute);
        this.msecs += (seconds * this.msecPerSecond);
        this.msecs += milliseconds;
    }

    addMilliseconds(milliseconds: number): void {
        this.msecs += milliseconds;
    };

    addSeconds(seconds: number): void {
        this.msecs += (seconds * this.msecPerSecond);
    };

    addMinutes(minutes: number): void {
        this.msecs += (minutes * this.msecPerMinute);
    };

    addHours(hours: number): void {
        this.msecs += (hours * this.msecPerHour);
    };

    addDays(days: number): void {
        this.msecs += (days * this.msecPerDay);
    };

    subtractMilliseconds(milliseconds: number): void {
        this.msecs -= milliseconds;
    };

    subtractSeconds(seconds: number): void {
        this.msecs -= (seconds * this.msecPerSecond);
    };

    subtractMinutes(minutes: number): void {
        this.msecs -= (minutes * this.msecPerMinute);
    };

    subtractHours(hours: number): void {
        this.msecs -= (hours * this.msecPerHour);
    };

    subtractDays(days: number): void {
        this.msecs -= (days * this.msecPerDay);
    };

    add(timespan: TimeSpan): void {
        this.msecs += timespan.totalMilliseconds();
    };
    subtract(timespan: TimeSpan): void {
        this.msecs -= timespan.totalMilliseconds();
    };
    equals(timespan: TimeSpan): boolean {
        return this.msecs === timespan.totalMilliseconds();
    };


    totalMilliseconds(roundDown: boolean = false): number {
        var result: number = this.msecs;
        if (roundDown === true) {
            result = Math.floor(result);
        }
        return result;
    };

    totalSeconds(roundDown: boolean = false): number {
        var result: number = this.msecs / this.msecPerSecond;
        if (roundDown === true) {
            result = Math.floor(result);
        }
        return result;
    };
    totalMinutes(roundDown: boolean = false): number {
        var result: number = this.msecs / this.msecPerMinute;
        if (roundDown === true) {
            result = Math.floor(result);
        }
        return result;
    };
    totalHours(roundDown: boolean = false): number {
        var result: number = this.msecs / this.msecPerHour;
        if (roundDown === true) {
            result = Math.floor(result);
        }
        return result;
    };
    totalDays(roundDown: boolean = false): number {
        var result: number = this.msecs / this.msecPerDay;
        if (roundDown === true) {
            result = Math.floor(result);
        }
        return result;
    };

    milliseconds(): number {
        return this.msecs % 1000;
    };
    seconds(): number {
        return Math.floor(this.msecs / this.msecPerSecond) % 60;
    };
    minutes(): number {
        return Math.floor(this.msecs / this.msecPerMinute) % 60;
    };
    hours(): number {
        return Math.floor(this.msecs / this.msecPerHour) % 24;
    };
    days(): number {
        return Math.floor(this.msecs / this.msecPerDay);
    };
}