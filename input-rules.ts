import {isNotEmpty, isValidEmail, isValidPhone} from "./helpers";

/**
 * Required
 */

export const requiredRule = (v: any) => !!v || '必須填寫'
export const requiredInputStringRule = (v: string) => !!v.trim() || '請填寫此欄目'
export const requiredInputNumberRule = (v: any) => !!v || v === 0 || '請填寫此欄目'
export const requiredSelectRule = (v: any) => isNotEmpty(v) || '請選擇項目'
export const requiredCheckboxRule = (v: boolean) => v || '請勾選以上項目'

/**
 * Format
 */

export const formatEmailRule = (v: string) => isValidEmail(v) || '請以正確格式填寫電郵'
export const formatPhoneRule = (v: string) => isValidPhone(v) || '請以正確格式填寫電話'
