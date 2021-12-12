const HtmlWebpackPlugin = require('html-webpack-plugin'); // 生成 html plugin
const MiniCssExtractPlugin = require("mini-css-extract-plugin"); // 生成 css plugin
const path = require('path');

let mode = "development"; // 預設開發模式

if (process.env.NODE_ENV === "production") {
    mode = "production"; // 轉換生產模式
}

module.exports = {
    mode: mode, // 指定環境模式
    entry: {
        index: './src/index.js' // 可以指定任意 chunk 名稱
    },
    devtool: 'source-map', // js 的 source-map 功能，報錯會指到錯誤的檔案位置，並顯示原始碼
    devServer: {
        static: {
            directory: path.join(__dirname, 'dist/index'), // 指定 sever 路徑
        },
    },
    module: {
        rules: [
            {
                test: /\.(s[ac]|c)ss$/i, // sass、scss、css 都通用的正規表達式，bundle scss
                use: [
                    // 将 JS 字符串生成为 style 节点
                    // 'style-loader',
                    MiniCssExtractPlugin.loader, // 取代 style-loader，production 用
                    // 将 CSS 转化成 CommonJS 模块
                    'css-loader',
                    // 将 Sass 编译成 CSS
                    'sass-loader',
                    // postcss，直接編譯支援不同瀏覽器的 css，透過 package.json 內設定 browserslist，以及 postcss.config.js 內的 postcss-preset-env 
                    'postcss-loader'
                ],
            },
            {
                test: /\.(png|jpe?g|gif)$/i, // 透過 asset module，可以 bundle img
                type: 'asset/resource'
            },
            {
                test: /\.html$/i, // 讓 html 支援 bundle src 檔案
                loader: "html-loader",
            },
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            // title: '測試環境',
            template: './src/html/index.html' // 指定 template 路徑
        }),
        new MiniCssExtractPlugin({
            filename: '[name].[hash].css', // 生成 css 檔，並自動引入
        }),
    ],
    output: {
        filename: '[name].[hash].js', // 檔案名稱，[name] 是根據 entry 的 chunk
        path: path.resolve(__dirname, 'dist/index'), // 生成路徑
        assetModuleFilename: 'images/[hash][ext][query]', // 自定義 image 輸出，此為預設值
        clean: true // 輸出前清空目錄
    },
};