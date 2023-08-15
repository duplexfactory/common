import {CredentialData} from "@models/credential-data";

export {}

declare global {
    interface String {
        toKebabCase(): string;

        toPascalCase(separator?: string): string;
    }

    interface Array<T> {
        asyncMap<K>(callback: (value: T, index: number, array: T[]) => Promise<K>): Promise<Array<K>>;

        chainPush(...items: T[]): Array<T>;

        chainSort(compareFn?: (a: T, b: T) => number): Array<T>;

        toDict(key?: string): Record<string, T>;

        unique(): Array<T>;

        last(): T;
    }

    interface Math {
        sum(...items: number[]): number;

        sumObj(obj: NodeJS.Dict<number>): number;
    }

    interface ObjectConstructor {
        assignExists<T, U>(target: T, source: U): T;
        trimLeaves(obj: any, values: any[]);
    }

    interface Storage {
        getCredentialData(credentialKey: string): CredentialData | null;
        setCredentialData(credentialKey: string, data: CredentialData);
    }
}