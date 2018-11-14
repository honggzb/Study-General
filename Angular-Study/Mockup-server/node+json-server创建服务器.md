- 基于data.json的文件数据库
-  访问localhost:3000

```shell
npm i json-server -g
mkdir mock
cd mock
json-server data.json
```

Options|function|default
---|---|---
--config, -c|               Path to config file |   [default: "json-server.json"]
  --port, -p|                  Set port      |                       [default: 3000]
  --host, -H |                 Set host    |                   [default: "0.0.0.0"]
  --watch, -w|                 Watch file(s)  |                            [boolean]
  --routes, -r |               Path to routes file| 
  --middlewares, -m |          Paths to middleware files  |                 [array]
  --static, -s|                Set static files directory| 
  --read-only, --ro  |         Allow only GET requests     |               [boolean]
  --no-cors, --nc |            Disable Cross-Origin Resource Sharing |     [boolean]
  --no-gzip, --ng  |           Disable GZIP Content-Encoding  |            [boolean]
  --snapshots, -S  |           Set snapshots directory    |           [default: "."]
  --delay, -d  |               Add delay to responses (ms)| 
  --id, -i |                   Set database id property (e.g. _id)|  [default: "id"]
  --foreignKeySuffix, --fks|   Set foreign key suffix (e.g. _id as in post_id)| [default: "Id"]
  --quiet, -q   |              Suppress log messages from output   |       [boolean]
  --help, -h        |          Show help          |                        [boolean]
  --version, -v    |           Show version number  |                      [boolean]


- http://example.com/db.json
- https://github.com/typicode/json-server
- [一分钟学会用json-server搭建RESTful API](http://www.ngfans.net/topic/129/post)
