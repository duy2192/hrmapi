const path =require("path")
const nodeExternals =require('webpack-node-externals')
const CopyPlugin =require("copy-webpack-plugin")
const webpack = require('webpack'); // only add this if you don't have yet
require('dotenv').config({ path: './.env' }); 
module.exports ={
  mode: 'development',
  entry: './src/index.ts',
  devtool: 'inline-source-map',
  node: {
    __dirname: true,
    __filename: true,
  },
  
  target: ['web', 'es5'],
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: [
          "ts-loader"

        ],
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: /\.json$/,
        use: ['webpack-json-access-optimizer'],
        type: 'json',
      },
    ],
  },
  resolve: {
    extensions: ['.ts', '.js', '.json'],
    fallback: {
      "fs": false,
      "tls": false,
      "net": false,
      "path": require.resolve("path-browserify"),
      "zlib": false,
      "http": false,
      "https": false,
      "stream": false,
      "crypto": false,
      } ,
  },
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'build'),
  },
  externals: [nodeExternals()],
  plugins: [
    new CopyPlugin({
      patterns: [{ from: 'public', to: 'public' }],
    }),
    new webpack.DefinePlugin({
      "process.env": JSON.stringify(process.env)
    }),
  ],
};
