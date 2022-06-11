const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");
const webpack = require("webpack");
const dotenv = require("dotenv");
const CopyPlugin = require("copy-webpack-plugin");
const BundleAnalyzerPlugin = require("webpack-bundle-analyzer")
  .BundleAnalyzerPlugin;
const CompressionPlugin = require("compression-webpack-plugin");
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const WorkboxPlugin = require("workbox-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
module.exports = {
  entry: path.resolve(__dirname, "..", "./src/index.js"),
  output: {
    filename: "[name].js",
    path: path.resolve(__dirname, "..", "./dist"),
    chunkFilename: "[id].[chunkhash].js",
  },
  optimization: {
    sideEffects: false, 
    splitChunks: {
      cacheGroups: {
        vendors: {
          test: /[\\/]node_modules[\\/]/, ///< put all used node_modules modules in this chunk
          name: "vendor", ///< name of bundle
          chunks: "all", ///< type of code to put in this bundle
        },
        common: {
          test: /[\\/]src[\\/]components[\\/]/,
          chunks: "all",
          minSize: 0,
        },
      },
    },
    runtimeChunk: {
      name: "manifest",
    },
    minimizer: [
      new UglifyJsPlugin({
        // minify js file
        cache: true,
        parallel: true,
        sourceMap: false,
        extractComments: "all",
        uglifyOptions: {
          compress: true,
          output: null,
        },
      }),
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "..", "./src/index.html"),
    }),
    new webpack.ProvidePlugin({
      process: "process/browser",
    }),
    new webpack.DefinePlugin({
      "process.env": JSON.stringify(dotenv.config().parsed), // it will automatically pick up key values from .env file
    }),
    new BundleAnalyzerPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new CopyPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, "..", "./src/assets"),
          to: path.resolve(__dirname, "..", "./dist/assets"),
        },
        {
          from: path.resolve(__dirname, "..", "./src/assets/robots.txt"),
          to: path.resolve(__dirname, "..", "./dist"),
        },
        {
          from: path.resolve(__dirname, "..", "./src/assets/manifest.json"),
          to: path.resolve(__dirname, "..", "./dist"),
        },
        {
          from: path.resolve(__dirname, "..", "./src/assets/favicon.ico"),
          to: path.resolve(__dirname, "..", "./dist"),
        },
        {
          from: path.resolve(__dirname, "..", "./src/assets/logo32.png"),
          to: path.resolve(__dirname, "..", "./dist"),
        },
        {
          from: path.resolve(__dirname, "..", "./src/assets/logo192.png"),
          to: path.resolve(__dirname, "..", "./dist"),
        },
      ],
    }),
    new WorkboxPlugin.GenerateSW({
      // these options encourage the ServiceWorkers to get in there fast
      // and not allow any straggling "old" SWs to hang around
      clientsClaim: true,
      skipWaiting: true,
    }),

    new UglifyJsPlugin({
      uglifyOptions: {
        compress: {
          drop_console: true,
        },
      },
    }),
    new webpack.ProgressPlugin(),
    new CleanWebpackPlugin(),
  ],
  devServer: {
    port: 8070,
    inline: true,
    historyApiFallback: true,
    contentBase: "./",
    hot: true,
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)?$/,
        exclude: /node_modules/,
        loader: "babel-loader",
      },
      {
        test: /\.css$/,

        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.(jpe?g|png|gif|svg|webp|ico)$/i,
        loader: "file-loader",
      },
      {
        test: /\.(png|gif|woff|woff2|eot|ttf|svg)$/,
        loader: 'url-loader',
      },
      {
        test: /\.html$/i,
        use: [
          {
            loader: "html-loader",
          },
        ],
      },
      {
        test: /\.webm$/,
        use: 'file-loader?name=videos/[name].[ext]',
 },
    ],
  },

  ///devtool: "inline-source-map",
  resolve: {
    extensions: [".js", ".jsx", ".css", ".json"],
  },
};
