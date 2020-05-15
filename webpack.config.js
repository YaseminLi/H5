const HtmlWebpackPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const path = require('path')
module.exports = {
    mode: 'development',
    entry: {
        index: './src/js/index.js'
    },
    output: {
        filename: '[name].[contenthash:8].js',
        path: path.resolve(__dirname, 'dist'),
        publicPath: ''
    },
    module: {
        rules: [{
            test: /\.css$/,
            use: ExtractTextPlugin.extract({//提取css文件
                fallback: 'style-loader',
                use: 'css-loader'
            })
        }]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html', //模板html
            chunks: ['index'], //多个入口时要选择的js文件
            title: '主页', //生成html文件的标题
            filename: 'index.html',
            inject: true, //script标签的位置 
            // favicon: './src/assets.favicon.png',
            minify: {
                removeComments: true, //移除注释
                collapseWhitespace: true
            }
        }),
        new ExtractTextPlugin({
            filename: '[name].[hash:8].css' //css存储路径，webpack4以上不支持，需要npm install --save-dev extract-text-webpack-plugin@next 
        })
    ],
    optimization: {
        minimizer: [
            new UglifyJsPlugin({
                parallel: true,//开启多线程，提高构建speed
                sourceMap: false,//错误消息位置映射到模块，会减慢编译速度，默认为false
                uglifyOptions:{//压缩选项，去除log???
                    compress:{
                        warning:false,
                        drop_console:true,
                        drop_debugger:true,
                        pure_funcs:['console.log']
                    }
                }
            })]
    },
    devServer: {
        port: 8080,
    }
}