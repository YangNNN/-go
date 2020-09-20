/**
 * @file 依赖管理
 * @author yangshangman
 */

export default class Dep {
  constructor() {
    this.subs = []
  }

  add(sub) {
    this.subs.push(sub)
  }

  notify() {
    this.subs.forEach(sub => {
      sub.update()
    })
  }

}