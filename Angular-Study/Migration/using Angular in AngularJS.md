[How to use/inject Angular service/component/controller in AngularJS](#top)

- [Project structure](#project-structure)
- [index.ts of module directory](#indexts-of-module-directory)
- [Angular class - sleeve-allocator-request-dialog.controller.ts](#angular-class---sleeve-allocator-request-dialogcontrollerts)
- [AngularJS component- account.profile.component.js](#angularjs-component--accountprofilecomponentjs)
- [AngularJS service](#angularjs-service)

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

[back to top](#top)

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

[back to top](#top)

## AngularJS service

1. inject in core.module.ts
2. inject to Angular(upgrade-providers/index.ts)
3. use in Angular service

```javascript
// using download.service.js in process-monitor.service.ts
// 1) core.module.ts
@NgModule({
  imports: [
  ],
  declarations: [],
  providers: [
    {
    provide: Providers.ng2DownloadService,
    useFactory: (injector: Injector): void => injector.get('download'),
    deps: ['$injector'],
    },
    //...
  ]
})
//2) upgrade-providers/index.ts
export const ng2DownloadService = new InjectionToken('download');
//3) process-monitor.service.ts
import { Inject, Injectable } from '@angular/core';
import { ng2DownloadService } from '../../upgrade-providers/index';
//..
export class ProcessMonitorService {
  constructor(@Inject(ng2DownloadService) private downloadService: any) { }
  //..
  downloadFile(prcExecId: any): void {
    //...
    this.downloadService.getFile('bulkprocessingmaintenance', payload);
  }
  //...
}
```

[back to top](#top)
