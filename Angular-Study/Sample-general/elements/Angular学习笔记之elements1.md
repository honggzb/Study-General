## Create Custom Angular Elements

1. create a angular 7+ project
2. `ng add @angular/elements`
3. create components, such as course-title components
4. edit AppModule to tell angular that course-title components need to build as custom elements

```javascript
import {createCustomElement} from '@angular/elements';
@NgModule({
  //...
  entryComponents: [AppComponent, CourseTitleComponent]
})
export class AppModule {
  constructor(private injector: Injector) {}
  ngDoBootstrap() {
    const el = createCustomElement(AppComponent, { injector: this.injector });
    customElements.define('my-own-element', el);
    const el2 = createCustomElement(CourseTitleComponent, { injector: this.injector });
    customElements.define('hello-world', el2);
  }
}
```

5. run `ng build --prod`, generate javascripts files needed to included elements in any web app, such as
   - main.xxxx.js
   - polyfills.xxxx.js
   - runtime.xxxx.js
   - scripts.xxxx.js
   - style.xxxx.js
6. Optimizing the build process for Custom Elements - not mandatory
   - This is not required, it’s just more convenient to easily distribute your custom elements
   - need [document-register-element](https://github.com/WebReflection/document-register-element) library firstly
   - edit angular.json
   - then run `ng build elements --prod` 
   - it will easy to concatenate all js files

![01 images](https://github.com/honggzb/Study-General/blob/master/Angular-Study/Sample-general/elements/images/elements1.png)
 
```javascript
"elements": {
  "root": "elements/",
  ...
  "architect": {
    "build": {
      ...
      "options":
        ...
        "scripts": [{
              // This is needed for the elements to get registered properly
             "input": "node_modules/document-register-element/build/document-register-element.js"
        }]
      },
      "configurations": {
        "production": {
          ...
          // No hashing makes the file names easy to concatenate
          "outputHashing": "none",
```

7. create a script(build-elements.js) that does the concatenation(all js files)

```javascript
//build-elements.js
const fs = require('fs-extra');
const concat = require('concat');
(async function build() {
  const files = [
    './dist/elements/runtime.js',
    './dist/elements/polyfills.js',
    './dist/elements/scripts.js',
    './dist/elements/main.js',
  ]
  await fs.ensureDir('elements')
  await concat(files, 'elements/elements.js');
  await fs.copyFile('./dist/elements/styles.css', 'elements/styles.css')
  await fs.copy('./dist/elements/assets/', 'elements/assets/' )
})()
```

9. add the following line in package.json

```javascript
"scripts": {
  "build:elements": "ng build elements --prod && node build-elements.js",
```

10. build your elements

   - `ng run build:elements`

![final output](https://github.com/honggzb/Study-General/blob/master/Angular-Study/Sample-general/elements/images/elements2.png)

   - or using shell command, such as 
   - `#!/bin/sh ng build angular-app --prod --output-hashing=none && cat dist/my-elements/runtime.js dist/my-elements/polyfills.js dist/my-elements/scripts.js dist/my-elements/main.js > preview/elements.js`
   - note: using `--output-hashing=none` not to generate any hashing number

11. create a general web and add elements.js to it

```html
<!doctype html>
<html lang="en">
<head>
  <!-- Here I include the CSS and JS for my custom elements -->
  <link type="text/css" href="ng2-training/elements/styles.css">
  <script src="ng2-training/elements/elements.js"></script>
</head>
<body>
  <div>
    Here is an Angular Element:<my-own-element></my-own-element>
  </div>
  <div>
    And here is another one:<hello-world></hello-world>
  </div>
</body>
</html>
```

> References
- https://angular.io/guide/elements
- [How to create Custom Angular Elements?](https://blog.angulartraining.com/tutorial-how-to-create-custom-angular-elements-55aea29d80c5)
- https://github.com/alcfeoh/ng2-training
- [Using Angular Elements — Why and How? — Part 1](https://blog.bitsrc.io/using-angular-elements-why-and-how-part-1-35f7fd4f0457)
