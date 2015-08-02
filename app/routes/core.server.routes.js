'use strict';

module.exports = function(app) {
	// Root routing
	var core = require('../../app/controllers/core.server.controller');
	app.route('/').get(core.home);
	
	app.route('/view/:gitHubId').get(core.view);
	app.route('/edit/').get(core.index);
	app.route('/test/').get(core.test);
	
	
	
	// Finish by binding the Project middleware
	app.param('gitHubId', core.userByGitHubId);
	
};