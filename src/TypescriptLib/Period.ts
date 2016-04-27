/// <reference path="timespan.ts" />
module TSL {
    export  class Period {
        constructor(start: Date, end: Date) {
            this.start = start;
            this.end = end;
        }

        start: Date;
        end: Date;

        getTimeSpan(): TimeSpan {
            return TimeSpan.FromDates(this.start, this.end);
        }

        isInPeriod(value: Date): boolean {
            var time = value.getTime();
            return ((time >= this.start.getTime()) && (time <= this.end.getTime()));
        }
    }
}