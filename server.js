require('babel-core/register');
require('babel-polyfill');

const fs = require('fs');
const http = require('http');
const https = require('https');
const debug = require('debug');
const path = require('path');

const app = require('./app');
const port = normalizePort(process.env.PORT || '3000');
// used for https
// const credentials = {
//     key: fs.readFileSync(path.join(__dirname, 'cert/rootCA.pem')),
//     key: fs.readFileSync(path.join(__dirname, 'cert/server.key')),
//     cert: fs.readFileSync(path.join(__dirname, 'cert/server.crt')),
// };

// process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

const server = http.createServer(app);
// const httpsServer = https.createServer(credentials, app);

/**
 * Listen on provided port, on all network interfaces.
 */
server.listen(port);
server.on('error', onError);
server.on('listening', onListening);

// httpsServer.listen(3033);
// httpsServer.on('error', onError);
// httpsServer.on('listening', onListening);

/**
 * Normalize a port into a number, string, or false.
 */
function normalizePort(val) {
    const port = typeof val === 'string' ? parseInt(val) : val;

    if (isNaN(port)) {
        return val;
    }

    if (port >= 0) {
        return port;
    }

    return false;
}

function onError(error) {
    if (error.syscall !== 'listen') {
        throw error;
    }

    const bind = typeof port === 'string'
        ? 'Pipe ' + port
        : 'Port ' + port;
    
    // handle specific listen errors with friendly messages
    switch (error.code) {
        case 'EACCES':
            console.error(bind + ' requires elevated privileges');
            process.exit(1);
            break;
        case 'EADDRINUSE':
            console.error(bind + ' is already in use');
            process.exit(1);
            break;
        default:
            throw error;
    }
}

function onListening() {
    console.log(`Listening on port ${port}`);
}