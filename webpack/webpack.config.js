const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

console.log(path);

module.exports = {
  entry: './src/script/common.ts',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, '../dist'),
    publicPath: '/dist/'
  },
  devtool: 'none',
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: 'ts-loader',
        exclude: /node_modules/
      }
    ]
  },
  resolve: {
    extensions: ['.ts', '.js']
  },
  plugins: [new CleanWebpackPlugin()]
};
