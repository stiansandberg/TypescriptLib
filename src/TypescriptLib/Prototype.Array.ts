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

Array.prototype.contains = function (value: any): boolean {
    if (!value)
        return false;
    return this.indexOf(value) > -1;
}

Array.prototype.clone = function ():Array<any> {
    return this.slice(0);
}

Array.prototype.addRange = function (arr: Array<any>):Array<any> {
    if (!arr || arr.length === 0)
        return this;

    var newArray = this.clone();
    for (var i = 0; i < arr.length; i++) {
        newArray.push(arr[i]);
    }
    return newArray;
}


Array.prototype.remove = function (value): void {
    if (!value)
        return;

    var index = this.indexOf(value);
    if (index > -1) {
        this.splice(index, 1);
    }
}

Array.prototype.addOrRemoveIfExists = function (obj):void {
    if (!obj)
        return;

    if (this.contains(obj)) {
        this.remove(obj);
    } else {
        this.push(obj);
    }
}

Array.prototype.pushIfNotExists = function (obj):void {
    if (!obj)
        return;

    if (this.contains(obj)) {
        return;
    }
    this.push(obj);
}

Array.prototype.toList = function (): TSL.Collections.IList<any> {
    return new TSL.Collections.List(this);
}