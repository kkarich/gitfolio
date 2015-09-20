'use strict';

/**
 * Module dependencies.
 */
 
var mongoose = require('mongoose'),
	errorHandler = require('./errors.server.controller'),
	swig = require('swig'),
	fs = require('fs'),
	Profileinfo = mongoose.model('Profileinfo'),
	Project = mongoose.model('Project'),
	User = mongoose.model('User'),
	_ = require('lodash');
	
	
var GitHubApi = require('github');

var github = new GitHubApi({
    // required
    version: '3.0.0',
    // optional
    debug: true,
    protocol: 'https',
    host: 'api.github.com', // should be api.github.com for GitHub
    timeout: 5000,
    headers: {
        'user-agent': ''// GitHub is happy with a unique user agent
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

exports.build = function(req, res) {

	github.authenticate({
        type: "oauth",
        token: req.user.providerData.accessToken
    });
    
    var repoExists = true;
    
    if(repoExists){
        loadPortfoioInformation(req.user, function(profileinfo, projects){
            
            //Render index template
            swig.renderFile('./app/views/view.server.view.html', {profileinfo:profileinfo,projects:projects}, function (err, output) {
                      if (err) {
                        throw err;
                      }
                      
                      var base64Output = new Buffer(output).toString('base64'); 
                
                        github.repos.createFile ({
                         user: req.user.providerData.login,
                         repo: req.user.providerData.login + '.github.io',
                         path:'index.html',
                         message: 'Gitfolio',
                         content: base64Output,
                         commiter: "{name:'Test',email:'test'}"
                         }, function(err) {
                              var cssFiles = {};
                        //  cssFiles["./public/lib/bootstrap/dist/css/bootstrap.css"] = "lib/bootstrap/dist/css/bootstrap.css";
                        //  cssFiles["./public/lib/flat-ui/dist/css/flat-ui.css"] = "lib/flat-ui/dist/css/flat-ui.css";
                        //  cssFiles["./public/lib/animate.css/animate.css"] = "lib/animate.css/animate.css";
                        //  cssFiles["./public/lib/font-awesome/css/font-awesome.css"] = "lib/font-awesome/css/font-awesome.css";
                         cssFiles["./public/modules/core/css/core.css"] = "modules/core/css/core.css";
                         
                         for(var filePath in cssFiles){
                            var file = fs.readFileSync(filePath);
                            var base64File = new Buffer(file).toString('base64');
                            
                            github.repos.createFile ({
                             user: req.user.providerData.login,
                             repo: req.user.providerData.login + '.github.io',
                             path:cssFiles[filePath],
                             message: 'Test',
                             content: base64File,
                             commiter: "{name:'Test',email:'test'}"
                             }, function(err) {
                                
                             });
                         }
                         
                         
                             
                             res.send("Success");   
                            
                         });
                         
                        
                           
                      
                    });
		        
                
            });
        
    }else{
        //Crete Repo
        github.repos.create({
            name: req.user.providerData.login + ".github.io"
        }, function(err) {
            //Load profileInfo and Projects
            loadPortfoioInformation(req.user, function(profileInfo, projects){
            
            //Render index template
            swig.renderFile('./app/views/view.server.view.html', {profileinfo:profileinfo,projects:projects}, function (err, output) {
                      if (err) {
                        throw err;
                      }
                      
                      var base64Output = new Buffer(output).toString('base64'); 
                      
                        github.repos.createFile ({
                         user: req.user.providerData.login,
                         repo: req.user.providerData.login + '.github.io',
                         path:'index.html',
                         message: 'Gitfolio',
                         content: base64Output,
                         commiter: "{name:'Test',email:'test'}"
                         }, function(err) {
                            
                         });
                         
                         var cssFiles = {};
                         cssFiles["./public/lib/bootstrap/dist/css/bootstrap.css"] = "lib/bootstrap/dist/css/bootstrap.css";
                         cssFiles["./public/lib/flat-ui/dist/css/flat-ui.css"] = "lib/flat-ui/dist/css/flat-ui.css";
                         cssFiles["./public/lib/animate.css/animate.css"] = "lib/animate.css/animate.css";
                         cssFiles["./public/lib/font-awesome/css/font-awesome.css"] = "lib/font-awesome/css/font-awesome.css";
                         cssFiles["./public/modules/core/css/core.css"] = "modules/core/css/core.css";
                         
                         for(var filePath in cssFiles){
                            var file = fs.readFileSync(filePath);
                            var base64File = new Buffer(file).toString('base64');
                            
                            github.repos.createFile ({
                             user: req.user.providerData.login,
                             repo: req.user.providerData.login + '.github.io',
                             path:cssFiles[filePath],
                             message: 'Test',
                             content: base64File,
                             commiter: "{name:'Test',email:'test'}"
                             }, function(err) {
                                
                             });
                         }
                      
                             
                             res.send("Success");        
                      
                    });
		        
                
            });
            
            
        }); 
        
       
    }
    
  
	

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
    
var loadPortfoioInformation = function(user, callback){
    
         
   
   Profileinfo.findOne({'user':user}).sort('-created').populate('user', 'displayName').exec(function(err, profileinfo) {
    	if (err) return next(err);
    	if (!profileinfo) return next(new Error('Failed to load Profileinfo ' + id));
    	
    	//Load the user projects based on the profile info user
    	Project.find({'user':profileinfo.user}).sort('-created').populate('user', 'displayName').exec(function(err, projects) {
            if (err) {
			    return res.status(400).send({
				    message: errorHandler.getErrorMessage(err)
			    });
		    } else {
		        callback(profileinfo, projects);
		        
		    }
	    });
   });
    
}