const autoprefixer = require("autoprefixer");
const ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
  entry: ["babel-polyfill", "./src/js/index.js"],
  output: {
    path: "demo/",
    filename: "bundle.js",
    publicPath: ""
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: "babel",
        exclude: /node_modules/,
        query: {
          presets: ["es2015", "stage-0", "react"]
        }
      },
      {
        test: /\.less$/,
        loader: ExtractTextPlugin.extract("css!postcss!less")
      },
      {test: /\.woff(\?v=\d+\.\d+\.\d+)?$/, loader: "url?limit=10000&mimetype=application/font-woff"},
      {test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/, loader: "url?limit=10000&mimetype=application/font-woff"},
      {test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/, loader: "url?limit=10000&mimetype=application/octet-stream"},
      {test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, loader: "file"},
      {test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, loader: "url?limit=10000&mimetype=image/svg+xml"},
      {test: /\.ico$/, loader: "file"}
    ]
  },
  postcss: function () {
    return [autoprefixer];
  },
  plugins: [
    new ExtractTextPlugin("bundle.css")
  ],
  devServer: {
    historyApiFallback: true
  }
};
