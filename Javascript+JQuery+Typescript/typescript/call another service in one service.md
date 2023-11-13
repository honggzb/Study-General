```javascript
onAction(changes: IRowAction<IReportsExtractsRecord>): void {
    this.reportsExtractsService.getExtractParameters(changes.data.reportId).subscribe({
      next: (queryParameters: IReportsExtractsQueryParameters[]) => {
        if (queryParameters[0].queryParameterTypeCode === 'ADV_PRC_TH') {
          queryParameters[0].valueEditor.entity.datasource = (searchString: string) => {
            return this.reportsExtractsService.searchBusinessUnitCodes(searchString);
          };
        }
        this.dialogService.open<IReportsAndExtractsSubmissionRequest>(ReportsExtractsDialogComponent, {
          data: { queryParameters, title: changes.data.reportTitle },
          minWidth: '400px'
        }).subscribe((result) => {
          if (result) {
            this.reportsExtractsService.submitExtract(result, changes.data.reportId).subscribe({
              next: (status: IMessage) => {
                if (status.type === ToastType.Success) {
                  this.router.navigateByUrl('/reports/previous').then(() => this.messageService.success(status.message));
                } else {
                  this.messageService.error(status.message);
                }
              }
            });
          }
        });
      }
    });
  }
```
