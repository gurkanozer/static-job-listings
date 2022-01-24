const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin').default;
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    mode: "development",
    entry:{
        main:"./src/app.js"
    },
    output:{
        filename:"[name].bundle.js",
        path:path.resolve(__dirname,"dist"),
        clean:true
    },
    devtool: "inline-source-map",
    devServer: {
        contentBase: "./dist"
    },
    plugins:[
        new MiniCssExtractPlugin(),
        new HtmlWebpackPlugin({
            template:"./src/index.html"
        })
    ],
    module:{
        rules:[
            {
                test:/\.css$/i,
                use:[MiniCssExtractPlugin.loader, "css-loader"]
            }
        ]
    }
}