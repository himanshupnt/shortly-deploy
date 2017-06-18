var db = require('../config');
var crypto = require('crypto');
const bluebird = require('bluebird');
const mongoose = require('mongoose');
mongoose.Promise = bluebird;

var linkSchema = mongoose.Schema({
  url: String,
  baseUrl: String,
  code: String,
  title: String,
  visits: String
});

var Link = mongoose.model('Link', linkSchema);

var createSha = function (url) {
  var shasum = crypto.createHash('sha1');
  shasum.update(url);
  return shasum.digest('hex').slice(0, 5);
};

linkSchema.pre('save', function(next) {
  this.code = createSha(this.url);
  next();
});

module.exports = Link;
