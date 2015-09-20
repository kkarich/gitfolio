'use strict';

// Projects controller
angular.module('projects').controller('ProjectsController', ['$scope', '$stateParams', '$location', 'Authentication', 'Projects','Githubapi','$modalInstance','project',
	function($scope, $stateParams, $location, Authentication, Projects,Githubapi,$modalInstance,project) {
		$scope.authentication = Authentication;
		$scope.state = 'new';
		$scope.selectedRepo = {name:''};
		
		
		$scope.getRepos = function(){
		    Githubapi.getRepos($scope.authentication.user.username).
    		 success(function(data, status, headers, config) {
    		    $scope.state = "select-repo";
                $scope.repos = data;
              }).
              error(function(data, status, headers, config) {
                // called asynchronously if an error occurs
                // or server returns response with an error status.
              });
		};
		
		$scope.start = function(repo){
		    
		    if(repo){
		        Githubapi.getRepo(repo).
        		 success(function(data, status, headers, config) {
        		    var repo = data
    		        console.log(repo)
    		        
    		        $scope.newProject = {
            	        name: repo.name,
            	        description:repo.description,
            	        image: "http://d3i6t9ktpqo56g.cloudfront.net/wp-content/uploads/2015/03/157H.jpg",
            	        animation:"fadeIn",
            	        githubUrl: repo.html_url,
            	        websiteUrl: repo.homepage
    		            
    		        }
                  }).
                  error(function(data, status, headers, config) {
                    // called asynchronously if an error occurs
                    // or server returns response with an error status.
                  });
		        
		        
		    }
		    else{
		        $scope.newProject = {
        	        name: "New Project",
        	        description:"Description",
        	        image: "http://d3i6t9ktpqo56g.cloudfront.net/wp-content/uploads/2015/03/157H.jpg",
        	        animation:"fadeIn",
        	        githubUrl: "githubURL",
        	        websiteUrl: "websiteURL"
		            
		        }
	    
	            $scope.image = {
	                option1:"http://d3i6t9ktpqo56g.cloudfront.net/wp-content/uploads/2015/03/157H.jpg", 
	                option2:"http://cache3.asset-cache.net/xt/554200163.jpg?v=1&g=fs1|0|BLM|00|163&s=1&b=RjI4",
	                option3:"http://cache2.asset-cache.net/xt/540999791.jpg?v=1&g=fs1|0|EYM|99|791&s=1&b=RjI4" 
	                
	            }
		    }
		    
		    $scope.state = "edit-info";
		    
		};
		
		$scope.project = project;
		$scope.image = {};
			$scope.animations = [  'none' ,   'bounce' ,   'flash' ,   'pulse' ,   'rubberBand' ,   'shake' ,   'swing' ,   'tada' ,   'wobble' ,   'jello' ,   'bounceIn' ,   'bounceInDown' ,   'bounceInLeft' ,   'bounceInRight' ,   'bounceInUp' ,   'bounceOut' ,   'bounceOutDown' ,   'bounceOutLeft' ,   'bounceOutRight' ,   'bounceOutUp' ,   'fadeIn' ,   'fadeInDown' ,   'fadeInDownBig' ,   'fadeInLeft' ,   'fadeInLeftBig' ,   'fadeInRight' ,   'fadeInRightBig' ,   'fadeInUp' ,   'fadeInUpBig' ,   'fadeOut' ,   'fadeOutDown' ,   'fadeOutDownBig' ,   'fadeOutLeft' ,   'fadeOutLeftBig' ,   'fadeOutRight' ,   'fadeOutRightBig' ,   'fadeOutUp' ,   'fadeOutUpBig' ,   'flipInX' ,   'flipInY' ,   'flipOutX' ,   'flipOutY' ,   'lightSpeedIn' ,   'lightSpeedOut' ,   'rotateIn' ,   'rotateInDownLeft' ,   'rotateInDownRight' ,   'rotateInUpLeft' ,   'rotateInUpRight' ,   'rotateOut' ,   'rotateOutDownLeft' ,   'rotateOutDownRight' ,   'rotateOutUpLeft' ,   'rotateOutUpRight' ,   'hinge' ,   'rollIn' ,   'rollOut' ,   'zoomIn' ,   'zoomInDown' ,   'zoomInLeft' ,   'zoomInRight' ,   'zoomInUp' ,   'zoomOut' ,   'zoomOutDown' ,   'zoomOutLeft' ,   'zoomOutRight' ,   'zoomOutUp' ,   'slideInDown' ,   'slideInLeft' ,   'slideInRight' ,   'slideInUp' ,   'slideOutDown' ,   'slideOutLeft' ,   'slideOutRight' ,   'slideOutUp' ];
		

        $scope.ok = function () {
            $scope.create();
            $modalInstance.close();
            };
        
         $scope.cancel = function () {
            $modalInstance.dismiss('cancel');
            };

		// Create new Project
		$scope.create = function() {
			// Create new Project object
			var project = new Projects ($scope.newProject);

			// Redirect after save
			project.$save(function(response) {
				$modalInstance.close();
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Remove existing Project
		$scope.remove = function(project) {
		    $modalInstance.close();
				$scope.project.$remove(function() {
				});
			
		};

		// Update existing Project
		$scope.update = function() {
			var project = $scope.project;
            
            if(project.image == 'other'){
                project.image = $scope.image.url;
            };
            
			project.$update(function() {
				$modalInstance.close();
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Find a list of Projects
		$scope.find = function() {
			$scope.projects = Projects.query();
		};

		// Find existing Project
		$scope.findOne = function() {
			$scope.project = Projects.get({ 
				projectId: $stateParams.projectId
			});
		};
	}
]);