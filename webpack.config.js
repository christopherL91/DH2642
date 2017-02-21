'use strict';

const path = require('path');
const webpack = require('webpack');

module.exports = {
    entry: './src/index.js',
    output: {
        filename: 'index.js',
        publicPath: '/build',
        path: path.resolve(__dirname, 'build'),
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                loader: 'babel-loader',
                query: {
                    plugins: ['transform-runtime'],
                },
            },
        ]
    },
    devtool: 'cheap-module-source-map',
    //context: path.resolve(__dirname, 'src'),
    devServer: {
        port: 8080,
        host: '0.0.0.0',
        inline: true,
        hot: true,
        publicPath: '/build',
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('production')
        }),
    ],
};
