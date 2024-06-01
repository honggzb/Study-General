[PWA系列之IndexedDB-idb library](#top)

- [概述](#概述)
- [检查浏览器是否支持IndexedDB](#检查浏览器是否支持indexeddb)
- [idb library](#idb-library)
  - [打开数据库](#打开数据库)
  - [创建数据库](#创建数据库)
  - [定义primary keys](#定义primary-keys)
  - [定义indexes](#定义indexes)
  - [增加、读取和删除数据](#增加读取和删除数据)
    - [Add data- add()](#add-data--add)
    - [Read data - get()](#read-data---get)
    - [Update data - put()](#update-data---put)
    - [Delete data - delete()](#delete-data---delete)
- [查询/遍历数据](#查询遍历数据)
  - [getAll()](#getall)
  - [use cursors](#use-cursors)
  - [Use cursors with ranges and indexes](#use-cursors-with-ranges-and-indexes)
- [数据库版本](#数据库版本)

-----------------------------------------

## 概述

- PWA应用中的IndexedDB技术来实现数据的持久化存储
- IndexedDB是一种浏览器内置的非关系型数据库，它提供了一种在客户端存储和检索结构化数据的方式。与传统的Cookie和LocalStorage相比，IndexedDB具有更大的存储容量和更强大的查询能力
- IndexedDB的主要特点包括：
  - 非关系型数据库：IndexedDB使用对象存储（**Object Store**）来存储数据，不需要事先定义表结构，可以动态存储任意类型的数据
  - 异步操作：IndexedDB的读写操作是异步的，可以通过回调函数或Promise来处理操作结果
  - 支持事务：IndexedDB支持事务操作，可以保证数据的一致性和完整性
  - 大容量存储：IndexedDB的存储容量相对较大，可以存储大量的数据
  - 支持索引：IndexedDB支持创建索引，可以提高数据的检索效率
- IndexedDB在PWA应用中的持久化存储方面具有以下优势：
  - 离线访问：PWA应用可以使用IndexedDB来存储离线访问所需的数据，使得应用在离线状态下仍然可以正常运行
  - 数据缓存：IndexedDB可以用作数据缓存，可以将经常使用的数据存储在本地，减少对服务器的请求，提高应用的性能
  - 数据同步：IndexedDB可以用于实现数据同步功能，当网络恢复时，可以将本地存储的数据与服务器进行同步
  - 数据安全：IndexedDB的数据存储在客户端，相对于传统的Cookie和LocalStorage，具有更高的安全性

[⬆ back to top](#top)

## 检查浏览器是否支持IndexedDB

```js
function indexedDBStuff () {
  // Check for IndexedDB support:
  if (!('indexedDB' in window)) {
    // Can't use IndexedDB
    console.log("This browser doesn't support IndexedDB");
    return;
  } else {
    // Do IndexedDB stuff here:
    // ...
  }
}
// Run IndexedDB code:
indexedDBStuff();
```

[⬆ back to top](#top)

## idb library

- IndexedDB 就是浏览器提供的本地数据库，它可以被网页脚本创建和操作
- IndexedDB 允许储存大量数据，提供查找接口，还能建立索引
- IndexedDB 不属于关系型数据库（不支持 SQL 查询语句），更接近 NoSQL 数据库
1. `window.indexedDB.open(databaseName, version);`
2. idb library(Jake Archibald's IndexedDB Promised library): `idb.open(name, version, upgradeCallback)`
  - 该方法返回一个IDBRequest对象，可以通过该对象的 onsuccess 和 onerror 事件监听打开数据库成功或失败的情况
  - https://github.com/jakearchibald/idb

### 打开数据库

```js
import {openDB} from 'idb';
async function useDB () {
  // Opens the first version of the 'test-db1' database.
  // If the database does not exist, it will be created.
  const dbPromise = await openDB('test-db1', 1);
}
useDB();
```

[⬆ back to top](#top)

### 创建数据库

- A well structured IndexedDB database should have one **object store** for each type of data that needs to be persisted
- `db.createObjectStore`
- To ensure database integrity, you can only create or remove object stores in the events object in an **openDB()** call. 
- The events object exposes a **upgrade()** method that lets you create object stores

```js
//1) 
import {openDB} from 'idb';
async function createStoreInDB () {
  const dbPromise = await openDB('example-database', 1, {
    upgrade (db) {
      // Creates an object store:
      db.createObjectStore('storeName', options);
    }
  });
}
createStoreInDB();
// 2) how to use createObjectStore()
import {openDB} from 'idb';
async function createStoreInDB () {
  const dbPromise = await openDB('test-db1', 1, {
    upgrade (db) {
      console.log('Creating a new object store...');
      // Checks if the object store exists:
      if (!db.objectStoreNames.contains('people')) {
        // If the object store does not exist, create it:
        db.createObjectStore('people');
      }
    }
  });
}
createStoreInDB();
```

[⬆ back to top](#top)

### 定义primary keys

```js
// 1) primary keys
import {openDB} from 'idb';
async function createStoreInDB () {
  const dbPromise = await openDB('test-db2', 1, {
    upgrade (db) {
      if (!db.objectStoreNames.contains('people')) {
        db.createObjectStore('people', { keyPath: 'email' });
      }
      // an auto-incrementing number
      if (!db.objectStoreNames.contains('notes')) {
        db.createObjectStore('notes', { autoIncrement: true });
      }
      // auto-incrementing value is explicitly assigned to a property named 'id'
      if (!db.objectStoreNames.contains('logs')) {
        db.createObjectStore('logs', { keyPath: 'id', autoIncrement: true });
      }
    }
  });
}
createStoreInDB();
```

[⬆ back to top](#top)

### 定义indexes

- To create an index, call the `createIndex()` method on an object store instance

```js
import {openDB} from 'idb';
async function createIndexesInStores () {
  const dbPromise = await openDB('test-db3', 1, {
    upgrade (db) {
      if (!db.objectStoreNames.contains('people')) {
        const peopleObjectStore = db.createObjectStore('people', { keyPath: 'email' });
        peopleObjectStore.createIndex('gender', 'gender', { unique: false });
        peopleObjectStore.createIndex('ssn', 'ssn', { unique: true });
      }
      if (!db.objectStoreNames.contains('notes')) {
        const notesObjectStore = db.createObjectStore('notes', { autoIncrement: true });
        notesObjectStore.createIndex('title', 'title', { unique: false });
      }
      if (!db.objectStoreNames.contains('logs')) {
        const logsObjectStore = db.createObjectStore('logs', { keyPath: 'id', autoIncrement: true });
      }
    }
  });
}
createIndexesInStores();
```

### 增加、读取和删除数据

- All data operations in IndexedDB are carried out **inside a transaction**. Each operation has the following form:
  1. Get database object
  2. Open transaction on database
  3. Open object store on transaction
  4. Perform operation on object store

#### Add data- add()

```js
// 1) Create data
import {openDB} from 'idb';
async function addItemToStore () {
  const db = await openDB('example-database', 1);
  await db.add('storeName', {
    field: 'data'
  });
}
addItemToStore();
// use of the add() method inside a transaction
import {openDB} from 'idb';
async function addItemsToStore () {
  const db = await openDB('test-db4', 1, {
    upgrade (db) {
      if (!db.objectStoreNames.contains('foods')) {
        db.createObjectStore('foods', { keyPath: 'name' });
      }
    }
  });
  // Create a transaction on the 'foods' store in read/write mode:
  const tx = db.transaction('foods', 'readwrite');
  // Add multiple items to the 'foods' store in a single transaction:
  await Promise.all([
    tx.store.add({
      name: 'Sandwich',
      price: 4.99,
      description: 'A very tasty sandwich!',
      created: new Date().getTime(),
    }),
    tx.store.add({
      name: 'Eggs',
      price: 2.99,
      description: 'Some nice eggs you can cook up!',
      created: new Date().getTime(),
    }),
    tx.done
  ]);
}
addItemsToStore();
```

#### Read data - get()

```js
// Get a value from the object store by its primary key value:
const value = await db.get('storeName', 'unique-primary-key-value');

// get a single row by the 'name' primary key
import {openDB} from 'idb';
async function getItemFromStore () {
  const db = await openDB('test-db4', 1);
  const value = await db.get('foods', 'Sandwich');
  console.dir(value);
}
getItemFromStore();
```

[⬆ back to top](#top)

#### Update data - put()

```js
// Update a value from in an object store with an inline key:
await db.put('storeName', { inlineKeyName: 'newValue' });
  // Update a value from in an object store with an out-of-line key.
  // In this case, the out-of-line key value is 1, which is the
  // auto-incremented value.
await db.put('otherStoreName', { field: 'value' }, 1);

// using the 'foods' store from earlier that updates the price of the sandwich and the eggs
import {openDB} from 'idb';
async function updateItemsInStore () {
  const db = await openDB('test-db4', 1);
  // Create a transaction on the 'foods' store in read/write mode:
  const tx = db.transaction('foods', 'readwrite');
  // Update multiple items in the 'foods' store in a single transaction:
  await Promise.all([
    tx.store.put({
      name: 'Sandwich',
      price: 5.99,
      description: 'A MORE tasty sandwich!',
      updated: new Date().getTime() // This creates a new field
    }),
    tx.store.put({
      name: 'Eggs',
      price: 3.99,
      description: 'Some even NICER eggs you can cook up!',
      updated: new Date().getTime() // This creates a new field
    }),
    tx.done
  ]);
}
updateItemsInStore();
```

- **Caution**: When updating a row in an object store, IndexedDB doesn't perform a diff on the data you're updating. For example, if you use .add() to add a new row, then update that value later with .put(), it erases any fields in the original value that aren't in the new value.

[⬆ back to top](#top)

#### Delete data - delete()

```js
await db.delete('storeName', 'primary-key-value');
// 
import {openDB} from 'idb';
async function deleteItemsFromStore () {
  const db = await openDB('test-db4', 1);

  // Create a transaction on the 'foods' store in read/write mode:
  const tx = db.transaction('foods', 'readwrite');
  // Delete multiple items from the 'foods' store in a single transaction:
  await Promise.all([
    tx.store.delete('Sandwich'),
    tx.store.delete('Eggs'),
    tx.done
  ]);
}
deleteItemsFromStore();
```

[⬆ back to top](#top)

## 查询/遍历数据

### getAll()

- returns all the objects in the object store, with no constraints whatsoever

```js
import {openDB} from 'idb';
async function getAllItemsFromStore () {
  const db = await openDB('test-db4', 1);
  // Get all values from the designated object store:
  const allValues = await db.getAll('storeName');
  console.dir(allValues);
}
getAllItemsFromStore();
```

[⬆ back to top](#top)

### use cursors

```js
import {openDB} from 'idb';
async function getAllItemsFromStoreWithCursor () {
  const db = await openDB('test-db4', 1);
  const tx = await db.transaction('foods', 'readonly');
  // Open a cursor on the designated object store:
  let cursor = await tx.store.openCursor();
  // Iterate on the cursor, row by row:
  while (cursor) {
    // Show the data in the row at the current cursor position:
    console.log(cursor.key, cursor.value);
    // Advance the cursor to the next row:
    cursor = await cursor.continue();
  }
}
getAllItemsFromStoreWithCursor();
```

[⬆ back to top](#top)

### Use cursors with ranges and indexes

- using the **IDBKeyRange object**. and any of the following methods:
  - `IDBKeyRange.upperBound(indexKey)`
  - `IDBKeyRange.lowerBound(indexKey)`
  - `IDBKeyRange.bound(lowerIndexKey, upperIndexKey)` (which is both)
  - `only()`
  - `includes()`

```js
import {openDB} from 'idb';
async function searchItems (lower, upper) {
  if (!lower === '' && upper === '') {
    return;
  }
  let range;
  if (lower !== '' && upper !== '') {
    range = IDBKeyRange.bound(lower, upper);
  } else if (lower === '') {
    range = IDBKeyRange.upperBound(upper);
  } else {
    range = IDBKeyRange.lowerBound(lower);
  }
  const db = await openDB('test-db4', 1);
  const tx = await db.transaction('foods', 'readonly');
  const index = tx.store.index('price');
  // Open a cursor on the designated object store:
  let cursor = await index.openCursor(range);
  if (!cursor) {
    return;
  }
  // Iterate on the cursor, row by row:
  while (cursor) {
    // Show the data in the row at the current cursor position:
    console.log(cursor.key, cursor.value);
    // Advance the cursor to the next row:
    cursor = await cursor.continue();
  }
}
// Get items priced between one and four dollars:
searchItems(1.00, 4.00);
```

[⬆ back to top](#top)

## 数据库版本

- using **upgrade callback** in the event object executes, allowing to add new object stores and indexes to the database

```js
import {openDB} from 'idb';
const db = await openDB('example-database', 3, {
  upgrade (db, oldVersion) {
    switch (oldVersion) {
      case 0:
        // Create first object store:
        db.createObjectStore('store', { keyPath: 'name' });
      case 1:
        // Get the original object store, and create an index on it:
        const tx = await db.transaction('store', 'readwrite');
        tx.store.createIndex('name', 'name');
      case 2:
        const tx = await db.transaction('store', 'readwrite');
        tx.store.createIndex('description', 'description');
    }
  }
});
```

[⬆ back to top](#top)

> Referens
- [Progressive Web Apps(PWA)核心技术-Indexed DB](https://blog.csdn.net/u010730897/article/details/79269963)
- [Google Developers: IndexedDB-examples](https://github.com/mdn/IndexedDB-examples)
- [MDN: 使用 IndexedDB-cn](https://developer.mozilla.org/zh-CN/docs/Web/API/IndexedDB_API/Using_IndexedDB)
- [Work with IndexedDB](https://web.dev/articles/indexeddb)
- [IndexedDB API 参考](https://developer.mozilla.org/zh-CN/docs/Web/API/IndexedDB_API)
- [Indexed Database API 规范](https://www.w3.org/TR/IndexedDB/)
