var path = require('path');
var webpack=require('webpack');
var node_modules = path.resolve(__dirname, 'node_modules');
var CleanWebpackPlugin = require('clean-webpack-plugin');
var HtmlwebpackPlugin = require('html-webpack-plugin');
var CommonsChunkPlugin = webpack.optimize.CommonsChunkPlugin;

var ROOT_PATH = path.resolve(__dirname);
var BUILD_PATH = path.resolve(ROOT_PATH, 'build');
module.exports = {
    entry: {
        vendor:['react','react-dom'],
        app:path.resolve(__dirname, './app/components/test1.jsx')
    },

    output: {
        path: path.resolve(__dirname, './build'),
        filename: '[name]-bundle.js'
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)?$/,//loader规则匹配js和jsx文件
                exclude:node_modules,//不编译的文件夹
                use: [                      //use的值是一个数组，它里面存放了我们处理test匹配到的文件需要加载的loader和loader的配置
                    {
                        loader: "babel-loader" ,       //这个就是需要加载loader的名字
                        options: {
                            cacheDirectory: true,//默认目录文件建立缓存
                            cacheIdentifier:Infinity//
                        }
                    }
                ]
            },
            { test: /\.css$/, loader: "style!css"},

            { test: /\.(png|jpg)$/, loader: 'url?limit=8192'}
        ]
    },
    // 开启dev source map
    devtool: 'inline-source-map',
    // 开启 webpack dev server热启动
    devServer: {
        historyApiFallback: true,//路径自动跳到index.html(传对象，可以做路由跳转)
        hot: true,//是否热替换特性
        inline: true,//devserver两种模式inline和iframe
        port: 8080,//端口号
        contentBase: './build',//服务器从哪里提供内容

        //不常用config
        // color:true,//文件多色
        // compress:false,//服务是否压缩
        // disableHostCheck: true,//不做host检查
        // host:"localhost",//默认是localhost,可以自定义host
        // https:false,//是否启用带有https的http2.0，默认fasle,
        // info:false,//输出cli信息，默认false
        // open:true,//直接打开web页面,同CLI
        // proxy: {//代理服务器请求
        //     "/api": {
        //         target: "http://localhost:3000",
        //         pathRewrite: {"^/api" : ""}
        //      }
        // },
        // watchOption:{//watch模式
        //     aggregateTimeout: 300,//重构前的延迟
        //     poll: 1000//轮询间隔
        // },
        // allowedHosts:[//host名单
        //     'lxl.com',
        //     'lixl.com'
        // ]
    },
    // 配置plugin
    plugins: [
        new CleanWebpackPlugin(['build']),
        //模块热替换
        new webpack.HotModuleReplacementPlugin(),
        //自动生成处理后的html
        new HtmlwebpackPlugin({
            title: 'react-webpack-demo',//标题对应的模板html，要拿title属性（<%= htmlWebpackPlugin.options.title %>）
            filename: 'index.html',//生成文件名
            template:'./index.html',//模板html路径
            inject:'body',//是否注入和注入的位置（body,head）
            hash:true,//新文件加hash值
            cache:true,//文件有变化才生成新的
            // minify: {//是否压缩
            //     removeAttributeQuotes: true // 移除属性的引号
            // }
        }),
        new CommonsChunkPlugin({//提取公共代码和重复引用代码
            name:["common","vendor","load"],
            minChunks:Infinity
        })
    ]
};
