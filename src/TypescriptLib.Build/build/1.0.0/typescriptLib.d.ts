declare module TSL.Collections {
    interface IGroupResult<T> {
        value: any;
        count: number;
        items: Array<T>;
    }
    interface IList<T> {
        add(item: T): IList<T>;
        addRange(item: Array<T>): IList<T>;
        any(predicate?: (item: T) => boolean): boolean;
        insert(index: number, item: T): IList<T>;
        first(): T;
        firstOrDefault(predicate?: (item: T) => boolean): T;
        singleOrDefault(predicate?: (item: T) => boolean): T;
        last(): T;
        remove(predicate?: (item: T) => boolean): IList<T>;
        removeAt(index: number): IList<T>;
        where(predicate?: (item: T) => boolean): IList<T>;
        take(count: number): IList<T>;
        forEach(action: (item: T) => void): IList<T>;
        orderBy(selector: (item: T) => any): IList<T>;
        orderByDescending(selector: (item: T) => any): IList<T>;
        offset(startIndex: number, count: number): IList<T>;
        toArray(): Array<T>;
        contains(predicate?: (item: T) => boolean): boolean;
        count(predicate?: (item: T) => boolean): number;
        copy(): IList<T>;
        distinct(): IList<T>;
        clear(): void;
        sum(predicate: (item: T) => number): number;
        avg(predicate: (item: T) => number): number;
        min(predicate: (item: T) => number): number;
        max(predicate: (item: T) => number): number;
        group(predicate: (item: T) => any): Array<IGroupResult<T>>;
    }
    class List<T> implements Collections.IList<T> {
        private _items;
        constructor(items?: Array<T>);
        any(predicate?: (item: T) => boolean): boolean;
        distinct(): IList<T>;
        group(predicate: (item: T) => any): Array<IGroupResult<T>>;
        sum(predicate: (item: T) => number): number;
        avg(predicate: (item: T) => number): number;
        min(predicate: (item: T) => number): number;
        max(predicate: (item: T) => number): number;
        add(item: T): IList<T>;
        addRange(items: Array<T>): IList<T>;
        insert(index: number, item: T): IList<T>;
        first(): T;
        last(): T;
        take(count: number): IList<T>;
        offset(startIndex: number, count: number): IList<T>;
        remove(predicate?: (item: T) => boolean): IList<T>;
        removeAt(index: number): IList<T>;
        where(predicate?: (item: T) => boolean): IList<T>;
        forEach(action: (item: T) => void): IList<T>;
        orderBy(selector: (item: T) => any): IList<T>;
        orderByDescending(selector: (item: T) => any): IList<T>;
        toArray(): Array<T>;
        contains(predicate?: (item: T) => boolean): boolean;
        count(predicate?: (item: T) => boolean): number;
        firstOrDefault(predicate?: (item: T) => boolean): T;
        singleOrDefault(predicate?: (item: T) => boolean): T;
        copy(): IList<T>;
        clear(): void;
    }
}
declare module TSL.Services {
    interface IHolyday {
        description: string;
        date: Date;
    }
    interface IHolydayService {
        getHolydays(year: number): Array<IHolyday>;
    }
    class HolydayService implements IHolydayService {
        constructor();
        _holydayCache: any[];
        getHolydays(year: number): Array<IHolyday>;
        private _getHolydaysFromCache(year);
        private _getEasterSunday(year);
    }
}
declare module TSL {
    interface IWeek {
        weekNumber: number;
        getDates(): Array<Date>;
        getFirstDate(): Date;
        getLastDate(): Date;
        getPeriod(): IPeriod;
        addWeeks(weeks: number): IWeek;
    }
    class Week implements IWeek {
        static ThisWeek(): IWeek;
        constructor(date: Date);
        private _date;
        private _dates;
        weekNumber: number;
        getDates(): Array<Date>;
        getFirstDate(): Date;
        getLastDate(): Date;
        getPeriod(): IPeriod;
        addWeeks(weeks: number): IWeek;
        private _gregdaynumber(year, month, day);
        private _isocalendar1(date);
    }
}
declare module TSL {
    interface ITimeSpan {
        addMilliseconds(milliseconds: number): void;
        addSeconds(seconds: number): void;
        addMinutes(minutes: number): void;
        addHours(hours: number): void;
        addDays(days: number): void;
        subtractMilliseconds(milliseconds: number): void;
        subtractSeconds(seconds: number): void;
        subtractMinutes(minutes: number): void;
        subtractHours(hours: number): void;
        subtractDays(days: number): void;
        add(timespan: TimeSpan): void;
        subtract(timespan: TimeSpan): void;
        equals(timespan: TimeSpan): boolean;
        totalMilliseconds(roundDown: boolean): number;
        totalSeconds(roundDown?: boolean): number;
        totalMinutes(roundDown?: boolean): number;
        totalHours(roundDown?: boolean): number;
        totalDays(roundDown?: boolean): number;
        milliseconds(): number;
        seconds(): number;
        minutes(): number;
        hours(): number;
        days(): number;
    }
    class TimeSpan implements ITimeSpan {
        msecPerSecond: number;
        msecPerMinute: number;
        msecPerHour: number;
        msecPerDay: number;
        msecs: number;
        static FromDates(firstDate: Date, secondDate: Date): TimeSpan;
        static FromMilliseconds(milliSeconds: number): TimeSpan;
        static FromSeconds(seconds: number): TimeSpan;
        static FromMinutes(minutes: number): TimeSpan;
        static FromHours(hours: number): TimeSpan;
        static FromDays(days: number): TimeSpan;
        constructor(milliseconds?: number, seconds?: number, minutes?: number, hours?: number, days?: number);
        addMilliseconds(milliseconds: number): void;
        addSeconds(seconds: number): void;
        addMinutes(minutes: number): void;
        addHours(hours: number): void;
        addDays(days: number): void;
        subtractMilliseconds(milliseconds: number): void;
        subtractSeconds(seconds: number): void;
        subtractMinutes(minutes: number): void;
        subtractHours(hours: number): void;
        subtractDays(days: number): void;
        add(timespan: TimeSpan): void;
        subtract(timespan: TimeSpan): void;
        equals(timespan: TimeSpan): boolean;
        totalMilliseconds(roundDown?: boolean): number;
        totalSeconds(roundDown?: boolean): number;
        totalMinutes(roundDown?: boolean): number;
        totalHours(roundDown?: boolean): number;
        totalDays(roundDown?: boolean): number;
        milliseconds(): number;
        seconds(): number;
        minutes(): number;
        hours(): number;
        days(): number;
    }
}
declare module TSL {
    interface IPeriod {
        start: Date;
        end: Date;
        getTimeSpan(): ITimeSpan;
        isInPeriod(value: Date): boolean;
    }
    class Period implements IPeriod {
        constructor(start: Date, end: Date);
        start: Date;
        end: Date;
        getTimeSpan(): ITimeSpan;
        isInPeriod(value: Date): boolean;
    }
}
declare module TSL {
    enum DayOfWeek {
        Sunday = 0,
        Monday = 1,
        Tuesday = 2,
        Wednesday = 3,
        Thursday = 4,
        Friday = 5,
        Saturday = 6,
    }
}
declare module TSL.i18n {
    class Calendar {
        static name: string;
        static firstDayOfWeek: DayOfWeek;
        static monthNames: Array<string>;
        static weekDays: Array<string>;
    }
    class Format {
        static name: string;
        static date: string;
        static time: string;
        static dateTime: string;
    }
}
declare module TSL {
    interface IMonth {
        year: number;
        monthNumber: number;
        getMonthName(): string;
        getDates(): Array<Date>;
        getPeriod(): IPeriod;
        firstDate(): Date;
        lastDate(): Date;
        addMonths(value: number): IMonth;
        nextMonth(): IMonth;
        prevMonth(): IMonth;
    }
    class Month implements IMonth {
        static Now(): Month;
        static FromDate(date: Date): Month;
        constructor(year: number, month: number);
        private _dates;
        year: number;
        monthNumber: number;
        getMonthName(): string;
        getDates(): Array<Date>;
        getPeriod(): Period;
        firstDate(): Date;
        lastDate(): Date;
        addMonths: (value: number) => Month;
        nextMonth(): Month;
        prevMonth(): Month;
    }
}
declare module TSL.Services {
    interface ICalendarDay {
        date: Date;
        holydays: Array<Services.IHolyday>;
    }
    interface ICalendarService {
        getCalendar(year: number, month: number): Calendar;
    }
    interface ICalendar {
        year: number;
        month: number;
        weeks: Array<IWeek>;
        dates: Array<ICalendarDay>;
        preDates: Array<ICalendarDay>;
        postDates: Array<ICalendarDay>;
        getMonth(): IMonth;
    }
    class CalendarService implements ICalendarService {
        private holydayService;
        constructor();
        getCalendar(year: number, month: number): Calendar;
    }
    class Calendar implements ICalendar {
        year: number;
        month: number;
        weeks: Array<IWeek>;
        dates: Array<ICalendarDay>;
        preDates: Array<ICalendarDay>;
        postDates: Array<ICalendarDay>;
        getMonth(): IMonth;
    }
}
interface Array<T> {
    contains(value: T): boolean;
    remove(value: T): void;
    addOrRemoveIfExists(value: T): void;
    pushIfNotExists(value: T): void;
    toList<T>(): TSL.Collections.IList<T>;
    addRange(arr: Array<T>): Array<T>;
    clone(): Array<T>;
}
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
interface Number {
    between(min: number, max: number): boolean;
    addPercent(percent: number): number;
    percentageOf(total: number): number;
    in(numbers: Array<number>): boolean;
    floor(): number;
    ceil(): number;
    round(): number;
}
interface String {
    toLower(): string;
    toUpper(): string;
    trim(): string;
    equals(str: string, ignoreCase?: boolean): boolean;
    startsWith(str: string, ignoreCase?: boolean): boolean;
    endsWith(str: string, ignoreCase?: boolean): boolean;
    contains(str: string, ignoreCase?: boolean): boolean;
    containsOnly(characters: string, ignoreCase?: boolean): boolean;
    left(length: number): string;
    right(length: number): string;
    shuffle(): string;
    repeat(iterations: number): string;
    replaceAll(target: string, replacement: string): string;
    padLeft(length: number, character: string): string;
    padRight(length: number, character: string): string;
    format(...args: any[]): string;
    toDate(): Date;
    toInt(): number;
    isInt(): boolean;
}
declare module TSL {
    class Validation {
        static isNullOrEmpty(value: any): boolean;
        static isEmail(value: any): boolean;
        static isNumber(value: any): boolean;
        static isInt(value: any): boolean;
        static containsOnly(value: string, characters: string, ignoreCase?: boolean): boolean;
        static isInRange(value: number, min: number, max: number): boolean;
        static isIpAddress(value: any): boolean;
    }
}
declare module TSL.Services {
    interface IValidationService<T> {
        clear(): IValidationService<T>;
        getErrorMessages(): Array<IValidationError>;
        containsErrors(): boolean;
        required(prop: (item: T) => string | number | Date, errorMessage: string): IValidationService<T>;
        email(prop: (item: T) => string, errorMessage: string): IValidationService<T>;
        range(prop: (item: T) => number, min: number, max: number, errorMessage: string): IValidationService<T>;
        max(prop: (item: T) => number, max: number, errorMessage: string): IValidationService<T>;
        min(prop: (item: T) => number, min: number, errorMessage: string): IValidationService<T>;
        period(prop: (item: T) => Date, min: Date, max: Date, errorMessage: string): IValidationService<T>;
        minLengt(prop: (item: T) => string, minLength: number, errorMessage: string): IValidationService<T>;
        maxLengt(prop: (item: T) => string, maxLength: number, errorMessage: string): IValidationService<T>;
        int(prop: (item: T) => number, errorMessage: string): IValidationService<T>;
        containsOnly(prop: (item: T) => string, characters: string, ignoreCase: boolean, errorMessage: string): IValidationService<T>;
        ip(prop: (item: T) => string, errorMessage: string): IValidationService<T>;
        equals(prop: (item: T) => any, other: (item: T) => any, errorMessage: string): IValidationService<T>;
        custom(prop: (item: T) => any, func: (value: any) => boolean, errorMessage: string): IValidationService<T>;
    }
    class ValidationService<T> implements IValidationService<T> {
        private errors;
        private currentObject;
        constructor(obj: T);
        clear(): this;
        getErrorMessages(): Array<IValidationError>;
        containsErrors(): boolean;
        required(prop: (item: T) => string | number | Date, errorMessage: string): this;
        email(prop: (item: T) => string, errorMessage: string): this;
        range(prop: (item: T) => number, min: number, max: number, errorMessage: string): this;
        max(prop: (item: T) => number, max: number, errorMessage: string): this;
        min(prop: (item: T) => number, min: number, errorMessage: string): this;
        period(prop: (item: T) => Date, min: Date, max: Date, errorMessage: string): this;
        minLengt(prop: (item: T) => string, minLength: number, errorMessage: string): this;
        maxLengt(prop: (item: T) => string, maxLength: number, errorMessage: string): this;
        int(prop: (item: T) => number, errorMessage: string): this;
        containsOnly(prop: (item: T) => string, characters: string, ignoreCase: boolean, errorMessage: string): this;
        ip(prop: (item: T) => string, errorMessage: string): this;
        equals(prop: (item: T) => any, other: (item: T) => any, errorMessage: string): this;
        custom(prop: (item: T) => any, func: (value: any) => boolean, errorMessage: string): this;
        private _cachedPropertyNames;
        private getCachedPropertyname(prop);
        private getPropertyname(prop);
        private getPropertyValue(prop);
        private addValidationError(prop, errorMessage);
    }
    interface IValidationError {
        property: string;
        messages: Array<string>;
    }
}
declare module TLS {
    class Stopwatch {
        constructor();
        private _perf_start;
        private _perf_stop;
        private _isRunning;
        readonly isRunning: boolean;
        static startNew(): Stopwatch;
        start(): void;
        stop(): void;
        reset(): void;
        readonly elapsedMilliseconds: number;
        readonly getTimespan: TSL.ITimeSpan;
    }
}
