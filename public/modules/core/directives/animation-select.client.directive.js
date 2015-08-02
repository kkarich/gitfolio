'use strict';

angular.module('core').directive('animationSelect', [
	function() {
		return {
		    scope: {
            animation: '=ngModel'
        },
			template: '<select data-ng-model="animation" class = "form-control"' + 
                        'data-ng-options="animation for animation in animations">'    +            
                    '</select>',
			restrict: 'E',
			link: function postLink(scope, element, attrs) {
			    scope.animations = [  'none' ,   'bounce' ,   'flash' ,   'pulse' ,   'rubberBand' ,   'shake' ,   'swing' ,   'tada' ,   'wobble' ,   'jello' ,   'bounceIn' ,   'bounceInDown' ,   'bounceInLeft' ,   'bounceInRight' ,   'bounceInUp' ,   'bounceOut' ,   'bounceOutDown' ,   'bounceOutLeft' ,   'bounceOutRight' ,   'bounceOutUp' ,   'fadeIn' ,   'fadeInDown' ,   'fadeInDownBig' ,   'fadeInLeft' ,   'fadeInLeftBig' ,   'fadeInRight' ,   'fadeInRightBig' ,   'fadeInUp' ,   'fadeInUpBig' ,   'fadeOut' ,   'fadeOutDown' ,   'fadeOutDownBig' ,   'fadeOutLeft' ,   'fadeOutLeftBig' ,   'fadeOutRight' ,   'fadeOutRightBig' ,   'fadeOutUp' ,   'fadeOutUpBig' ,   'flipInX' ,   'flipInY' ,   'flipOutX' ,   'flipOutY' ,   'lightSpeedIn' ,   'lightSpeedOut' ,   'rotateIn' ,   'rotateInDownLeft' ,   'rotateInDownRight' ,   'rotateInUpLeft' ,   'rotateInUpRight' ,   'rotateOut' ,   'rotateOutDownLeft' ,   'rotateOutDownRight' ,   'rotateOutUpLeft' ,   'rotateOutUpRight' ,   'hinge' ,   'rollIn' ,   'rollOut' ,   'zoomIn' ,   'zoomInDown' ,   'zoomInLeft' ,   'zoomInRight' ,   'zoomInUp' ,   'zoomOut' ,   'zoomOutDown' ,   'zoomOutLeft' ,   'zoomOutRight' ,   'zoomOutUp' ,   'slideInDown' ,   'slideInLeft' ,   'slideInRight' ,   'slideInUp' ,   'slideOutDown' ,   'slideOutLeft' ,   'slideOutRight' ,   'slideOutUp'];
				console.log(scope.animations)
			}
		};
	}
]);