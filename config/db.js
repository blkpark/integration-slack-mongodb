'use strict';

var mongoose = require('mongoose');

var dbconfig = {
  "host": global.MONGO_HOST,
  "auth": {
    "user": global.MONGO_USER,
    "password": global.MONGO_PASS
  }
};

exports.connect = function () {
  //var options = {user: dbconfig.auth.user, pass: dbconfig.auth.pass};
  mongoose.connect(dbconfig.host, function (err) {
    console.log('> db connect info');
    if (err) {
      console.error(dbconfig.host, err);
      throw err;
    } else {
      console.log(dbconfig.host);
    }
  });
  require(global.__base + 'models/');
  return function (req, res, cb) {
    cb();
  }
};