export function isEmpty(val: null | undefined | any): val is null | undefined {
    return val === null || val === undefined;
}

export function isNotEmpty<T>(val: null | undefined | T): val is T {
    return !isEmpty(val);
}

export function enumNums(e: object) {
    return Object.values(e).filter(v => typeof v === "number");
}

/**
 * Regex
 */

export const emailRegex = new RegExp(
    "^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$",
    "i");

export const phoneRegex = /^\d{8,}$/;

export const urlRegex = new RegExp('^(https?:\\/\\/)?'+ // validate protocol
    '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ // validate domain name
    '((\\d{1,3}\\.){3}\\d{1,3}))'+ // validate OR ip (v4) address
    '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // validate port and path
    '(\\?[;&a-z\\d%_.~+=-]*)?'+ // validate query string
    '(\\#[-a-z\\d_]*)?$','i'); // validate fragment locator

export const urlPathRegex = new RegExp(
  '^(\\/[-a-z\\d%_.~+]*)*'+ // validate path
  '(\\?[;&a-z\\d%_.~+=-]*)?'+ // validate query string
  '(\\#[-a-z\\d_]*)?$','i'); // validate fragment locator

export const alphabetRegex = /[a-zA-Z]/;

/**
 * Regex validation functions
 */

export function isValidEmail(email: string) {
    return emailRegex.test(email);
}

export function isValidPhone(phone: string) {
    return phoneRegex.test(phone);
}

export function isValidUrl(urlPath: string) {
    return urlPathRegex.test(urlPath);
}

export function isValidUrlPath(url: string) {
    return urlRegex.test(url);
}


export function isAlphabetOnly(text: string) {
    return alphabetRegex.test(text);
}

/**
 * Share Urls
 * */

export function facebookShareUrl(targetUrl: string) {
    return `https://www.facebook.com/share.php?u=${encodeURIComponent(targetUrl)}`;
}

export function whatsAppUrl(targetUrl: string) {
    return `https://api.whatsapp.com/send/?text=${encodeURIComponent(targetUrl)}`;
}
