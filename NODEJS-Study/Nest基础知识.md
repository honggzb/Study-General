[Nest基础知识](#top)
  
- [控制器 Controllers](#控制器-controllers)
- [提供者 Providers](#提供者-providers)
- [模块 Module](#模块-module)
- [中间件 Middleware](#中间件-middleware)
- [异常过滤器 Exception filters](#异常过滤器-exception-filters)
- [管道 Pipes](#管道-pipes)
  - [守卫 Guards](#守卫-guards)
  - [拦截器 Interceptors](#拦截器-interceptors)
- [集成MongoDB](#集成mongodb)

----------------------------------------------------------------------

- Nest (NestJS) 是一个用于构建高效、可扩展的Node.js服务器端应用程序的框架。它使用渐进式JavaScript，TypeScript构建并完全支持TypeScript
- 在底层，Nest 使用了强大的 HTTP 服务器框架，比如Express（默认），并且可以选择配置为使用Fastify

## 控制器 Controllers

- ![Controllers](Controllers.png)
- `nest g controller [controllerName]`
  - [快速创建内置验证的 CRUD 控制器](https://docs.nestjs.com/techniques/validation): `nest g resource [name]`
- 作用域: Node.js 不遵循请求/响应多线程无状态模型，其中每个请求都由单独的线程处理。因此，使用**单例实例**对我们的应用程序来说是完全安全的
- 异步: 每个异步函数都必须返回一个Promise

|||
|---|---|
|HTTP 方法提供装饰器|`@Get()`、`@Post()`、`@Put()`、`@Delete()`、`@Patch()`、`@Options()`、`@Head()`、`@All()`|
|路由通配符(?,+,*,())| `@Get('ab*cd')`|
|状态码| `@HttpCode(204)`|
|标头| `@Header('Cache-Control', 'none')`<br> Header从@nestjs/common包中导入|
|重定向|`@Redirect('https://nestjs.com', 301)`|
|路由参数-dynamic data|`@Get(':id')`|
|子域路由|`@Controller({ host: 'admin.example.com' })`|

```ts
import { Controller, Get } from '@nestjs/common';
import { Request } from 'express';
@Controller('cats')
export class CatsController {
  @Get()                                    //HTTP 请求方法装饰器, GET路由
  findAll(@Req() request: Request): string {      //@Req() decorator to the handler's signature
    return 'This action returns all cats';
  }
  // 重定向
  @Get('docs')
  @Redirect('https://docs.nestjs.com', 302)
  getDocs(@Query('version') version) {
    if (version && version === '5') {
      return { url: 'https://docs.nestjs.com/v5/' };
    }
  }
  @Post()
  @HttpCode(204)                           // 状态码
  create(): string {
    return 'This action adds a new cat';
  }
}
```

装饰器列表以及它们所代表的底层平台特定对象的对照列表
|||
|---|---|
|@Request()，@Req()	|req|
|@Response()，@Res()*	|res|
|@Next()|	next|
|@Session()	|req.session|
|@Param(key?: string)	|req.params/req.params[key]|
|@Body(key?: string)	|req.body/req.body[key]|
|@Query(key?: string)	|req.query/req.query[key]|
|@Headers(name?: string)	|req.headers/req.headers[name]|
|@Ip()	|req.ip|
|@HostParam()	|req.hosts|

[⬆ back to top](#top)

## 提供者 Providers

- Provider只是一个用 `@Injectable()` 装饰器注释的类
- 可以通过 `constructor` 注入依赖关系

## 模块 Module

- 模块是具有 @Module() 装饰器的类。 @Module() 装饰器提供了元数据，Nest 用它来组织应用程序结构
- 在Nest中，默认情况下，模块是单例，因此可以轻松地在多个模块之间共享同一个提供者实例
- providers也可以注入到模块(类)中

|||
|---|---|
|providers	|由 Nest 注入器实例化的提供者，并且可以至少在整个模块中共享|
|controllers	|必须创建的一组控制器|
|imports	|导入模块的列表，这些模块导出了此模块中所需提供者|
|exports	|由本模块提供并应在其他模块中可用的提供者的子集|

[⬆ back to top](#top)

## 中间件 Middleware

- ![Middleware](Middleware.png)
- 中间件函数可以执行以下任务:
  - 执行任何代码
  - 对请求和响应对象进行更改
  - 结束请求-响应周期
  - 调用堆栈中的下一个中间件函数
  - 如果当前的中间件函数没有结束请求-响应周期, 它必须调用 next() 将控制传递给下一个中间件函数。否则, 请求将被挂起
- 中间件不能在 @Module() 装饰器中列出。必须使用模块类的 `configure()` 方法来设置它们

```ts
//logger.middleware.ts
import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    console.log('Request...');
    next();
  }
}
// app.module.ts
import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { LoggerMiddleware } from './common/middleware/logger.middleware';
import { CatsModule } from './cats/cats.module';
@Module({
  imports: [CatsModule],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware)
      .forRoutes('cats');
  }
}
```

[⬆ back to top](#top)

## 异常过滤器 Exception filters

- 基础异常类: Nest提供了一个内置的`HttpException`类，它从 @nestjs/common 包中导入。对于典型的基于HTTP REST/GraphQL API的应用程序

```ts
@Get()
async findAll() {
  throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
}
// 响应
{
    "statusCode": 403,
    "message": "Forbidden"
}
//
@Get()
async findAll() {
  throw new HttpException({
    status: HttpStatus.FORBIDDEN,
    error: 'This is a custom message',
  }, HttpStatus.FORBIDDEN);
}
// 响应
{
  "status": 403,
  "error": "This is a custom message"
}
```

[⬆ back to top](#top)

## 管道 Pipes

- ![Pipes](Pipes.png)
- 管道是一个用@Injectable()装饰器注解的类，它实现了PipeTransform接口
- 管道有两个类型:
  - 转换：管道将输入数据转换为所需的数据输出（例如，从字符串到整数）
  - 验证：对输入数据进行验证，如果验证成功继续传递; 验证失败则抛出异常
- 内置管道: `@nestjs/common`包
  - ValidationPipe
  - ParseIntPipe
  - ParseBoolPipe
  - ParseArrayPipe
  - ParseUUIDPipe
  - DefaultValuePipe
  - ParseEnumPipe
  - ParseFloatPipe
- 绑定管道: 在方法参数级别绑定管道

```ts
//
@Get(':id')
async findOne(@Param('id', ParseIntPipe) id: number) {
  return this.catsService.findOne(id);
}
//  通过传递选项来自定义内置管道的行为
@Get(':id')
async findOne(
  @Param('id', new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE }))
  id: number,
) {
  return this.catsService.findOne(id);
}
// ParseUUIDPipe解析字符串参数并验证它是否为 UUID 的示例
@Get(':uuid')
async findOne(@Param('uuid', new ParseUUIDPipe()) uuid: string) {
  return this.catsService.findOne(uuid);
}
```

[⬆ back to top](#top)

## 守卫 Guards

- ![Guards](Guards.png)
- 守卫是一个使用 `@Injectable()` 装饰器的类。 它实现了`CanActivate`接口
- 守卫根据运行时出现的某些条件（例如权限，角色，访问控制列表等）来确定给定的请求是否由路由处理程序处理
  - [在应用程序中实现身份验证机制的真实示例 Authorization](https://docs.nestjs.com/security/authorization)
  - [更复杂的授权示例 Authentication](https://docs.nestjs.com/security/authentication)
- 守卫在每个中间件之后执行，但在任何拦截器或管道之前执行

```ts
// AuthGuard 假设用户是经过身份验证的(因此，请求头附加了一个token)。它将提取和验证token，并使用提取的信息来确定请求是否可以继续
import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Observable } from 'rxjs';
@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    return validateRequest(request);
  }
}
// 基于角色认证, RolesGuard守卫只允许具有特定角色的用户访问
import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Observable } from 'rxjs';
@Injectable()
export class RolesGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    return true;
  }
}
// 绑定守卫 in controller
@Controller('cats')
@UseGuards(new RolesGuard())
export class CatsController {}
// 设置全局守卫1- in main.ts
const app = await NestFactory.create(AppModule);
app.useGlobalGuards(new RolesGuard());
// 设置全局守卫2- app.module.ts
import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
@Module({
  providers: [
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
  ],
})
export class AppModule {}
```

[⬆ back to top](#top)

## 拦截器 Interceptors

- ![Interceptors](Interceptors.png)
- 在函数执行之前/之后绑定额外的逻辑
- 转换从函数返回的结果
- 转换从函数抛出的异常
- 扩展基本函数行为
- 根据特定条件完全重写函数 (例如, 出于缓存目的)

```ts
//logging.interceptor.ts
import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    console.log('Before...');
    const now = Date.now();
    return next
      .handle()
      .pipe(
        tap(() => console.log(`After... ${Date.now() - now}ms`)),
      );
  }
}
// using in controller
@UseInterceptors(new LoggingInterceptor())
export class CatsController {}
// 绑定全局拦截器, 使用 Nest 应用程序实例的 useGlobalInterceptors() 方法 in main.ts
const app = await NestFactory.create(ApplicationModule);
app.useGlobalInterceptors(new LoggingInterceptor());
```

[⬆ back to top](#top)

## 集成MongoDB

- Nest支持两种与 MongoDB 数据库集成的方式
  - 使用内置的TypeORM 提供的 MongoDB 连接器
  - 使用最流行的 MongoDB 对象建模工具 Mongoose

[⬆ back to top](#top)

> References
- [nestjs-official](https://docs.nestjs.com/)
- [Nest中文手册](https://docs.nestjs.cn/10/introduction)
- [Nest官方文档](https://docs.nestjs.com)
- [Nest中文文档](http://static.kancloud.cn/juukee/nestjs/2666734)
