'use strict';


angular.module('core').controller('HomeController', ['$scope', 'Authentication', 'Profileinfos','Projects','$modal','$anchorScroll', '$location',
	function($scope, Authentication,Profileinfos,Projects, $modal, $anchorScroll, $location) {
		// This provides Authentication context.
		
		
		
		$scope.authentication = Authentication;
		console.log("$scope.authentication",$scope.authentication)
		$scope.gotoSection = function (section){
            $location.hash(section);
            $anchorScroll();
		};
	   
        $scope.createProject = function (size) {

        var modalInstance = $modal.open({
          animation: true,
          templateUrl: '/modules/projects/views/create-project.client.view.html',
          controller: 'ProjectsController',
          size: size,
            resolve:  {
        project: function () {
          return {};
        }
      }
          
        });

         modalInstance.result.then(function () {
          //$scope.projects.push = project;
          console.log("test")
           $scope.projects = Projects.query();
        }, function () {
          console.log("Canceled new project")
        });
      };
      
      $scope.editProject = function (project) {
        var modalInstance = $modal.open({
          animation: true,
          templateUrl: '/modules/projects/views/edit-project.client.view.html',
          controller: 'ProjectsController',
          resolve:  {
        project: function () {
          return project;
        }
      }
          
        });

         modalInstance.result.then(function () {
          
           $scope.projects = Projects.query();
        }, function () {
            $scope.projects = Projects.query();
        });
      };
       
		$scope.init = function(){
		    $scope.getProfileInfo();
		   	$scope.getProjects();
		};
		
		$scope.getProfileInfo = function(){
		  
		    $scope.profileinfo = Profileinfos.get();
		    
		};
		
		$scope.getProjects = function(){
		    $scope.projects = Projects.query();
		};
		
		// Update existing Profileinfo
		$scope.update = function(fieldName,fieldAttributes) {
		var profileinfo = $scope.profileinfo;   
		var update = {
            _id :profileinfo._id
		};
		
		update[fieldName] = fieldAttributes;
		Profileinfos.update({ id:update._id }, update);
		};
	}
]);