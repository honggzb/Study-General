## Note

- Upgrade according to o[ffical upgrade guide](https://angular.dev/update-guide)
- Upgrade step by step
  - 11 -> 12
  - 12 -> 13
  - ...
  - 16-> 17
- need Upgrade Angular CLI step by step
  - `npm uninstall -g @angular/cli`
  - `ng update @angular/core@12 @angular/cli@12`
  - ...
- Need upgrade Nodejs sometime
  - `npm cache clean -f`
  - `npm install -g n`
- note to check third-part library and their dependency
  - `npm uninstall bootstrap @ng-bootstrap/ng-bootstrap`
  - `npm i bootstrap@xxx @ng-bootstrap!xxx`

## Migration an existing Angular project to standalone

1. `ng g @angular/core:control-flow`:
   - turn template to use `@if` ...
2. `ng g @angular/core:standalone` --> choose 'convert all components, directives and pipe to standalone' --> turn all component,directives and pipe to standalone except app component
3. run `ng g @angular/core:standalone` again --> choose 'remove unnessary NgModule classes' --> remove all modules expect app.module
4. run `ng g @angular/core:standalone` again --> choose 'bootstrap the applicaton using standalone APIs'
5. rename 'app-routes.module.ts' to 'app-routes.ts' and modify this file
   - import this file in 'main.ts'
6. [Migrate an existing Angular project to standalone(https://angular.dev/reference/migrations/standalone)

> References
- [Migrate An Angular 11 Project to 17: Step-by-Step Guide](https://www.youtube.com/watch?v=fbCfniJT_JA)
- [Angular 18 Upgrade Guide: Everything You Need to Know](https://www.youtube.com/watch?v=OALcxBzNEUE)
- [Upgrade Angular to v17 | Angular Migration step by step to latest version | Angular Upgrade Tips](https://www.youtube.com/watch?v=k9RYmSO0wvc)
