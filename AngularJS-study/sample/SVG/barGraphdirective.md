```html
<svg xmlns="http://www.w3.org/2000/svg" width="250" height="250">
	<g ng-repeat="bar in specs.bars">
		<text ng-attr-x="0" 
			ng-attr-y="{{((1 * specs.height + specs.padding) * $index) + (specs.height/2) + (specs.fontHeight/2)}}" 
				text-anchor="start"
					style="font-family: arial; font-size: 10pt">
			{{bar.text}}
		</text>
		<rect ng-attr-x="{{specs.labelWidth}}" style="{{bar.barStyle}}"
				ng-attr-y="{{(1 * specs.height + specs.padding) * $index}}" 
						fill="{{bar.color}}" 
								ng-attr-width="{{bar.width}}" ng-attr-height="{{specs.height}}"/>
	</g>
	<line ng-attr-x1="{{specs.labelWidth}}" ng-attr-y1="0" ng-attr-x2="{{specs.labelWidth}}" 
			ng-attr-y2="{{specs.overallHeight}}" 
					style="stroke:black; stroke-width:1px"/>
	<line ng-attr-x1="{{specs.labelWidth}}" ng-attr-y1="{{specs.overallHeight}}" 
					ng-attr-x2="{{specs.overallWidth + specs.labelWidth}}" 
					ng-attr-y2="{{specs.overallHeight}}" style="stroke:black; stroke-width:1px"/>
						
	<text ng-repeat="gradient in specs.gradients" 
			ng-attr-x="{{specs.labelWidth + gradient.offset}}"  
				ng-attr-y="{{((1 * specs.height + specs.padding) * specs.bars.length) + specs.fontHeight + 3}}" 
					text-anchor="middle" style="font-family: arial; font-size: 10pt">{{gradient.text}}</text>
</svg>
<!-- another sample with animation -->
<svg xmlns="http://www.w3.org/2000/svg" width="250" height="250">
	<rect ng-repeat="bar in specs.bars" id="{{bar.id}}" style="{{bar.animationParameters}}" 
			x="20" ng-attr-y="{{20 * $index}}" fill="{{bar.color}}" ng-attr-width="{{bar.width}}" height="20"/>		
</svg>
<script>
$scope.barGraphSpecs1 = {
    id: 'bg1', height: 30, padding: 5, fontStyle: '10pt arial', fontHeight: 10,
    gradientInterval: 50, gradients: [],
    bars: [
        { color: '#2A9FBC', width: 50, text: 'September' },
        { color: '#F15B2A', width: 60, text: 'October' },
        { color: '#A62E5C', width: 90, text: 'November' }
    ]
};
</script>
<script>
var barGraphWidget = angular.module('barGraphWidget', []);
barGraphWidget.directive("barGraph", function() {
	return {
		scope: {
			specs: '='								
		},
		templateUrl: 'Templates/barGraphTemplate.html',
		link: function(scope, element, attrs) {
			var ctx = document.createElement('canvas').getContext('2d');
			var gradients = [];
			
			ctx.font = scope.specs.fontStyle;
			scope.specs.labelWidth = 0;
			scope.specs.overallWidth = 0;												
			angular.forEach(scope.specs.bars, function(bar, index) {
				scope.specs.labelWidth = Math.max(scope.specs.labelWidth, ctx.measureText(bar.text).width);
				scope.specs.overallWidth = Math.max(scope.specs.overallWidth, bar.width);
				var id = scope.specs.id+'_'+index;
				bar.barStyle = 'animation: '+id+' .5s linear; animation-fill-mode: forwards';
				var animationDefinition = '@keyframes '+id+' { from { width: 0px; }  to { width: '+bar.width+'px; } }';
				document.styleSheets[0].insertRule(animationDefinition,0);				
			});
			for (var i=0; ; i+=scope.specs.gradientInterval) {
				gradients.push({ text: i, offset: i});
				if (i > scope.specs.overallWidth)
					break;
			}
			scope.specs.gradients = gradients;
			
			scope.specs.overallHeight = scope.specs.bars.length * 
								(1 * scope.specs.height + scope.specs.padding);
		}
	}
})
</script>
```
