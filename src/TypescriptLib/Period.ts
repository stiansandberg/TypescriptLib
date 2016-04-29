/// <reference path="timespan.ts" />
module TSL {

    export interface IPeriod {
        start: Date;
        end: Date;
        getTimeSpan(): ITimeSpan;
        isInPeriod(value: Date): boolean;
    }

    export class Period implements IPeriod {
        constructor(start: Date, end: Date) {
            this.start = start;
            this.end = end;
        }

        start: Date;
        end: Date;

        getTimeSpan(): ITimeSpan {
            return TimeSpan.FromDates(this.start, this.end);
        }

        isInPeriod(value: Date): boolean {
            var time = value.getTime();
            return ((time >= this.start.getTime()) && (time <= this.end.getTime()));
        }
    }
}