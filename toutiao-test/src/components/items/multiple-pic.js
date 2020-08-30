/**
 * @file 多图模板
 * @author yangshangman
 */

import Component from './component';

export default class MultiplePic extends Component {
  constructor(props) {
    super(props)
  }

  render($el) {

    const data = this.props
    const html = `
      <div class="item">
        <p>${data.title}</p>
        ${data.image_list.map(image => {
          return `<img src=${image.url} />`
        }).join('')}
      </div>
    `
    this._constructElement($el, html);
  }
  
}