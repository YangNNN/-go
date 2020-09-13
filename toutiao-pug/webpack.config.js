const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  mode: 'development',
  entry: path.resolve(__dirname, 'src/index'),
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js'
  },
  devServer: {
    contentBase: './dist'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: 'babel-loader'
      },
      {
        test: /\.pug$/,
        loaders: [
          'html-loader',
          {
            loader: 'pug-html-loader',
            options: {
              data: {
                tabs: [
                  { id: 1, text: '推荐', active: true },
                  { id: 2, text: '视频' },
                  { id: 3, text: '热点' },
                  { id: 4, text: '社会' }
                ],
                articles: [
                  { id: 1, text: '文字1' },
                  { id: 2, text: '文字2' },
                  { id: 3, text: '文字3' },
                  { id: 4, text: '文字4' }
                ]
              }
            }
          }
        ]
      },
      {
        test: /\.s[ac]ss$/,
        loaders: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'sass-loader'
        ]
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'src', 'index.pug'),
      filename: './index.html'
    }),
    new MiniCssExtractPlugin({
      entry: path.resolve('src', 'style', 'main.scss'),
      filename: '[name].css'
    })
  ],
  devServer: {
    before(app) {
      app.get('/tab', function(req, res) {
        res.json('1')
      })
    }
  }
}