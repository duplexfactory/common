import {isEmpty, isNotEmpty, isValidEmail, isValidPhone} from "./helpers";

export type Rule<T> = (v: T) => true | string

export function chainRules<T>(rules:Rule<T>[], v: T): true | string {
    const errorMessage = rules.map(r => r(v)).find(result => result !== true)
    return isEmpty(errorMessage) ? true : errorMessage
}

/**
 * Required
 */

export const requiredRule: Rule<any> = (v: any) => !!v || '必須填寫'
export const requiredInputStringRule: Rule<string> = (v: string) => !!v.trim() || '請填寫此欄目'
export const requiredInputNumberRule: Rule<any> = (v: any) => !!v || v === 0 || '請填寫此欄目'
export const requiredSelectRule: Rule<any> = (v: any) => isNotEmpty(v) || '請選擇項目'
export const requiredCheckboxRule: Rule<boolean> = (v: boolean) => v || '請勾選以上項目'

/**
 * Format
 */

export const formatEmailRule: Rule<string> = (v: string) => isValidEmail(v) || '請以正確格式填寫電郵'
export const formatPhoneRule: Rule<string> = (v: string) => isValidPhone(v) || '請以正確格式填寫電話'
