[Swagger学习](#top)

- [Swagger简介](#swagger简介)
- [Swagger核心组件](#swagger核心组件)
- [OpenAPI规范基础](#openapi规范基础)
- [完整文档示例](#完整文档示例)
- [Swagger UI集成示例-Node](#swagger-ui集成示例-node)
  - [Swagger Codegen示例](#swagger-codegen示例)

----------------------------------------------

## Swagger简介

- Swagger 是一套围绕 OpenAPI 规范构建的开源工具集，用于设计、构建、记录和使用 RESTful API
- Swagger 提供了一种标准化的方式来描述 API 的结构、请求参数、响应格式等信息，使得开发者和机器都能理解 API 的功能而无需访问源代码或其他文档, 前后端开发人员能够更高效地协作
- Swagger 是由 SmartBear Software 提供的一套 API 开发工具集，最初是独立的 API 规范，现在已成为 OpenAPI Specification 的基础
- **Swagger 的核心功能**
  1. **开发 API**: Swagger 支持"代码优先"和"设计优先"两种开发模式：
     - 代码优先：从已有代码生成 OpenAPI 文档。
     - 设计优先：通过 Swagger Editor 先设计 API，再生成代码。
     - 使用 Swagger Codegen 可以从设计的 OpenAPI 文档中自动生成多种语言的客户端 SDK 和服务器代码。
  2. **交互API**: Swagger 提供 Swagger UI，支持通过浏览器直接与 API 交互、发送请求、查看响应，极大地方便了开发者和测试人员。
  3. **API文档**: OpenAPI 文档不仅是接口描述，更是可交互的 API 文档。 通过 Swagger UI，用户能够直观地浏览和调试 API，不需要额外工具

[⬆ back to top](#top)

## Swagger核心组件

- **Swagger 核心组件**
  - <mark>**Swagger UI**</mark>：一个可视化界面，用于交互式地查看和测试 API
  - ![Swagger UI](Swagger-UI.png)
  - <mark>**Swagger Editor**</mark>：一个在线编辑器，支持实时预览 API 文档
  - <mark>**Swagger Codegen**</mark>：一个代码生成工具，可以根据 API 定义自动生成客户端或服务端代码
- 组件协作流程图：

```
Swagger Editor（设计API）  
  ↓  
OpenAPI 规范文件（YAML/JSON）  
  ↓  
Swagger UI（展示文档） 或 Swagger Codegen（生成代码）  
```

|组件	|在线编辑器|输入|	输出	|适用阶段|使用场景|
|---|---|---|---|---|---|
|Swagger Editor|[在线编辑器](https://editor.swagger.io/)|手动编写 YAML/JSON	|实时预览的 API 文档	|API 设计阶段|- 快速设计API原型<br>- 学习OpenAPI规范语法|
|Swagger UI	|[Swagger UI](https://swagger.io/tools/swagger-ui/)|OpenAPI 文件	|交互式网页文档	|开发/测试阶段|- 团队共享 API 文档<br>- 前端开发者调试接口|
|Swagger Codegen|[下载页面](https://swagger.io/tools/swagger-codegen/)|OpenAPI 文件	|客户端/服务端代码	|前后端协作阶段|- 快速生成 API 调用的客户端代码<br>- 服务端接口自动化开发|

[⬆ back to top](#top)

## OpenAPI规范基础

- OpenAPI 目前主要有两个广泛使用的版本：
  - OpenAPI 2.0（原 Swagger 2.0）
  - OpenAPI 3.x（最新稳定版本）

```yaml
openapi: 3.1.0           # OpenAPI 版本
info:
  title: 示例 API         # API 名称
  description: 这是一个示例 API 文档
  version: 1.0.0         # API 版本
servers:
  - url: https://api.example.com/v1  # API 服务器地址
    description: 生产环境
  - url: https://dev-api.example.com/v1
    description: 开发环境

paths:                   # API 路径定义
  /users:                # 端点路径
    get:                 # HTTP 方法
      summary: 获取所有用户
      description: 返回系统中的所有用户列表
      operationId: getUsers
      tags:
        - users          # 分组标签
      parameters:        # 请求参数
        - name: limit
          in: query
          description: 返回结果数量限制
          schema:
            type: integer
            default: 20
      responses:         # 响应定义
        '200':           # HTTP 状态码
          description: 成功返回用户列表
          content:
            application/json:
              schema:
                type: array
                items:
                  $ref: '#/components/schemas/User'
        '400':
          description: 错误的请求参数

components:              # 可复用组件
  schemas:               # 数据模型定义
    User:
      type: object
      properties:
        id:
          type: integer
          format: int64
        name:
          type: string
        email:
          type: string
          format: email
      required:
        - id
        - name
```

- Swagger具有以下基本结构：
1. openapi：这是 Swagger 文件的核心部分，指定了 API 的版本和规范
2. info文档元数据: 描述了API的基本信息，包括标题、版本号等

```yaml
info:
  title: 用户管理 API
  description: API 用于管理系统中的用户信息
  version: 1.0.0
  contact:
    name: API 支持团队
    email: support@example.com
  license:
    name: Apache 2.0
    url: https://www.apache.org/licenses/LICENSE-2.0.html
```

3. servers服务器信息: 定义可用的 API 服务器列表
   
```yaml
servers:
  - url: https://api.example.com/v1
    description: 生产环境
  - url: https://staging-api.example.com/v1
    description: 测试环境
```

4. paths：定义 API 的所有端点和它们支持的 HTTP 方法

```yaml
paths:
  /users:
    get:
      # 获取用户列表
    post:
      # 创建新用户
  /users/{userId}:
    get:
      # 获取特定用户
    put:
      # 更新用户
    delete:
      # 删除用户
```

5. operations操作: 每个路径下的 HTTP 方法定义了一个 API 操作

```yaml
paths:
  /users/{userId}:
    get:
      summary: 获取用户详情
      description: 根据用户ID获取用户的详细信息
      operationId: getUserById
      tags:
        - users
      parameters:
        - name: userId
          in: path
          required: true
          description: 用户ID
          schema:
            type: integer
      responses:
        '200':
          description: 成功获取用户信息
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/User'
        '404':
          description: 用户不存在
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/Error'
```

6. parameters参数: 定义在多个位置
   
```yaml
parameters:
  - name: userId
    in: path           # 路径参数
    required: true
    schema:
      type: integer
  - name: filter
    in: query          # 查询参数
    schema:
      type: string
  - name: X-API-Key
    in: header         # 请求头参数
    schema:
      type: string
  - name: trace
    in: cookie         # Cookie参数
    schema:
      type: string
```

7. requestBody请求体: 定义 POST、PUT 等方法的请求体

```yaml
requestBody:
  description: 用户数据
  required: true
  content:
    application/json:
      schema:
        $ref: '#/components/schemas/User'
    application/x-www-form-urlencoded:
      schema:
        $ref: '#/components/schemas/UserForm'
```

8. 响应 (responses): 每个操作可能的响应

```yaml
responses:
  '200':
    description: 操作成功
    content:
      application/json:
        schema:
          $ref: '#/components/schemas/SuccessResponse'
  '400':
    description: 请求参数错误
    content:
      application/json:
        schema:
          $ref: '#/components/schemas/ErrorResponse'
```

9. 组件 (components): 用于存储可在整个 API 文档中重用的元素

```yaml
components:
  schemas:
    User:
      type: object
      properties:
        id:
          type: integer
        name:
          type: string
        email:
          type: string
          format: email
        roles:
          type: array
          items:
            type: string
            enum: [admin, user, editor]
      required:
        - name
        - email
    
    Error:
      type: object
      properties:
        code:
          type: integer
        message:
          type: string
      required:
        - code
        - message
  
  securitySchemes:
    ApiKeyAuth:
      type: apiKey
      in: header
      name: X-API-Key
    
    OAuth2:
      type: oauth2
      flows:
        implicit:
          authorizationUrl: https://example.com/oauth/authorize
          scopes:
            read: 读取权限
            write: 写入权限
```

10. 数据模型 (schemas): 定义 API 中使用的数据结构

```yaml
schemas:
  Product:
    type: object
    properties:
      id:
        type: integer
      name:
        type: string
        maxLength: 100
      price:
        type: number
        format: float
        minimum: 0
      category:
        type: string
        enum: [electronics, books, clothing]
```

11. 安全 (security): 定义 API 的认证和授权方法：

```yaml
security:
  - ApiKeyAuth: []
  - OAuth2: [read, write]
```

[⬆ back to top](#top)

## 完整文档示例

```yaml
openapi: 3.0.0
info:
  title: 我的第一个API
  description: 这是一个简单的API示例文档
  version: 1.0.0
  contact:
    name: API 支持团队
    email: support@example.com
    url: https://www.example.com/support
servers:
  - url: https://api.example.com/v1
    description: 生产环境
  - url: https://dev-api.example.com/v1
    description: 开发环境

paths:
  /users:
    get:
      summary: 获取所有用户列表
      description: 返回系统中的所有用户信息
      operationId: getUsers
      parameters:
        - name: limit
          in: query
          description: 返回结果的最大数量
          required: false
          schema:
            type: integer
            format: int32
            minimum: 1
            maximum: 100
            default: 20
      responses:
        '200':
          description: 成功获取用户列表
          content:
            application/json:
              schema:
                type: array
                items:
                  $ref: '#/components/schemas/User'
        '400':
          description: 无效请求
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/Error'
    post:
      summary: 创建新用户
      description: 在系统中创建一个新用户
      operationId: createUser
      requestBody:
        description: 用户信息
        required: true
        content:
          application/json:
            schema:
              $ref: '#/components/schemas/NewUser'
      responses:
        '201':
          description: 用户创建成功
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/User'
        '400':
          description: 无效请求
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/Error'

components:
  schemas:
    User:
      type: object
      properties:
        id:
          type: integer
          format: int64
          description: 用户唯一标识
        username:
          type: string
          description: 用户名
        email:
          type: string
          format: email
          description: 用户邮箱
        status:
          type: string
          enum: [active, inactive, banned]
          description: 用户状态
        createdAt:
          type: string
          format: date-time
          description: 创建时间
      required:
        - id
        - username
        - email
        - status

    NewUser:
      type: object
      properties:
        username:
          type: string
          description: 用户名
        email:
          type: string
          format: email
          description: 用户邮箱
        password:
          type: string
          format: password
          description: 用户密码
          minLength: 8
      required:
        - username
        - email
        - password

    Error:
      type: object
      properties:
        code:
          type: integer
          format: int32
        message:
          type: string
      required:
        - code
        - message

  securitySchemes:
    bearerAuth:
      type: http
      scheme: bearer
      bearerFormat: JWT

security:
  - bearerAuth: []
```

[⬆ back to top](#top)

## Swagger UI集成示例-Node

1. `npm install swagger-ui-express swagger-jsdoc --save`
2. 创建'swagger.js'配置文件
3. 在'Express'中挂载UI
4. 访问 http://localhost:3000/api-docs 查看文档

```js
//swagger.js
const swaggerJSDoc = require('swagger-jsdoc');
// Swagger 配置
const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API 接口文档',
      version: '1.0.0',
      description: 'API 接口详细描述',
      contact: {
        name: '开发团队',
        email: 'team@example.com',
        url: 'https://example.com'
      }
    },
    servers: [
      {
        url: 'http://localhost:3000',
        description: '开发服务器'
      }
    ]
  },
  apis: ['./routes/*.js'] // API 路由文件的路径
};
const swaggerDocs = swaggerJSDoc(swaggerOptions);
module.exports = swaggerDocs;
//Express中挂载UI
const express = require('express');
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./swagger');
const app = express();
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));
// ... 其他路由和中间件
app.listen(3000, () => {
  console.log('服务器运行在 http://localhost:3000');
  console.log('API 文档可在 http://localhost:3000/api-docs 访问');
});
```

### Swagger Codegen示例

1. 命令行生成 Java 客户端）, 下载 Swagger Codegen CLI：
   1. `wget https://repo1.maven.org/maven2/io/swagger/codegen/v3/swagger-codegen-cli/3.0.35/swagger-codegen-cli-3.0.35.jar -O swagger-codegen-cli.jar`
2. 生成代码
   - `java -jar swagger-codegen-cli.jar generate \`
   - `-i https://petstore.swagger.io/v2/swagger.json \`
   - `-l java \`
   - `-o ./petstore-api-client`

[⬆ back to top](#top)

> references
- https://swagger.io/
- [Swagger教程](https://www.runoob.com/swagger/swagger-tutorial.html)
- [Swagger 官网](https://swagger.io/)
- [OpenAPI 官方文档](https://swagger.io/specification/)
- [OpenAPI 规范3](https://spec.openapis.org/oas/latest.html)
- [OpenAPI Generator](https://openapi-generator.tech/)
