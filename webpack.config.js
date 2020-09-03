const path = require("path");
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

require("@babel/register");

module.exports = (env) => {
    return {
        entry: ["@babel/polyfill", "./src/index.js"],
        output: {
            path: __dirname + "/public",
            filename: "bundle.js",
        },
        module: {
            rules: [
                {
                    test: /\.js$/,
                    exclude: /node_modules/,
                    use: ["babel-loader"],
                },
                {
                    test: /\.css$/,
                    use: [{
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                         publicPath: path.join(__dirname, 'public')
                        },
                       }, 'css-loader'
                       ],
                },
                {
                    test: /\.(png|jpg|svg)$/,
                    loader: 'url-loader'
                },
                {
                    test: /\.html$/,
                    use: [
                        {
                            loader: "html-loader",
                        },
                    ],
                },
            ],
        },
        mode: env ? 'production' : 'development',
        plugins: [
            new MiniCssExtractPlugin({
            filename: 'main.css',
            chunkFilename: 'main.css',
           })],
        resolve: {
            modules: [path.resolve("./src"), path.resolve("./node_modules")],
        },
        devServer: {
            contentBase: __dirname + "/public",
            compress: true,
            port: 9000,
            open: true,
            stats: {
                assets: false,
                children: false,
                chunks: false,
                chunkModules: false,
                colors: true,
                entrypoints: true,
                hash: false,
                modules: false,
                timings: false,
                version: false,
            },
        },
        watch: false,
        devtool: "source-map",
    }
};
