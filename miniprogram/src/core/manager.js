/**
 * @file 全局管理器
 * @author yangshangman
 */

import { isFunction } from '../utils'
import navigator from './navigator'
import render from './render'

class Manager {

  register(options) {
    options.globalData = options.globalData || {}
    this.options = options
    this.init()
  }

  // 小程序初始化
  init() {

    // 执行初始化
    const { onLaunch } = this.options
    isFunction(onLaunch) && onLaunch.bind(this.options)

  }

  // 渲染视图
  renderView() {
    const currentPage = navigator.getCurrentPage()
    console.log(currentPage)
    isFunction(currentPage.onLoad) && currentPage.onLoad.call(currentPage, {})
    window.document.body.innerHTML = currentPage.template
    render.render(currentPage)
  }

  getApp() {
    return this.options
  }

}

export default new Manager()