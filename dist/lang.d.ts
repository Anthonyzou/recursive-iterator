/**
 * @param {*} any
 * @returns {Boolean}
 */
declare function isObject(any: any): boolean;
/**
 * @param {*} any
 * @returns {Boolean}
 */
declare const isArray: (arg: any) => arg is any[];
/**
 * @param {*} any
 * @returns {Boolean}
 */
declare function isArrayLike(any: any): boolean;
/**
 * @param {*} any
 * @returns {Boolean}
 */
declare function isNumber(any: any): boolean;
/**
 * @param {Object|Array} object
 * @returns {Array<String>}
 */
declare function getKeys(object: any): string[];
export { getKeys, isArray, isArrayLike, isObject, isNumber };
