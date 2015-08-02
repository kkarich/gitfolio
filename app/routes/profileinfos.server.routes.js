'use strict';

module.exports = function(app) {
	var users = require('../../app/controllers/users.server.controller');
	var profileinfos = require('../../app/controllers/profileinfos.server.controller');

	// Profileinfos Routes
	app.route('/profileinfos')
		.get(profileinfos.list)
		.post(users.requiresLogin, profileinfos.create);

	app.route('/profileinfos/:profileinfoId')
		.get(profileinfos.read)
		.put(users.requiresLogin, profileinfos.hasAuthorization, profileinfos.update)
		.delete(users.requiresLogin, profileinfos.hasAuthorization, profileinfos.delete);

	// Finish by binding the Profileinfo middleware
	app.param('profileinfoId', profileinfos.profileinfoByID);
};
