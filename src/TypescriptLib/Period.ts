class Period
{
    constructor(start: Date, end: Date) {
        this.start = start;
        this.end = end;
    }

    start: Date;
    end: Date;

    getTimeSpan() {
        return TimeSpan.FromDates(this.start, this.end);
    }
}