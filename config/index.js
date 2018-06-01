require('dotenv').config()
const path = require('path');

const dbHost = process.env.DB_HOST || 'localhost';
const dbPort = process.env.DB_PORT || '27017';
const dbName = process.env.DB_NAME || 'issues_tracker';

module.exports = {
    publicPath: path.join(__dirname, './../public'),
    viewsPath: path.join(__dirname, './../app/views'),
    connection: `mongodb://${dbHost}:${dbPort}/${dbName}`,
    limit: 20,
};
