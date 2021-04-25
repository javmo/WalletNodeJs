const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const devMode = process.env.NODE_ENV !== 'production';

console.log(devMode)

module.exports = {
    entry: {
        index: './frontend/app.js',
        panel: './frontend/panel.js',
        songbook: './frontend/songbook.js',
        categoryabm: './frontend/categoryabm.js',
        scrapingpanel: './frontend/scrapingpanel.js'
    },

    output: {
        path: path.join(__dirname, 'backend/public'),
        filename: 'js/[name].bundle.js'
    },
    /*mode: 'development',*/

    module: {
        rules: [
            {
                test: /\.css/,
                use: [
                    devMode ? 'style-loader' : MiniCssExtractPlugin.loader,
                    'css-loader'
                ]
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './frontend/index.html',
            filename: 'index.html',
            chunks: ['index']
        }),
        new MiniCssExtractPlugin({
            filename: 'css/bundle.css'
        }),
        new HtmlWebpackPlugin({
            template: './frontend/panel.html',
            filename: 'panel.html',
            chunks: ['panel']
        }),
        new HtmlWebpackPlugin({
            template: './frontend/songbook.html',
            filename: 'songbook.html',
            chunks: ['songbook']
        }),
        new HtmlWebpackPlugin({
            template: './frontend/categoryabm.html',
            filename: 'categoryabm.html',
            chunks: ['categoryabm']
        }),
        new HtmlWebpackPlugin({
            template: './frontend/scrapingpanel.html',
            filename: 'scrapingpanel.html',
            chunks: ['scrapingpanel']
        })
    ],
    devtool: 'source-map'
};