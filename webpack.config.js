const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const PATHS = {
    src:  path.resolve(__dirname, './src'),
    dist: path.resolve(__dirname, './dist')
}

module.exports = {
    devtool: 'source-map',
    entry:   PATHS.src + '/app.js',
    output:  {
        path:     PATHS.dist,
        filename: '[name].bundle.js'
    },
    module:  {
        rules: [
            {
                test:    /\.js$/,
                exclude: /node_modules/,
                use:     'babel-loader'
            },
            {
                test:    /\.scss$/,
                exclude: /node_modules/,
                use:     [
                    'style-loader',
                    'css-loader',
                    'sass-loader'
                ]
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            title:    'new project',
            template: PATHS.src + '/index.html',
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


// module.exports = {
//   entry: './src/assets/scripts/index.js',
//   output: {
//     filename: 'bundle.js',
//     path: outputPath
//   },
//   module: {
//     rules: [
//       { 
//         test: /\.js$/, 
//         exclude: /(node_modules|bower_components)/, 
//         use: {
//           loader: "babel-loader",
//           options: {
//             presets: ['env', 'stage-0'],
//           },
//         },
//       },
//     ]
//   }
// };

