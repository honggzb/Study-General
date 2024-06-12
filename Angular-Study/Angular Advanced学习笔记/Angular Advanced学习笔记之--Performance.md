## Reduce Initial Load Time of Angular Application

- Bundle the application
- Minification and dead code elimination:  UglifyJs for JavaScript parsing, minifying, and compressing
- Lazy Loading Modules
- Typescript Import: call only a specific function or class
- Service worker: control the browser cache and your application can be made available to the users even when they are offline
- Lazy load routes: 
- Ahead of Time compilation: templates are compiled during build tim
- Server-side rendering: 
- Compressed files

```ts
const compression = require('compression')
const express = require('express')
const app = express()
app.use(compression())
```
