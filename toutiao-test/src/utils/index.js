/**
 * @file 工具文件
 * @author yangshangman
 */

import mock from './mock'

/**
 * 所有请求从这里走
 * @param {String} url 请求地址
 * @param {Object} options 请求参数
 */
export const request = (url, options) => {
  return Promise.resolve(mock.data)
}