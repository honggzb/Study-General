[Cursor rules](#top)

- [规则结构](#规则结构)
- [创建规则](#创建规则)
  - [基础四步法](#基础四步法)
- [Examples](#examples)
  - [standards for frontend components](#standards-for-frontend-components)
  - [React项目](#react项目)
  - [Express 服务](#express-服务)
  - [User Rules](#user-rules)
- [自动生成Cursor Rules](#自动生成cursor-rules)
- [开箱即用模板资源](#开箱即用模板资源)

---------------------------------------------------------

使用项目规则可以：
- 固化与你代码库相关的领域知识
- 自动化项目特定的流程或模板
- 规范化风格或架构决策

## 规则结构

在 Cursor 当中，支持两种级别的规则：
  - 全局规则（User Rules）：针对所有项目通用的规则
  - 项目规则（Project Rules）：存放于项目目录下的 .cursor/rules 中，只用于约束当前项目
- 每个规则文件使用<mark>MDC（.mdc）</mark>编写，这是一种同时支持元数据和内容的格式。通过类型下拉菜单控制规则的应用方式，该菜单会更改 `description、globs、alwaysApply` 属性

|规则类型|	描述|
|---|---|
|`Always Apply`	|应用于所有聊天和 cmd-k 会话|
|`Apply Intelligently`	|由 Agent 基于描述判断相关性时应用|
|`Apply to Specific Files`	|当文件匹配指定模式时应用|
|`Apply Manually`	|被 `@规则名`提及时手动应用|

```mdc
---
description: RPC 服务样板代码
globs:
alwaysApply: false
---

- 定义服务时使用内部 RPC 模式
- 服务名称始终使用 snake_case 格式

@service-template.ts
```

- 嵌套规则
- 嵌套规则的特点
  - 当引用其目录中的文件时会自动附加
  - 仍可在上下文选择器和代理可访问的规则列表中使用
  - 非常适合将领域特定规则组织得更靠近相关代码

```
├── 📂project/
│   ├── 📂.cursor/rules/             # 项目级规则
│   ├── 📂backend/
│   │    └── 📂server/
│   │        └── 📂.cursor/rules/    # 后端专用规则
│   └── 📂frontend/
│        └── 📂.cursor/rules/        # 前端专用规则
```

[⬆ back to top](#top)

## 创建规则

- 执行 `New Cursor Rule` 命令(Cmd + Shift + P)
- 或前往 Cursor Settings > Rules 创建规则。系统会在 .cursor/rules 中生成一个新的规则文件
- **可以在设置(settings)中查看所有规则及其状态**

### 基础四步法

1. 角色定义
2. 规则分层
3. 目录约束
4. 知识关联

```
### 角色设定
- 你是一名全栈工程师，精通 Python/TypeScript，擅长用 SOLID 原则设计代码
- 必须用中文注释解释复杂逻辑，代码需通过 Pylint 严格检查

## 需求处理流程
1. 先阅读项目 README 和现有代码
2. 与用户确认需求细节（至少提出 3 个补充问题）
3. 选择最简实现方案（禁止过度设计）

## 代码安全
- 涉及敏感数据时必须调用 `utils/encrypt.py` 的 AES 加密方法
- 数据库操作必须使用连接池，禁止直接暴露密码

## 文件结构
- 工具类代码存放于 `libs/tools/`
- API 接口必须写在 `src/api/v1/` 下
- 单元测试覆盖率需达到 90%

## 参考文档
- 项目设计文档：`docs/arch.md`
- 第三方 API 说明：`https://internal.api.com/docs`
```

[⬆ back to top](#top)

## Examples

### standards for frontend components

|directory|template|
|---|---|
|in components directory|- Always use Tailwind for styling<br>- Use Framer Motion for animations<br>- Follow component naming conventions|
|In API directory|- Use zod for all validation<br>- Define return types with zod schemas<br>- Export types generated from schemas|

### React项目

```
# 文件模式: *.tsx, *.ts

## React 规范
- 使用函数组件
- 实现完整的 prop 类型
- 遵循 React 最佳实践

## 样式
- 使用 Tailwind CSS
- 遵循团队样式指南

@file ../tsconfig.json
@file ../tailwind.config.js
```

- components

```
 * React 组件应遵循如下结构：
  * Props 接口放在文件顶部
  * 组件作为命名导出
  * 将样式放在文件底部
@component-template.tsx
```

### Express 服务

```
* 使用此模板创建新的 Express 服务：
  * 遵循 RESTful 原则
  * 包含错误处理中间件
  * 设置适当的日志记录
@express-service-template.ts
```

### User Rules

- 适用于所有项目，并始终包含在你的模型上下文中。你
- 可以用它们来：
  - 设置回复的语言或语气
  - 添加个人风格偏好
- Sample: `请用简洁的风格回复，避免不必要的重复或赘述`

[⬆ back to top](#top)

## 自动生成Cursor Rules

- 在对话中直接使用 `/Generate Cursor Rules` 命令来生成规则
- ![alt autogenRule](autogenRule.png)

## 开箱即用模板资源

- https://cursor.directory/
- https://github.com/PatrickJS/awesome-cursorrules

[⬆ back to top](#top)

