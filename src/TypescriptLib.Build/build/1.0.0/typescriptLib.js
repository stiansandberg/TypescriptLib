var TSL;
(function (TSL) {
    var Collections;
    (function (Collections) {
        var List = (function () {
            function List(items) {
                this._items = [];
                if (items && items.length > 0) {
                    this._items = items;
                }
            }
            List.prototype.any = function (predicate) {
                for (var i = 0; i < this._items.length; i++) {
                    if (predicate(this._items[i])) {
                        return true;
                    }
                }
                return false;
            };
            List.prototype.distinct = function () {
                var arr = this._items.reduce(function (p, c) {
                    if (p.indexOf(c) < 0)
                        p.push(c);
                    return p;
                }, []);
                return new List(arr);
            };
            List.prototype.group = function (predicate) {
                var result = [];
                for (var i = 0; i < this._items.length; i++) {
                    var item = this._items[i];
                    var value = predicate(item);
                    var exists = false;
                    for (var r = 0; r < result.length; r++) {
                        if (result[r].value === value) {
                            result[r].count++;
                            result[r].items.push(item);
                            exists = true;
                        }
                    }
                    if (!exists) {
                        result.push({ value: value, count: 1, items: [item] });
                    }
                }
                return result;
            };
            List.prototype.sum = function (predicate) {
                if (this._items.length === 0)
                    return 0;
                var sum = 0;
                for (var i = 0; i < this._items.length; i++) {
                    sum += predicate(this._items[i]);
                }
                return sum;
            };
            List.prototype.avg = function (predicate) {
                if (this._items.length === 0)
                    return 0;
                var sum = 0;
                for (var i = 0; i < this._items.length; i++) {
                    sum += predicate(this._items[i]);
                }
                return sum / this._items.length;
            };
            List.prototype.min = function (predicate) {
                if (this._items.length === 0)
                    return 0;
                var values = [];
                for (var i = 0; i < this._items.length; i++) {
                    values.push(predicate(this._items[i]));
                }
                return Math.min.apply(null, values);
            };
            List.prototype.max = function (predicate) {
                if (this._items.length === 0)
                    return 0;
                var values = [];
                for (var i = 0; i < this._items.length; i++) {
                    values.push(predicate(this._items[i]));
                }
                return Math.max.apply(null, values);
            };
            List.prototype.add = function (item) {
                this._items.push(item);
                return this;
            };
            List.prototype.addRange = function (items) {
                for (var i = 0; i < items.length; ++i) {
                    this.add(items[i]);
                }
                return this;
            };
            List.prototype.insert = function (index, item) {
                if (this._items.length < index + 1) {
                    this._items.push(item);
                    return this;
                }
                var _firstPartArray = this._items.slice(0, index);
                var _secondPartArray = this._items.slice(index, this._items.length);
                _firstPartArray.push(item);
                this._items = _firstPartArray.concat(_secondPartArray);
                return this;
            };
            List.prototype.first = function () {
                if (this._items.length == 0)
                    return null;
                return this._items[0];
            };
            List.prototype.last = function () {
                if (this._items.length == 0) {
                    return null;
                }
                return this._items[this._items.length - 1];
            };
            List.prototype.take = function (count) {
                if (this._items.length <= count) {
                    return this;
                }
                var topNArray = [];
                for (var i = 0; i < count; i++) {
                    topNArray.push(this._items[i]);
                }
                return new List(topNArray);
            };
            List.prototype.offset = function (startIndex, count) {
                var topNArray = [];
                for (var i = startIndex; i <= (count + startIndex - 1); i++) {
                    topNArray.push(this._items[i]);
                }
                return new List(topNArray);
            };
            List.prototype.remove = function (predicate) {
                var newItems = [];
                for (var i = 0; i < this._items.length; i++) {
                    if (!predicate(this._items[i])) {
                        newItems.push(this._items[i]);
                    }
                }
                this._items = newItems;
                return this;
            };
            List.prototype.removeAt = function (index) {
                if (this._items.length < index + 1) {
                    return this;
                }
                this._items.splice(index, 1);
                return this;
            };
            List.prototype.where = function (predicate) {
                var returnlist = new List();
                for (var i = 0; i < this._items.length; i++) {
                    if (predicate(this._items[i])) {
                        returnlist.add(this._items[i]);
                    }
                }
                return returnlist;
            };
            List.prototype.forEach = function (action) {
                for (var i = 0; i < this._items.length; i++) {
                    action(this._items[i]);
                }
                return this;
            };
            List.prototype.orderBy = function (selector) {
                var comparer = function (a, b) {
                    if (selector(a) > selector(b)) {
                        return 1;
                    }
                    else if (selector(a) < selector(b)) {
                        return -1;
                    }
                    return 0;
                };
                this._items.sort(comparer);
                return this;
            };
            List.prototype.orderByDescending = function (selector) {
                var comparer = function (a, b) {
                    if (selector(a) < selector(b)) {
                        return 1;
                    }
                    else if (selector(a) > selector(b)) {
                        return -1;
                    }
                    return 0;
                };
                this._items.sort(comparer);
                return this;
            };
            List.prototype.toArray = function () {
                return this._items;
            };
            List.prototype.contains = function (predicate) {
                for (var i = 0; i < this._items.length; i++) {
                    if (predicate(this._items[i])) {
                        return true;
                    }
                }
                return false;
            };
            List.prototype.count = function (predicate) {
                if (predicate) {
                    var count = 0;
                    for (var i = 0; i < this._items.length; i++) {
                        if (predicate(this._items[i])) {
                            count++;
                        }
                    }
                    return count;
                }
                return this._items.length;
            };
            List.prototype.firstOrDefault = function (predicate) {
                var items = this.where(predicate);
                if (items._items.length == 0) {
                    return null;
                }
                return items.first();
            };
            List.prototype.singleOrDefault = function (predicate) {
                var items = this.where(predicate);
                if (items._items.length > 1) {
                    throw 'predicate returned more than one item';
                }
                if (items._items.length == 0) {
                    return null;
                }
                return items.first();
            };
            List.prototype.copy = function () {
                return new List(this._items);
            };
            List.prototype.clear = function () {
                if (this._items.length == 0)
                    return;
                this._items = [];
            };
            return List;
        }());
        Collections.List = List;
    })(Collections = TSL.Collections || (TSL.Collections = {}));
})(TSL || (TSL = {}));
var TSL;
(function (TSL) {
    var Services;
    (function (Services) {
        var HolydayService = (function () {
            function HolydayService() {
                this._holydayCache = [];
            }
            HolydayService.prototype.getHolydays = function (year) {
                var holydays = this._getHolydaysFromCache(year);
                if (holydays != null) {
                    return holydays;
                }
                holydays = [];
                holydays.push({ date: new Date(year, 0, 1), description: "Første nyttårsdag" });
                holydays.push({ date: new Date(year, 4, 1), description: "Offentlig høytidsdag" });
                holydays.push({ date: new Date(year, 4, 17), description: "Grunnlovsdag" });
                holydays.push({ date: new Date(year, 11, 25), description: "Første juledag" });
                holydays.push({ date: new Date(year, 11, 26), description: "Andre juledag" });
                var easterSunday = this._getEasterSunday(year);
                holydays.push({ date: easterSunday.addDays(-7), description: "Palmesøndag" });
                holydays.push({ date: easterSunday.addDays(-3), description: "Skjærtorsdag" });
                holydays.push({ date: easterSunday.addDays(-2), description: "Langfredag" });
                holydays.push({ date: easterSunday, description: "Første påskedag" });
                holydays.push({ date: easterSunday.addDays(1), description: "Andre påskedag" });
                holydays.push({ date: easterSunday.addDays(39), description: "Kristi himmelfartsdag" });
                holydays.push({ date: easterSunday.addDays(49), description: "Første pinsedag" });
                holydays.push({ date: easterSunday.addDays(50), description: "Andre pinsedag" });
                this._holydayCache.push({ year: year, holydays: holydays });
                return holydays;
            };
            HolydayService.prototype._getHolydaysFromCache = function (year) {
                var holydays = null;
                this._holydayCache.forEach(function (cache) {
                    if (cache.year === year) {
                        holydays = cache.holydays;
                        return;
                    }
                });
                return holydays;
            };
            HolydayService.prototype._getEasterSunday = function (year) {
                var day = 0;
                var month = 0;
                var g = year % 19;
                var c = year / 100;
                var h = (c - parseInt((c / 4).toString()) - parseInt(((8 * c + 13) / 25).toString()) + 19 * g + 15) % 30;
                var i = h - parseInt((h / 28).toString()) * (1 - parseInt((h / 28).toString()) * parseInt((29 / (h + 1)).toString()) * parseInt(((21 - g) / 11).toString()));
                day = i - ((year + parseInt((year / 4).toString()) + i + 2 - c + parseInt((c / 4).toString())) % 7) + 28;
                month = 3;
                if (day > 31) {
                    month++;
                    day -= 31;
                }
                return new Date(year, month - 1, day);
            };
            return HolydayService;
        }());
        Services.HolydayService = HolydayService;
    })(Services = TSL.Services || (TSL.Services = {}));
})(TSL || (TSL = {}));
var TSL;
(function (TSL) {
    var Week = (function () {
        function Week(date) {
            this._dates = [];
            this.weekNumber = 0;
            this._date = date.date();
            this.weekNumber = this._isocalendar1(date);
        }
        Week.ThisWeek = function () {
            return new Week(new Date());
        };
        Week.prototype.getDates = function () {
            if (this._dates.length > 0)
                return this._dates;
            var firstDayOfWeek = this._date.addDays((this._date.dayOfWeek() * -1) + 1);
            var dates = [];
            dates.push(firstDayOfWeek.addDays(0));
            dates.push(firstDayOfWeek.addDays(1));
            dates.push(firstDayOfWeek.addDays(2));
            dates.push(firstDayOfWeek.addDays(3));
            dates.push(firstDayOfWeek.addDays(4));
            dates.push(firstDayOfWeek.addDays(5));
            dates.push(firstDayOfWeek.addDays(6));
            this._dates = dates;
            return this._dates;
        };
        Week.prototype.getFirstDate = function () {
            var days = this.getDates();
            return days[0];
        };
        Week.prototype.getLastDate = function () {
            var days = this.getDates();
            return days[days.length - 1];
        };
        Week.prototype.getPeriod = function () {
            return new TSL.Period(this.getFirstDate(), this.getLastDate());
        };
        Week.prototype.addWeeks = function (weeks) {
            var dates = this.getDates();
            var date = dates[3].addDays(weeks * 7);
            return new Week(date);
        };
        Week.prototype._gregdaynumber = function (year, month, day) {
            if (month < 3) {
                year--;
                month = month + 12;
            }
            ;
            return (365.25 * year).floor() - (year / 100).floor() + (year / 400).floor() + (30.6 * (month + 1)).floor() + day - 62;
        };
        Week.prototype._isocalendar1 = function (date) {
            var year = date.getFullYear();
            var month = date.getMonth();
            var day = date.getDate();
            var wday = date.getDay();
            var weekday = ((wday + 6) % 7) + 1;
            var d0 = this._gregdaynumber(year, 1, 0);
            var weekday0 = ((d0 + 4) % 7) + 1;
            var d = this._gregdaynumber(year, month + 1, day);
            var isoweeknr = ((d - d0 + weekday0 + 6) / 7).floor() - ((weekday0 + 3) / 7).floor();
            if ((month == 11) && ((day - weekday) > 27)) {
                isoweeknr = 1;
            }
            if ((month == 0) && ((weekday - day) > 3)) {
                d0 = this._gregdaynumber(year - 1, 1, 0);
                weekday0 = ((d0 + 4) % 7) + 1;
                isoweeknr = ((d - d0 + weekday0 + 6) / 7).floor() - ((weekday0 + 3) / 7).floor();
            }
            return isoweeknr;
        };
        return Week;
    }());
    TSL.Week = Week;
})(TSL || (TSL = {}));
var TSL;
(function (TSL) {
    var TimeSpan = (function () {
        function TimeSpan(milliseconds, seconds, minutes, hours, days) {
            if (milliseconds === void 0) { milliseconds = 0; }
            if (seconds === void 0) { seconds = 0; }
            if (minutes === void 0) { minutes = 0; }
            if (hours === void 0) { hours = 0; }
            if (days === void 0) { days = 0; }
            this.msecPerSecond = 1000;
            this.msecPerMinute = 60000;
            this.msecPerHour = 3600000;
            this.msecPerDay = 86400000;
            this.msecs = 0;
            this.msecs += (days * this.msecPerDay);
            this.msecs += (hours * this.msecPerHour);
            this.msecs += (minutes * this.msecPerMinute);
            this.msecs += (seconds * this.msecPerSecond);
            this.msecs += milliseconds;
        }
        TimeSpan.FromDates = function (firstDate, secondDate) {
            var differenceMsecs = secondDate.valueOf() - firstDate.valueOf();
            return new TimeSpan(differenceMsecs, 0, 0, 0, 0);
        };
        TimeSpan.FromMilliseconds = function (milliSeconds) {
            return new TimeSpan(milliSeconds, 0, 0, 0, 0);
        };
        TimeSpan.FromSeconds = function (seconds) {
            return new TimeSpan(0, seconds, 0, 0, 0);
        };
        TimeSpan.FromMinutes = function (minutes) {
            return new TimeSpan(0, 0, minutes, 0, 0);
        };
        TimeSpan.FromHours = function (hours) {
            return new TimeSpan(0, 0, 0, hours, 0);
        };
        TimeSpan.FromDays = function (days) {
            return new TimeSpan(0, 0, 0, 0, days);
        };
        TimeSpan.prototype.addMilliseconds = function (milliseconds) {
            this.msecs += milliseconds;
        };
        ;
        TimeSpan.prototype.addSeconds = function (seconds) {
            this.msecs += (seconds * this.msecPerSecond);
        };
        ;
        TimeSpan.prototype.addMinutes = function (minutes) {
            this.msecs += (minutes * this.msecPerMinute);
        };
        ;
        TimeSpan.prototype.addHours = function (hours) {
            this.msecs += (hours * this.msecPerHour);
        };
        ;
        TimeSpan.prototype.addDays = function (days) {
            this.msecs += (days * this.msecPerDay);
        };
        ;
        TimeSpan.prototype.subtractMilliseconds = function (milliseconds) {
            this.msecs -= milliseconds;
        };
        ;
        TimeSpan.prototype.subtractSeconds = function (seconds) {
            this.msecs -= (seconds * this.msecPerSecond);
        };
        ;
        TimeSpan.prototype.subtractMinutes = function (minutes) {
            this.msecs -= (minutes * this.msecPerMinute);
        };
        ;
        TimeSpan.prototype.subtractHours = function (hours) {
            this.msecs -= (hours * this.msecPerHour);
        };
        ;
        TimeSpan.prototype.subtractDays = function (days) {
            this.msecs -= (days * this.msecPerDay);
        };
        ;
        TimeSpan.prototype.add = function (timespan) {
            this.msecs += timespan.totalMilliseconds();
        };
        ;
        TimeSpan.prototype.subtract = function (timespan) {
            this.msecs -= timespan.totalMilliseconds();
        };
        ;
        TimeSpan.prototype.equals = function (timespan) {
            return this.msecs === timespan.totalMilliseconds();
        };
        ;
        TimeSpan.prototype.totalMilliseconds = function (roundDown) {
            if (roundDown === void 0) { roundDown = false; }
            var result = this.msecs;
            if (roundDown === true) {
                result = Math.floor(result);
            }
            return result;
        };
        ;
        TimeSpan.prototype.totalSeconds = function (roundDown) {
            if (roundDown === void 0) { roundDown = false; }
            var result = this.msecs / this.msecPerSecond;
            if (roundDown === true) {
                result = Math.floor(result);
            }
            return result;
        };
        ;
        TimeSpan.prototype.totalMinutes = function (roundDown) {
            if (roundDown === void 0) { roundDown = false; }
            var result = this.msecs / this.msecPerMinute;
            if (roundDown === true) {
                result = Math.floor(result);
            }
            return result;
        };
        ;
        TimeSpan.prototype.totalHours = function (roundDown) {
            if (roundDown === void 0) { roundDown = false; }
            var result = this.msecs / this.msecPerHour;
            if (roundDown === true) {
                result = Math.floor(result);
            }
            return result;
        };
        ;
        TimeSpan.prototype.totalDays = function (roundDown) {
            if (roundDown === void 0) { roundDown = false; }
            var result = this.msecs / this.msecPerDay;
            if (roundDown === true) {
                result = Math.floor(result);
            }
            return result;
        };
        ;
        TimeSpan.prototype.milliseconds = function () {
            return this.msecs % 1000;
        };
        ;
        TimeSpan.prototype.seconds = function () {
            return Math.floor(this.msecs / this.msecPerSecond) % 60;
        };
        ;
        TimeSpan.prototype.minutes = function () {
            return Math.floor(this.msecs / this.msecPerMinute) % 60;
        };
        ;
        TimeSpan.prototype.hours = function () {
            return Math.floor(this.msecs / this.msecPerHour) % 24;
        };
        ;
        TimeSpan.prototype.days = function () {
            return Math.floor(this.msecs / this.msecPerDay);
        };
        ;
        return TimeSpan;
    }());
    TSL.TimeSpan = TimeSpan;
})(TSL || (TSL = {}));
/// <reference path="timespan.ts" />
var TSL;
(function (TSL) {
    var Period = (function () {
        function Period(start, end) {
            this.start = start;
            this.end = end;
        }
        Period.prototype.getTimeSpan = function () {
            return TSL.TimeSpan.FromDates(this.start, this.end);
        };
        Period.prototype.isInPeriod = function (value) {
            var time = value.getTime();
            return ((time >= this.start.getTime()) && (time <= this.end.getTime()));
        };
        return Period;
    }());
    TSL.Period = Period;
})(TSL || (TSL = {}));
var TSL;
(function (TSL) {
    var DayOfWeek;
    (function (DayOfWeek) {
        DayOfWeek[DayOfWeek["Sunday"] = 0] = "Sunday";
        DayOfWeek[DayOfWeek["Monday"] = 1] = "Monday";
        DayOfWeek[DayOfWeek["Tuesday"] = 2] = "Tuesday";
        DayOfWeek[DayOfWeek["Wednesday"] = 3] = "Wednesday";
        DayOfWeek[DayOfWeek["Thursday"] = 4] = "Thursday";
        DayOfWeek[DayOfWeek["Friday"] = 5] = "Friday";
        DayOfWeek[DayOfWeek["Saturday"] = 6] = "Saturday";
    })(DayOfWeek = TSL.DayOfWeek || (TSL.DayOfWeek = {}));
})(TSL || (TSL = {}));
/// <reference path="../dayofweek.ts" />
var TSL;
(function (TSL) {
    var i18n;
    (function (i18n) {
        var Calendar = (function () {
            function Calendar() {
            }
            return Calendar;
        }());
        Calendar.name = 'nb-no';
        Calendar.firstDayOfWeek = TSL.DayOfWeek.Monday;
        Calendar.monthNames = ['Januar', 'Februar', 'Mars', 'April', 'Mai', 'Juni', 'Juli', 'August', 'September', 'Oktober', 'November', 'Desember'];
        Calendar.weekDays = ['Mandag', 'Tirsdag', 'Onsdag', 'Torsdag', 'Fredag', 'Lørdag', 'Søndag'];
        i18n.Calendar = Calendar;
        var Format = (function () {
            function Format() {
            }
            return Format;
        }());
        Format.name = 'nb-no';
        Format.date = 'dd.MM.yyyy';
        Format.time = 'HH:mm';
        Format.dateTime = 'ss.MM.yyyy HH:mm';
        i18n.Format = Format;
    })(i18n = TSL.i18n || (TSL.i18n = {}));
})(TSL || (TSL = {}));
/// <reference path="period.ts" />
/// <reference path="i18n/nb-no.ts" />
var TSL;
(function (TSL) {
    var Month = (function () {
        function Month(year, month) {
            var _this = this;
            this._dates = [];
            this.addMonths = function (value) {
                var month = new Month(_this.year, _this.monthNumber);
                if (value === 0)
                    return month;
                if (value > 0) {
                    for (var i = 0; i < value; i++) {
                        if (month.monthNumber == 12) {
                            month.year++;
                            month.monthNumber = 1;
                        }
                        else {
                            month.monthNumber++;
                        }
                    }
                }
                else {
                    for (var i = 0; i < (value * -1); i++) {
                        if (month.monthNumber == 1) {
                            month.year--;
                            month.monthNumber = 12;
                        }
                        else {
                            month.monthNumber--;
                        }
                    }
                }
                return month;
            };
            this.monthNumber = month;
            this.year = year;
        }
        Month.Now = function () {
            var now = new Date();
            return new Month(now.getFullYear(), now.getMonth() + 1);
        };
        Month.FromDate = function (date) {
            return new Month(date.getFullYear(), date.getMonth() - 1);
        };
        Month.prototype.getMonthName = function () {
            return TSL.i18n.Calendar.monthNames[this.monthNumber - 1];
        };
        Month.prototype.getDates = function () {
            this._dates = [];
            var date = new Date(this.year, this.monthNumber - 1, 1);
            var monthIndex = date.getMonth();
            while (date.getMonth() == monthIndex) {
                this._dates.push(date);
                date = date.addDays(1);
            }
            return this._dates;
        };
        Month.prototype.getPeriod = function () {
            return new TSL.Period(this.firstDate(), this.lastDate());
        };
        Month.prototype.firstDate = function () {
            var days = this.getDates();
            return days[0];
        };
        Month.prototype.lastDate = function () {
            var days = this.getDates();
            return days[days.length - 1];
        };
        Month.prototype.nextMonth = function () {
            return this.addMonths(1);
        };
        Month.prototype.prevMonth = function () {
            return this.addMonths(-1);
        };
        return Month;
    }());
    TSL.Month = Month;
})(TSL || (TSL = {}));
/// <reference path="list.ts" />
/// <reference path="holydayservice.ts" />
/// <reference path="week.ts" />
/// <reference path="month.ts" />
var TSL;
(function (TSL) {
    var Services;
    (function (Services) {
        var CalendarService = (function () {
            function CalendarService() {
                this.holydayService = null;
                this.holydayService = new Services.HolydayService();
            }
            CalendarService.prototype.getCalendar = function (year, month) {
                var calendar = new Calendar();
                calendar.year = year;
                calendar.month = month;
                var firstDayOfMonth = new Date(year, month - 1, 1);
                var offset = -5;
                calendar.weeks.push(new TSL.Week(firstDayOfMonth.addDays(offset)));
                calendar.weeks.push(new TSL.Week(firstDayOfMonth.addDays(offset + 7)));
                calendar.weeks.push(new TSL.Week(firstDayOfMonth.addDays(offset + 14)));
                calendar.weeks.push(new TSL.Week(firstDayOfMonth.addDays(offset + 21)));
                calendar.weeks.push(new TSL.Week(firstDayOfMonth.addDays(offset + 28)));
                calendar.weeks.push(new TSL.Week(firstDayOfMonth.addDays(offset + 35)));
                var holydayList = this.holydayService.getHolydays(year).toList();
                var minYear = calendar.weeks[0].getDates()[0].getFullYear();
                var maxYear = calendar.weeks[5].getDates()[6].getFullYear();
                if (minYear !== year) {
                    holydayList.addRange(this.holydayService.getHolydays(minYear));
                }
                if (maxYear !== year) {
                    holydayList.addRange(this.holydayService.getHolydays(maxYear));
                }
                for (var w = 0; w < calendar.weeks.length; w++) {
                    var week = calendar.weeks[w];
                    var weekDates = week.getDates();
                    for (var d = 0; d < weekDates.length; d++) {
                        var date = weekDates[d];
                        if (date.getMonth() === month - 1) {
                            calendar.dates.push({ date: date, holydays: holydayList.where(function (h) { return h.date.isSameDay(date); }).toArray() });
                        }
                        else {
                            if (date < firstDayOfMonth) {
                                calendar.preDates.push({ date: date, holydays: holydayList.where(function (h) { return h.date.isSameDay(date); }).toArray() });
                            }
                            else {
                                calendar.postDates.push({ date: date, holydays: holydayList.where(function (h) { return h.date.isSameDay(date); }).toArray() });
                            }
                        }
                    }
                }
                return calendar;
            };
            return CalendarService;
        }());
        Services.CalendarService = CalendarService;
        var Calendar = (function () {
            function Calendar() {
                this.weeks = [];
                this.dates = [];
                this.preDates = [];
                this.postDates = [];
            }
            Calendar.prototype.getMonth = function () {
                return new TSL.Month(this.year, this.month);
            };
            return Calendar;
        }());
        Services.Calendar = Calendar;
    })(Services = TSL.Services || (TSL.Services = {}));
})(TSL || (TSL = {}));
/// <reference path="list.ts" />
if (!Array.prototype.indexOf) {
    Array.prototype.indexOf = function (obj, start) {
        if (!obj)
            return -1;
        for (var i = (start || 0), j = this.length; i < j; i++) {
            if (this[i] === obj) {
                return i;
            }
        }
        return -1;
    };
}
Array.prototype.contains = function (value) {
    if (!value)
        return false;
    return this.indexOf(value) > -1;
};
Array.prototype.clone = function () {
    return this.slice(0);
};
Array.prototype.addRange = function (arr) {
    if (!arr || arr.length === 0)
        return this;
    var newArray = this.clone();
    for (var i = 0; i < arr.length; i++) {
        newArray.push(arr[i]);
    }
    return newArray;
};
Array.prototype.remove = function (value) {
    if (!value)
        return;
    var index = this.indexOf(value);
    if (index > -1) {
        this.splice(index, 1);
    }
};
Array.prototype.addOrRemoveIfExists = function (obj) {
    if (!obj)
        return;
    if (this.contains(obj)) {
        this.remove(obj);
    }
    else {
        this.push(obj);
    }
};
Array.prototype.pushIfNotExists = function (obj) {
    if (!obj)
        return;
    if (this.contains(obj)) {
        return;
    }
    this.push(obj);
};
Array.prototype.toList = function () {
    return new TSL.Collections.List(this);
};
Date.prototype.isToday = function () {
    return this.isSameDay(new Date());
};
Date.prototype.isSameDay = function (otherDate) {
    var date1 = this;
    var date2 = otherDate;
    return (date1.getFullYear() === date2.getFullYear() && date1.getMonth() === date2.getMonth() && date1.getDate() === date2.getDate());
};
Date.prototype.addYears = function (years) {
    var date = this.copy();
    var newYear = date.getFullYear() + years;
    date.setFullYear(newYear);
    return date;
};
Date.prototype.addMonths = function (months) {
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
};
Date.prototype.addDays = function (days) {
    var date = this.copy();
    date.setDate(date.getDate() + days);
    return date;
};
Date.prototype.addHours = function (hours) {
    var date = this.copy();
    date.setHours(date.getHours() + hours);
    return date;
};
Date.prototype.addMinutes = function (minutes) {
    var date = this.copy();
    date.setMinutes(date.getMinutes() + minutes);
    return date;
};
Date.prototype.addSeconds = function (seconds) {
    var date = this.copy();
    date.setSeconds(date.getSeconds() + seconds);
    return date;
};
Date.prototype.copy = function () {
    var d = this;
    return new Date(d.getFullYear(), d.getMonth(), d.getDate(), d.getHours(), d.getMinutes(), d.getSeconds(), d.getMilliseconds());
};
Date.prototype.date = function () {
    var date = this;
    return new Date(date.getFullYear(), date.getMonth(), date.getDate());
};
Date.prototype.format = function (format) {
    var date = this;
    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    var day = date.getDate();
    var hour = date.getHours();
    var minute = date.getMinutes();
    var second = date.getSeconds();
    var millisecon = date.getMilliseconds();
    format = format.replaceAll('yyyy', year.toString());
    format = format.replaceAll('yy', year.toString().right(2));
    format = format.replaceAll('MM', month.toString().padLeft(2, '0'));
    format = format.replaceAll('dd', day.toString().padLeft(2, '0'));
    format = format.replaceAll('HH', hour.toString().padLeft(2, '0'));
    format = format.replaceAll('mm', minute.toString().padLeft(2, '0'));
    return format;
};
Date.prototype.dayOfWeek = function () {
    var dow = this.getDay();
    if (dow === 0)
        return TSL.DayOfWeek.Sunday;
    if (dow === 1)
        return TSL.DayOfWeek.Monday;
    if (dow === 2)
        return TSL.DayOfWeek.Tuesday;
    if (dow === 3)
        return TSL.DayOfWeek.Wednesday;
    if (dow === 4)
        return TSL.DayOfWeek.Thursday;
    if (dow === 5)
        return TSL.DayOfWeek.Friday;
    if (dow === 6)
        return TSL.DayOfWeek.Saturday;
    return null;
};
Date.prototype.isLeapYear = function () {
    var year = this.getFullYear();
    return ((year % 4 == 0) && (year % 100 != 0)) || (year % 400 == 0);
};
Date.prototype.getWeekNumber = function () {
    return new TSL.Week(this).weekNumber;
};
Date.prototype.getWeek = function () {
    return new TSL.Week(this);
};
Number.prototype.round = function () {
    return Math.round(this);
};
Number.prototype.floor = function () {
    return Math.floor(this);
};
Number.prototype.ceil = function () {
    return Math.ceil(this);
};
Number.prototype.in = function (numbers) {
    var num = parseFloat(this.toString());
    return numbers.contains(num);
};
Number.prototype.between = function (min, max) {
    var num = parseFloat(this.toString());
    return (num >= min && num <= max);
};
Number.prototype.addPercent = function (percent) {
    if (this === 0)
        return 0;
    return this + (this * (percent / 100));
};
Number.prototype.percentageOf = function (total) {
    if (this === 0)
        return 0;
    return this / total * 100;
};
String.prototype.toInt = function () {
    if (!this) {
        return 0;
    }
    return parseInt(this);
};
String.prototype.isInt = function () {
    if (!this)
        return false;
    return this.containsOnly('0123456789');
};
String.prototype.toDate = function () {
    var parts = this.split('.');
    if (parts.length !== 3)
        return null;
    var day = parseInt(parts[0]);
    var month = parseInt(parts[1]);
    var year = parseInt(parts[2]);
    var nan = parseInt('dummy');
    if (day == nan || month == nan || year == nan) {
        return null;
    }
    if (day > 31 || month > 12 || year > 2100 || year < 1900) {
        return null;
    }
    return new Date(year, month - 1, day);
};
String.prototype.format = function () {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
    }
    return this.replace(/{(\d+)}/g, function (match, number) {
        return typeof args[number] != 'undefined' ? args[number] : match;
    });
};
String.prototype.toLower = function () {
    return this.toLowerCase();
};
String.prototype.toUpper = function () {
    return this.toUpperCase();
};
String.prototype.trim = function () {
    return this.replace(/^\s+|\s+$/g, "");
};
String.prototype.startsWith = function (str, ignoreCase) {
    if (ignoreCase === void 0) { ignoreCase = false; }
    if (!str)
        return false;
    if (ignoreCase) {
        return this.slice(0, str.length).toLower() == str.toLower();
    }
    return this.slice(0, str.length) == str;
};
String.prototype.endsWith = function (suffix, ignoreCase) {
    if (ignoreCase === void 0) { ignoreCase = false; }
    if (!suffix)
        return false;
    if (ignoreCase) {
        return this.toLower().indexOf(suffix.toLower(), this.length - suffix.length) !== -1;
    }
    return this.indexOf(suffix, this.length - suffix.length) !== -1;
};
String.prototype.contains = function (str, ignoreCase) {
    if (ignoreCase === void 0) { ignoreCase = false; }
    if (!str)
        return false;
    if (ignoreCase) {
        return this.toLower().indexOf(str.toLower()) != -1;
    }
    return this.indexOf(str) != -1;
};
String.prototype.containsOnly = function (characters, ignoreCase) {
    if (ignoreCase === void 0) { ignoreCase = false; }
    return TSL.Validation.containsOnly(this, characters, ignoreCase);
};
String.prototype.left = function (length) {
    if (length <= 0)
        return '';
    if (this.length <= length) {
        return this.toString();
    }
    return this.substr(0, length);
};
String.prototype.right = function (length) {
    if (length <= 0)
        return '';
    if (this.length <= length) {
        return this.toString();
    }
    return this.substr((this.length - length), this.length);
};
String.prototype.shuffle = function () {
    var a = this.split('');
    var n = a.length;
    for (var i = n - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var tmp = a[i];
        a[i] = a[j];
        a[j] = tmp;
    }
    return a.join('');
};
String.prototype.repeat = function (iterations) {
    if (iterations < 1)
        return '';
    return (new Array(iterations + 1)).join(this);
};
String.prototype.replaceAll = function (target, replacement) {
    return this.split(target).join(replacement);
};
String.prototype.padRight = function (length, character) {
    return this + new Array(length - this.length + 1).join(character || ' ');
};
String.prototype.padLeft = function (length, character) {
    return new Array(length - this.length + 1).join(character || ' ') + this;
};
String.prototype.equals = function (str, ignoreCase) {
    if (ignoreCase === void 0) { ignoreCase = false; }
    var v1 = this.trim();
    var v2 = str.trim();
    if (ignoreCase) {
        return v1.toLowerCase() === v2.toLowerCase();
    }
    return v1 === v2;
};
var TSL;
(function (TSL) {
    var Validation = (function () {
        function Validation() {
        }
        Validation.isNullOrEmpty = function (value) {
            if (value == null || typeof value === 'undefined')
                return true;
            var type = typeof (value);
            if (type === 'string') {
                return value.trim().length === 0;
            }
            else if (type === 'number') {
                if (isNaN(value))
                    return true;
                return value.toString().length === 0;
            }
            else if (type === 'object') {
                if (Array.isArray(value)) {
                    return value.length === 0;
                }
                for (var x in value) {
                    return false;
                }
                if (!value[0]) {
                    return true;
                }
            }
            return value.toString().trim().length === 0;
        };
        Validation.isEmail = function (value) {
            if (Validation.isNullOrEmpty(value))
                return false;
            var re = /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/i;
            var regExResult = re.test(value);
            if (regExResult) {
                // do some additional tests
                var tld = value.substring(value.lastIndexOf('.') + 1);
                if (!tld || tld.length === 1)
                    return false;
            }
            return regExResult;
        };
        Validation.isNumber = function (value) {
            if (Validation.isNullOrEmpty(value)) {
                return false;
            }
            var result = value === Number(value) && value % 1 !== 0;
            if (!result) {
                result = Validation.isInt(value);
            }
            return result;
        };
        Validation.isInt = function (value) {
            if (Validation.isNullOrEmpty(value))
                return false;
            return Number(value) === value && value % 1 === 0;
        };
        Validation.containsOnly = function (value, characters, ignoreCase) {
            if (ignoreCase === void 0) { ignoreCase = false; }
            characters = characters.replace('[0-9]', '0123456789')
                .replace('[A-Z]', 'ABCDEFGHIJKLMNOPQRSTUVWXYZ')
                .replace('[a-z]', 'abcdefghijklmnopqrstuvwxyz')
                .replace('[A-Å]', 'ABCDEFGHIJKLMNOPQRSTUVWXYZÆØÅ')
                .replace('[a-å]', 'abcdefghijklmnopqrstuvwxyzæøå');
            if (ignoreCase) {
                characters = characters.toLowerCase();
                value = value.toLowerCase();
            }
            var i = 0;
            for (i = 0; i < value.length; i++) {
                if (characters.indexOf(value[i]) < 0)
                    return false;
            }
            return true;
        };
        Validation.isInRange = function (value, min, max) {
            return ((value >= min) && (value <= max));
        };
        Validation.isIpAddress = function (value) {
            if (Validation.isNullOrEmpty(value))
                return false;
            // http://www.w3resource.com/javascript/form/ip-address-validation.php
            return (/^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/.test(value));
        };
        return Validation;
    }());
    TSL.Validation = Validation;
})(TSL || (TSL = {}));
/// <reference path="validation.ts" />
var TSL;
(function (TSL) {
    var Services;
    (function (Services) {
        var ValidationService = (function () {
            function ValidationService(obj) {
                this.errors = [];
                this._cachedPropertyNames = [];
                this.currentObject = obj;
            }
            ValidationService.prototype.clear = function () {
                this.errors = [];
                return this;
            };
            ValidationService.prototype.getErrorMessages = function () {
                return this.errors;
            };
            ValidationService.prototype.containsErrors = function () {
                return this.getErrorMessages().length > 0;
            };
            ValidationService.prototype.required = function (prop, errorMessage) {
                var value = this.getPropertyValue(prop);
                if (TSL.Validation.isNullOrEmpty(value)) {
                    this.addValidationError(prop, errorMessage);
                }
                return this;
            };
            ValidationService.prototype.email = function (prop, errorMessage) {
                var value = this.getPropertyValue(prop);
                if (TSL.Validation.isNullOrEmpty(value)) {
                    return this;
                }
                if (!TSL.Validation.isEmail(value)) {
                    this.addValidationError(prop, errorMessage);
                    return this;
                }
                return this;
            };
            ValidationService.prototype.range = function (prop, min, max, errorMessage) {
                var value = this.getPropertyValue(prop);
                if (TSL.Validation.isNullOrEmpty(value)) {
                    return this;
                }
                var num = parseFloat(value);
                if (num == NaN) {
                    this.addValidationError(prop, errorMessage);
                    return this;
                }
                if (num > max || num < min) {
                    this.addValidationError(prop, errorMessage);
                    return this;
                }
                return this;
            };
            ValidationService.prototype.max = function (prop, max, errorMessage) {
                var value = this.getPropertyValue(prop);
                if (TSL.Validation.isNullOrEmpty(value)) {
                    return this;
                }
                var num = parseFloat(value);
                if (num == NaN) {
                    this.addValidationError(prop, errorMessage);
                    return this;
                }
                if (num > max) {
                    this.addValidationError(prop, errorMessage);
                    return this;
                }
                return this;
            };
            ValidationService.prototype.min = function (prop, min, errorMessage) {
                var value = this.getPropertyValue(prop);
                if (TSL.Validation.isNullOrEmpty(value)) {
                    return this;
                }
                var num = parseFloat(value);
                if (num == NaN) {
                    this.addValidationError(prop, errorMessage);
                    return this;
                }
                if (num < min) {
                    this.addValidationError(prop, errorMessage);
                    return this;
                }
                return this;
            };
            ValidationService.prototype.period = function (prop, min, max, errorMessage) {
                var value = this.getPropertyValue(prop);
                if (TSL.Validation.isNullOrEmpty(value)) {
                    return this;
                }
                if (value > max || value < min) {
                    this.addValidationError(prop, errorMessage);
                    return this;
                }
                return this;
            };
            ValidationService.prototype.minLengt = function (prop, minLength, errorMessage) {
                var value = this.getPropertyValue(prop);
                if (TSL.Validation.isNullOrEmpty(value)) {
                    return this;
                }
                if (value.length < minLength) {
                    this.addValidationError(prop, errorMessage);
                    return this;
                }
                return this;
            };
            ValidationService.prototype.maxLengt = function (prop, maxLength, errorMessage) {
                var value = this.getPropertyValue(prop);
                if (TSL.Validation.isNullOrEmpty(value)) {
                    return this;
                }
                if (value.length > maxLength) {
                    this.addValidationError(prop, errorMessage);
                    return this;
                }
                return this;
            };
            ValidationService.prototype.int = function (prop, errorMessage) {
                return this.custom(prop, function (value) { return TSL.Validation.containsOnly(value, '-0123456789'); }, errorMessage);
            };
            ValidationService.prototype.containsOnly = function (prop, characters, ignoreCase, errorMessage) {
                var value = this.getPropertyValue(prop);
                if (TSL.Validation.isNullOrEmpty(value)) {
                    return this;
                }
                if (!TSL.Validation.containsOnly(value, characters, ignoreCase)) {
                    this.addValidationError(prop, errorMessage);
                    return this;
                }
                return this;
            };
            ValidationService.prototype.ip = function (prop, errorMessage) {
                return this.custom(prop, function (value) { return TSL.Validation.isIpAddress(value); }, errorMessage);
            };
            ValidationService.prototype.equals = function (prop, other, errorMessage) {
                var propValue = this.getPropertyValue(prop);
                var otherValue = this.getPropertyValue(other);
                if (propValue !== otherValue) {
                    this.addValidationError(prop, errorMessage);
                }
                return this;
            };
            ValidationService.prototype.custom = function (prop, func, errorMessage) {
                var value = this.getPropertyValue(prop);
                if (TSL.Validation.isNullOrEmpty(value)) {
                    return this;
                }
                if (!func(value)) {
                    this.addValidationError(prop, errorMessage);
                }
                return this;
            };
            ValidationService.prototype.getCachedPropertyname = function (prop) {
                var asString = prop.toString();
                for (var i = 0; i < this._cachedPropertyNames.length; i++) {
                    var item = this._cachedPropertyNames[i];
                    if (item.propAsString === asString) {
                        return item.propertyname;
                    }
                }
                return null;
            };
            ValidationService.prototype.getPropertyname = function (prop) {
                var propertynameFromCache = this.getCachedPropertyname(prop);
                if (propertynameFromCache != null) {
                    return propertynameFromCache;
                }
                var temp = prop.toString();
                var getVariableName = function (exp) {
                    var firstP = exp.indexOf('(');
                    var lastP = exp.indexOf(')');
                    return exp.substr(firstP + 1, (lastP - firstP) - 1);
                };
                var getVariableStartIndex = function (exp, variableName) {
                    var varStartIndex = temp.indexOf(' ' + varName + '.');
                    if (varStartIndex > -1) {
                        return varStartIndex;
                    }
                    varStartIndex = temp.indexOf('(' + varName + '.');
                    if (varStartIndex > -1) {
                        return varStartIndex;
                    }
                    return temp.indexOf(varName + '.');
                };
                var removeLastSemicolon = function (exp) {
                    exp = exp.trim();
                    if (exp.substring(exp.length - 1) === ';') {
                        return exp.substring(0, exp.length - 1);
                    }
                    return exp;
                };
                var removeSurroundingParentheses = function (exp) {
                    exp = exp.trim();
                    if ((exp[0] === '(') && (exp.substring(exp.length - 1) === ')')) {
                        var lastPar = exp.lastIndexOf(')');
                        return exp.substring(1, lastPar);
                    }
                    return exp;
                };
                var removeVariableNameFromExpression = function (exp, variableName) {
                    var vnameWithDot = variableName + '.';
                    if (exp.substring(0, vnameWithDot.length) === vnameWithDot) {
                        return exp.substring(vnameWithDot.length);
                    }
                    return exp;
                };
                var isMethod = function (exp) {
                    return exp.indexOf('(') > -1;
                };
                var varName = getVariableName(temp);
                temp = temp.replace('function', '');
                temp = temp.replace('(' + varName + ')', '').trim();
                temp = temp.substring(9, temp.length - 2).trim();
                var varStartIndex = getVariableStartIndex(temp, varName);
                temp = temp.substring(varStartIndex);
                temp = removeLastSemicolon(temp);
                temp = removeSurroundingParentheses(temp);
                temp = removeVariableNameFromExpression(temp, varName);
                var expParts = temp.split('.');
                var validParts = [];
                for (var i = 0; i < expParts.length; i++) {
                    var part = expParts[i];
                    if (!isMethod(part)) {
                        validParts.push(part);
                    }
                    else {
                        break;
                    }
                }
                var propertyname = validParts.join('.');
                this._cachedPropertyNames.push({
                    propAsString: prop.toString(),
                    propertyname: propertyname
                });
                return propertyname;
            };
            ValidationService.prototype.getPropertyValue = function (prop) {
                return prop(this.currentObject);
            };
            ValidationService.prototype.addValidationError = function (prop, errorMessage) {
                var propertyName = this.getPropertyname(prop);
                var found = false;
                for (var i = 0; i < this.errors.length; i++) {
                    if (this.errors[i].property == propertyName) {
                        this.errors[i].messages.push(errorMessage);
                        found = true;
                        break;
                    }
                }
                if (!found) {
                    this.errors.push({
                        property: propertyName,
                        messages: [errorMessage]
                    });
                }
            };
            return ValidationService;
        }());
        Services.ValidationService = ValidationService;
    })(Services = TSL.Services || (TSL.Services = {}));
})(TSL || (TSL = {}));
var TLS;
(function (TLS) {
    var Stopwatch = (function () {
        function Stopwatch() {
        }
        Object.defineProperty(Stopwatch.prototype, "isRunning", {
            get: function () {
                return this._isRunning;
            },
            enumerable: true,
            configurable: true
        });
        Stopwatch.startNew = function () {
            var sw = new Stopwatch();
            sw.start();
            return sw;
        };
        Stopwatch.prototype.start = function () {
            this._isRunning = true;
            this._perf_start = performance.now();
        };
        Stopwatch.prototype.stop = function () {
            this._isRunning = false;
            this._perf_stop = performance.now();
        };
        Stopwatch.prototype.reset = function () {
            this._perf_start = performance.now();
        };
        Object.defineProperty(Stopwatch.prototype, "elapsedMilliseconds", {
            get: function () {
                if (this._isRunning === true) {
                    return (performance.now() - this._perf_start);
                }
                else {
                    return (this._perf_stop - this._perf_start);
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Stopwatch.prototype, "getTimespan", {
            get: function () {
                return TSL.TimeSpan.FromMilliseconds(this.elapsedMilliseconds);
            },
            enumerable: true,
            configurable: true
        });
        return Stopwatch;
    }());
    TLS.Stopwatch = Stopwatch;
})(TLS || (TLS = {}));
//# sourceMappingURL=typescriptLib.js.map