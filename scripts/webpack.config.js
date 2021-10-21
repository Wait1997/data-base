const { resolve } = require('path');
const { isDev } = require('./env');
const Webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: {
    main: resolve(__dirname, '../source/index.js')
  },
  output: {
    path: resolve(__dirname, '../build'),
    filename: '[name].[hash:5].js',
    clean: true
  },
  resolve: {
    extensions: ['.js', '.ts', '.json']
  },
  devtool: 'source-map',
  mode: isDev ? 'development' : 'production',
  devServer: {
    compress: true,
    host: 'localhost',
    port: 3000,
    open: true,
    hot: true
  },
  module: {
    rules: [
      {
        test: /\.(tsx?|js)$/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
            plugins: [['@babel/plugin-transform-runtime']]
          }
        },
        exclude: /node_modules/
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({ template: resolve(__dirname, '../public/index.html'), cache: false }),
    new Webpack.HotModuleReplacementPlugin()
  ]
};
