'use strict';

// Profileinfos controller
angular.module('profileinfos').controller('ProfileinfosController', ['$scope', '$stateParams', '$location', 'Authentication', 'Profileinfos',
	function($scope, $stateParams, $location, Authentication, Profileinfos) {
		$scope.authentication = Authentication;

		// Create new Profileinfo
		$scope.create = function() {
			// Create new Profileinfo object
			var profileinfo = new Profileinfos ({
			    
			    profileImage:this.profileImage,
			    
				welcomeHeader: {
				    text:this.welcomeHeader.text,
				    animation:this.welcomeHeader.animation
				},
				welcomeSubHeader: {
				    text:this.welcomeSubHeader.text,
				    animation:this.welcomeSubHeader.animation
				},
				aboutHeader: {
				    text:this.aboutHeader.text,
				    animation:this.aboutHeader.animation
				},
				about: {
				    text:this.about.text,
				    animation:this.about.animation
				},
				
				projectHeader: {
				    text:this.projectHeader.text,
				    animation:this.projectHeader.animation
				},
				projectSubHeader: {
				    text:this.projectSubHeader.text,
				    animation:this.projectSubHeader.animation
				},
				
				contactHeader: {
				    text:this.contactHeader.text,
				    animation:this.contactHeader.animation
				},
				contactSubHeader: {
				    text:this.contactSubHeader.text,
				    animation:this.contactSubHeader.animation
				},
				
			});

			// Redirect after save
			profileinfo.$save(function(response) {
				$location.path('profileinfos/' + response._id);

				// Clear form fields
				$scope.name = '';
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Remove existing Profileinfo
		$scope.remove = function(profileinfo) {
			if ( profileinfo ) { 
				profileinfo.$remove();

				for (var i in $scope.profileinfos) {
					if ($scope.profileinfos [i] === profileinfo) {
						$scope.profileinfos.splice(i, 1);
					}
				}
			} else {
				$scope.profileinfo.$remove(function() {
					$location.path('profileinfos');
				});
			}
		};

		// Update existing Profileinfo
		$scope.update = function() {
			var profileinfo = $scope.profileinfo;

			profileinfo.$update(function() {
				$location.path('profileinfos/' + profileinfo._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Find a list of Profileinfos
		$scope.find = function() {
			$scope.profileinfos = Profileinfos.query();
		};

		// Find existing Profileinfo
		$scope.findOne = function() {
			$scope.profileinfo = Profileinfos.get({ 
				profileinfoId: $stateParams.profileinfoId
			});
		};
	}
]);