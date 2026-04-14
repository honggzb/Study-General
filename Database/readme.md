```
├── 📂 Database/
│   ├── 📄 4typesofSQL-joins.jpg
│   ├── 📄 Drizzle vs Prisma.md
│   ├── 📄 MongoDB-study.md
│   ├── 📄 MongoDB的使用.md
│   ├── 📄 MySql的安装和设置.md
│   ├── 📄 Redis安装、配置和使用.md
│   └── 📄 Set up Prisma ORM.md
```

## SQL vs. NoSQL

- NoSQL databases, also known as “non-SQL” or “not only SQL,” store data in a format other than relational tables
  
|Topic	|SQL databases	|NoSQL databases|
|---|---|---|
|Data structure and models|	Work better with structured data	|Make sense for less structured data sets|
|Scaling	|Vertically scalable	|Horizontally scalable|
|Query data|	Straightforward when it comes to data queries|	More complex when it comes to running queries|
|Data storage|The storage model is a table with fixed rows and columns|There are multiple storage models
|Performance|	You’ll initially need a larger server to accommodate the increasing amount of data	|You can add new servers to what you already have as needed
|Popularity and ease of use|	Tend to be best for complex queries|	Tend to be the best option for unstructured data|

## Types of non-relational DB

|Types|Performance|Scalability|Flexibility|Complexity||
|---|---|---|---|---|---|
|Key-value store|High|High|High|None|Azure,Cassandra|
|column store|High|High|Moderate|Low|HBase, BigTable|
|document|High|High|High|Low|MongoDB, CouchDB|
|graph DB|variable|variable|High|None|Polyglot,Neo4J|

## Resources

- [📚后端程序员应该掌握的主流数据库知识](https://github.com/dunwu/db-tutorial)
