[How to use/inject Angular service/component/controller in AngularJS](#top)

- [index.ts of module directory](#indexts-of-module-directory)
- [sleeve-allocator-request-dialog.controller.ts](#sleeve-allocator-request-dialogcontrollerts)
- [component.js](#componentjs)

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

  ## sleeve-allocator-request-dialog.controller.ts

  ```javascript
export class SleeveAllocatorRequestDialogController {
  constructor()
    private sleeveAllocatorOnDemandService: any,     // Angular Service
    private loaderService: LoaderService,            // Angular Service
  ) {
    //...
  }
  // inject Angular service/component
  static $inject = ['$mdDialog', 'sleeveAllocatorOnDemandService', LoaderService.getName()];
  //...
}
```

## component.js

```javascript
  function AccountProfileController($state, $q, $mdDialog, sleeveAllocatorRequestDialogService, TRADING_STATES) {
  //...
  });
```
