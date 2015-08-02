'use strict';

//Setting up route
angular.module('profileinfos').config(['$stateProvider',
	function($stateProvider) {
		// Profileinfos state routing
		$stateProvider.
		state('listProfileinfos', {
			url: '/profileinfos',
			templateUrl: '/modules/profileinfos/views/list-profileinfos.client.view.html'
		}).
		state('createProfileinfo', {
			url: '/profileinfos/create',
			templateUrl: '/modules/profileinfos/views/create-profileinfo.client.view.html'
		}).
		state('viewProfileinfo', {
			url: '/profileinfos/:profileinfoId',
			templateUrl: '/modules/profileinfos/views/view-profileinfo.client.view.html'
		}).
		state('editProfileinfo', {
			url: '/profileinfos/:profileinfoId/edit',
			templateUrl: '/modules/profileinfos/views/edit-profileinfo.client.view.html'
		});
	}
]);