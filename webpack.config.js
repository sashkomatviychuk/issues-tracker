const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

const NODE_ENV = process.env.NODE_ENV || 'development';
const isDev = NODE_ENV === 'development';

let entry = ['react-hot-loader/patch'];

if (isDev) {
    entry.push('webpack-hot-middleware/client');
}

entry.push('./src/index');

/**
 * Webpack config
 */
const webpackConfig = {
    entry,
    output: {
        path: path.resolve(__dirname, './public/dist'),
        publicPath: '/dist',
        filename: 'bundle.js',
    },

    watch: isDev,

    devtool: isDev ? 'cheap-module-eval-source-map' : undefined,

    resolve: {
        extensions: ['.js', '.jsx', '.json'],
        modules: ['src', 'node_modules'],
    },

    module: {
        loaders: [
            {
                test: /\.(css|sass)$/,
                loaders: [
                    'style-loader',
                    'css-loader',
                    'sass-loader',
                ],
            },
            {
                test: /\.(js|jsx)$/,
                loader: [
                    'react-hot-loader/webpack',
                    'jsx-loader',
                    'babel-loader',
                ],
                include: path.join(__dirname, 'src'),
            },
            {
                test: /\.png$/, loader: 'url-loader?mimetype=image/png',
            },
            {
                test: /\.jpg$/, loader: 'url-loader?mimetype=image/jpg',
            },
            {
                test: /\.svg$/, loader: 'url-loader?mimetype=image/svg+xml',
            },
            {
                test: /\.(woff|woff2|ttf|eot)$/, loader: 'url-loader?limit=1',
            },
            {
                test: /\.json$/, loader: 'json-loader',
            },
        ],
    },

    plugins: [
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify(NODE_ENV),
        }),
        new webpack.NoEmitOnErrorsPlugin(),
        new webpack.NamedModulesPlugin(),
        new webpack.HotModuleReplacementPlugin(),
    ],
};

if (!isDev) {
    webpackConfig.plugins.push(new UglifyJsPlugin());
}

module.exports = webpackConfig;