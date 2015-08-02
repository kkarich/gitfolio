'use strict';

//Profileinfos service used to communicate Profileinfos REST endpoints
angular.module('profileinfos').factory('Profileinfos', ['$resource',
	function($resource) {
		return $resource('/profileinfos/:profileinfoId', { profileinfoId: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);