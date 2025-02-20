## [性能调试memory分析](#top)

- [1. Find out how much memory your page is currently using with the Chrome Task Manager](#Find)
- [2. Visualize memory usage over time with Timeline recordings](#Visualize)
- 3. Identify detached DOM trees (a common cause of memory leaks) with Heap Snapshots
- 4. Find out when new memory is being allocated in your JS heap with Allocation Timeline recordings
- [5. example](#example)

Memory issue: 

- **A page's performance gets progressively worse over time**. This is possibly a symptom of a memory leak. A memory leak is when a bug in the page causes the page to progressively use more and more memory over time.
- **A page's performance is consistently bad**. This is possibly a symptom of memory bloat. Memory bloat is when a page uses more memory than is necessary for optimal page speed.
- **A page's performance is delayed or appears to pause frequently**. This is possibly a symptom of frequent garbage collections. Garbage collection is when the browser reclaims memory. The browser decides when this happens. During collections, all script execution is paused. So if the browser is garbage collecting a lot, script execution is going to get paused a lot.

<h2 id="Find">1. Find out how much memory your page is currently using with the Chrome Task Manager</h2>

- Shift+Esc 或 `Chrome主菜单 -> More tools > Task manager`
- 在Task Manager窗口主菜单头部鼠标点击右键，选择`JavaScript memory`

![](https://i.imgur.com/Ya5OoCA.png)

- The Memory column represents native memory. DOM nodes are stored in native memory. If this value is increasing, DOM nodes are getting created.
- The JavaScript Memory column represents the JS heap. This column contains two values. The value you're interested in is the live number (the number in parentheses). The live number represents how much memory the reachable objects on your page are using. If this number is increasing, either new objects are being created, or the existing objects are growing.

[back to top](#top)

<h2 id="Visualize">2. Visualize memory leaks with Timeline recordings</h2>

1. Open the Timeline panel on DevTools.
2. Enable the Memory checkbox.
3. Make a recording.
4. Click the collect garbage button (force garbage collection button) while recording to force garbage collection.

```javascript
//test code
var x = [];
function grow() {
  for (var i = 0; i < 10000; i++) {
    document.body.appendChild(document.createElement('div'));
  }
  x.push(new Array(1000000).join('x'));
}
document.getElementById('grow').addEventListener('click', grow);
```

[back to top](#top)

<h2 id="example">3. example</h2>

Things I’ve learned here:

- Memory Patterns:
  - Memory doesn’t grow indefinitely with use - not a memory leak.
  - The activity monitor shows the app holds onto memory, even when navigating way from searches/directories with images.
  - If I refresh with cmd-R, everything is flushed, including memory used.
- Heap:
  - The javascript heap is “only” 7MB, including what seems to be closures, compiled code, and representations of DOM elements.
  - Allocations shows the largest object types have barely a few megabytes
  - Between loading a heavy directory, I see kilobytes of allocations, not megabytes
- Layers have ~150MB? What’s up with that
- Site data is all empty, clearing does nothing
- Frames has reference to every image I’ve loaded so far?

[back to top](#top)

> Reference
> - [Fix Memory Problems](https://developers.google.com/web/tools/chrome-devtools/memory-problems/)
> - [Debugging Electron Memory Usage](http://seenaburns.com/debugging-electron-memory-usage/?utm_source=Code+with+Dan+Web+Development+Newsletter&utm_campaign=510167fec6-The_Web_Weekly_Edition_23&utm_medium=email&utm_term=0_8ad074a071-510167fec6-192219933)

