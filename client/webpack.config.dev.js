const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const dotEnv = require('dotenv-webpack');

module.exports = {
  mode: 'development',
  entry: './src/index.tsx',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'build'),
  },
  module: {
    rules: [
      {
        test: /\.(ts|js)x?$/i,
        use: ['babel-loader', 'ts-loader'],
        exclude: /node_modules/,
      },
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
  },

  plugins: [
    new HtmlWebpackPlugin({
      title: 'Development',
      template: './public/index.html',
      filename: 'index.html',
      inject: 'body',
    }),
    new dotEnv()],

  devServer: {
    open: true,
    host: 'localhost',
    historyApiFallback: true,
    hot: true,
  },
  devtool: 'inline-source-map',

};
