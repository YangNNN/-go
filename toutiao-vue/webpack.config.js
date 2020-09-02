const path = require('path');
const fs = require('fs');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  mode: 'development',
  entry: __dirname + '/src/main.js',
  output: {
    path: __dirname + '/dist/'
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      },
      {
        test: /\.js$/,
        loader: 'babel-loader'
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: 'vue-style-loader'
          },
          {
            loader: 'style-loader'
          },
          {
            loader: 'css-loader'
          }
        ]
      }
    ]
  },
  plugins: [
    new VueLoaderPlugin(),
    new HtmlWebpackPlugin({
      template: './public/index.html'
    }),
    new MiniCssExtractPlugin()
  ],
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    compress: true,
    port: 9000,
    disableHostCheck: true,
    before: function (app, server) {
      app.get('/list', function (req, res) {
        const fileName = `./mock/list_${req.query.tab}.json`;
        const backupFileName = `./mock/list.json`;
        fs.exists(fileName, function (exists) {
          fs.readFile(exists ? fileName : backupFileName, function (err, content) {
            res.send(content);
          });
        });
      });

      app.get('/price', function (req, res) {
        res.send(JSON.stringify({
          infos: [
            { price: 23 * Math.random() },
            { price: 23 * Math.random() }
          ]
        }));
      });
    }
  }
}