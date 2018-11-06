## Use text to instead of button

![](https://i.imgur.com/AKzUtji.png)

```html
<md-switch ng-model="truthyA" ng-bind="truthyA ? 'TRUE' : 'FALSE'">
      <md-tooltip>sdsd</md-tooltip>
</md-switch>
<md-switch ng-model="truthyB">{{truthyB ? 'TRUE' : 'FALSE'}}</md-switch>
```

