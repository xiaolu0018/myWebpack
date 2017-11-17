var path = require('path');
var webpack=require('webpack');
var node_modules = path.resolve(__dirname, 'node_modules');
var HtmlwebpackPlugin = require('html-webpack-plugin');

var ROOT_PATH = path.resolve(__dirname);
var SRC_PATH = path.resolve(ROOT_PATH, 'build');
var BUILD_PATH = path.resolve(ROOT_PATH, 'app');
module.exports = {
    entry: [path.resolve(__dirname, './app/components/components.jsx')],

    output: {
        path: path.resolve(__dirname, './build'),
        filename: 'bundle-[hash:5].js'
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)?$/,//loader规则匹配js和jsx文件
                exclude: [               //exclude表示的是不用匹配的文件夹
                    path.resolve(__dirname, "node_modules")
                ],
                use: [                      //use的值是一个数组，它里面存放了我们处理test匹配到的文件需要加载的loader和loader的配置
                    {
                        loader: "babel-loader"        //这个就是需要加载loader的名字

                    }
                ]
            },
            { test: /\.css$/, loader: "style!css"},

            { test: /\.(png|jpg)$/, loader: 'url?limit=8192'}
        ]
    },
    // 开启dev source map
    devtool: 'eval-source-map',
    // 开启 webpack dev server热启动
    devServer: {
        historyApiFallback: true,
        hot: true,
        inline: true
        //progress: true
    },
    // 配置plugin
    plugins: [
        //模块热替换
        new webpack.HotModuleReplacementPlugin(),
        //自动生成处理后的html
        new HtmlwebpackPlugin({
            title: 'react-webpack-demo',
            filename: 'index.html',
            template: path.resolve(SRC_PATH,'index.html'),//文档路径
            minify: {
                removeComments: true,
                collapseWhitespace: true,
                removeRedundantAttributes: true,
                removeScriptTypeAttributes: true,
                removeStyleLinkTypeAttributes: true,
                removeAttributeQuotes: true
            }
        })
    ]
};
