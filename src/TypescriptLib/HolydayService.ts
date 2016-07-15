module TSL.Services {

    export interface IHolyday {
        description: string;
        date: Date;
    }

    export interface IHolydayService {
        getHolydays(year: number): Array<IHolyday>;
    }

    export class HolydayService implements IHolydayService{

        constructor() { }

        _holydayCache: any[] = [];

        getHolydays(year: number): Array<IHolyday> {

            var holydays: Array<IHolyday> = this._getHolydaysFromCache(year);
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
        }

        private _getHolydaysFromCache(year: number): Array<IHolyday> {
            var holydays: Array<IHolyday> = null;
            this._holydayCache.forEach(function (cache) {
                if (cache.year === year) {
                    holydays = cache.holydays;
                    return;
                }
            });
            return holydays;
        }

        private _getEasterSunday(year: number): Date {

            var day: number = 0;
            var month: number = 0;
            var g: number = year % 19;
            var c: number = year / 100;

            var h = (c - parseInt((c / 4).toString()) - parseInt(((8 * c + 13) / 25).toString()) + 19 * g + 15) % 30;
            var i = h - parseInt((h / 28).toString()) * (1 - parseInt((h / 28).toString()) * parseInt((29 / (h + 1)).toString()) * parseInt(((21 - g) / 11).toString()));

            day = i - ((year + parseInt((year / 4).toString()) + i + 2 - c + parseInt((c / 4).toString())) % 7) + 28;
            month = 3;

            if (day > 31) {
                month++;
                day -= 31;
            }

            return new Date(year, month - 1, day);
        }
    }
}
