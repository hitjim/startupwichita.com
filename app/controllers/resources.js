'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Resource = mongoose.model('Resource'),
    _ = require('lodash');


/**
 * Find resource by _id
 */
exports.resource = function(req, res, next, _id) {
    Resource.findOne({ _id: _id }, function(err, resource) {
        if (err) return next(err);
        if (!resource) return next(new Error('Failed to find resource ' + _id));
        req.resource = resource;
        next();
    });
};

/**
 * Create a resource
 */
exports.create = function(req, res) {
    var resource = new Resource(req.body);

    resource.save(function(err) {
        if (err) {
            res.send(500, { errors: err.errors, resource: resource });
        } else {
            res.jsonp(201, resource);
        }
    });
};

/**
 * Update a resource
 */
exports.update = function(req, res) {
    var resource = req.resource;

    resource = _.extend(resource, req.body);

    resource.save(function(err) {
        if (err) {
            res.send(500, { errors: err.errors, resource: resource });
        } else {
            res.jsonp(resource);
        }
    });
};

/**
 * Delete a resource
 */
exports.destroy = function(req, res) {
    var resource = req.resource;

    resource.remove(function(err) {
        if (err) {
            res.send(500, { errors: err.errors, resource: resource });
        } else {
            res.jsonp(204, resource);
        }
    });
};

/**
 * Show a resource
 */
exports.show = function(req, res) {
    res.jsonp(req.resource);
};

/**
 * List of Resources
 */
exports.all = function(req, res) {
    Resource.find().sort('-title').exec(function(err, resources) {
        if (err) {
            res.send(500, { errors: err.errors });
        } else {
            return res.jsonp(resources);
        }
    });
};
