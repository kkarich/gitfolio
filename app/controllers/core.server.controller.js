'use strict';

/**
 * Module dependencies.
 */
 
var mongoose = require('mongoose'),
	errorHandler = require('./errors.server.controller'),
	Profileinfo = mongoose.model('Profileinfo'),
	Project = mongoose.model('Project'),
	User = mongoose.model('User'),
	_ = require('lodash');
	
	
var GitHubApi = require("github");

var github = new GitHubApi({
    // required
    version: "3.0.0",
    // optional
    debug: true,
    protocol: "https",
    host: "api.github.com", // should be api.github.com for GitHub
    timeout: 5000,
    headers: {
        "user-agent": "" // GitHub is happy with a unique user agent
    }
});

 
exports.index = function(req, res) {
	res.render('index', {
		user: req.user || null,
		request: req
	});
};

exports.home = function(req, res) {
	res.render('home', {
		user: req.user || null,
		request: req,
		
	});
};

exports.test = function(req, res) {
	console.log(req.user.providerData.accessToken)
	
	github.authenticate({
        type: "oauth",
        token: req.user.providerData.accessToken
    });
    
    // github.repos.create({
    //     name: req.user.providerData.login + ".github.io"
    // }, function(err) {
        
        github.repos.createFile ({
            user: req.user.providerData.login,
            repo: req.user.providerData.login + ".github.io",
            path:'test/index.htnl',
            message: 'Test',
            content: 'VGhpcyBpcyBhIHRlc3Q=',
            commiter: "{name:'Test',email:'test'}"
            }, function(err) {
                
            });
        
   // });
	
	res.render('home', {
		user: req.user || null,
		request: req,
		
	});
};

exports.view = function(req, res) {
    //Load the profile info based on the url userId parameter
    Profileinfo.findOne({'user':req.userId}).sort('-created').populate('user', 'displayName').exec(function(err, profileinfo) {
    	if (err) return next(err);
    	if (! profileinfo) return next(new Error('Failed to load Profileinfo ' + id));
    	
    	//Load the user projects based on the profile info user
    	Project.find({'user':profileinfo.user}).sort('-created').populate('user', 'displayName').exec(function(err, projects) {
            if (err) {
			    return res.status(400).send({
				    message: errorHandler.getErrorMessage(err)
			    });
		    } else {
		        
		        //If no errors pass the profile info and project info to to be rendered
			    res.render('view', {
            		user: req.userId || null,
            		request: req,
            		profileinfo:profileinfo,
            		projects:projects
            	});
		    }
	    });
    		
    	
    	
    	console.log(req.userId)
    	
	});
	

	
};
	exports.userByGitHubId = function(req, res, next, id) { 
	User.findOne({'username':id.toLowerCase()}).populate('user', 'displayName').exec(function(err, userId) {
		if (err) return next(err);
		if (! userId) return next(new Error('Failed to load Profileinfo ' + id));
		req.userId = userId ;
		next();
	});
};
    
