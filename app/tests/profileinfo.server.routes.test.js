'use strict';

var should = require('should'),
	request = require('supertest'),
	app = require('../../server'),
	mongoose = require('mongoose'),
	User = mongoose.model('User'),
	Profileinfo = mongoose.model('Profileinfo'),
	agent = request.agent(app);

/**
 * Globals
 */
var credentials, user, profileinfo;

/**
 * Profileinfo routes tests
 */
describe('Profileinfo CRUD tests', function() {
	beforeEach(function(done) {
		// Create user credentials
		credentials = {
			username: 'username',
			password: 'password'
		};

		// Create a new user
		user = new User({
			firstName: 'Full',
			lastName: 'Name',
			displayName: 'Full Name',
			email: 'test@test.com',
			username: credentials.username,
			password: credentials.password,
			provider: 'local'
		});

		// Save a user to the test db and create new Profileinfo
		user.save(function() {
			profileinfo = {
				name: 'Profileinfo Name'
			};

			done();
		});
	});

	it('should be able to save Profileinfo instance if logged in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Profileinfo
				agent.post('/profileinfos')
					.send(profileinfo)
					.expect(200)
					.end(function(profileinfoSaveErr, profileinfoSaveRes) {
						// Handle Profileinfo save error
						if (profileinfoSaveErr) done(profileinfoSaveErr);

						// Get a list of Profileinfos
						agent.get('/profileinfos')
							.end(function(profileinfosGetErr, profileinfosGetRes) {
								// Handle Profileinfo save error
								if (profileinfosGetErr) done(profileinfosGetErr);

								// Get Profileinfos list
								var profileinfos = profileinfosGetRes.body;

								// Set assertions
								(profileinfos[0].user._id).should.equal(userId);
								(profileinfos[0].name).should.match('Profileinfo Name');

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should not be able to save Profileinfo instance if not logged in', function(done) {
		agent.post('/profileinfos')
			.send(profileinfo)
			.expect(401)
			.end(function(profileinfoSaveErr, profileinfoSaveRes) {
				// Call the assertion callback
				done(profileinfoSaveErr);
			});
	});

	it('should not be able to save Profileinfo instance if no name is provided', function(done) {
		// Invalidate name field
		profileinfo.name = '';

		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Profileinfo
				agent.post('/profileinfos')
					.send(profileinfo)
					.expect(400)
					.end(function(profileinfoSaveErr, profileinfoSaveRes) {
						// Set message assertion
						(profileinfoSaveRes.body.message).should.match('Please fill Profileinfo name');
						
						// Handle Profileinfo save error
						done(profileinfoSaveErr);
					});
			});
	});

	it('should be able to update Profileinfo instance if signed in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Profileinfo
				agent.post('/profileinfos')
					.send(profileinfo)
					.expect(200)
					.end(function(profileinfoSaveErr, profileinfoSaveRes) {
						// Handle Profileinfo save error
						if (profileinfoSaveErr) done(profileinfoSaveErr);

						// Update Profileinfo name
						profileinfo.name = 'WHY YOU GOTTA BE SO MEAN?';

						// Update existing Profileinfo
						agent.put('/profileinfos/' + profileinfoSaveRes.body._id)
							.send(profileinfo)
							.expect(200)
							.end(function(profileinfoUpdateErr, profileinfoUpdateRes) {
								// Handle Profileinfo update error
								if (profileinfoUpdateErr) done(profileinfoUpdateErr);

								// Set assertions
								(profileinfoUpdateRes.body._id).should.equal(profileinfoSaveRes.body._id);
								(profileinfoUpdateRes.body.name).should.match('WHY YOU GOTTA BE SO MEAN?');

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should be able to get a list of Profileinfos if not signed in', function(done) {
		// Create new Profileinfo model instance
		var profileinfoObj = new Profileinfo(profileinfo);

		// Save the Profileinfo
		profileinfoObj.save(function() {
			// Request Profileinfos
			request(app).get('/profileinfos')
				.end(function(req, res) {
					// Set assertion
					res.body.should.be.an.Array.with.lengthOf(1);

					// Call the assertion callback
					done();
				});

		});
	});


	it('should be able to get a single Profileinfo if not signed in', function(done) {
		// Create new Profileinfo model instance
		var profileinfoObj = new Profileinfo(profileinfo);

		// Save the Profileinfo
		profileinfoObj.save(function() {
			request(app).get('/profileinfos/' + profileinfoObj._id)
				.end(function(req, res) {
					// Set assertion
					res.body.should.be.an.Object.with.property('name', profileinfo.name);

					// Call the assertion callback
					done();
				});
		});
	});

	it('should be able to delete Profileinfo instance if signed in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Profileinfo
				agent.post('/profileinfos')
					.send(profileinfo)
					.expect(200)
					.end(function(profileinfoSaveErr, profileinfoSaveRes) {
						// Handle Profileinfo save error
						if (profileinfoSaveErr) done(profileinfoSaveErr);

						// Delete existing Profileinfo
						agent.delete('/profileinfos/' + profileinfoSaveRes.body._id)
							.send(profileinfo)
							.expect(200)
							.end(function(profileinfoDeleteErr, profileinfoDeleteRes) {
								// Handle Profileinfo error error
								if (profileinfoDeleteErr) done(profileinfoDeleteErr);

								// Set assertions
								(profileinfoDeleteRes.body._id).should.equal(profileinfoSaveRes.body._id);

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should not be able to delete Profileinfo instance if not signed in', function(done) {
		// Set Profileinfo user 
		profileinfo.user = user;

		// Create new Profileinfo model instance
		var profileinfoObj = new Profileinfo(profileinfo);

		// Save the Profileinfo
		profileinfoObj.save(function() {
			// Try deleting Profileinfo
			request(app).delete('/profileinfos/' + profileinfoObj._id)
			.expect(401)
			.end(function(profileinfoDeleteErr, profileinfoDeleteRes) {
				// Set message assertion
				(profileinfoDeleteRes.body.message).should.match('User is not logged in');

				// Handle Profileinfo error error
				done(profileinfoDeleteErr);
			});

		});
	});

	afterEach(function(done) {
		User.remove().exec();
		Profileinfo.remove().exec();
		done();
	});
});