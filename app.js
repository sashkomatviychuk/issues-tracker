const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const moment = require('moment');
const session = require('express-session');

const config = require('./config');
// middlewares
const applyWebpackMiddleware = require('./app/middlewares/webpackMiddleware');
const frontMiddleware = require('./app/middlewares/frontMiddleware');
// require controllers
const issuesController = require('./app/controllers/issuesController');
// models
require('./app/models');

/**
 * Application definition
 */
class Application {

    constructor() {
        this.express = express();

        // configure application
        this.middlewares();
        this.setupViews();
        this.setupDb();
        this.ssrRendering();
    }

    middlewares() {
        // applying webpack hmr middleware if dev mode enabled
        applyWebpackMiddleware(this.express);
        //this.express.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
        this.express.use(bodyParser.json());
        this.express.use(bodyParser.urlencoded({ extended: true }));
        this.express.use(cookieParser());
        this.express.use(express.static(config.publicPath));

        // apply routes
        this.express.use('/api', issuesController);
    }

    setupViews() {
        this.express.set('views', config.viewsPath);
        this.express.set('view engine', 'jade');
        this.express.locals.moment = moment;
    }

    setupDb() {
        mongoose.connect(config.connection);
    }

    ssrRendering() {
        this.express.get('*', frontMiddleware);
    }
}

module.exports = new Application().express;
