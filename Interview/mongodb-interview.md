[top](#top)

- [100 MongoDB interview questions](https://devinterview.io/questions/web-and-mobile-development/mongodb-interview-questions/)

||
|---|
|[What is MongoDB?](#what-is-mongodb)|
|[What are some of the advantages of MongoDB?](#what-are-some-of-the-advantages-of-mongodb)|
|[What is a Databases/Collection/Document in MongoDB?](#what-is-a-databasescollectiondocument-in-mongodb)|
|[What is a primary key in MongoDB?](#what-is-a-primary-key-in-mongodb)|
|[What are the data types in MongoDB?](#what-are-the-data-types-in-mongodb)|
|[CRUD in MongoDB](#crud-in-mongodb)|
|[Can you explain the concept of sharding in MongoDB?](#can-you-explain-the-concept-of-sharding-in-mongodb)|
|[What are indexes in MongoDB?](#what-are-indexes-in-mongodb)|
|[What is a cursor in MongoDB, and when is it used?](#what-is-a-cursor-in-mongodb-and-when-is-it-used)|
|[Can you explain the concept of data modeling in MongoDB?](#can-you-explain-the-concept-of-data-modeling-in-mongodb)|


## What is MongoDB?

- MongoDB is an open-source **NoSQL** database written in C++ language. It uses **JSON-like** documents with optional schemas.
- It provides easy scalability and is a cross-platform, **document-oriented** database.
MongoDB works on the concept of Collection and Document.
- It combines the ability to scale out with features such as secondary indexes, range queries, sorting, aggregations, and geospatial indexes.

## What are some of the advantages of MongoDB?

- MongoDB supports field, range-based, string pattern matching type queries. for searching the data in the database
- MongoDB support primary and secondary index on any fields
- MongoDB basically uses JavaScript objects in place of procedures
- MongoDB uses a dynamic database schema
- MongoDB is very easy to scale up or down
- MongoDB has inbuilt support for data partitioning (Sharding)

[🚀back to top](#top)

## What is a Databases/Collection/Document in MongoDB?

- database   -> MongoDB groups collections
- collection -> A collection in MongoDB is a group of documents
  - document   <--> row
  - collection <--> column
- A Document in MongoDB is an **ordered** set of keys with associated values, It is represented by a map, hash, or dictionary

## What is a primary key in MongoDB?

-In MongoDB, the `_id` field serves as the primary key for a document. 
It must be unique within a collection and is automatically generated if not provided during document insertion

[🚀back to top](#top)

## What are the data types in MongoDB?

|||
|---|---|
|Null|`{"x" : null}`|
|Boolean|`{"x" : true}`|
|Number|`{"x" : 4}`|
|String|`{"x" : "foobar"}`|
|Date|`{"x" : new Date()}`|
|Regular expression|`{"x" : /foobar/i}`|
|Array|`{"x" : ["a", "b", "c"]}`|
|Embedded document|`{"x" : {"foo" : "bar"}}`|
|Object ID|`{"x" : ObjectId()}`|
|Binary Data|Binary data is a string of arbitrary bytes|
|Code|`{"x" : function() { /* ... */ }}`|

## CRUD in MongoDB

||||
|---|---|---|
|queries |`find()`|`db.users.find({"age" : 24})`|
|Delete|`deleteOne()`, `deleteMany()`, `findOneAndDelete()`|`db.books.deleteOne({"_id" : 3})`|
|Insert|insertOne()` or `insertMany()`||
|Update|`updateOne()`, `updateMany(),` `findOneAndUpdate()`||

[🚀back to top](#top)

## Can you explain the concept of sharding in MongoDB?

- Sharding in MongoDB is a strategy used to distribute data horizontally across numerous servers or clusters, efficiently managing extensive datasets and heavy workloads. 
- In this approach, data is divided into distinct subsets known as shards, and MongoDB's query router directs queries to the relevant shard as needed.

## What are indexes in MongoDB?

MongoDB employs data structures known as indexes to enhance query performance, enabling the database to swiftly locate documents according to the indexed fields. MongoDB offers support for a range of index types.

[🚀back to top](#top)

##  What is a cursor in MongoDB, and when is it used?

A cursor in MongoDB is an iterator to retrieve and process documents from query results. Cursors are used when fetching large result sets, allowing you to retrieve documents in batches.

##  Can you explain the concept of data modeling in MongoDB?

Data modeling in MongoDB involves designing the structure of your documents and collections to represent your data best and meet your application's requirements. It includes defining document schemas, relationships, and indexing strategies.

