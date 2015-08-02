'use strict';

(function() {
	// Profileinfos Controller Spec
	describe('Profileinfos Controller Tests', function() {
		// Initialize global variables
		var ProfileinfosController,
		scope,
		$httpBackend,
		$stateParams,
		$location;

		// The $resource service augments the response object with methods for updating and deleting the resource.
		// If we were to use the standard toEqual matcher, our tests would fail because the test values would not match
		// the responses exactly. To solve the problem, we define a new toEqualData Jasmine matcher.
		// When the toEqualData matcher compares two objects, it takes only object properties into
		// account and ignores methods.
		beforeEach(function() {
			jasmine.addMatchers({
				toEqualData: function(util, customEqualityTesters) {
					return {
						compare: function(actual, expected) {
							return {
								pass: angular.equals(actual, expected)
							};
						}
					};
				}
			});
		});

		// Then we can start by loading the main application module
		beforeEach(module(ApplicationConfiguration.applicationModuleName));

		// The injector ignores leading and trailing underscores here (i.e. _$httpBackend_).
		// This allows us to inject a service but then attach it to a variable
		// with the same name as the service.
		beforeEach(inject(function($controller, $rootScope, _$location_, _$stateParams_, _$httpBackend_) {
			// Set a new global scope
			scope = $rootScope.$new();

			// Point global variables to injected services
			$stateParams = _$stateParams_;
			$httpBackend = _$httpBackend_;
			$location = _$location_;

			// Initialize the Profileinfos controller.
			ProfileinfosController = $controller('ProfileinfosController', {
				$scope: scope
			});
		}));

		it('$scope.find() should create an array with at least one Profileinfo object fetched from XHR', inject(function(Profileinfos) {
			// Create sample Profileinfo using the Profileinfos service
			var sampleProfileinfo = new Profileinfos({
				name: 'New Profileinfo'
			});

			// Create a sample Profileinfos array that includes the new Profileinfo
			var sampleProfileinfos = [sampleProfileinfo];

			// Set GET response
			$httpBackend.expectGET('profileinfos').respond(sampleProfileinfos);

			// Run controller functionality
			scope.find();
			$httpBackend.flush();

			// Test scope value
			expect(scope.profileinfos).toEqualData(sampleProfileinfos);
		}));

		it('$scope.findOne() should create an array with one Profileinfo object fetched from XHR using a profileinfoId URL parameter', inject(function(Profileinfos) {
			// Define a sample Profileinfo object
			var sampleProfileinfo = new Profileinfos({
				name: 'New Profileinfo'
			});

			// Set the URL parameter
			$stateParams.profileinfoId = '525a8422f6d0f87f0e407a33';

			// Set GET response
			$httpBackend.expectGET(/profileinfos\/([0-9a-fA-F]{24})$/).respond(sampleProfileinfo);

			// Run controller functionality
			scope.findOne();
			$httpBackend.flush();

			// Test scope value
			expect(scope.profileinfo).toEqualData(sampleProfileinfo);
		}));

		it('$scope.create() with valid form data should send a POST request with the form input values and then locate to new object URL', inject(function(Profileinfos) {
			// Create a sample Profileinfo object
			var sampleProfileinfoPostData = new Profileinfos({
				name: 'New Profileinfo'
			});

			// Create a sample Profileinfo response
			var sampleProfileinfoResponse = new Profileinfos({
				_id: '525cf20451979dea2c000001',
				name: 'New Profileinfo'
			});

			// Fixture mock form input values
			scope.name = 'New Profileinfo';

			// Set POST response
			$httpBackend.expectPOST('profileinfos', sampleProfileinfoPostData).respond(sampleProfileinfoResponse);

			// Run controller functionality
			scope.create();
			$httpBackend.flush();

			// Test form inputs are reset
			expect(scope.name).toEqual('');

			// Test URL redirection after the Profileinfo was created
			expect($location.path()).toBe('/profileinfos/' + sampleProfileinfoResponse._id);
		}));

		it('$scope.update() should update a valid Profileinfo', inject(function(Profileinfos) {
			// Define a sample Profileinfo put data
			var sampleProfileinfoPutData = new Profileinfos({
				_id: '525cf20451979dea2c000001',
				name: 'New Profileinfo'
			});

			// Mock Profileinfo in scope
			scope.profileinfo = sampleProfileinfoPutData;

			// Set PUT response
			$httpBackend.expectPUT(/profileinfos\/([0-9a-fA-F]{24})$/).respond();

			// Run controller functionality
			scope.update();
			$httpBackend.flush();

			// Test URL location to new object
			expect($location.path()).toBe('/profileinfos/' + sampleProfileinfoPutData._id);
		}));

		it('$scope.remove() should send a DELETE request with a valid profileinfoId and remove the Profileinfo from the scope', inject(function(Profileinfos) {
			// Create new Profileinfo object
			var sampleProfileinfo = new Profileinfos({
				_id: '525a8422f6d0f87f0e407a33'
			});

			// Create new Profileinfos array and include the Profileinfo
			scope.profileinfos = [sampleProfileinfo];

			// Set expected DELETE response
			$httpBackend.expectDELETE(/profileinfos\/([0-9a-fA-F]{24})$/).respond(204);

			// Run controller functionality
			scope.remove(sampleProfileinfo);
			$httpBackend.flush();

			// Test array after successful delete
			expect(scope.profileinfos.length).toBe(0);
		}));
	});
}());