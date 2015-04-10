'use strict';

var _ = require('lodash');
var Domain = require('./domain.model');

// Get list of domains
exports.index = function(req, res) {
  Domain.find(function (err, domains) {
    if(err) { return handleError(res, err); }
    return res.json(200, domains);
  });
};

// Get a single domain
exports.show = function(req, res) {
  Domain.findById(req.params.id, function (err, domain) {
    if(err) { return handleError(res, err); }
    if(!domain) { return res.send(404); }
    return res.json(domain);
  });
};

// Creates a new domain in the DB.
exports.create = function(req, res) {
  Domain.create(req.body, function(err, domain) {
    if(err) { return handleError(res, err); }
    return res.json(201, domain);
  });
};

// Updates an existing domain in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Domain.findById(req.params.id, function (err, domain) {
    if (err) { return handleError(res, err); }
    if(!domain) { return res.send(404); }
    var updated = _.merge(domain, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.json(200, domain);
    });
  });
};

// Deletes a domain from the DB.
exports.destroy = function(req, res) {
  Domain.findById(req.params.id, function (err, domain) {
    if(err) { return handleError(res, err); }
    if(!domain) { return res.send(404); }
    domain.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.send(204);
    });
  });
};

function handleError(res, err) {
  return res.send(500, err);
}