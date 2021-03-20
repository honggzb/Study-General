[How to use/inject Angular service/component/controller in AngularJS](#top)

- [index.ts of module directory](#indexts-of-module-directory)
- [Angular class - sleeve-allocator-request-dialog.controller.ts](#angular-class---sleeve-allocator-request-dialogcontrollerts)
- [AngularJS component- account.profile.component.js](#angularjs-component--accountprofilecomponentjs)

## index.ts of module directory

```javascript
export const CgiAccountMaintenance = angular.module('cgiAccountMaintenance', [
    'cgiInvestmentFrameworkManagement',
    'cgiProductDesign',
    'cgiProgrammedTrades',
    'cgiPositionKeeping',
    'cgiWorkflowSharedModule',
    'cgiFeeChangeWorkflowModule',
    'cgiCashWithdrawalWorkflowModule',
  ])
  .service(SleeveAllocatorRequestDialogService.getName(), SleeveAllocatorRequestDialogService)
  .service(SleeveAllocatorOnDemandService.getName(), SleeveAllocatorOnDemandService)
  .constant('SALE_PROCEEDS_OPTION', Constants.SALE_PROCEEDS_OPTION)
  .component(Components.CgiTaxLossProtection.getName(), new Components.CgiTaxLossProtection())
  .controller(CgiAccountLiquidationRequestDialog.getName(), CgiAccountLiquidationRequestDialog)
  ```

 ## Angular class - sleeve-allocator-request-dialog.controller.ts

  ```javascript
export class SleeveAllocatorRequestDialogController {
  constructor(
    private $mdDialog: any,                          // Angular component
    private sleeveAllocatorOnDemandService: any,     // Angular Service
    private accountId: number,
    private options: string[],
    private loaderService: LoaderService,            // Angular Service
  ) {
    //...
  }
  // inject Angular service/component
  static $inject = ['$mdDialog', 'sleeveAllocatorOnDemandService', 'accountId', 'options', LoaderService.getName()];
  //...
}
```

## AngularJS component- account.profile.component.js

```javascript
angular.module('cgiAccountMaintenance')
       .component('cgiAccountProfile', {
            templateUrl: 'modules/account-maintenance/components/cgi-account-page/cgi-account-profile/cgi-account-profile.component.html',
            controller: AccountProfileController,
            controllerAs: 'vm',
             bindings: {
                account: '<',
                accountProgram: '<',
                userPermissions: '<',
                accountId: '<',
                lobConfiguration: '<',
              },
 });
  function AccountProfileController($state, $q, $mdDialog, sleeveAllocatorRequestDialogService, TRADING_STATES) {
  //...
  });
```
