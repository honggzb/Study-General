[Angular Material Textarea](#top)

- [AngularJs textarea](#angularjs-textarea)
- [AngularJs Material textarea](#angularjs-material-textarea)
- [Angular Material textarea](#angular-material-textarea)
  - [General](#general)
  - [Using Custom ErrorStateMatcher](#using-custom-errorstatematcher)
  - [Using CdkTextareaAutosize to automatically resize a textarea](#using-cdktextareaautosize-to-automatically-resize-a-textarea)
  - [Create readonly Textarea](#create-readonly-textarea)

**The `resize` property is not supported by IE11**

## AngularJs textarea

https://codepen.io/kpourdeilami/pen/KDepk

```html
<style>
textarea {
  height:auto;
  max-width:600px;
  color:#999;
  font-weight:400;
  font-size:30px;
  font-family:'Ubuntu', Helvetica, Arial, sans-serif;
  width:100%;
  background:#fff;
  border-radius:3px;
  line-height:2em;
  border:none;
  box-shadow:0px 0px 5px 1px rgba(0,0,0,0.1);
  padding:30px;
  -webkit-transition: height 2s ease;
  -moz-transition: height 2s ease;
  -ms-transition: height 2s ease;
  -o-transition: height 2s ease;
  transition: height 2s ease;
}
* { -webkit-font-smoothing:antialiased !important; }
</style>
<textarea id="TextArea" ng-model="loremIpsum" ng-keyup="autoExpand($event)" placeholder="This is an auto expanding textarea with just angularjs ... try typing something.">
<script>
var app = angular.module('myApp', []);
app.controller('AppCtrl', ['$scope', '$http', '$timeout', function($scope, $http, $timeout) {
  // Load the data
  $http.get('http://www.corsproxy.com/loripsum.net/api/plaintext').then(function (res) {
		$scope.loremIpsum = res.data;
    $timeout(expand, 0);
  });
  $scope.autoExpand = function(e) {
        var element = typeof e === 'object' ? e.target : document.getElementById(e);
    		var scrollHeight = element.scrollHeight -60; // replace 60 by the sum of padding-top and padding-bottom
        element.style.height =  scrollHeight + "px";    
    };
  function expand() {
    $scope.autoExpand('TextArea');
  }
}]);
</script>
```

## AngularJs Material textarea

- [Textarea directive](https://material.angularjs.org/latest/api/directive/mdInput)
- By default the textarea grows as the user types. This can be **disabled** via the `md-no-autogrow` attribute
- If a textarea has the `rows` attribute, it will treat the `rows` as the minimum height and will continue growing as the user types. For example a textarea with `rows="3"` will be 3 lines of text high initially. **If no rows are specified, the directive defaults to 1**
- The textarea's height gets set on initialization, as well as while the user is typing. In certain situations (e.g. while animating) the directive might have been initialized, before the element got it's final height. In those cases, you can trigger a resize manually by broadcasting a `md-resize-textarea` event on the scope
- If you want a textarea to stop growing at a certain point, you can specify the `max-rows` attribute.
- The textarea's bottom border acts as a handle which users can drag, in order to resize the element vertically. **Once the user has resized a textarea, the autogrowing functionality becomes disabled**. If you don't want a textarea to be resizeable by the user, you can add the `md-no-resize` attribute

## Angular Material textarea

### General

- Angular Material provides `MatInput` Directive to create `<input>` and `<textarea>` element with a `MatFormField`
- Angular Component Dev Kit (CDK) provides `CdkTextareaAutosize` Directive to automatically resize a textarea to fit its content. 
  - `cdkTextareaAutosize` property to enable autosizing
  - `cdkAutosizeMinRows` property to define minimum amount of rows
  - `cdkAutosizeMaxRows` property to define maximum amount of rows in the textarea for autosizing. 
  - `resizeToFitContent()` method to resize the text area to fit its content
  - `reset()` method to reset the textarea to original size
- `MatInput` has following properties
  - `errorStateMatcher`: object to control when error messages are shown
  - `readonly`: Boolean value to know if element is readonly
  - `type`: It gives input type of the element
  - `errorState`: Boolean value to know if control is in error state or not
- `mat-error` and `mat-form-field` associates error messages with `matInput`. By default errors are shown in the state of invalid control, touched or form submitted
  
```html
<mat-form-field>
  <textarea matInput placeholder="Comment" [formControl]="commentFC" (change)="onCommentChange()"></textarea>
  <mat-error *ngIf="commentFC.hasError('required')">Comment is required.</mat-error>
  <mat-error *ngIf="commentFC.hasError('maxlength')">Max length is 30.</mat-error>        
</mat-form-field> 
<script>
commentFC = new FormControl('', [
  Validators.required, 
  Validators.maxLength(30)
]); 
onCommentChange() {
  console.log(this.commentFC.value);
} 
</script>
```

### Using Custom ErrorStateMatcher

- use **ErrorStateMatcher** to change default behavior when to show error
- `ErrorStateMatcher` has `isErrorState()` method that accepts FormControl and FormGroupDirective or NgForm as arguments and returns Boolean. 
- To create custom ErrorStateMatcher class, we need to implement **ErrorStateMatcher and override isErrorState()**
  - If isErrorState() returns true, error will be shown and if false then error will not be shown. To 
  - use it with `<input>` and `<textarea>` input, `MatInput` Directive provides `errorStateMatcher` property. We need to assign the object of custom `ErrorStateMatcher` to `errorStateMatcher` property

```html
<mat-form-field>
 <textarea matInput placeholder="Comment" [formControl]="commentFC" [errorStateMatcher]="esMatcher" (change)="onCommentChange()"> </textarea>
 <mat-error *ngIf="commentFC.hasError('required')"> Comment is required. </mat-error>
 <mat-error *ngIf="commentFC.hasError('maxlength')"> Max length is 30. </mat-error>        
</mat-form-field> 
<script>
import { ErrorStateMatcher } from '@angular/material/core';
import { FormControl, FormGroupDirective, NgForm } from '@angular/forms';
export class CustomErrorStateMatcher implements ErrorStateMatcher {
    isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
      const isSubmitted = form && form.submitted;
      return (control.invalid && (control.dirty || control.touched || isSubmitted));
    }
} 
// create an instance of CustomErrorStateMatcher
esMatcher = new CustomErrorStateMatcher(); 
//To use custom ErrorStateMatcher globally, configure provider in application module
providers: [
  {provide: ErrorStateMatcher, useClass: CustomErrorStateMatcher}
] 
</script>
```

### Using CdkTextareaAutosize to automatically resize a textarea

- `CdkTextareaAutosize` Directive is used to automatically resize a textarea to fit its content

```html
<mat-form-field>
  <textarea matInput placeholder="Description" [formControl]="descFC" 
            cdkTextareaAutosize cdkAutosizeMinRows="2" cdkAutosizeMaxRows="5" #autosize="cdkTextareaAutosize"
            (change)="onDescChange()"></textarea>
  <mat-error *ngIf="descFC.hasError('required')">Description is required.</mat-error>
</mat-form-field>
<script>
descFC = new FormControl('', [Validators.required]);
//declared in CdkTextareaAutosize Directive
@ViewChild('autosize') 
txtAreaAutosize: CdkTextareaAutosize;
@Input('cdkTextareaAutosize')
get enabled(): boolean { return this._enabled; }  // enabled property to know if autosize is enabled or not
@Input('cdkAutosizeMinRows')
get minRows(): number { return this._minRows; }   // minimum amount of rows in the textarea for autosizing
@Input('cdkAutosizeMaxRows')
get maxRows(): number { return this._maxRows; }   //maximum amount of rows in the textarea for autosizing

onDescChange() {
  console.log("enabled: "+ this.txtAreaAutosize.enabled);
  console.log("minRows: "+ this.txtAreaAutosize.minRows);
  console.log("maxRows: "+ this.txtAreaAutosize.maxRows);
  console.log("Description: "+ this.descFC.value);
} 
</script>
```

- `resizeToFitContent()` method is used to resize the text area to fit its content, It accepts Boolean value. 
  - By passing true we can force a height calculation.
  - By default, height calculation is performed only when value changed since the last call
- `reset()` method is used to resets the textarea to original size

```html
<div>
  <mat-form-field [style.fontSize]="fontSize.value">
    <textarea matInput placeholder="Content" [formControl]="contentFC" 
            cdkTextareaAutosize cdkAutosizeMinRows="2" cdkAutosizeMaxRows="5"
            #cfcAutosize="cdkTextareaAutosize"></textarea>
  </mat-form-field>
</div>
<div><button mat-button (click)="resetTextAreaSize()">Reset Textarea Size</button></div><br/>
<div>  
  <mat-form-field>
    <mat-label>Select Font size</mat-label>
    <mat-select #fontSize value="15px" (selectionChange)="resizeTextArea()">
      <mat-option value="10px">10px</mat-option>
      <mat-option value="15px">15px</mat-option>
      <mat-option value="20px">20px</mat-option>
    </mat-select>
  </mat-form-field>
</div> 
<script>
// NgZone is an injectable service for executing work inside or outside of the Angular zone
constructor(private ngZone: NgZone) {} 
contentFC = new FormControl();

@ViewChild('cfcAutosize') 
contentFCAutosize: CdkTextareaAutosize;

resizeTextArea() {
  this.ngZone.onStable.pipe(take(1))
	.subscribe(() => this.contentFCAutosize.resizeToFitContent(true));
}
resetTextAreaSize() {
  this.contentFCAutosize.reset();
} 
</script>
```

### Create readonly Textarea

use `readonly` property with `<textarea>` element

```html
<mat-form-field>
  <textarea matInput readonly
            cdkTextareaAutosize cdkAutosizeMinRows="2" cdkAutosizeMaxRows="5">
    Text Line 1
    Text Line 2
    Text Line 3
  </textarea>
</mat-form-field> 
```

[Angular Material Textarea](https://www.concretepage.com/angular-material/angular-material-textarea#CdkTextareaAutosize)
