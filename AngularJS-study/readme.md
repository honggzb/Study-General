## Setup AngularJS Project in Visual Studio

- AngularJS Library:
    - angularjs.org
    - CDN: https://ajax.googleapis.com/ajax/libs/angularjs/1.3.16/angular.min.js
- http-server
  `npm i http-server --save`, `npm start`

- Plugin
    - Debugger for Chrome
    - Prettier Code Formatter
    - Angular Language Service
    - TS Lint {for typescript}

## Creating Debug Configuration - Debugger for Chrome

- install plugin: Debugger for Chrome
- open the debug panel: 'Ctrl+Shift+D'
- Click a gear icon -> choose chrome -> launch.json will show
- update the port from 8080 to 4200
- add a breakpoint inside of the component and run `ng serve`
- launch the debugger -> 'F5' / green arrow
- Refresh the page and you should hit your breakpoint

> References
> - [Using Angular in Visual Studio Code](https://code.visualstudio.com/docs/nodejs/angular-tutorial)
> - [AngularJS Tutorials-VS+Asp.net](http://www.tutorialsteacher.com/angularjs/angularjs-development-environment)


## Angular in Visual Studio Code

- open Angular application in VS Code, open another terminal
    - `cd my-app`
    - `code .`
- IntelliSense  ->  hover mouse over text in the file
- Go to Definition -> F12
- Peek Definition  -> Ctrl+Shift+F12  <- 'Escape' to close the Peek window
