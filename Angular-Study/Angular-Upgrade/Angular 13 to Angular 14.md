## Angular 13 to Angular 14

1. 步骤一: `ng update @angular/core@14 @angular/cli@14 --force`
   - 该步骤会更新所有Angular的组件到14。
   - 注意，不加–force无法正常升级。
   - 同时，还要事前事后都要commit一次。
2. 步骤二: ng update @angular/material@14 --force
   - 该步骤只适用于使用了Angular Material的项目
3. 步骤三: `ng update @angular-eslint/schematics@14`
   - 该步骤是更新eslint。可以跟步骤一合并。
4. 步骤四：更新一些别的非Angular官方的组件
   - `npm i @angular/flex-layout@14.0.0-beta.41 ngx-markdown@14.0.1`
   - 奇怪的是，Angular/flex-layout在NPM上被标注为了depreciated，指向了国内无法访问的
5. 步骤五：更新typescript到4.6。官方文档说，Angular 14支持4.6，没必要安装更新的Typescript版本，免得无谓的不兼容问题。
   - npm install typescript@4.6.4 -D
6. 步骤六，更新代码：
   - If you are using MatVerticalStepper or MatHorizontalStepper make sure you switch to MatStepper
7. 步骤七：现在可以启动程序了npm run start或者ng serve
   - 另外一个问题，如果使用了moment、lodash这样的库，会报出一条warning：
   - material-moment-adapter.mjs depends on ‘moment’. CommonJS or AMD dependencies can cause optimization bailouts
   - 答案是去更新Angular.json  - `"allowedCommonJsDependencies": ["lodash","moment"]`
   - [官方文档](https://angular.io/guide/build#configuring-commonjs-dependencies)

> references
- [官方升级文档](https://update.angular.io/)
- [Angular：升级Angular 13到Angular 14](https://blog.csdn.net/alvachien/article/details/127602168)
