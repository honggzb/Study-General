```html
<svg xmlns="http://www.w3.org/2000/svg" width="300" height="300">
	<path id="background" ng-attr-d="{{background}}" stroke-width="10" stroke="black" fill="none"/>
	<path ng-attr-d="{{value}}" style="{{dashArray}}" stroke-width="10" stroke="#9BC850" fill="none"/>
	<path id="gradients" ng-attr-d="{{gradients}}" stroke-width="0" fill="none"/>
	<text ng-repeat="gradient in specs.gradients" dx="0" dy="0" text-anchor="middle" style="font: bold large arial">
		<textPath xlink:href="#gradients" startOffset="{{gradient.offset}}%">{{gradient.value}}</textPath>
	</text>
	<text ng-attr-x="{{maxValueCoordinates.x}}" ng-attr-y="{{maxValueCoordinates.y}}" 
			text-anchor="middle" style="font: bold large arial" 
					ng-attr-transform="rotate( 90,{{maxValueCoordinates.x}},{{maxValueCoordinates.y}})">
			{{specs.maxValue}}
	</text>
</svg>
<script>
scope.gaugeSpecs1 = { currentValue: 45, centerX: 150, centerY: 150, radius: 75, 
												maxValue: 180, gradientInterval: 45, gradients: [] }
</script>
<script>
var gaugeWidget = angular.module('gaugeWidget', []);
gaugeWidget.directive("gauge", function() {
	return {
		scope: {
			// consists of properties or object passed through the 'slot' into the 'sealed box' 
			specs: '='
			},
		templateUrl: 'Templates/gaugeTemplate.html', 
		link: function(scope, element, attrs) {
			// AngularJS functionality needed to make the directive functional
			for (var value=0, offset=0; 
					value < scope.specs.maxValue; 
						value += scope.specs.gradientInterval, offset += 100/(scope.specs.maxValue/scope.specs.gradientInterval)) {
				scope.specs.gradients.push({ value: value, offset: offset });
			}

			var getCoordinatesForAngle = function(centerX, centerY, radius, angleInDegrees) {
				var angleInRadians = (angleInDegrees-180) * Math.PI / 180.0;
				return {
						x: parseInt(centerX + (radius * Math.cos(angleInRadians))),
						y: parseInt(centerY + (radius * Math.sin(angleInRadians)))
				}
			}

			var getArcPathForAngle = function(startingAngle, endingAngle, radius) {
				var startingPt = getCoordinatesForAngle(scope.specs.centerX,scope.specs.centerY,radius,startingAngle);
				var endingPt = getCoordinatesForAngle(scope.specs.centerX,scope.specs.centerY,radius,endingAngle);	
					
				return ["M", startingPt.x, startingPt.y, "A", radius, radius, 0, 0, 1, endingPt.x, endingPt.y].join(" ");
			}

			var displayGauge = function() {
				scope.value = getArcPathForAngle(0,scope.specs.currentValue, scope.specs.radius);
				scope.background = getArcPathForAngle(0, 180, scope.specs.radius);		
				scope.gradients = getArcPathForAngle(0, 180, scope.specs.radius + 10);	
				
				scope.maxValueCoordinates = getCoordinatesForAngle(scope.specs.centerX,scope.specs.centerY, scope.specs.radius+10, 180);
				var id = scope.specs.id
				scope.dashArray = 'animation: '+id+' .5s linear;	animation-fill-mode: forwards;';

				var arcLength = Math.ceil(scope.specs.currentValue * (Math.PI/180) * scope.specs.radius);
				var animationDefinition = '@keyframes '+id+' { from {stroke-dasharray: 0 '+arcLength+' } to { stroke-dasharray: '+arcLength+' 0; } }';
				document.styleSheets[0].insertRule(animationDefinition,0);
			}
			displayGauge();                            
		}
	}
});
</script>
```
