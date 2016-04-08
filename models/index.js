'use strict';

var mongoose = require('mongoose'),
  Schema = mongoose.Schema,
  ObjectId = Schema.ObjectId;

var slackOutgoings = new Schema({
  channel_id: {type: String},
  channel_name: {type: String},
  service_id: {type: String},
  team_domain: {type: String},
  team_id: {type: String},
  user_id: {type: String},
  user_name: {type: String},
  text: {type: String},
  token: {type: String},
  timestamp: {type: Date, default: Date.now}
});

slackOutgoings.statics.load = function (id, cb) {
  this.findOne({_id: id}).exec(cb);
};

exports.SlackOutgoingsSchema = mongoose.model('slack_outgoings', slackOutgoings);