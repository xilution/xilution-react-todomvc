const path = require('path');

const webpack = require('webpack');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = (env) => ({
    entry: ['babel-polyfill', './src/client/index.js'],
    module: {
        rules: [
            {
                exclude: /node_modules/,
                test: /\.js$/,
                use: {
                    loader: 'babel-loader'
                }
            },
            {
                test: /\.html$/,
                use: [
                    {
                        loader: 'html-loader',
                        options: {
                            minimize: true
                        }
                    }
                ]
            },
            {
                test: /\.css$/,
                use: [MiniCssExtractPlugin.loader, 'css-loader']
            }
        ]
    },
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist/client')
    },
    plugins: [
        new HtmlWebPackPlugin({
            filename: './index.html',
            template: './public/index.html'
        }),
        new MiniCssExtractPlugin({
            chunkFilename: '[id].css',
            filename: '[name].css'
        }),
        new webpack.DefinePlugin({
            TODOMVC_SERVER_URL: JSON.stringify(env.TODOMVC_SERVER_URL)
        })
    ]
});
