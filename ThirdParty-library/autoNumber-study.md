[autoNumeric.js数字格式化文本](#top)

- [alt的定义](#alt%E7%9A%84%E5%AE%9A%E4%B9%89)
- [Upgrade Autonumeric in AngularJs Directive](#Upgrade-Autonumeric-in-AngularJs-Directive)

## alt的定义

`<input id="text1" value=""  type="text"  alt="p1c3p0s"  />`

alt中一共有7个字符，分别代表了7个格式化属性: 其实主要用到的就是第一个，第二个和第七个

- 第一个:值为'p'(只能输入正数)或者'n'(正负都可以输入) 
- 第二个:值为0-9,分别代表小数点分隔符左边的位数.(当为'0'时可以输入15位整数) 
- 第三个:用做数字分组的分隔符(就是千分位等等用的分隔符) 
  - a:单引号或撇号(计时和角度时可以用) 
  - c:逗号(默认) 
  - p:句号(如果小数点的分隔符也是句号会有冲突) 
  - s:空格号 
  - x:无 
- 第四个:值为2,3(默认),4,用作数字分组的数字个数(如'3'的话为'123,123','4'的话为'12,3123','2'的时候好像是印度那边有这种分法，看原文作者写的) 
- 第五个:小数点的分隔符.值有c(逗号)和p(句号),p为默认. 
- 第六个:小数位的个数 
  - 0:不允许输入小数，也就是说只能输入整数 
  - -9:小数位数(默认为2,如'1.23') 
  - a-Z:包括大小写,它会找id为'dp[a-Z]'的数字输入框，并将里面的数字作为小数的位数，也就是说可以动态修改小数位数. 
- 第七个:九种不同的数字修约规则 
  - S = Round-Half-Up Symmetric (默认，一般四舍五入就用它了) 
  - A = Round-Half-Up Asymmetric 
  - s = Round-Half-Down Symmetric 
  - a = Round-Half-Down Asymmetric 
  - B = Round-Half-Even "Bankers Rounding"(银行家算法?没用过) 
  - U = Round Up "Round-Away-From-Zero"(最大整数时用这个,当然不仅仅是整数范畴，可以精确到小数位) 
  - D = Round Down "Round-Toward-Zero"(最小整数时用这个) 
  - C = Round to Ceiling "Toward Positive Infinity" 
  - F = Round to Floor "Toward Negative Infinity" 

[back to top](#top)

## Upgrade Autonumeric in AngularJs Directive

- https://github.com/autoNumeric/autoNumeric/blob/next/doc/HowToUpgradeToV4.md

```javascript
// 1) updating customized AutoNumeric Directive
(function () {
  'use strict';
  angular.module('cgiW360App').directive('cgiAutonumeric', function () {
    // Declare a empty options object
    var options = {};
    var upgradeOptionsMap = { // from https://github.com/autoNumeric/autoNumeric/blob/next/doc/HowToUpgradeToV4.md
      aSep: 'digitGroupSeparator',
      nSep: 'showOnlyNumbersOnFocus',
      dGroup: 'digitalGroupSpacing',
      aDec: 'decimalCharacter',
      altDec: 'decimalCharacterAlternative',
      aSign: 'currencySymbol',
      pSign: 'currencySymbolPlacement',
      pNeg: 'negativePositiveSignPlacement',
      aSuffix: 'suffixText',
      oLimits: 'overrideMinMaxLimits',
      vMax: 'maximumValue',
      vMin: 'minimumValue',
      mDec: 'decimalPlacesOverride', //'decimalPlaces'
      eDec: 'decimalPlacesShownOnFocus',
      scaleDecimal: 'decimalPlacesShownOnBlur',
      aStor: 'saveValueToSessionStorage',
      mRound: 'roundingMethod',
      aPad: 'allowDecimalPadding',
      nBracket: 'negativeBracketsTypeOnBlur',
      wEmpty: 'emptyInputBehavior',
      lZero: 'leadingZero',
      aForm: 'formatOnPageLoad',
      sNumber: 'selectNumberOnly',
      anDefault: 'defaultValueOverride',
      unSetOnSubmit: 'unformatOnSubmit',
      outputType: 'outputFormat',
      debug: 'showWarnings'
    };
    return {
      // Require ng-model in the element attribute for watching changes.
      require: '?ngModel',
      // This directive only works when used in element's attribute (e.g: cgi-autonumeric)
      restrict: 'A',
      scope: { currencyOptions: '=' },
      compile: function (tElm, tAttrs) {
        //var isTextInput = tElm.is('input:text');
        var isTextInput = tElm && tElm.length > 0 ? tElm[0].tagName === 'INPUT' && tElm[0].type === 'text' : false;
        return function (scope, elm, attrs, controller) {
          // Get instance-specific options.
          var properties = Object.keys(scope.currencyOptions || {});
          // defining newKey to instead of oldkey
          for (var i = 0; i < properties.length; i++) {
            var oldKey = properties[i];
            var newKey = upgradeOptionsMap[oldKey];
            if (newKey) {
              scope.currencyOptions[newKey] = scope.currencyOptions[oldKey];
              delete scope.currencyOptions[oldKey];
            }
          }
          var opts = angular.extend({}, options, scope.currencyOptions);

          // Initialize element as autoNumeric with options.
          // elm.autoNumeric('init', opts);
          var anElement = new Autonumeric(elm[0], opts);
          // if element has controller, wire it (only for <input type="text" />)
          if (controller && isTextInput) {
            // watch for external changes to model and re-render element
            scope.$watch(tAttrs.ngModel, function () {
              controller.$render();
            });
            // render element as autoNumeric
            controller.$render = function () {
              updateElement(elm, controller.$viewValue);
            };
            // Detect changes on element and update model.
            elm.on('keypress', function () {
              scope.$apply(function () {
                //controller.$setViewValue(elm.autoNumeric('get'));
                controller.$setViewValue(anElement.getNumericString());
              });
            });
            elm.on('keydown', function () {
              scope.$apply(function () {
                //controller.$setViewValue(elm.autoNumeric('get'));
                controller.$setViewValue(anElement.getNumericString());
              });
            });
            elm.on('keyup', function () {
              scope.$apply(function () {
                //controller.$setViewValue(elm.autoNumeric('get'));
                controller.$setViewValue(anElement.getNumericString());
              });
            });
          } else {
            // Listen for changes to value changes and re-render element.
            // Useful when binding to a readonly input field.
            if (isTextInput) {
              attrs.$observe('value', function (val) {
               // updateElement(elm, val);
                updateElement(elm[0], val);
              });
            }
          }
          // Helper method to update autoNumeric with new value.
          function updateElement(element, newVal) {
            // Only set value if value is numeric
            //if ($.isNumeric(newVal)) {
            //  element.autoNumeric('set', newVal);
            if (_.isNumber(newVal)) {
              anElement.set(newVal);
            } else if (typeof newVal === 'string') {
              newVal = newVal.replace(/[^0-9\.-]+/g, '');
              //element.autoNumeric('set', newVal);
              anElement.set(newVal);
            }
            if (newVal === null || newVal === undefined || newVal === '') {
              //element.autoNumeric('set', '');
              anElement.set('');
            }
          };
        };
      }  // compile
    };  // return
  });
})();
/* 2) updating if using AutoNumeric directly in other Directive */
// old code
 element.autoNumeric('init', {
    aSep: thousandsDelimiter,
    aDec: decimalDelimiter,
    // aSign: currencySym,
    nBracket: '(,)',
    vMin: _min,
    vMax: _max
})
// new Code
new Autonumeric(element[0], {
    digitGroupSeparator: thousandsDelimiter,
    decimalCharacter: decimalDelimiter,
    negativeBracketsTypeOnBlur: '(,)',
    maximumValue: _max,
    minimumValue: _min
});
```

[back to top](#top)
