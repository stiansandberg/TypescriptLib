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
}

Array.prototype.contains = function (value) {
    if (!value)
        return false;
    return this.indexOf(value) > -1;
}

Array.prototype.remove = function (value) {
    if (!value)
        return;

    var index = this.indexOf(value);
    if (index > -1) {
        this.splice(index, 1);
    }
}

Array.prototype.addOrRemoveIfExists = function (obj) {
    if (!obj)
        return;

    if (this.contains(obj)) {
        this.remove(obj);
    } else {
        this.push(obj);
    }
}

Array.prototype.pushIfNotExists = function (obj) {
    if (!obj)
        return;

    if (this.contains(obj)) {
        return;
    }
    this.push(obj);
}