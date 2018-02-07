const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const PATHS = {
    src:  path.resolve(__dirname, './src'),
    dist: path.resolve(__dirname, './dist')
}

module.exports = {
    context: PATHS.src,
    devtool: 'source-map',
    entry:   './app.js',
    output:  {
        path:     PATHS.dist,
        filename: '[name].bundle.js'
    },
    module:  {
        rules: [
            {
                test:    /\.js$/,
                exclude: /node_modules/,
                use:     [{
                    loader:  'babel-loader',
                    options: {
                        presets: [
                            'es2015',
                            'react'
                        ]
                    }
                }]
            },
            {
                test:    /\.scss$/,
                exclude: /node_modules/,
                use:     [
                    'style-loader',
                    'css-loader',
                    'sass-loader'
                ]
            },
            {
                test: /\.png$/,
                use:  [{
                    loader:  'url-loader',
                    options: {
                        mimetype: 'image/png',
                        limit:    10000
                    }
                }]
            }
        ]
    },
    resolve: {
        modules: [PATHS.src, 'node_modules']
    },
    plugins: [
        new HtmlWebpackPlugin({
            title:    'new project',
            template: './index.html',
            filename: 'index.html',
            inject:   'body',
            hash:     false,
            //   minify:   {
            //     removeComments: true,
            //     collapseWhitespace: true,
            //     removeAttributeQuotes: true
            // }
        })
    ]
}


