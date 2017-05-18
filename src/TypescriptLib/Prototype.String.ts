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

String.prototype.toInt = function (): number {
    if (!this) {
        return 0;
    }
    return parseInt(this);
}

String.prototype.isInt = function (): boolean {
    if (!this)
        return false;
    return (this as string).containsOnly('0123456789');
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

String.prototype.format = function (...args: any[]): string {
    return this.replace(/{(\d+)}/g, function (match: any, number: number) {
        return typeof args[number] != 'undefined' ? args[number] : match;
    });
};

String.prototype.toLower = function (): string {
    return this.toLowerCase();
}

String.prototype.toUpper = function (): string {
    return this.toUpperCase();
}

String.prototype.trim = function (): string {
    return this.replace(/^\s+|\s+$/g, "");
};

String.prototype.startsWith = function (str: string, ignoreCase = false): boolean {
    if (!str)
        return false;

    if (ignoreCase) {
        return this.slice(0, str.length).toLower() == str.toLower();
    }
    return this.slice(0, str.length) == str;
};

String.prototype.endsWith = function (suffix: string, ignoreCase = false): boolean {
    if (!suffix)
        return false;

    if (ignoreCase) {
        return this.toLower().indexOf(suffix.toLower(), this.length - suffix.length) !== -1;
    }
    return this.indexOf(suffix, this.length - suffix.length) !== -1;
};

String.prototype.contains = function (str: string, ignoreCase = false): boolean {
    if (!str)
        return false;

    if (ignoreCase) {
        return this.toLower().indexOf(str.toLower()) != -1;
    }

    return this.indexOf(str) != -1;
};

String.prototype.containsOnly = function (characters: string, ignoreCase = false): boolean {
    return TSL.Validation.containsOnly(this, characters, ignoreCase);
}

String.prototype.left = function (length: number): string {
    if (length <= 0)
        return '';

    if (this.length <= length) {
        return this.toString();
    }
    return this.substr(0, length);
}

String.prototype.right = function (length: number): string {
    if (length <= 0)
        return '';

    if (this.length <= length) {
        return this.toString();
    }

    return this.substr((this.length - length), this.length);
}

String.prototype.shuffle = function (): string {
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

String.prototype.repeat = function (iterations: number): string {
    if (iterations < 1)
        return '';
    return (new Array(iterations + 1)).join(this);
}

String.prototype.replaceAll = function (target: string, replacement: string): string {
    return this.split(target).join(replacement);
};

String.prototype.padRight = function (length: number, character: string): string {
    return this + new Array(length - this.length + 1).join(character || ' ');
}

String.prototype.padLeft = function (length: number, character: string): string {
    return new Array(length - this.length + 1).join(character || ' ') + this;
}

String.prototype.equals = function (str: string, ignoreCase = false): boolean {
    var v1: string = (this as string).trim();
    var v2: string = str.trim();

    if (ignoreCase) {
        return v1.toLowerCase() === v2.toLowerCase();
    }
    return v1 === v2;
}