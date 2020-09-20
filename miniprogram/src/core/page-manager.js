/**
 * @file 页面注册管理器
 * @author yangshangman
 */

class PageManager {
  constructor() {
    this.pages = {}
  }

  get(url) {
    return this.pages[url]
  }

  register(page) {
    PageManager.Target = page.url
    eval(page.data)
  }

  record(options) {
    this.pages[PageManager.Target] = options
  }

  getFiles(url, key) {
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest()
      xhr.onreadystatechange = function() {
        if (xhr.readyState === 4 && xhr.status === 200) {
          resolve({
            url: key,
            data: xhr.response
          })
        }
      }
      xhr.open('get', './project/' + url)
      xhr.send()
    })
  }

  async getPages() {
    const { data: appjson } = await this.getFiles('app.json')
    try {
      const { pages } = JSON.parse(appjson)
      return Promise.all(
        pages.map(path => {
          return this.getFiles('/' + path + '.js', path)
        })
      )
    } catch (error) {
      return Promise.reject('app.json is invalid')
    }
  }

}


export default new PageManager()