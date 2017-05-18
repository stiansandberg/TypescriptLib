module TLS {

    export class Stopwatch {
        constructor() { }

        private _perf_start: number;
        private _perf_stop: number;
        private _isRunning: boolean;


        public get isRunning(): boolean {
            return this._isRunning;
        }

        public static startNew(): Stopwatch {
            var sw = new Stopwatch();
            sw.start();
            return sw;
        }

        public start() {
            this._isRunning = true;
            this._perf_start = performance.now();
        }

        public stop() {
            this._isRunning = false;
            this._perf_stop = performance.now();
        }

        public reset() {
            this._perf_start = performance.now();
        }

        public get elapsedMilliseconds(): number {
            if (this._isRunning === true) {
                return (performance.now() - this._perf_start);
            } else {
                return (this._perf_stop - this._perf_start);
            }
        }

        public get getTimespan(): TSL.ITimeSpan {
            return TSL.TimeSpan.FromMilliseconds(this.elapsedMilliseconds);
        }
    }

}