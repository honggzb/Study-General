[PWA系列之IndexedDB-windows IndexedDB_API](#top)

- [概述](#概述)
- [使用IndexedDB](#使用indexeddb)
- [检查浏览器是否支持IndexedDB](#检查浏览器是否支持indexeddb)
- [打开数据库](#打开数据库)
  - [windows IndexedDB\_API](#windows-indexeddb_api)
  - [打开数据库](#打开数据库-1)
  - [创建或更新数据库的版本](#创建或更新数据库的版本)
  - [构建数据库](#构建数据库)
  - [增加、读取和删除数据](#增加读取和删除数据)
- [查询/遍历数据](#查询遍历数据)
- [安全](#安全)
- [浏览器关闭警告](#浏览器关闭警告)
- [完整的 IndexedDB 示例](#完整的-indexeddb-示例)

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

## 使用IndexedDB

IndexedDB操作的基本步骤是

- open 方法打开数据库
- 然后是创建数据库 store 对象仓库 ?
- 需要注意更新数据库版本应先调用 close 方法关闭旧版数据库
- 需要注意创建 store 一定要在新版本数据库的 upgradeneeded 事件处理函数中创建，因为本质上他是修改数据库结构
- 如果对数据库进行数据操作那么需要通过事务来执行 ?。

## 检查浏览器是否支持IndexedDB

```js
if(!('indexedDB' in window)) {
  console.log('This browser doesn\'t support IndexedDB');
  return;
}
```

[⬆ back to top](#top)

## 打开数据库

1. `window.indexedDB.open(databaseName, version);`
2. idb library(Jake Archibald's IndexedDB Promised library): `idb.open(name, version, upgradeCallback)`
  - 该方法返回一个IDBRequest对象，可以通过该对象的 onsuccess 和 onerror 事件监听打开数据库成功或失败的情况
  - https://github.com/jakearchibald/idb

### windows IndexedDB_API

- [使用 IndexedDB](https://developer.mozilla.org/zh-CN/docs/Web/API/IndexedDB_API/Using_IndexedDB)
- IndexedDB 就是浏览器提供的本地数据库，它可以被网页脚本创建和操作
- IndexedDB 允许储存大量数据，提供查找接口，还能建立索引
- IndexedDB 不属于关系型数据库（不支持 SQL 查询语句），更接近 NoSQL 数据库。

### 打开数据库

```js
var db = null;
var request = window.indexedDB.open("MyIndexedDB");
request.onerror = function(event) = {
  console.log("open IndexedDB error")
}
request.onsuccess = function(event) = {
  db.event.target.result;
  console.log("open IndexedDB success")
}
```

### 创建或更新数据库的版本

- 如果指定的版本号，大于数据库的实际版本号，就会发生数据库升级事件upgradeneeded。这时通过事件对象的target.result属性，拿到数据库实例
- 当创建一个新的数据库或者增加已存在的数据库的版本号（当打开数据库时，指定一个比之前更大的版本号），会触发 `onupgradeneeded` `事件，IDBVersionChangeEvent` 对象会作为参数传递给绑定在 `request.result`上的 onversionchange 事件处理器。
- 在 `upgradeneeded` 事件的处理器中，应该创建该数据库版本需要的对象存储（object store）


```js
// 该事件仅在最新的浏览器中实现
request.onupgradeneeded = (event) => {
  // 保存 IDBDatabase 接口
  const db = event.target.result;
  // 为数据库创建对象存储（objectStore）
  const objectStore = db.createObjectStore("name", { keyPath: "myKey" });
};
```

### 构建数据库

- 构建数据库。IndexedDB 使用**对象存储**而不是表，并且一个数据库可以包含**任意数量**的对象存储。
- 每当一个值被存入一个对象存储时，它会与一个键相关联。键的提供可以有几种不同的方法，这取决于对象存储是使用键路径 还是键生成器
- `onupgradeneeded`是唯一可以修改数据库结构的地方。在这里面，可以创建和删除对象存储以及创建和删除索引
- 对象存储仅调用 `createObjectStore()` 就可以创建
- 可以使用键生成器创建一个对象存储

```js
// 数据看起来像这样
const customerData = [
  { ssn: "444-44-4444", name: "Bill", age: 35, email: "bill@company.com" },
  { ssn: "555-55-5555", name: "Donna", age: 32, email: "donna@home.org" },
];
//1）构建IndexedDB数据库存储以上数据
const dbName = "the_name";
const request = indexedDB.open(dbName, 2);
request.onerror = (event) => {
  // 错误处理
};
request.onupgradeneeded = (event) => {    //唯一可以修改数据库结构的地方
  const db = event.target.result;
  // 创建一个对象存储来存储我们客户的相关信息，我们将“ssn”作为键路径
  // 因为 ssn 可以保证是不重复的——或至少在启动项目的会议上我们是这样被告知的。
  const objectStore = db.createObjectStore("customers", { keyPath: "ssn" });
  // 创建一个索引以通过姓名来搜索客户。名字可能会重复，所以我们不能使用 unique 索引。
  objectStore.createIndex("name", "name", { unique: false });
  // 使用邮箱建立索引，我们想确保客户的邮箱不会重复，所以我们使用 unique 索引。
  objectStore.createIndex("email", "email", { unique: true });
  // 使用事务的 oncomplete 事件确保在插入数据前对象存储已经创建完毕。
  objectStore.transaction.oncomplete = (event) => {
    // 将数据保存到新创建的对象存储中。
    const customerObjectStore = db
      .transaction("customers", "readwrite")
      .objectStore("customers");
    customerData.forEach((customer) => {
      customerObjectStore.add(customer);
    });
  };
};
//2） 可以使用键生成器创建一个对象存储
// 打开 indexedDB。
const request = indexedDB.open(dbName, 3);
request.onupgradeneeded = (event) => {
  const db = event.target.result;
  // 创建另一个名为“names”的对象存储，并将 autoIncrement 标志设置为真。
  const objStore = db.createObjectStore("names", { autoIncrement: true });
  // 因为“names”对象存储拥有键生成器，所以它的键会自动生成。
  // 添加的记录将类似于：
  // 键：1 => 值："Bill"
  // 键：2 => 值："Donna"
  customerData.forEach((customer) => {
    objStore.add(customer.name);
  });
};
```

[⬆ back to top](#top)

### 增加、读取和删除数据

- 需要开启一个**事务**才能对创建的数据库进行操作。事务来自于数据库对象，而且必须指定你想让这个事务跨越哪些对象存储
- 需要使用 IDBDatabase.transaction 启动一个事务
  - `db.transaction(storeNames, mode)`
    - storeNames: 作用域，一个想访问的对象存储的数组
    - mode: 可选， 事务模式（readonly 或 readwrite）, 事务默认为readonly模式
    - 返回一个包含 IDBIndex.objectStore 方法（可以使用它来访问对象存储）的事务对象
- 事务提供了三种模式：readonly、readwrite 和 versionchange
  - 必须在versionchange 事务中才能修改数据库的“模式”或结构（包括新建或删除对象存储、索引）。该事务由一个指定了 version 的 IDBFactory.open 方法启动
  - 必须在versionchange 事务中才能修改数据库的“模式”或结构（包括新建或删除对象存储、索引）。该事务由一个指定了 version 的 IDBFactory.open 方法启动
  - 事务接收三种不同类型的 DOM 事件：error、abort 和 complete

```js
// 1) 向数据库中增加数据
const transaction = db.transaction(["customers"], "readwrite");
// 注意：旧的实验性接口实现使用了已弃用的常量 IDBTransaction.READ_WRITE 而不是 "readwrite"。
// 如果你想支持这样的实现，你可以这样写：
// const transaction = db.transaction(["customers"], IDBTransaction.READ_WRITE);
// 在所有数据添加完毕后的处理
transaction.oncomplete = (event) => {
  console.log("全部完成了！");
};
transaction.onerror = (event) => {
  // 不要忘记错误处理！
};
const objectStore = transaction.objectStore("customers");
customerData.forEach((customer) => {
  const request = objectStore.add(customer);
  request.onsuccess = (event) => {
    // event.target.result === customer.ssn;
  };
});
//2) 从数据库中删除数据
const request = db
        .transaction(["customers"], "readwrite")
        .objectStore("customers")
        .delete("444-44-4444");
request.onsuccess = (event) => {
  // 删除成功！
};
//3) 从数据库中获取数据
//3.1) get()
const transaction = db.transaction(["customers"]);
const objectStore = transaction.objectStore("customers");
const request = objectStore.get("444-44-4444");
request.onerror = (event) => {
  // 错误处理！
};
request.onsuccess = (event) => {
  // 对 request.result 做些操作！
  console.log(`SSN 444-44-4444 对应的名字是 ${request.result.name}`);
};
//3.2) 缩短
db.transaction("customers")
  .objectStore("customers")
  .get("444-44-4444").onsuccess = (event) => {
  console.log(`SSN 444-44-4444 对应的名字是 ${event.target.result.name}`);
};
//4) 更新数据库中的记录 put()
const objectStore = db.transaction(["customers"], "readwrite")
                      .objectStore("customers");
const request = objectStore.get("444-44-4444");
request.onerror = (event) => {
  // 错误处理！
};
request.onsuccess = (event) => {
  // 获取我们想要更新的旧值
  const data = event.target.result;
  // 更新对象中你想修改的值
  data.age = 42;
  // 把更新过的对象放回数据库。
  const requestUpdate = objectStore.put(data);
  requestUpdate.onerror = (event) => {
    // 对错误进行处理
  };
  requestUpdate.onsuccess = (event) => {
    // 成功，数据已更新！
  };
};

```

[⬆ back to top](#top)

## 查询/遍历数据

- 使用游标: `objectStore.openCursor()`
  - 指定游标的范围和方向: `IDBKeyRange` 对象
- 使用索引: `objectStore.index("name")`

```js
//1) 使用游标
const customers = [];
objectStore.openCursor().onsuccess = (event) => {
  const cursor = event.target.result;
  if (cursor) {
    customers.push(cursor.value);
    cursor.continue();
  } else {
    console.log(`已获取的所有客户：${customers}`);
  }
};
// 或者，你可以使用 getAll()（或 getAllKeys()）来处理这种情况
objectStore.getAll().onsuccess = (event) => {
  console.log(`已获取的所有客户：${event.target.result}`);
};
//2) 使用索引
// 首先，确定已经在 request.onupgradeneeded 中创建了索引：
// objectStore.createIndex("name", "name");
// 否则你将得到 DOMException。
const index = objectStore.index("name");
index.get("Donna").onsuccess = (event) => {
  console.log(`Donna 的 SSN 是 ${event.target.result.ssn}`);
};
//
// 使用常规游标来获取所有客户记录的对象
index.openCursor().onsuccess = (event) => {
  const cursor = event.target.result;
  if (cursor) {
    // cursor.key 是名字，如“Bill”，而 cursor.value 是整个对象。
    console.log(
      `名字：${cursor.key}，SSN：${cursor.value.ssn}，电子邮件：${cursor.value.email}`,
    );
    cursor.continue();
  }
};
// 使用键游标来获取客户记录的对象的键
index.openKeyCursor().onsuccess = (event) => {
  const cursor = event.target.result;
  if (cursor) {
    // cursor.key 是名字，如“Bill”，而 cursor.value 是 SSN。
    // 无法直接获取存储对象的其余部分。
    console.log(`Name: ${cursor.key}, SSN: ${cursor.primaryKey}`);
    cursor.continue();
  }
};
//3) 指定游标的范围和方向
// 仅匹配“Donna”
const singleKeyRange = IDBKeyRange.only("Donna");
// 匹配所有大于“Bill”的，包括“Bill”
const lowerBoundKeyRange = IDBKeyRange.lowerBound("Bill");
// 匹配所有大于“Bill”的，但不包括“Bill”
const lowerBoundOpenKeyRange = IDBKeyRange.lowerBound("Bill", true);
// 匹配所有小于“Donna”的，不包括“Donna”
const upperBoundOpenKeyRange = IDBKeyRange.upperBound("Donna", true);
// 匹配所有在“Bill”和“Donna”之间的，但不包括“Donna”
const boundKeyRange = IDBKeyRange.bound("Bill", "Donna", false, true);
// 使用其中的一个键范围，把它作为 openCursor()/openKeyCursor() 的第一个参数
index.openCursor(boundKeyRange).onsuccess = (event) => {
  const cursor = event.target.result;
  if (cursor) {
    // 对匹配结果进行一些操作。
    cursor.continue();
  }
};
```

[⬆ back to top](#top)

## 安全

- IndexedDB 使用同源原则，这意味着它把存储绑定到了创建它的站点的源（典型情况下，就是站点的域或是子域），所以它不能被任何其他来源访问。
- 第三方窗口内容（比如 `<iframe>` 内容）可以访问它所嵌入的源的 IndexedDB 仓库，除非浏览器被设置成从[不接受第三方 cookie](https://support.mozilla.org/zh-CN/kb/Firefox%20%E7%9A%84%E8%B7%9F%E8%B8%AA%E4%BF%9D%E6%8A%A4%E5%92%8C%E7%AC%AC%E4%B8%89%E6%96%B9%20Cookie)

## 浏览器关闭警告

- 当浏览器关闭（由于用户选择关闭或退出选项），包含数据库的磁盘被意外移除，或者数据库存储的权限丢失，将发生以下问题：
  - 受影响的数据库（在浏览器关闭的场景下，所有打开的数据库）的所有事务会以 AbortError 错误中断。该影响和在每个事务中调用 IDBTransaction.abort() 相同。
  - 所有的事务完成后，数据库连接就会关闭
  - 最终，表示数据库连接的 IDBDatabase 对象收到一个 close 事件。你可以使用 IDBDatabase.onclose 事件处理器来监听这些事件，这样你就可以知道什么时候数据库被意外关闭了
- **注意**： 上述的行为只在 Firefox 50、Google Chrome 31（大约）发行版本中支持， 在这些版本之前的浏览器，事务会静默中断，并且不会触发 close 事件，这样就无法察觉数据库的异常关闭
- **解决方案**: 
  - 首先，应该始终使数据库在事务结束时处于一个稳定的状态。应该在同一个事务中执行清空数据和写入数据的操作
  - 其次，不应该把数据库事务绑定到卸载事件上
  - 通过添加中断提醒和 IDBDatabase.onclose，可以得知它何时关闭

## 完整的 IndexedDB 示例

- [完整的IndexedDB示例](https://mdn.github.io/dom-examples/indexeddb-api/index.html)
- [完整的IndexedDB示例-源代码](https://github.com/mdn/dom-examples/tree/main/indexeddb-api)

[⬆ back to top](#top)

> Referens
- [PWA 系列（三）——IndexedDB](https://cloud.tencent.com/developer/article/1411751)
- [前端存储之indexDB](https://blog.51cto.com/u_15689678/5396466)
- [Google Developers: IndexedDB-examples](https://github.com/mdn/IndexedDB-examples)
- [MDN: 使用 IndexedDB-cn](https://developer.mozilla.org/zh-CN/docs/Web/API/IndexedDB_API/Using_IndexedDB)
- [Work with IndexedDB](https://web.dev/articles/indexeddb)
- [IndexedDB API 参考](https://developer.mozilla.org/zh-CN/docs/Web/API/IndexedDB_API)
- [Indexed Database API 规范](https://www.w3.org/TR/IndexedDB/)
- [本地数据库IndexedDB - 学员管理系统之登录（一）](https://blog.csdn.net/jiciqiang/article/details/127401531)
- [IndexedDB的正确打开方式](https://juejin.cn/post/6882999502342406157)
