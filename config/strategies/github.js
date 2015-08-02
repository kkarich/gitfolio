'use strict';

/**
 * Module dependencies.
 */
var passport = require('passport'),
	url = require('url'),
	GithubStrategy = require('passport-github').Strategy,
	config = require('../config'),
	users = require('../../app/controllers/users.server.controller');

module.exports = function() {
	// Use github strategy
	passport.use(new GithubStrategy({
			clientID: 'c1b10ce164114aceca22',
			clientSecret: '7ef57541f1f525197c11ba1cebf8bad5cefac68a',
			callbackURL: 'http://ukkkbb766435.kkarich.koding.io:3000/auth/github/callback',
			scope: ['user','public_repo'],
			passReqToCallback: true
		},
		function(req, accessToken, refreshToken, profile, done) {
		    console.log("OTHER ACCESSTOKEN SECTION", accessToken)
			// Set the provider data and include tokens
			var providerData = profile._json;
			providerData.accessToken = accessToken;
			providerData.refreshToken = refreshToken;

			// Create the user OAuth profile
			var providerUserProfile = {
				displayName: profile.displayName,
				email: profile.emails[0].value,
				username: profile.username.toLowerCase(),
				provider: 'github',
				providerIdentifierField: 'id',
				providerData: providerData
			};

			// Save the user OAuth profile
			users.saveOAuthUserProfile(req, providerUserProfile, done);
		}
	));
};