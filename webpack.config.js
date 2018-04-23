const path = require('path');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

module.exports = {
  devtool: "source-map",
  entry: './assets/javascripts/main.js',
  output: {
    path: path.resolve(__dirname, 'public/javascripts/'),
    filename: 'bundle.js',
    sourceMapFilename: '../maps/bundle.js.map'
  },
  externals: [
    {
      lodash: {
        root: '_',
        commonjs: 'lodash',
        commonjs2: 'lodash',
        amd: 'lodash',
      },
    },
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: ['babel-loader']
      }
    ]
  },
  plugins: [
    new UglifyJsPlugin({
      sourceMap: true,
      uglifyOptions: {
        output: {
          comments: false
        }
      }
    })
  ]
};
