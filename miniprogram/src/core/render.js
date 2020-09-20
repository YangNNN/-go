/**
 * @file 渲染视图
 * @author yangshangman
 */

import Dep from './dep'

class Render {
  render(page) {
    if (page._init) return
    
    page._init = true

    const { template, data } = page

    for (const k in data) {
      const _val = data[k]
      const dep = new Dep()
      Object.defineProperty(data, k, {
        get: function() {
          Dep.target && dep.addSub(Dep.target)
          return _val
        },
        set: function(val) {
          _val = val
        }
      })
    }

    const update = () => {
    }

  }
}

export default new Render()