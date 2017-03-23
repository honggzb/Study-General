[index](#top)

- [1. Critical rendering Path](#Critical-rendering-Path)
- [2. Optimizing Strategies](#Optimizing)
- [3. Response, Animate, idle and Load(RAIL)](#RAIL)
- [4. Web workers - JavaScript Concurrency](#Web-workers)

<h3 id="Critical-rendering-Path">1. Critical rendering Path</h3>

**`Frame: 60fps is best`**

`To render 60 Frames every 1000ms, then the time of rendering a single frame is 1000ms/60fps = ~16ms`

<h3 id="Critical-rendering-Path">2. Sequence of Render Tree - [csstriggers](https://csstriggers.com/)</h3>

`Javascript -> Style -> Layout -> Paint -> Composite`

CSS which influence layout, paint, composite-  [csstriggers](https://csstriggers.com/)

<h3 id="RAIL">3. Response, Animate, idle and Load(RAIL)</h3>

function(RAIL) sample|last time
---|---
Response|100ms
Animate|16ms
Idle|50ms
Load|1s

<h3 id="Web-workers">4. Web workers - JavaScript Concurrency</h3>

- [Web workers on HTML5 Rocks](https://www.html5rocks.com/en/tutorials/workers/basics/)
- [Web workers documentation on MDN](https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API/Using_web_workers)
- [demo](https://github.com/udacity/web-workers-demo)

