  
const Path = require('path');
const Webpack = require('webpack');
const autoprefixer = require('autoprefixer');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  mode: 'production',
  devtool: 'source-map',
  entry: {
    entry: Path.join(__dirname, '/src/public/cabinet.js'),
  },
  output: {
    path: Path.join(__dirname, '/build'),
    filename: 'public/cabinet.js',
  },
  plugins: [
    new Webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production')
    }),
    new Webpack.optimize.ModuleConcatenationPlugin(),
    new MiniCssExtractPlugin({
      path: Path.join(__dirname, '/build'),
      filename: 'public/style.css'
    })
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: 'babel-loader'
      },
      {
        test: /\.css$/,
        use : [
          'style-loader',
          'css-loader',
        ]
      }
    ]
  }
};