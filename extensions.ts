/**
 * String
 */

String.prototype.toKebabCase = function () {
    return this.replace(/\s+/g, "-").toLowerCase()
};

String.prototype.toPascalCase = function (separator) {
    return this
        .toLowerCase()
        .replace(/[-_\s]+/g, ' ').replace(
            /\s+(.)(\w*)/g,
            ($1, $2, $3) => `${(separator ?? '') + $2.toUpperCase() + $3}`
        ).replace(/^\w/g, s => s.toUpperCase());
};

/**
 * Array
 */

Array.prototype.asyncMap = function <T, K>(this: Array<T>, callback: (value: T, index: number, array: T[]) => Promise<K>) {
    const ps = this.map(callback);
    return Promise.all(ps);
};

Array.prototype.chainPush = function <T>(this: Array<T>, ...items: T[]) {
    this.push(...items);
    return this;
};

Array.prototype.chainSort = function <T>(this: Array<T>, compareFn?: (a: T, b: T) => number) {
    this.sort(compareFn);
    return this;
};

Array.prototype.toDict = function <T>(key = "_id") {
    const dict: Record<string, T> = {};
    this.forEach(item => {
        dict[key] = item;
    });
    return dict;
};

Array.prototype.unique = function <T>(this: Array<T>) {
    return Array.from(new Set(this));
};

Array.prototype.last = function <T>(this: Array<T>) {
    return this[this.length - 1];
};

/**
 * Math
 */

Math.sum = function (...items) {
    return items.reduce((total, next) => total + next, 0);
};

Math.sumObj = function (obj: Record<string, number>) {
    return Math.sum(...Object.values(obj));
};

