﻿/// <reference path="../dayofweek.ts" />
module TSL.i18n {

    export class Calendar {
        static name = 'nb-no';
        static firstDayOfWeek: DayOfWeek = DayOfWeek.Monday;
        static monthNames: Array<string> = ['Januar', 'Februar', 'Mars', 'April', 'Mai', 'Juni', 'Juli', 'August', 'September', 'Oktober', 'November', 'Desember'];
        static weekDays: Array<string> = ['Mandag', 'Tirsdag', 'Onsdag', 'Torsdag', 'Fredag', 'Lørdag', 'Søndag'];
    }

    export class Format {
        static name = 'nb-no';
        static date: string = 'dd.MM.yyyy';
        static time: string = 'HH:mm';
        static dateTime: string = 'ss.MM.yyyy HH:mm';
    }
}