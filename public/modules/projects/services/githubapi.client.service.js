'use strict';

angular.module('projects').factory('Githubapi', ['$http','Authentication',
	function($http,Authentication) {
		// Githubapi service logic
		// ...

		// Public API
		return {
			getRepos: function() {
				var url = 'https://api.github.com/users/'+ Authentication.user.username +'/repos';
                return $http.get(url)
			},
			getRepo: function(repo) {
				var url = 'https://api.github.com/repos/'+ Authentication.user.username +'/' +repo;
                return $http.get(url)
			}
		};
	}
]);