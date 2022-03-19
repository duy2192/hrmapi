const path =require("path")
const nodeExternals =require('webpack-node-externals')
const CopyPlugin =require("copy-webpack-plugin")
const webpack = require('webpack'); // only add this if you don't have yet
require('dotenv').config({ path: './.env' }); 
module.exports ={
  mode: 'production',
  entry: './src/index.ts',
  devtool: 'inline-source-map',
  performance: {
    hints: false,
    maxEntrypointSize: 512000,
    maxAssetSize: 512000
},
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
    ],
  },
  resolve: {
    extensions: ['.ts', '.js'],
    fallback: {
      "fs": false,
      "tls": false,
      "net": false,
      "path": require.resolve("path-browserify"),
      "zlib": false,
      "http": false,
      "https": false,
      "stream": false,
      "crypto": require.resolve("crypto-browserify"),
      } ,
  },
  output: {
    filename: 'bundle.js',
    publicPath: '/',
    path: path.resolve(__dirname, 'build'),
  },
  optimization: { minimize: false },
  externals: [nodeExternals()],
  plugins: [
    new CopyPlugin({
      patterns: [{ from: 'src/assets', to: 'assets' }],
    }),
    // new webpack.DefinePlugin({
    //   "process.env": JSON.stringify(process.env)
    // }),
  ], 
}; 
