const path = require('path');
const entryFile = path.resolve(__dirname, 'client', 'src', 'index.js');
const outputDir = path.resolve(__dirname, 'client', 'dist');

const webpack = require('webpack');
const dotenv = require('dotenv');

module.exports = () => {
  const env = dotenv.config().parsed;

  // reduce it to a nice object, the same as before
  const envKeys = Object.keys(env).reduce((prev, next) => {
    prev[`process.env.${next}`] = JSON.stringify(env[next]);
    return prev;
  }, {});

  return {
    entry: ['@babel/polyfill', entryFile],
    output: {
      publicPath:"/",
      filename: 'bundle.js',
      path: outputDir
    },
    module: {
      rules: [

        {
          test: /\.(js|jsx)$/,
          loader: 'babel-loader',
          exclude: /node_modules/
        },
        {
          test: /\.(scss|css)$/,
          use: [
            {
              loader: 'style-loader'
            },
            {
              loader: 'css-loader',
            }
          ]
        }
      ]
    },
    plugins: [
      new webpack.HotModuleReplacementPlugin(),
      new webpack.DefinePlugin(envKeys)
    ],
    devServer: {
      contentBase: './client/dist',
      hot: true,
      proxy: {
        '/api': 'http://localhost:3000',
        '/manage': 'http://localhost:3000',
        '/search': 'http://localhost:3000',
        '/socket.io/*': {
          target: 'http://localhost:3000',
          ws: true
        },
      }
    }
  };
}
