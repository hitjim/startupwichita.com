'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    _ = require('lodash'),
    User = mongoose.model('User');

/**
 * Sanitize user records before returning
 */
var sanitize = function(u, self) {
    var result;

    self = self || false;

    if (u && typeof u.length !== 'undefined') {
        result = [];

        u.forEach(function(user) {
            var sanitizedUser = {
                _id: user._id,
                name: user.name,
                username: user.username,
                role: user.role,
                bio: user.bio,
                tagline: user.tagline,
                featured: user.featured
            };
            if (self) sanitizedUser.email = user.email;
            result.push(sanitizedUser);
        });
    } else {
        result = {
            _id: u._id,
            name: u.name,
            username: u.username,
            role: u.role,
            bio: u.bio,
            tagline: u.tagline,
            featured: u.featured
        };
        if (self) result.email = u.email;
    }

    return result;
};

/**
 * Auth callback
 */
exports.authCallback = function(req, res) {
    res.redirect('/');
};

/**
 * Show login form
 */
exports.signin = function(req, res) {
    res.render('users/signin', {
        title: 'Signin',
        message: req.flash('error')
    });
};

/**
 * Show sign up form
 */
exports.signup = function(req, res) {
    res.render('users/signup', {
        title: 'Sign up',
        user: new User()
    });
};

/**
 * Logout
 */
exports.signout = function(req, res) {
    req.logout();
    res.redirect('/');
};

/**
 * Session
 */
exports.session = function(req, res) {
    res.redirect('/');
};

/**
 * Create user
 */
exports.create = function(req, res, next) {
    var user = new User(req.body);
    var message = null;

    user.provider = 'local';
    user.save(function(err) {
        if (err) {

            switch (err.code) {
                case 11000:
                case 11001:
                    message = 'Username already exists';
                    break;
                default:
                    message = 'Please fill all the required fields';
            }

            return res.jsonp(500, {
                message: message,
                user: sanitize(user, true)
            });
        }
        req.logIn(user, function(err) {
            if (err) return next(err);
            return res.jsonp(201, {
                user: sanitize(user, true)
            });
        });
    });
};

/**
 * Update user
 */
exports.update = function(req, res) {
    var user = _.merge(req.profile, req.body);

    user.save(function(err, user) {
        if (err) {
            res.send(500, { errors: err.errors, user: user });
        } else {
            res.jsonp(sanitize(user, true));
        }
    });
};

/**
 * Delete user
 */
exports.destroy = function(req, res) {
    req.profile.remove(function(err, user) {
        if (err) {
            res.send(500, { errors: err.errors, user: user });
        } else {
            res.jsonp(sanitize(user, true));
        }
    });
};

/**
 * Send User
 */
exports.me = function(req, res) {
    res.jsonp(req.user || null);
};

/**
 * Show a user
 */
exports.show = function(req, res) {
    res.jsonp(sanitize(req.profile));
};

/**
 * List of Users
 */
exports.all = function(req, res) {
    User.find().sort('-name').exec(function(err, users) {
        if (err) {
            res.render('error', {
                status: 500
            });
        } else {
            res.jsonp(sanitize(users));
        }
    });
};

/**
 * Find user by _id
 */
exports.user = function(req, res, next, _id) {
    User
        .findOne({
            _id: _id
        })
        .exec(function(err, user) {
            if (err) return next(err);
            if (!user) return next(new Error('Failed to load User ' + _id));
            req.profile = user;
            next();
        });
};
