const webpack = require('webpack');
const webpackConfig = require('./../../../webpack.config');

const NODE_ENV = process.env.NODE_ENV || 'development';
const isDev = NODE_ENV === 'development';

module.exports = app => {
    if (isDev) {
        const compiler = webpack(webpackConfig);

        app.use(require('webpack-dev-middleware')(compiler, {
            serverSideRender: true,
            publicPath: webpackConfig.output.publicPath,
        }));

        app.use(require('webpack-hot-middleware')(compiler));
    }
};
