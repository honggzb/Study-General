## [性能调试之RAIL模式](#top)

RAIL is a user-centric performance model that breaks down the user's experience into key actions, 4 parts of the RAIL performance model

- R: Response
- A: Animations
- I: Idle
- L: Load

| Parts |Goal|Guideline|
| :------------- | :------------- | :------------- |
|R: Response|respond in under 50ms|- Respond to user input within 50ms, or else the connection between action and reaction is broken. This applies to most inputs, such as clicking buttons, toggling form controls, or starting animations. This does not apply to touch drags or scrolls.<br>- Though it may sound counterintuitive, it's not always the right call to respond to user input immediately. You can use this 100ms window to do other expensive work. But be careful not to block the user. If possible, do work in the background.<br>- For actions that take longer than 50ms to complete, always provide feedback.|
|A: Animations|produce a frame in 10ms|refer to https://developers.google.com/web/fundamentals/performance/rail|
|I: Idle|maximize idle time|refer to https://developers.google.com/web/fundamentals/performance/rail|
|L: Load|deliver content and become interactive in under 5 seconds|refer to https://developers.google.com/web/fundamentals/performance/rail|

**Tools for measuring RAIL**

- Chrome DevTools
- [Lighthouse](https://developers.google.com/web/fundamentals/performance/rail#lighthouse). Available in Chrome DevTools, as a Chrome Extension, as a Node.js module, and within WebPageTest
- [WebPageTest](https://developers.google.com/web/fundamentals/performance/rail#webpagetest). Available at webpagetest.org/easy. You can also configure it to include a Lighthouse audit.

**Chrome DevTools**

- [Performance panel](https://developers.google.com/web/tools/chrome-devtools/evaluate-performance/)
- [Performance Analysis Reference](https://developers.google.com/web/tools/chrome-devtools/evaluate-performance/reference)
  - Throttle your CPU to simulate a less-powerful device.
  - Throttle the network to simulate slower connections.
  - View main thread activity to view every event that occurred on the main thread while you were recording.
  - View main thread activities in a table to sort activities based on which ones took up the most time.
  - Analyze frames per second (FPS) to measure whether your animations truly run smoothly.
  - Monitor CPU usage, JS heap size, DOM nodes, layouts per second, and more in real-time with the Performance Monitor.
  - Visualize network requests that occurred while you were recording with the Network section.
  - Capture screenshots while recording to play back exactly how the page looked while the page loaded, or an animation fired, and so on.
  - View interactions to quickly identify what happened on a page after a user interacted with it.
  - Find scroll performance issues in real-time by highlighting the page whenever a potentially problematic listener fires.
  - View paint events in real-time to identify costly paint events that may be harming the performance of your animations.

> Reference
- https://developers.google.com/web/fundamentals/performance/rail
