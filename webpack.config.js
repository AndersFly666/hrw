const { resolve } = require('path');
const webpack = require('webpack')

module.exports = {
  entry: [
    //'react-hot-loader/patch',
    // activate HMR for React

    'webpack-dev-server/client?http://localhost:8080',
    // bundle the client for webpack-dev-server
    // and connect to the provided endpoint

    'webpack/hot/only-dev-server',
    // bundle the client for hot reloading
    // only- means to only hot reload for successful updates


    './index.js'
    // the entry point of our app
  ],
  output: {
    filename: 'bundle.js',
    path: resolve(__dirname, 'dist'),
    publicPath: '/'
    // necessary for HMR to know where to load the hot update chunks
  },
  context: resolve(__dirname, 'src'),

  devServer: {
    hot: true,

    contentBase: resolve(__dirname, 'dist'),

    publicPath: '/'
  },

  module: {
    rules: [
      {
        test: /\.js?$/,
        use: [
          'react-hot-loader',
          'babel-loader',
        ],
        exclude: /node_modules/
      } 
    ],
  },

  plugins: [
    new webpack.HotModuleReplacementPlugin(),
  ],
};