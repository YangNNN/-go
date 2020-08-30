/**
 * @file 单图模板
 * @author yangshangman
 */

import Component from './component';

export default class SinglePic extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    const data = this.props
    const html = 
    `<div class="image-item single-image-item">
        <p class="image-item-title">${data.title}</p>
        <img class="image" src='${data.image}' />
      </div>
    `
    return html;
  }
  
}