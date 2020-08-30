/**
 * @file 基类 负责生成dom节点
 * @author yangshangman
 */

export default class Component {
  constructor(props) {
    this.props = props;
  }

  render() {
    return `
      <div>请继承组件自己实现一个render方法，并且返回html</div>
    `
  }

  constructElement() {
    const html = this.render();
    const $content = document.createElement('div');
    const $container = document.createElement('div');
    $container.appendChild($content);
    $content.outerHTML = html;
    this.el = $container.firstChild;
    return this.el;
  }

}