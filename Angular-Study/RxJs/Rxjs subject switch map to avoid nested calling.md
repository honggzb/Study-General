### Rxjs subject switch map to call another observable

```javascript
private _confirm$ = new Subject();
private _destroy$ = new Subject();
ngOnInit() {
    this._confirm$.pipe(
        takeUntil(this._destroy$),
        tap((v) => console.log('[SUB]', v)),
        switchMap((v: any) => this.secondCall())
      ).subscribe();
}
secondCall() {
    console.log('[SECOND CALL]');
    return of();
}
callSub() {
    console.log('[NEXT VALUE]');
    this._confirm$.next('value');
}
ngOnDestroy() {
   this._destroy$.next(null);
   this._destroy$.complete();
   console.log('[NG ON DESTROY]');
}
```

### Rxjs subject switch map to call another observable with parameter

```javascript
this.route.params.pipe(
      takeUntil(this.destroy$),
      switchMap(params => {
        return this.accountService.getAccountDetail(params['id']);
      }),
      switchMap((account) => {
        return this.accountProgramService.getAccountProgramDetail(account.accountProgramCode)
                   .pipe(map(accountProgram => ({ account, accountProgram })));
      })
    ).subscribe({
      next: ({ account, accountProgram }) => {
        if (!!account) {
          this.title = account.getFullName();
          this.breadcrumbs = [
            new BreadcrumbItem({ path: 'accounts', label: $localize`Accounts` }),
            new BreadcrumbItem({ label: this.title })];
          this.setHeadstoneItems(account);
          this.account = account;
          this.planTypeBorNumber = account.getPlanTypeBorNumber();
          this.accountProgram = accountProgram;
          this.umaAllocationTabPermissionCheck();
        }
      }, error: (e) => {
        throwError(e);
      },
    });
```

> Reference
- [Rxjs subject switch map to call another observable](https://stackoverflow.com/questions/70196361/rxjs-subject-switch-map-to-call-another-observable)
