const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  mode: 'production',
  entry: __dirname + '/index.js',
  output: {
    path: __dirname + '/dist',
    filename: 'index.js'
  },
  devServer: {
    port: '8081',
    hot: true,
    open: true
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: __dirname + '/index.html'
    })
  ]
}