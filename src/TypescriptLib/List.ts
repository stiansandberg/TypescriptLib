module Collections {

    export interface IGroupResult<T> {
        value: any;
        count: number;
        items:Array<T>
    }

    export interface IList<T> {
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
    }

    export class List<T> implements Collections.IList<T>{

        private _items: Array<T> = [];

        public constructor(items?: Array<T>) {
            if (items && items.length > 0) {
                this._items = items;
            }
        }

        public any(predicate?: (item: T) => boolean): boolean {
            for (var i = 0; i < this._items.length; i++) {
                if (predicate(this._items[i])) {
                    return true;
                }
            }
            return false;
        }

        public distinct(): List<T> {
            var arr= this._items.reduce(function (p, c) {
                if (p.indexOf(c) < 0) p.push(c);
                return p;
            }, []);
            return new List<T>(arr);
        }

        public group(predicate: (item: T) => any): Array<IGroupResult<T>> {
            var result: Array<IGroupResult<T>> = [];
            
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
        }

        public sum(predicate: (item: T) => number): number {
            if (this._items.length === 0)
                return 0;

            var sum = 0;
            for (var i = 0; i < this._items.length; i++) {
                sum += predicate(this._items[i]);
            }

            return sum;
        }

        public avg(predicate: (item: T) => number): number {
            if (this._items.length === 0)
                return 0;

            var sum = 0;
            for (var i = 0; i < this._items.length; i++) {
                sum += predicate(this._items[i]);
            }
            return sum / this._items.length;
        }

        public min(predicate: (item: T) => number): number {
            if (this._items.length === 0)
                return 0;

            var values: Array<number> = [];
            for (var i = 0; i < this._items.length; i++) {
                values.push(predicate(this._items[i]));
            }

            return Math.min.apply(null, values);
        }

        public max(predicate: (item: T) => number): number {
            if (this._items.length === 0)
                return 0;

            var values: Array<number> = [];
            for (var i = 0; i < this._items.length; i++) {
                values.push(predicate(this._items[i]));
            }

            return Math.max.apply(null, values);
        }

        public add(item: T): List<T> {
            this._items.push(item);
            return this;
        }

        public addRange(items: Array<T>): List<T> {
            for (var i = 0; i < items.length; ++i) {
                this.add(items[i]);
            }
            return this;
        }

        public insert(index: number, item: T): List<T> {
            if (this._items.length < index + 1) {
                this._items.push(item);
                return this;
            }

            var _firstPartArray: Array<T> = this._items.slice(0, index);
            var _secondPartArray: Array<T> = this._items.slice(index, this._items.length);
            _firstPartArray.push(item);
            this._items = _firstPartArray.concat(_secondPartArray);

            return this;
        }

        public first(): T {
            if (this._items.length == 0)
                return null;
            return this._items[0];
        }

        public last(): T {
            if (this._items.length == 0) {
                return null;
            }
            return this._items[this._items.length - 1];
        }

        public take(count: number): List<T> {
            if (this._items.length <= count) {
                return this;
            }

            var topNArray = [];
            for (var i = 0; i < count; i++) {
                topNArray.push(this._items[i]);
            }
            return new List<T>(topNArray);
        }

        public offset(startIndex: number, count: number): List<T> {
            var topNArray = [];
            for (var i = startIndex; i <= (count + startIndex - 1); i++) {
                topNArray.push(this._items[i]);
            }
            return new List<T>(topNArray);
        }

        public remove(predicate?: (item: T) => boolean): List<T> {

            var newItems = [];
            for (var i = 0; i < this._items.length; i++) {
                if (!predicate(this._items[i])) {
                    newItems.push(this._items[i]);
                }
            }
            this._items = newItems;
            return this;
        }

        public removeAt(index: number): List<T> {
            if (this._items.length < index + 1) {
                return this;
            }

            this._items.splice(index, 1);
            return this;
        }

        public where(predicate?: (item: T) => boolean): List<T> {
            var returnlist: List<T> = new List<T>();
            for (var i = 0; i < this._items.length; i++) {
                if (predicate(this._items[i])) {
                    returnlist.add(this._items[i]);
                }
            }
            return returnlist;
        }

        public forEach(action: (item: T) => void): List<T> {
            for (var i = 0; i < this._items.length; i++) {
                action(this._items[i]);
            }
            return this;
        }

        public orderBy(selector: (item: T) => any): List<T> {
            var comparer = (a: T, b: T) => {
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
        }

        public orderByDescending(selector: (item: T) => any): List<T> {

            var comparer = (a: T, b: T) => {
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
        }

        public toArray(): Array<T> {
            return this._items;
        }

        public contains(predicate?: (item: T) => boolean): boolean {
            for (var i = 0; i < this._items.length; i++) {
                if (predicate(this._items[i])) {
                    return true;
                }
            }
            return false;
        }

        public count(predicate?: (item: T) => boolean): number {
            if (predicate) {
                var count: number = 0;
                for (var i = 0; i < this._items.length; i++) {
                    if (predicate(this._items[i])) {
                        count++;
                    }
                }
                return count;
            }
            return this._items.length;
        }

        public firstOrDefault(predicate?: (item: T) => boolean): T {
            var items = this.where(predicate);
            if (items._items.length == 0) {
                return null;
            }
            return items.first();
        }

        public singleOrDefault(predicate?: (item: T) => boolean): T {
            var items = this.where(predicate);

            if (items._items.length > 1) {
                throw 'predicate returned more than one item';
            }
            if (items._items.length == 0) {
                return null;
            }

            return items.first();
        }

        public copy(): List<T> {
            return new List<T>(this._items);
        }

        public clear(): void {
            if (this._items.length == 0)
                return;

            this._items = [];
        }
    }
}