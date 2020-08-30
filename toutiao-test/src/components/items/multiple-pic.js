/**
 * @file 多图模板
 * @author yangshangman
 */

import Component from './component';

export default class MultiplePic extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    const data = this.props
    const html = 
    `<div class="image-item multiple-image-item">
        <p class="image-item-title">${data.title}</p>
        ${data.image_list.map(image => {
          return `<img class="image" src="${image.url}" />`
        }).join('')}
      </div>
    `
    console.log(html)
    return html;
  }
  
}