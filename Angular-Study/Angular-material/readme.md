[CDK - Component Dev Kit](#top)

- [1. Angular Material setup](#setup)

<h2 id="setup">1. Angular Material setup</h2>

```shell
# install angular material and angular CDK
npm i --save @angular/material @angular/cdk
# add to styles.css
@import "~@angular/material/prebuilt-themes/indigo-pink.css";
# (Optional): Add Material Icons: add to index.html
<link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
# Animations
npm i --save @angular/animations
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
@NgModule({
  ...
  imports: [BrowserAnimationsModule],
  ...
})
# Gesture
npm i --save hammerjs
```

**cdk - overlap**

 
**Virtual Scrolling Problems:**

- slow inital rendering
- laggy scrolling
- dirty checking on each one of context could be expensive


> References
> - Material Design components for Angular https://material.angular.io
> - [demo-app for Material Design components](https://github.com/angular/material2/tree/31fd6a216b4155a219bb3c3f4eadb9dfa7c12ac0/src/demo-app)
> - [EASY DIALOGS WITH ANGULAR MATERIAL](https://blog.thoughtram.io/angular/2017/11/13/easy-dialogs-with-angular-material.html)
> - [CUSTOM OVERLAYS WITH ANGULAR'S CDK](https://blog.thoughtram.io/angular/2017/11/20/custom-overlays-with-angulars-cdk.html)
> - []()
