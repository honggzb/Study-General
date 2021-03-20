How to use/inject Angular service/component/controller in AngularJS

> in index.ts of module directory


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
  .constant('SALE_PROCEEDS_OPTION', Constants.SALE_PROCEEDS_OPTION)
  .component(Components.CgiTaxLossProtection.getName(), new Components.CgiTaxLossProtection())
  .controller(CgiAccountLiquidationRequestDialog.getName(), CgiAccountLiquidationRequestDialog)
  ```
