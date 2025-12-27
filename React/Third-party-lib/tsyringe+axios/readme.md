## axios + tsyringe

```
- src\services\http-service\http-service.interface.ts   --> HttpService interface --> 
- src\services\http-service\generic-http-service.ts     --> GenericHttpService --> 
- src\services\http-service\http.service.ts             --> HttpService    -->
- src\services\http-service\register-service.ts         --> 
  - `import { container, instanceCachingFactory } from 'tsyringe';`
  - `registerService, registerAndResolveService`

others service   <-- 

- `constructor() { this.api = registerAndResolveService<DviApiService>(DviApiService) }`
- `asynic getxxxAttributes() {...}`

hooks   <--
- `import { container, instanceCachingFactory } from 'tsyringe';`
- `export function usexxxService(){ return container.resolve<DviService>(DviService.TOKEN); }`
```
