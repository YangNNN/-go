/**
 * @file 基类 负责生成dom节点
 * @author yangshangman
 */

export default class Component {
  constructor(props) {
    this.props = props;
  }

  _constructElement(root, html) {
    const wrap = document.createElement('div');
    const wrapOuter = document.createElement('div');
    wrapOuter.appendChild(wrap);
    wrap.innerHTML = html;
    root.appendChild(wrapOuter.firstChild);
  }

}