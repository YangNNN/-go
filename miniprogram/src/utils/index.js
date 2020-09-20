/**
 * @file 工具
 * @author yangshangman
 */


export const getType = obj => Object.prototype.toString.call(obj).slice(8, -1).toLowerCase()


export const isFunction = obj => getType(obj) === 'function'