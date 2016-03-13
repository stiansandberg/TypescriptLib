# TypeScriptLib


## Prototypes
#### Array

    contains(value: T): boolean;
    remove(value: T): void;
    addOrRemoveIfExists(value: T): void;
    pushIfNotExists(value: T): void;
    toList<T>(): Collections.List<T>;
    addRange(arr: Array<T>): Array<T>;
    clone(): Array<T>;

#### Date

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
    dayOfWeek(): DayOfWeek;
    isLeapYear(): boolean;
    getWeek(): Week;

#### Number

    between(min: number, max: number): boolean;
    addPercent(percent: number): number;
    percentageOf(total: number): number;
    in(numbers: Array<number>): boolean;
    floor(): number;
    ceil(): number;
    round(): number;

#### String

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



# Services

## CalendarService

    var calendarService = new Services.CalendarService();
    var cal = calendarService.getCalendar(2015, 1);

    Calendar {
        year: number;
        month: number;
        weeks: Array<Week> = [];
        dates: Array<ICalendarDay> = [];
        preDates: Array<ICalendarDay> = [];
        postDates: Array<ICalendarDay> = [];

        getMonth(): Month {
            return new Month(this.year, this.month);
        }
    }


## HolydayService

    var svc = new Services.HolydayService();
    var holydays2015 = svc.getHolydays(2015);


# Objects

## Month

    var month = Month.Now();
    var nov2015 = new Month(2015, 11);
    var des2015 = new Month(2015, 12);

    var test = nov2015.getDates().length; // returns 30
    var test = des2015.getDates().length; // returns 31


## Period

    var period = new Period(new Date(2000,0,1), new Date(2016,11,31));
    period.isInPeriod(new Date(2010,6,6)) // returns true

## TimeSpan

    var ts = TimeSpan.FromMinutes(60);
    a.ok(ts.totalMinutes() === 60);
    a.ok(ts.totalSeconds() === (60 * 60));
    a.ok(ts.totalHours() === 1);

## Week

    var week = new Week(new Date(2015, 11, 31));
    var weekNumber = week.weekNumber;
    var nextWeek = week.addWeeks(1);


# List

    add(item: T);
    addRange(item: Array<T>);
    any(predicate?: (item: T) => boolean): boolean;
    insert(index: number, item: T): List<T>;
    first(): T;
    firstOrDefault(predicate?: (item: T) => boolean): T;
    singleOrDefault(predicate?: (item: T) => boolean): T;
    last(): T;
    remove(predicate?: (item: T) => boolean): List<T>;
    removeAt(index: number): List<T>;
    where(predicate?: (item: T) => boolean): List<T>;
    take(count: number): List<T>;
    forEach(action: (item: T) => void): List<T>;
    orderBy(selector: (item: T) => any): List<T>;
    orderByDescending(selector: (item: T) => any): List<T>;
    offset(startIndex: number, count: number): List<T>;
    toArray(): Array<T>;
    contains(predicate?: (item: T) => boolean): boolean;
    count(predicate?: (item: T) => boolean): number;
    copy(): List<T>;
    distinct(): List<T>;
    clear(): void;
    sum(predicate: (item: T) => number): number;
    avg(predicate: (item: T) => number): number;
    min(predicate: (item: T) => number): number;
    max(predicate: (item: T) => number): number;
    group(predicate: (item: T) => any): Array<IGroupResult<T>>

# samples

    interface IPerson {
        name: string;
        age: number;
        birthdate?: Date;
    }


    function getPersons(): Collections.List<IPerson> {
        var personList = new Collections.List<IPerson>();
        personList.add({ name: 'aa', age: 15, birthdate: new Date().addYears(-15) });
        personList.add({ name: 'bb', age: 3, birthdate: new Date().addYears(-3) });
        personList.add({ name: 'cc', age: 28, birthdate: new Date().addYears(-28) });
        personList.add({ name: 'dd', age: 32, birthdate: new Date().addYears(-32) });
        personList.add({ name: 'ee', age: 78, birthdate: new Date().addYears(-78) });
        return personList;
    }

    var persons = getPersons();

    persons.avg(p=> p.age); // average age
    persons.min(p=> p.age); // lowest age
    persons.max(p=> p.age); // highest age
    persons.sum(p=> p.age); // total age

    persons.first(); // first person in list
    persons.last(); // last person in list

    persons.orderBy(p=> p.name); // sorting

    persons.count(); // count all 
    persons.count(p=> p.age > 70); // Count all above 70 years old
    persons.contains(p=> p.age > 90); // true/false whether person is more than 90 years old

