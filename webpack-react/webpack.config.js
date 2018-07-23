const path = require('path')

const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
    entry: './src/index.js',
    output: {
        filename: 'main.js',
        path: path.resolve('dist')
    },
    devServer: {
        contentBase: './dist',
        port: 3000,
        open: true
    },
    devtool: 'inline-source-map',
    module: {
        rules: [
            {
                test: /\.(gif|png|svg|jpg)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: 'static/images/[name].[hash:8].[ext]'
                        }
                    }
                ]
            },
            {
                test: /\.styl$/,
                use: [
                    'style-loader', MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader', 'stylus-loader'
                ]
            },
            {
                test: /\.js$/,
                include: /src/,
                exclude: /node_modules/,
                use: [
                    'babel-loader'
                ]
            }
        ]
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: '[name].[chunkhash:8].css',
            chunkFilename: '[id].css'
        }),
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, './public/index.html')
        })
    ]
}