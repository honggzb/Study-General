### Rxjs subject to avoid multiple calling

- define a `BehaviorSubject` and a Observable variable which return this `BehaviorSubject` in service
- in component 1: call BehaviorSubject
- in component 2: call normal method

```javascript
// in service - defining
private accountProgramSubject$ = new BehaviorSubject<AccountProgramEntity>(undefined);      //1. define a BehaviorSubject
get accountProgramDetail$(): Observable<AccountProgramEntity> {                             //2. get a Observable variable which return BehaviorSubject
    return this.accountProgramSubject$.pipe(filter(accountProgram => !!accountProgram));
}
getAccountProgramDetail(accountProgramCode: string): Observable<AccountProgramEntity> {
    this.destroy();
    return this.get<{ accountProgramEntity: IAccountProgramEntity }>([this.ACCOUNTS_PROGRAM_URL, accountProgramCode]).pipe(
      map((response: { accountProgramEntity: IAccountProgramEntity }) => {
        const accountProgram = new AccountProgramEntity(response.accountProgramEntity);
        this.accountProgramSubject$.next(accountProgram);     //accountProgramSubject$.next
        return accountProgram;
      }));
}
destroy(): void {
    this.accountProgramSubject$.next(undefined);                          //importantce
}
// in component 1- calling
this.accountService.accountDetail$.pipe(
      takeUntil(this.destroy$),                                              // importance
      switchMap(account => {
        return this.accountProgramService.accountProgramDetail$.pipe(
          takeUntil(this.destroy$),                                           // importance
          map(accountProgram => ({ account, accountProgram }))
        );
      }))
      .subscribe(({ account, accountProgram }) => {
        if (!isNil(account)) {
          this.account = account;
          this.accountProgram = accountProgram;
        }
      });
private readonly destroy$ = new Subject<boolean>();
ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.complete();
    this.destroy$.unsubscribe();
}
// in component 2- calling
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
          this.account = account;
          this.accountProgram = accountProgram;
        }
      }, error: (e) => {
        throwError(e);
      },
    });
    
 ngOnDestroy(): void {
    this.accountService.destroy();
    this.accountProgramService.destroy();
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
 }
```
