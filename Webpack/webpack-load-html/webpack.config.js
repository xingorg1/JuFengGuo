const webpack = require("webpack"),
    path = require("path"),

    {CleanWebpackPlugin} = require("clean-webpack-plugin"),
    HtmlWebpackPlugin = require("html-webpack-plugin"),
    CopyPlugin = require("copy-webpack-plugin"),

    MiniCssExtractPlugin = require("mini-css-extract-plugin"),

    TerserPlugin = require("terser-webpack-plugin"),

    OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin"),
    PurgeCss = require("purgecss-webpack-plugin"),
    globAll = require("glob-all"),

    WebpackBundleAnalyzer = require("webpack-bundle-analyzer").BundleAnalyzerPlugin,
    CompressionWebpackPlugin = require("compression-webpack-plugin"),

    htmlPath = path.resolve(__dirname, "public/index.html"),
    srcPath = path.resolve(__dirname, "src"),
    paths = globAll.sync([
        `${srcPath}**/*.js`,
        `${htmlPath}`
    ]);

module.exports = {
    mode: "development",
    devtool: "source-map",
    entry: {
        main: "./src/index.js"
    },
    output: {
        filename: "js/[name].[hash:5].js",
        path: path.resolve(__dirname, "dist"),
        // publicPath: "/"
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                include: [
                    path.resolve(__dirname, "src/assets/css/")
                ],
                use: [MiniCssExtractPlugin.loader, {
                    loader: "css-loader",
                    options: {
                        modules: {
                            localIdentName: "[name]-[hash:5]"
                        }
                    }
                }]
            },
            {
                test: /.less$/,
                include: [
                    path.resolve(__dirname, "src/assets/css/")
                ],
                use: [MiniCssExtractPlugin.loader, "css-loader?modules", "less-loader"]
            },
            {
                test: /\.(jpe?g)|(png)|(gif)$/,
                exclude: [
                    path.resolve(__dirname, "node_modules/")
                ],
                use: ["file-loader"]
            },
            {
                test: /\.js$/,
                exclude: [
                    path.resolve(__dirname, "node_modules/lodash")
                ],
                use: ["babel-loader"]
            }
        ]
    },
    plugins: [
        new CleanWebpackPlugin({
            cleanOnceBeforeBuildPatterns: ["**/*", "!dll", "!dll/*"]
        }),
        new HtmlWebpackPlugin({
            template: "./public/index.html",
            chunks: ["main"]
        }),
        new CopyPlugin({
            patterns: [
                {from: "./public", to: "./"},
            ]
        }),
        new MiniCssExtractPlugin({
            filename: "css/[name].[contenthash:5].css",
            chunkFilename: "common.[chunkhash:5].css"
        }),
        new webpack.HotModuleReplacementPlugin(),
        new PurgeCss({
            paths
        }),
        // new WebpackBundleAnalyzer(),
        // new CompressionWebpackPlugin({
        //     filename: "[file].[ext].gz"
        // }),
        new webpack.ProvidePlugin({
            $: "jquery",
            _: "lodash"
        })
    ],
    optimization: {
        splitChunks: {
            chunks: "all",
            cacheGroups: {
                vendors: {
                    test: /[\/]node_modules[\/]/,
                    priority: -10
                },
                default: {
                    minChunks: 2,
                    priority: -20,
                    reuseExistingChunk: true
                },
                styles: {
                    test: /\.css$/,
                    minChunks: 2,
                }
            }
        },
        // minimize: true,
        minimizer: [
            new TerserPlugin(),
            new OptimizeCSSAssetsPlugin(),
        ]
    },
    devServer: {
        open: true,
        hot: true,
        index: "index.html",
    },
    stats: {
        colors: true,
        modules: false,
        children: false,
        entrypoints: false,
    }
};
