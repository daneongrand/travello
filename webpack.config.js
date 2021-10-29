const webpack = require('webpack')
const path = require('path')
const HTMLWebpackPLugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')

const isDev = process.env.NODE_ENV === 'development'
const isProd = !isDev

console.log('isDev', isDev)
console.log('isProd', isProd)



const filename = ext => isDev ? `[name].${ext}` : `[name].[hash].${ext}`

const addPlugins = () => {
    const plugins = [
        new HTMLWebpackPLugin({
            template: './index.html',
            minify: isProd
        }),
        new CleanWebpackPlugin(),
        new MiniCssExtractPlugin({
            filename: filename('css')
        }),
        new CopyWebpackPlugin({
            patterns: [
                {
                    from: path.resolve(__dirname, 'src/img'),
                    to: path.resolve(__dirname, 'dist/img')
                }
            ]
        })
    ]

    if (isDev) plugins.push(new webpack.HotModuleReplacementPlugin())

    console.log(plugins)
    return plugins
}

const addCssLoaders = extra => {
    const cssLoaders = [
        {
            loader: MiniCssExtractPlugin.loader,
            options: {
                publicPath: '.'
            }
        },
        'css-loader'
    ]

    if (extra) {
        cssLoaders[1] = 'css-loader?url=false'
        cssLoaders.push(extra)
    }
    return cssLoaders
}

const optimization = () => {
    return {
        splitChunks: {
            chunks: 'all'
        }
    }
}

module.exports = {
    context: path.resolve(__dirname, 'src'),
    mode: 'development',


    entry: {
        index: './index.js'
    },

    devServer: {
        port: 4200,
        liveReload: true
    },

    output: {
        filename: filename('js'),
        path: path.resolve(__dirname, 'dist')
    },

    resolve: {
        extensions: ['.js', '.sass'],
        alias: {
            '@img': path.resolve(__dirname, 'src/img'),
            '@sass': path.resolve(__dirname, 'src/sass'),
            '@js': path.resolve(__dirname, 'src/js'),
            '@': path.resolve(__dirname, 'src')
        }
    },

    optimization: optimization(),

    plugins: addPlugins(),

    module: {
        rules: [
            {
                test: /\.css$/,
                use: addCssLoaders()
            },
            {
                test: /\.s[ac]ss$/,
                use: [MiniCssExtractPlugin.loader, 'css-loader', 'resolve-url-loader', {
                    loader: 'sass-loader',
                    options: {
                        sourceMap: true
                    }
                }]
            }
        ]
    }
}