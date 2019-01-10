````html
<svg xmlns="http://www.w3.org/2000/svg" height="400" width="400">
	<path ng-repeat="slice in specs.slices"  style="opacity: 0.0; {{slice.opacitySetting}}" stroke="{{slice.color}}" 
		fill="{{slice.color}}" stroke-width="0"
		ng-attr-d="M {{specs.centerX}},{{specs.centerX}} l {{slice.x1}},{{slice.y1 * -1}} a{{specs.radius}},{{specs.radius}} 0 0 0 {{slice.x2-slice.x1}},{{(slice.y2-slice.y1) * -1}}" />

	<line ng-repeat="slice in specs.slices" stroke="black" stroke-width="2" 
						ng-attr-x1="{{specs.centerX + slice.ticMark.x - 10}}" ng-attr-y1="{{specs.centerY + (slice.ticMark.y * -1)}}"
						ng-attr-x2="{{specs.centerX + slice.ticMark.x + 10}}" ng-attr-y2="{{specs.centerY + (slice.ticMark.y * -1)}}"
						ng-attr-transform="rotate({{slice.ticMark.rotation * -1}}, {{specs.centerX + slice.ticMark.x}}, {{specs.centerY + (slice.ticMark.y * -1)}})"/>
	<text ng-repeat="slice in specs.slices" ng-attr-x="{{specs.centerX + slice.label.x}}" ng-attr-y="{{specs.centerY + ((slice.label.y - slice.label.adjustment) * -1)}}" 
				style="font-family: arial; font-size: 16pt" text-anchor="{{slice.label.alignment}}">{{slice.label.text}}</text>
</svg>
<script>
$scope.pieChartSpecs1 = {
    centerX: 150, centerY: 150, radius: 100,
    slices: [
        { value: 50, color: '#A62E5C', label: { text: 'North' } },
        { value: 100, color: '#9BC850', label: { text: 'South' } },
        { value: 75, color: '#F15B2A', label: { text: 'East' } },
        { value: 50, color: '#675BA7 ', label: { text: 'West' } }
    ]
};
</script>
<script>
	var pieChartWidget = angular.module('pieChartWidget', []);
	pieChartWidget.directive("pieChart", function() {
		return {
			scope: {
				specs: '='
			},
			templateUrl: 'Templates/pieChartTemplate.html',
			link: function(scope, element, attrs) {
						var x1 = scope.specs.radius, y1 = 0, total = 0, prevEndingAngle = 0;
						angular.forEach(scope.specs.slices, function(slice, i) {
							total += parseInt(slice.value);
						});
						
						angular.forEach(scope.specs.slices, function(slice, i) {
							slice.x1 = x1;
							slice.y1 = y1;
							
							slice.endingAngle = (slice.value/total * 360) + prevEndingAngle; 		
							var radians = slice.endingAngle * (Math.PI/180);
							slice.x2 = (Math.cos(radians) * scope.specs.radius);
							slice.y2 = (Math.sin(radians) * scope.specs.radius);				
							x1 = slice.x2;
							y1 = slice.y2;
							prevEndingAngle = slice.endingAngle;
						});
						
						angular.forEach(scope.specs.slices, function(slice, i) {
							var angle = i == 0 ? slice.endingAngle / 2 : slice.endingAngle - (slice.endingAngle - prevEndingAngle) / 2;
							var radians = angle * (Math.PI/180);
							var ticMarkX = Math.cos(radians) * scope.specs.radius;
							var ticMarkY = Math.sin(radians) * scope.specs.radius;
							var id = scope.specs.id+'_'+i;
							
							slice.opacitySetting = 'animation: '+id+' 1s linear; animation-delay: '+i+'s; animation-fill-mode: forwards';
							var animationDefinition = '@keyframes '+id+'{ from { opacity: 0.0; }  to { opacity: 1.0}; }';
							document.styleSheets[0].insertRule(animationDefinition,0);

							slice.label.x = Math.cos(radians) * (scope.specs.radius + 20);
							slice.label.y = Math.sin(radians) * (scope.specs.radius + 20);
							slice.label.alignment = getAlignment(angle);
							slice.label.adjustment = getAdjustment(angle);
							slice.ticMark = { x: parseInt(ticMarkX), y: parseInt(ticMarkY), rotation: parseInt(angle) };
							prevEndingAngle = slice.endingAngle;
						});
						
						function getAlignment(s) {
							if (s < 45)	return "start";
								else if (s < 135) return "middle";
									else if (s < 225) return "end";
										else if (s < 315) return "middle";
											else return "start";
						}
						
						function getAdjustment(s) {
							return s > 225 && s < 315 ? 15 : 0;
						}					
				}						
		}
});
</script>
```
