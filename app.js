'use strict';

/**
 * Set GLOBAL valiables.
 */

global.__base = __dirname + '/';
global.SENTRY_DSN = process.env.SENTRY_DSN || '';
global.MONGO_HOST = process.env.MONGO_HOST || 'mongodb://192.168.99.100:27017/slack-mongo';
global.MONGO_USER = process.env.MONGO_USER || '';
global.MONGO_PASS = process.env.MONGO_PASS || '';
global.SLACK_URL = process.env.SLACK_URL || '';

var express = require('express');
var bodyParser = require('body-parser');
var logger = require('morgan');

var db = require('./config/db');
var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(logger('default'));

// db connect
app.use(db.connect());

// add router
var routes = require('./routes/index');
app.use('/', routes);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  var err = new Error('404 Not Found');
  err.status = 404;
  res.json({
    message: err.message
  });
});

app.use(function (err, req, res) {
  res.status(err.status || 500);
  res.statusCode = 500;
  res.json({
    message: err.message
  });
});

module.exports = app;