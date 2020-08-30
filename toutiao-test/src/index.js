/**
 * @file 入口文件
 * @author yangshangman
 */

import renderComponents from './components/items/index.js';
import { request } from './utils';

/**
 * 入口模块管理类
 */
class Manager {
  constructor($el) {
    this.$el = $el;
  }

  getData() {
    return request('/list')
  }

  appendData() {
    this.getData()
      .then(data => {
        data.forEach(item => {
          const { data, type } = item;
          const Component = renderComponents[type];
          const component = new Component(data);
          const element = component.constructElement();
          this.$el.appendChild(element);
        })
      })
  }

  static getInstance($el) {
    return new Manager($el);
  }

}

const manager = Manager.getInstance(document.getElementById('app'));
manager.appendData();