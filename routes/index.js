'use strict';

var express = require('express');
var request = require('request');
var mongoose = require('mongoose');
var router = express.Router();
var SlackOutgoings = mongoose.model('slack_outgoings');

/* GET home page. */
router.post('/', function (req, res) {
  res.status(200).json({});

  //mongo insert
  req.body.timestamp = new Date((Number(req.body.timestamp) * 1000));
  var slackOutgoing = new SlackOutgoings(req.body);
  slackOutgoing.save(function (err, result) {
    if (err) {
      console.log(err);
      throw err;
    } else {
      var text = '[' + result.user_name + ']' + ' ' + result.text;
      var options = {text: text};
      var data = {
        url: GLOBAL.SLACK_URL,
        body: JSON.stringify(options)
      };
      request.post(data, function (err, res, body) {
        if (err) {
          console.error(err);
          throw err;
        }
      });
    }
  });
});

module.exports = router;
