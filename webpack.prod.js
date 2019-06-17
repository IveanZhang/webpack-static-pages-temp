const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const buildPath = path.resolve(__dirname, 'dist');

module.exports = {

    // This option controls if and how source maps are generated.
    // https://webpack.js.org/configuration/devtool/
    devtool: 'source-map',

    // https://webpack.js.org/concepts/entry-points/#multi-page-application
    entry: {
        common: './src/common/common.js'
    },

    // how to write the compiled files to disk
    // https://webpack.js.org/concepts/output/
    output: {
        filename: 'js/[name].[hash:20].js',
        path: buildPath
    },

    // https://webpack.js.org/concepts/loaders/
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
                options: {
                    presets: ['@babel/preset-env']
                }
            },
            {
                test: /\.css$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    "css-loader"
                ]
            },
            {
                // Load all images as base64 encoding if they are smaller than 8192 bytes
                test: /\.(png|jpg|gif|svg)$/,
                use: [
                  {
                    loader: 'url-loader',
                    options: {
                      name: '[name].[hash:20].[ext]',
                      limit: 8192
                    }
                  }
                ]
            }
        ]
    },

    // https://webpack.js.org/concepts/plugins/
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index/index.html',
            inject: 'body',
            chunks: ['common'],
            filename: 'index.html'
        }),
        new MiniCssExtractPlugin({
            filename: "css/[name].[contenthash].css",
            chunkFilename: "[id].[contenthash].css"
        })
    ],

    // https://webpack.js.org/configuration/optimization/
    optimization: {
        minimizer: [
            new UglifyJsPlugin({
                cache: true,
                parallel: true,
                sourceMap: true
            }),
            new OptimizeCssAssetsPlugin({})
        ]
    }
};
