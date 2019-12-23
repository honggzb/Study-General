**[config file sample -protractor.conf.js](https://github.com/honggzb/Study-General/blob/master/Angular-Study/Testing/E2E%20Test/protractor-jasmine.conf.js)**

## Test file structure

```shell
├── e2e/
│   ├── src/
│   │   ├── app.e2e-spec.ts
│   │   ├── app.po.ts
| # for setup
│   │   ├── protractor.conf.js
│   │   └── tsconfig.json
```

## Setup

- `npm i --save typescript @types/jasmine @types/jasminewd2 ts-node`
- JasmineWd is adapter for Jasmine-to-WebdriverJS, which is used by protractor
- JasmineWd features
  - automatically makes tests asynchronously wait util the webDriverJS control flow is empty
  - If a done function is passed to the test, waits for both the control flow and until done is called
  - If a test returns a promise, waits for both the control flow and the promise to resolve
  - Enhances expect so that it automatically unwraps promises before performing the assertion

```javascript
// e2e/tsconfig.json
{
  "extends": "../tsconfig.json",
  "compilerOptions": {
    "outDir": "../out-tsc/e2e",
    "module": "commonjs",
    "target": "es5",
    "types": [ "jasmine", "jasminewd2", "node"]
  }
}
// e2e/protractor.conf.js
framework: 'jasmine',
specs: ['src/**/*.e2e-spec.ts'],
onPrepare: () => {
    require('ts-node').register({
       project: 'tsconfig.json'
    });
}
```

## jasmine2-html-reporter

- `npm i --save-dev protractor-jasmine2-html-reporter`

```javascript
onPrepare: () => {
    jasmine.getEnv().addReporter(
      new Jasmine2HtmlReporter({ savePath: 'e2e/target/screenshots' })
    );
    jasmine.getEnv().addReporter(new SpecReporter({ spec: { displayStacktrace: true } }));
}
```
