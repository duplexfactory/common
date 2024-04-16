import {isEmpty, isNotEmpty, isValidEmail, isValidPhone} from "./helpers";

export type Rule<T> = (v: T) => true | string

export function chainRules<T>(rules: Rule<T>[], v: T): true | string {
    const errorMessage = rules.map(r => r(v)).find(result => result !== true);
    return isEmpty(errorMessage) ? true : errorMessage;
}

/**
 * Required
 */

export const requiredRule: Rule<any> = (v: any) => !!v || "必須填寫";
export const requiredInputStringRule: Rule<string> = (v: string) => !!v.trim() || "請填寫此欄目";
export const requiredInputNumberRule: Rule<any> = (v: any) => !!v || v === 0 || "請填寫此欄目";
export const requiredSelectRule: Rule<any> = (v: any) => isNotEmpty(v) || "請選擇項目";
export const requiredCheckboxRule: Rule<boolean> = (v: boolean) => v || "請勾選以上項目";

/**
 * Format
 */

export const formatEmailRule: Rule<string> = (v: string) => !v || isValidEmail(v) || "請以正確格式填寫電郵";
export const formatPhoneRule: Rule<string> = (v: string) => !v || isValidPhone(v) || "請以正確格式填寫電話";

export const lengthRule: (l: number) => Rule<string> = (l) => (v: string) => !v || v.length >= l || `長度最少為${l}`;
export const equalRule: (val: any, field: string) => Rule<any> = (val, field) => (v: any) => !v || v === val || `與${field}不相同`;

/**
 * Form
 */

export class Form<T> {
    values: T;
    rules: Partial<{ [P in keyof T]: Rule<T[P]>[] }> = {};
    errors: Partial<{ [P in keyof T]: true | string }> = {};

    constructor(param: { values: T; rules: Partial<{ [P in keyof T]: Rule<any>[] }>; errors: Partial<{ [P in keyof T]: string }> }) {
        this.values = param.values;
        this.rules = param.rules;
        this.errors = param.errors;
        return this;
    }

    validateFields(fields: (keyof T)[]) {
        const errors = fields.reduce((errors, field) => {
            const v = this.rules[field];
            if (!isEmpty(v)) {
                const e = chainRules(v, this.values[field]);
                if (e !== true)
                    errors[field] = e;
            }
            return errors;
        }, {} as Partial<{ [P in keyof T]: true | string }>);
        // for (const field of fields) {
        //     Vue.set(this.errors, String(field), errors[field])
        // }
        this.errors = errors;
        return Object.values(this.errors).every(err => err === true);
    }

    validate() {
        return this.validateFields(Object.keys(this.rules) as (keyof T)[]);
    }
}
