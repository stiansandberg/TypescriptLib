interface Number {
    between(min: number, max: number): boolean;
    addPercent(percent: number): number;
    in(numbers: Array<number>): boolean;
}

Number.prototype.in = function (numbers: Array<number>): boolean {
    var num = parseFloat(this.toString());
    return numbers.contains(num);
}

Number.prototype.between = function (min: number, max: number): boolean {
    var num = parseFloat(this.toString());
    return (num >= min && num <= max);
}

Number.prototype.addPercent = function (percent: number): number {
    if (this === 0)
        return 0;
    return this + (this * (percent / 100));
}