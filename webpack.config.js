var webpack = require('webpack');
var path = require('path');
var extractTextPlugin = require('extract-text-webpack-plugin');

var config = {
    entry: {
        app: path.join(__dirname, 'src', 'app.js'),
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                include: path.join(__dirname, 'src'),
                loader: 'babel-loader',
                query: {
                    presets: ['es2015','react']
                }
            },{
                test: /\.scss$/,
                include: path.join(__dirname, 'src'),
                loader: extractTextPlugin.extract('style','css!sass')
                //loaders: ['style','css']
            }
        ]
    },
    plugins: [
        new extractTextPlugin('app.css')
    ],
    output: {
        path: path.join(__dirname, 'dist'),
        filename: "app.js"
    },
    devServer: {
        historyApiFallback: true,
        inline: true
        //port: 8081
    }
};

module.exports = config;