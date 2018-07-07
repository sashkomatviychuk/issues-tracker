const webpack = require('webpack');
const path = require('path');
const glob = require('glob-all');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const PurifyCSSPlugin = require('purifycss-webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CompressionPlugin = require('compression-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

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

    devtool: isDev ? 'cheap-source-map' : undefined,

    resolve: {
        extensions: ['.js', '.jsx', '.json'],
        modules: ['src', 'node_modules'],
    },

    module: {
        loaders: [
            {
                test: /\.(css|scss)$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: [
                        { loader: 'css-loader', options: { minimize: true } },
                        { loader: 'sass-loader', options: { minimize: true } }
                    ]
                })
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
                test: /\.svg$/, loader: 'url-loader',
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
        new webpack.ContextReplacementPlugin(/moment[\/\\]locale$/, /en/),
        new ExtractTextPlugin('style.css'),
    ],
};

if (!isDev) {
    webpackConfig.plugins.push(new UglifyJsPlugin({
        extractComments: true,
    }));
    webpackConfig.plugins.push(new CompressionPlugin());
    webpackConfig.plugins.push(new PurifyCSSPlugin({
        paths: glob.sync(
            [
                path.join(__dirname, 'src/**/*.jsx'),
                path.join(__dirname, 'public/index.html'),
                path.join(__dirname, 'node_modules/reactstrap/lib/Button.js'),
                path.join(__dirname, 'node_modules/reactstrap/lib/ButtonGroup.js'),
                path.join(__dirname, 'node_modules/reactstrap/lib/ButtonDropdown.js'),
                path.join(__dirname, 'node_modules/reactstrap/lib/DropdownToggle.js'),
                path.join(__dirname, 'node_modules/reactstrap/lib/DropdownMenu.js'),
                path.join(__dirname, 'node_modules/reactstrap/lib/DropdownItem.js'),
                path.join(__dirname, 'node_modules/reactstrap/lib/Badget.js'),
                path.join(__dirname, 'node_modules/reactstrap/lib/Progress.js'),
                path.join(__dirname, 'node_modules/reactstrap/lib/Modal*.js'),
                path.join(__dirname, 'node_modules/reactstrap/lib/Label.js'),
                path.join(__dirname, 'node_modules/reactstrap/lib/FormGroup.js'),
                path.join(__dirname, 'node_modules/reactstrap/lib/Input.js'),
                path.join(__dirname, 'node_modules/reactstrap/lib/Alert.js'),
            ]
        )
    }));
    // webpackConfig.plugins.push(new BundleAnalyzerPlugin());
} else {
    webpackConfig.plugins.push(new webpack.HotModuleReplacementPlugin());
}

module.exports = webpackConfig;