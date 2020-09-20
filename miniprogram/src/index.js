/**
 * @file 小程序 fake
 * @author yangshangman
 */

import manager from './core/manager'
import navigator from './core/navigator'
import pageManager from './core/page-manager'

// 收集注册页面
pageManager.getPages()
  .then(pages => {
    pages.forEach((page, index) => {
      pageManager.register(page)
      if (index === 0) {
        // 初始化第一个
        navigator.init(page.url)
      }
    })
    require('../project/app.js')
  })

// 创建全局wx对象
const wx = {
  navigateTo: navigator.navigateTo.bind(navigator),
  redirectTo: navigator.redirectTo.bind(navigator),
  reLauch: navigator.reLauch.bind(navigator)
}

// App
function App(options) {
  manager.register(options)
  manager.renderView()
}

// Page
function Page(options) {
  pageManager.record(options)
}

const mount = {
  wx,
  App,
  Page
}

for (const k in mount) {
  window[k] = mount[k]
}
