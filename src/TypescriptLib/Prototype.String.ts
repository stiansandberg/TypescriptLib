interface String {
    toLower(): string;
    toUpper(): string;
    trim(): string;
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
}

String.prototype.toDate = function (): Date {

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
}

String.prototype.format = function (...args: any[]) {
    return this.replace(/{(\d+)}/g, function (match, number) {
        return typeof args[number] != 'undefined' ? args[number] : match;
    });
};

String.prototype.toLower = function () {
    return this.toLowerCase();
}

String.prototype.toUpper = function () {
    return this.toUpperCase();
}

String.prototype.trim = function () {
    return this.replace(/^\s+|\s+$/g, "");
};

String.prototype.startsWith = function (str, ignoreCase = false) {
    if (!str)
        return false;

    if (ignoreCase) {
        return this.slice(0, str.length).toLower() == str.toLower();
    }
    return this.slice(0, str.length) == str;
};

String.prototype.endsWith = function (suffix, ignoreCase = false) {
    if (!suffix)
        return false;

    if (ignoreCase) {
        return this.toLower().indexOf(suffix.toLower(), this.length - suffix.length) !== -1;
    }
    return this.indexOf(suffix, this.length - suffix.length) !== -1;
};

String.prototype.contains = function (str, ignoreCase = false) {
    if (!str)
        return false;

    if (ignoreCase) {
        return this.toLower().indexOf(str.toLower()) != -1;
    }

    return this.indexOf(str) != -1;
};

String.prototype.containsOnly = function (characters, ignoreCase=false) {
    return Validation.containsOnly(this, characters, ignoreCase);
}

String.prototype.left = function (length) {
    if (length <= 0)
        return '';

    if (this.length <= length) {
        return this.toString();
    }
    return this.substr(0, length);
}

String.prototype.right = function (length) {
    if (length <= 0)
        return '';

    if (this.length <= length) {
        return this.toString();
    }

    return this.substr((this.length - length), this.length);
}

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

String.prototype.repeat = function (iterations: number) {
    if (iterations < 1)
        return '';
    return (new Array(iterations + 1)).join(this);
}

String.prototype.replaceAll = function (target: string, replacement: string): string {
    return this.split(target).join(replacement);
};

String.prototype.padRight = function (length, character) {
    return this + new Array(length - this.length + 1).join(character || ' ');
}

String.prototype.padLeft = function (length, character) {
    return new Array(length - this.length + 1).join(character || ' ') + this;
}