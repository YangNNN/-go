
Page({
  template:`
    <div>{{ message }}</div>
  `,
  data: {
    message: 'hello'
  },
  onLoad() {
    console.log('index onLoad')

    setTimeout(() => {
      wx.navigateTo('pages/log/log')
    }, 1000);

  },
  onShow() {
    console.log('onShow')
  }
})