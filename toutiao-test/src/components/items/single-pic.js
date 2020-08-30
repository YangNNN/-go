/**
 * @file 单图模板
 * @author yangshangman
 */

import Component from './component';

export default class SinglePic extends Component {
  constructor(props) {
    super(props)
  }

  render($el) {
    const data = this.props
    const html = `
      <div class="item flex-between">
        <p>${data.title}</p>
        <img src='${data.image}' />
      </div>
    `
    this._constructElement($el, html);
  }
  
}