QUnit.module('List<T>');

interface IPerson {
    name: string;
    age: number;
    birthdate?: Date;
}


function getPersons(): Collections.List<IPerson> {
    var personList = new Collections.List<IPerson>();
    personList.add({ name: 'aa', age: 15, birthdate: new Date().addYears(-15) });
    personList.add({ name: 'bb', age: 3, birthdate: new Date().addYears(-3) });
    personList.add({ name: 'cc', age: 28, birthdate: new Date().addYears(-28) });
    personList.add({ name: 'dd', age: 32, birthdate: new Date().addYears(-32) });
    personList.add({ name: 'ee', age: 78, birthdate: new Date().addYears(-78) });
    return personList;
}
/*
        add(item: T);
        addRange(item: Array<T>);
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
        clear(): void;
*/

QUnit.test('sum/avg', function (a: QUnitAssert) {

    var persons = getPersons();

    var loopSum = 0;
    persons.forEach(function (person) {
        loopSum += person.age;
    });
    var loopAvg = loopSum / persons.count();
    var listSum = persons.sum(p=> p.age);
    var listAvg = persons.avg(p=> p.age);

    a.ok(listSum === loopSum, 'sum age was ' + listSum);
    a.ok(listAvg === loopAvg, 'avg age was ' + listAvg);


    var numbers = new Collections.List<number>([1, 2, 3]);
    a.ok(numbers.avg(n=> n) === 2);
    a.ok(numbers.sum(n=> n) === 6);

    numbers = new Collections.List<number>([1, 2, 3, 4]);
    a.ok(numbers.avg(n=> n) === 2.5);
});

QUnit.test('min/max', function (a: QUnitAssert) {
    var persons = getPersons();

    a.ok(persons.min(p=> p.age) === 3, 'min age expected 3 was ' + persons.min(p=> p.age));
    a.ok(persons.max(p=> p.age) === 78, 'max age expected 78 was ' + persons.max(p=> p.age));

    var numbers = new Collections.List<number>([1, 2, 3, 4, 5, 6, 7, 8, 9]);
    a.ok(numbers.min(n=> n) === 1);
    a.ok(numbers.max(n=> n) === 9);
});

QUnit.test('initial', function (a: QUnitAssert) {
    var personList = getPersons();
    a.ok(personList.count() === 5, 'count() should be 5. Is ' + personList.count());
});

QUnit.test('add', function (a: QUnitAssert) {
    var personList = new Collections.List<IPerson>();
    a.ok(personList.add({ name: 'aa', age: 5 }).count() === 1);
    a.ok(personList.add({ name: 'bb', age: 13 }).count() === 2);
    a.ok(personList.add({ name: 'cc', age: 28 }).count() === 3);
    a.ok(personList.add({ name: 'dd', age: 32 }).count() === 4);
    a.ok(personList.add({ name: 'ee', age: 78 }).count() === 5);
});

QUnit.test('addRange', function (a: QUnitAssert) {
    var personList = new Collections.List<IPerson>();
    var persons: Array<IPerson> = [];
    persons.push({ name: 'ff', age: 5 + 7 });
    persons.push({ name: 'gg', age: 13 + 7 });
    persons.push({ name: 'hh', age: 28 + 7 });
    persons.push({ name: 'ii', age: 32 + 7 });
    persons.push({ name: 'jj', age: 78 + 7 });
    a.ok(personList.addRange(persons).count() === 5);
});

QUnit.test('insert', function (a: QUnitAssert) {
    var personList = getPersons();
    personList.insert(2, { name: 'kk', age: 12 });
    a.ok(personList.count() === 6);
});

QUnit.test('first', function (a: QUnitAssert) {
    var personList = getPersons();
    a.ok(personList.first().name === 'aa');
    a.ok(personList.first().age === 15);
});

QUnit.test('last', function (a: QUnitAssert) {
    var personList = getPersons();
    a.ok(personList.last() != null);
    a.ok(personList.last().name === 'ee');
    a.ok(personList.last().age === 78);
});

QUnit.test('remove', function (a: QUnitAssert) {
    var personList = getPersons();
    a.ok(personList.remove(p=> p.name === 'aa').count() === 4);
    a.ok(personList.remove(p=> p.age > 1).count() === 0);
});

QUnit.test('removeAt', function (a: QUnitAssert) {
    var personList = getPersons();
    a.ok(personList.removeAt(10).count() === 5);
    a.ok(personList.removeAt(2).count() === 4);
});

QUnit.test('where', function (a: QUnitAssert) {
    var personList = getPersons();
    a.ok(personList.where(p=> p.age > 50).count() === 1);
    a.ok(personList.where(p=> p.age < 50).count() === 4);
    a.ok(personList.where(p=> p.name.startsWith('a')).count() === 1);
});

QUnit.test('take', function (a: QUnitAssert) {
    var personList = getPersons();
    a.ok(personList.take(1).count() === 1);
    a.ok(personList.take(50).count() === 5);
    a.ok(personList.take(0).count() === 0);
});

QUnit.test('forEach', function (a: QUnitAssert) {
    var personList = getPersons();

    var count = 0;
    personList.forEach(function (person) {
        count++;
        a.ok(person.name.length > 1);
    });
    a.ok(count === 5);
});

QUnit.test('orderBy', function (a: QUnitAssert) {
    var personList = getPersons();

    personList.orderBy(p=> p.name);
    a.ok(personList.first().name === 'aa');

    personList.orderBy(p=> p.age);
    a.ok(personList.first().name === 'bb');
});

QUnit.test('orderByDescending', function (a: QUnitAssert) {
    var personList = getPersons();

    personList.orderByDescending(p=> p.name);
    a.ok(personList.first().name === 'ee');

    personList.orderByDescending(p=> p.age);
    a.ok(personList.first().name === 'ee');
});

QUnit.test('offset', function (a: QUnitAssert) {
    var personList = getPersons();
    a.ok(personList.offset(2, 2).count() === 2);
    a.ok(personList.offset(2, 2).first().name === 'cc');
});

QUnit.test('toArray', function (a: QUnitAssert) {
    var personList = getPersons();
    a.ok(personList.count() == personList.toArray().length);
});

QUnit.test('contains', function (a: QUnitAssert) {
    var personList = getPersons();

    a.ok(personList.contains(p=> p.name === 'aa'));
    a.ok(personList.contains(p=> p.age > 5));
    a.ok(personList.contains(p=> p.age > 90) === false);
    a.ok(personList.contains(p=> p.name === 'ww') === false);
});

QUnit.test('count', function (a: QUnitAssert) {
    var personList = getPersons();

    a.ok(personList.count() === 5);
    a.ok(personList.count(p=> p.age > 70) === 1);
    a.ok(personList.count(p=> p.age < 70) === 4);
});

QUnit.test('copy', function (a: QUnitAssert) {
    var personList = getPersons();

    a.ok(personList.count() === personList.copy().count());
    a.ok(personList.count(p=> p.age > 40) === personList.copy().count(p=> p.age > 40));
});

QUnit.test('clear', function (a: QUnitAssert) {
    var personList = getPersons();
    personList.clear();
    a.ok(personList.count() === 0);
});


