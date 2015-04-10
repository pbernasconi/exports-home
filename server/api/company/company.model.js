'use strict';

var mongoose = require('mongoose'),
  Schema = mongoose.Schema,
  timestamps = require('mongoose-timestamp');

var CompanySchema = new Schema({
  SEQ: String,
  name: String,
  info: String
});


CompanySchema.plugin(timestamps, {
  createdAt: 'tsCreated',
  updatedAt: 'tsUpdated'
});

module.exports = mongoose.model('Company', CompanySchema);
