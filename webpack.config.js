const HtmlWebpackPlugin = require('html-webpack-plugin'); // 生成 html plugin
const MiniCssExtractPlugin = require("mini-css-extract-plugin"); // 生成 css plugin
const path = require('path');

module.exports = {
    mode: 'development', // 另一個 mode: 'production' 是生產環境
    entry: {
        index: './src/index.js' // 可以指定任意 chunk 名稱
    },
    devtool: 'source-map', // js 的 source-map 功能，報錯會指到錯誤的檔案位置，並顯示原始碼
    devServer: {
        static: {
            directory: path.join(__dirname, 'dist/index'),
        },
    },
    module: {
        rules: [
            {
                test: /\.(s[ac]|c)ss$/i, // sass、scss、css 都通用的正規表達式
                use: [
                    // 将 JS 字符串生成为 style 节点
                    // 'style-loader',
                    MiniCssExtractPlugin.loader,
                    // 将 CSS 转化成 CommonJS 模块
                    'css-loader',
                    // 将 Sass 编译成 CSS
                    'sass-loader',
                    // postcss
                    'postcss-loader'
                ],
            },
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            // title: '測試環境',
            template: './src/html/index.html' // 指定 template 路徑
        }),
        new MiniCssExtractPlugin({
            filename: '[name].[hash].css',
        }),
    ],
    output: {
        filename: '[name].[hash].js', // 檔案名稱，[name] 是根據 entry 的 chunk
        path: path.resolve(__dirname, 'dist/index'), // 生成路徑
        clean: true // 輸出前清空目錄
    },
};