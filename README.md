# TypeScriptLib

## Prototypes
### Array

    contains(value: T): boolean;
    remove(value: T): void;
    addOrRemoveIfExists(value: T): void;
    pushIfNotExists(value: T): void;
    toList<T>(): Collections.List<T>;
    addRange(arr: Array<T>): Array<T>;
    clone(): Array<T>;