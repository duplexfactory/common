import {CredentialData} from "@models/credential-data";
import CryptoJS from "crypto-js";

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
    return this.reduce((dict, item) => ({
        ...dict,
        [item[key]]: item
    }), {} as Record<string, T>);
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

/**
 * Storage
 */

if (!Storage.prototype.getCredentialData) {
    Storage.prototype.getCredentialData = function (credentialKey: string): CredentialData | null {
        const encryptedCredential = localStorage.getItem("credential");
        if (encryptedCredential) {
            const credential = CryptoJS.AES.decrypt(encryptedCredential, credentialKey).toString(CryptoJS.enc.Utf8);
            return JSON.parse(credential) as CredentialData;
        }
        return null;
    };
}

if (!Storage.prototype.setCredentialData) {
    Storage.prototype.setCredentialData = function (credentialKey: string, data: CredentialData) {
        const credentialString = JSON.stringify(data);
        localStorage.setItem("credential", CryptoJS.AES.encrypt(credentialString, credentialKey).toString());
    };
}

/**
 * Object
 */

if (!Object.assignExists) {
    Object.assignExists = function <T extends Record<any, any>, U extends Record<any, any>>(target: T, source: U): T {
        Object.keys(source).filter(key => key in target).forEach(key => Object.assign(target, {[key]: source[key]}));
        return target;
    };
}

if (!Object.trimLeaves) {
    Object.trimLeaves = function trimLeaves(obj: any, values: any[]) {
        for (const o in obj) {
            if (typeof obj[o] === 'object')
                trimLeaves(obj[o], values);
            if (values.find((v: any) => JSON.stringify(v) === JSON.stringify(obj[o])))
                delete obj[o];
        }
        return obj
    }
}

