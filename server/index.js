import express from 'express';
import path from 'path';
import {ParseServer} from 'parse-server';
import ParseDashboard from 'parse-dashboard';

import config from './config.json';

const DEVELOP = 'develop';
const ONE_DAY = 86400000;
const PORT = process.env.PORT || config.PORT;
const MONGODB_URI = process.env.MONGODB_URI || config.MONGO_URI;
const NODE_ENV = process.env.NODE_ENV || DEVELOP;

const SUPER_ADMIN = process.env.SUPER_ADMIN ?
    JSON.parse(process.env.SUPER_ADMIN) :
    config.SUPER_ADMIN;

const SERVER_URL = process.env.SERVER_URL ?
    `${process.env.SERVER_URL}/parse` :
    `http://localhost:${PORT}/parse`;

const app = express();

// initialise parse server
const parse = new ParseServer({
    databaseURI: MONGODB_URI,
    serverURL: SERVER_URL,
    appId: config.APP_ID,
    masterKey: config.MASTER_KEY,
    javascriptKey: config.JAVASCRIPT_KEY
});

// initialise parse dashboard
const dashboard = new ParseDashboard({
    apps: [
        {
            serverURL: SERVER_URL,
            appId: config.APP_ID,
            masterKey: config.MASTER_KEY,
            javascriptKey: config.JAVASCRIPT_KEY,
            appName: 'Beton4ik',
            production: true
        }
    ],
    users: [
        SUPER_ADMIN
    ]
}, true);

// error handler
const catchError = (err, req, res) => {
    console.error(err.stack);

    res
        .status(err.status || 500)
        .json({
            error: err.message,
            succes: false
        });
};

// setup for different env
if (NODE_ENV === DEVELOP) {
    // app.use(morgan('dev'));
    app.use(express.static(path.resolve('build/')));
} else {
    // app.use(morgan('combined'));
    app.use(express.static(path.resolve('build/'), {maxAge: ONE_DAY}));
}

// set middleware
app.use('/parse', parse);
app.use('/admin/dashboard', dashboard);

app.use('/*', (req, res) => {
    res.sendFile(path.resolve('build', 'index.html'));
});

// catch all errors
app.use(catchError);

// start
app.listen(PORT, () => console.log(
    'Server running on:', PORT,
    'Mode:', NODE_ENV
));
