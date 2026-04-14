## Drizzle vs Prisma

|项目	|Drizzle ORM	|Prisma ORM|
|---|---|---|
|诞生时间	|2022	|2020|
|项目定位	|零依赖、类型安全的 SQL 构建器和 ORM	|类型驱动、功能全面的 ORM 框架|
|支持数据库	|PostgreSQL、MySQL、SQLite、CockroachDB|	PostgreSQL、MySQL、SQLite、SQL Server、MongoDB（实验性）|
|依赖情况	|无运行时依赖，纯 TypeScript	|需要引入 Prisma Client 和引擎，部分依赖原生模块|
|第三方生态|支持 SvelteKit、Next.js、Vite 插件逐步完善|Prisma Studio、Nexus、PlanetScale 原生集成|

## 使用场景推荐

|使用场景|	推荐工具|
|---|---|
|快速构建 CRUD 应用，开发者多|	✅ Prisma|
|追求极致性能与类型安全	|✅ Drizzle|
|更熟悉 SQL，想用 SQL 的方式构建 ORM	|✅ Drizzle|
|需要图形界面（Prisma Studio）查看数据	|✅ Prisma|
|Serverless 项目（如 Vercel Functions）	|✅ Drizzle（轻量、无依赖）|
|对 ORM 风格开发习惯强	|✅ Prisma|
|对迁移 SQL 有强控制欲望	|✅ Drizzle|

## 总结对比表

|特性	|Prisma	|Drizzle|
|---|---|---|
|类型安全	|✅✅|	✅✅✅（内联类型）|
|性能	|中	|高|
|依赖情况|	有	|无运行时依赖|
|使用曲线|	平滑	|稍陡峭|
|ORM 风格	|有模型封装|	无模型、SQL-first|
|迁移能力	|自动强	|更自由|
|生态 & 社区	|成熟	快速发展中|
