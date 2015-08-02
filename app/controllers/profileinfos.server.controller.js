'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	errorHandler = require('./errors.server.controller'),
	Profileinfo = mongoose.model('Profileinfo'),
	_ = require('lodash');
	
	

/**
 * Create a Profileinfo
 */
exports.create = function(user) {
    
    Profileinfo.findById('55a688265674cb6806a0e3d0').populate('user', 'displayName').exec(function(err, defaultProfileinfo) {
	    
	    defaultProfileinfo._id = mongoose.Types.ObjectId();
        defaultProfileinfo.isNew = true;
    	defaultProfileinfo.user = user._id;
    
    	defaultProfileinfo.save(function(err) {
    		console.log(err)
    	});
	    
	});
    
    
};



/**
 * Show the current Profileinfo
 */
exports.read = function(req, res) {
    console.log(req.profileinfo)
	res.jsonp(req.profileinfo);
};

/**
 * Update a Profileinfo
 */
exports.update = function(req, res) {
    console.log('profileinfo body',req.profileinfo,req.body)
	var profileinfo = req.profileinfo ;

	profileinfo = _.extend(profileinfo , req.body);

	profileinfo.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(profileinfo);
		}
	});
};

/**
 * Update a ProfileinfoByField
 */
exports.updateByField = function(req, res) {
	var profileinfo = req.profileinfo ;

	profileinfo = _.extend(profileinfo , req.body);

	profileinfo.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(profileinfo);
		}
	});
};

/**
 * Delete an Profileinfo
 */
exports.delete = function(req, res) {
	var profileinfo = req.profileinfo ;

	profileinfo.remove(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(profileinfo);
		}
	});
};

/**
 * List of Profileinfos
 */
exports.list = function(req, res) { 
	Profileinfo.findOne({'user':req.user}).sort('-created').populate('user', 'displayName').exec(function(err, profileinfos) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(profileinfos);
		}
	});
};

/**
 * Profileinfo middleware
 */
exports.profileinfoByID = function(req, res, next, id) { 
	Profileinfo.findById(id).populate('user', 'displayName').exec(function(err, profileinfo) {
		if (err) return next(err);
		if (! profileinfo) return next(new Error('Failed to load Profileinfo ' + id));
		req.profileinfo = profileinfo ;
		next();
	});
};

/**
 * Profileinfo authorization middleware
 */
exports.hasAuthorization = function(req, res, next) {
	if (req.profileinfo.user.id !== req.user.id) {
		return res.status(403).send('User is not authorized');
	}
	next();
};
