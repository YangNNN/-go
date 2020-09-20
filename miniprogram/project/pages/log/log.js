
Page({
  template:`
    <div>{{ log }}</div>
  `,
  data: {
    log: 'log'
  },
  onLoad() {
    console.log('log onLoad')
    console.log(this.data)
  },
  onShow() {
    console.log('onShow')
  }
})