const path = require('path');
const HTMLPlugin = require('html-webpack-plugin');
const WorkerPlugin = require('worker-plugin');

module.exports = {
  modules: {
    rules: [
      {
        test: /\.tsx?$/,
        use: {
          loader: 'ts-loader',
          options: {
            traspileOnly: true,
          },
        },
      },
      {
        test: /\css$/i,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.ts', '.tsx', '.json', '.mjs'],
  },
  plugins: [
    new HTMLPlugin({
      template: path.join(__dirname, 'src/index.html'),
    }),
    new WorkerPlugin(),
  ],
};
