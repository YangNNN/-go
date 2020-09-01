const path = require('path');
const fs = require('fs');

const resolveFile = (filename) => {
  return fs.readFileSync(path.resolve(__dirname, 'mock', filename + '.json'))
}

module.exports = {
  mode: 'production',
  entry: __dirname + '/src/index.js',
  output: {
    path: __dirname + '/dist/',
    filename: 'index.js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      }
    ]
  },
  devServer: function(app) {
    app.get('/list', function(res) {
      res.json({
        data: resolveFile('lists')
      })
    })
    app.get('/all', function(res) {
      res.json({
        data: resolveFile('list___all__')
      })
    })
    app.get('/agriculture', function(res) {
      res.json({
        data: resolveFile('list_agriculture')
      })
    })
  }
}