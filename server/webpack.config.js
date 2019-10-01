  
const Path = require('path');
const Webpack = require('webpack');
const autoprefixer = require('autoprefixer');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  mode: process.env.NODE_ENV,
  devtool: 'source-map',
  entry: {
    entry: Path.join(__dirname, '/src/public/index.js'),
  },
  output: {
    path: Path.join(__dirname, '/build'),
    filename: 'public/index.js',
  },
  plugins: [
    new Webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
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
        test: /\.s?css$/i,
        use : [
          'style-loader',
          'css-loader',
        ]
      },
      {
        test:/\.(png|jpe?g|gif)$/i,
        loader: 'file-loader',
      }
    ]
  }
};