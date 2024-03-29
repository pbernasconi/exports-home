'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var DomainSchema = new Schema({
  name: String,
  info: String,
  active: Boolean
});

module.exports = mongoose.model('Domain', DomainSchema);