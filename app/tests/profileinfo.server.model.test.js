'use strict';

/**
 * Module dependencies.
 */
var should = require('should'),
	mongoose = require('mongoose'),
	User = mongoose.model('User'),
	Profileinfo = mongoose.model('Profileinfo');

/**
 * Globals
 */
var user, profileinfo;

/**
 * Unit tests
 */
describe('Profileinfo Model Unit Tests:', function() {
	beforeEach(function(done) {
		user = new User({
			firstName: 'Full',
			lastName: 'Name',
			displayName: 'Full Name',
			email: 'test@test.com',
			username: 'username',
			password: 'password'
		});

		user.save(function() { 
			profileinfo = new Profileinfo({
				name: 'Profileinfo Name',
				user: user
			});

			done();
		});
	});

	describe('Method Save', function() {
		it('should be able to save without problems', function(done) {
			return profileinfo.save(function(err) {
				should.not.exist(err);
				done();
			});
		});

		it('should be able to show an error when try to save without name', function(done) { 
			profileinfo.name = '';

			return profileinfo.save(function(err) {
				should.exist(err);
				done();
			});
		});
	});

	afterEach(function(done) { 
		Profileinfo.remove().exec();
		User.remove().exec();

		done();
	});
});