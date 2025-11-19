[在Next.js中集成swagger文档](#top)

- [工具](#工具)
- [next-swagger-doc](#next-swagger-doc)
- [手动生成](#手动生成)

------------------------------------------------------------

## 工具

- 如果用Next.js的API Routes（即 'app/api/*' 目录下的接口），完全可以结合 swagger 来做 API 文档。常见做法有两种：
  - 使用工具自动生成 swagger
  - 手动写 OpenAPI 文件
- [tsoa](https://github.com/lukeautry/tsoa)
- [zod-to-openapi](https://www.npmjs.com/package/zod-to-openapi): 如果用了 Zod 校验
- [next-swagger-doc](https://www.npmjs.com/package/next-swagger-doc): 专门为 Next.js 封装的工具

## next-swagger-doc

1. `npm i next-swagger-doc`
2. 创建'lib/swagger.ts': Swagger Spec
3. 创建 Swagger UI Component: next-swagger-doc 用的是 [swagger-ui-react](https://www.npmjs.com/package/swagger-ui-react)
   1. `npm i swagger-ui-react`
   2. 创建 'app/api-doc/react-swagger.tsx' 文件
4. 创建API文档页面: 创建 'app/api-doc/page.tsx' 文件
5. 添加接口文档注释: 添加后swagger文档的可读性更高
6. 访问 `http://localhost:3000/api-doc` 查看接口文档
7. [Next.js 的项目例子](https://github.com/jellydn/next-swagger-doc/tree/main/examples)

```ts
// 2. lib/swagger.ts
import { createSwaggerSpec } from 'next-swagger-doc';

import 'server-only';

export const getApiDocs = async () => {
  const spec = createSwaggerSpec({
    apiFolder: 'app/api',
    definition: {
      openapi: '3.0.0',
      info: {
        title: 'Next Swagger API Example',
        version: '1.0',
      },
      components: {
        securitySchemes: {
          BearerAuth: {
            type: 'http',
            scheme: 'bearer',
            bearerFormat: 'JWT',
          },
          OAuth2: {
            type: 'oauth2',
            flows: {
              authorizationCode: {
                authorizationUrl: 'https://example.com/oauth/authorize',
                tokenUrl: 'https://example.com/oauth/token',
                scopes: {
                  read: 'Grants read access',
                  write: 'Grants write access',
                },
              },
            },
          },
        },
      },
      security: [],
    },
  });
  return spec;
};
// 3. app/api-doc/react-swagger.tsx
'use client';
import SwaggerUI from 'swagger-ui-react';
import 'swagger-ui-react/swagger-ui.css';
type Props = {
    spec: Record<string, any>;
};
function ReactSwagger({ spec }: Props) {
    // @ts-ignore - SwaggerUI is not typed
    return <SwaggerUI spec={spec} />;
}
export default ReactSwagger;
// 4. app/api-doc/page.tsx 文件
import { getApiDocs } from '@/lib/swagger';
import ReactSwagger from './react-swagger';
export default async function IndexPage() {
  const spec = await getApiDocs();
  return (
    <section className="container">
      <ReactSwagger spec={spec} />
    </section>
  );
}
//5. 添加接口文档注释
/**
 * @swagger
 * /api/hello:
 *   get:
 *     description: Returns the hello world
 *     responses:
 *       200:
 *         description: Hello World!
 */
export async function GET(_request: Request) {
  // Do whatever you want
  return new Response('Hello World!', {
    status: 200,
  });
}
```

[⬆ back to top](#top)

## 手动生成

- 使用 swagger-jsdoc 之类的工具从 API route 上生成 OpenAPI spec
- 把 swagger.json 放在 public 目录里
- 然后搭配前面提到的 swagger-ui-react 之类的工具来实现 swagger 文档展示

```ts
import dynamic from 'next/dynamic';
const SwaggerUI = dynamic(() => import('swagger-ui-react'), { ssr: false });
import 'swagger-ui-react/swagger-ui.css';
export default function ApiDocs() {
  return <SwaggerUI url="/swagger.json" />;
}
```

[⬆ back to top](#top)

> references
- [Swagger integration in next JS](https://www.reddit.com/r/nextjs/comments/1lm1hm6/swagger_integration_in_next_js/)
- [在Next.js中集成swagger文档](https://www.cnblogs.com/deali/p/19069135/nextjs-integrate-swagger-docs)
