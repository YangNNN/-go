/**
 * @file 页面注册管理器
 * @author yangshangman
 */

import manager from './manager'
import pageManager from "./page-manager"

/**
 * 页面跳转，记录页面栈
 */
class Navigator {
  constructor() {
    this.currentPages = []
  }

  getPage(url) {
    const page = pageManager.get(url)
    return page
  }

  init(url) {
    this.currentPages = [this.getPage(url)]
  }

  navigateTo(url) {
    this.currentPages.push(this.getPage(url))
    manager.renderView()
  }

  redirectTo(url) {
    this.currentPages.splice(this.currentPages.length - 1, 1, this.getPage(url))
    manager.renderView()
  }

  reLauch(url) {
    this.currentPages = [this.getPage(url)]
    manager.renderView()
  }

  getCurrentPages() {
    return this.currentPages
  }

  getCurrentPage() {
    return this.currentPages.slice(-1)[0]
  }

}

export default new Navigator()