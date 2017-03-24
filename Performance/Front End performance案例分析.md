## [Front End performance案例分析](#top)

- [1. 案例](#案例)
- [2. 分析1](#分析1)
- [3. 分析2](#分析2)
- [4. List of all know bugs](#all-know-bugs)

<h3 id="案例">1. 案例</h3>

- 演示： http://udacity.github.io/news-aggregator/
- 源码： https://github.com/udacity/news-aggregator

<h3 id="分析1">2. 分析1</h3>

**scenoriry:** open chrome devTools -> click "timeline" -> start record -> scrolling page

![](http://i.imgur.com/pDDVIOz.png)

**analysis:**

- The likely performance bottleneck is colorizeAndScaleStories function. 
- There is no need to change color and opacity when scrolling page. The colorizeAndScaleStories function is not necessary. cancel this function.

<h3 id="分析2">3. 分析2</h3>

**scenoriry:** open chrome devTools -> click "timeline" -> start record -> click any item to open switch page -> click "x" to close switch page

![](http://i.imgur.com/izXjlxj.png)

**analysis:

- The likely performance bottleneck is animate function
- using css instead of js

```
//css
.story-details {
  overflow: hidden;
  transition: transform 0.3s;
  will-change: transform;
}
.story-details.visible {
  transform: translateX(-100vw);
}
.story-details.hidden {
  transform: translateX(0);
}
//js
function showStory(id) {
    if (!storyDetails)
      return;
    storyDetails.classList.add('visible');
    storyDetails.classList.remove('hidden');
  }
function hideStory(id) {
    storyDetails.classList.add('hidden');
    storyDetails.classList.remove('visible');
  }
```

<h3 id="all-know-bugs">List of all know bugs</h3>

https://github.com/udacity/news-aggregator/blob/gh-pages/hints/all-bugs.md

#### CSS issues

- Lots of style recalcs when we bring a story in (body.details-active .story__title etc)
- Double shadow on .header
- Triple(!) shadow on .story__score and .story-details
- Promoted every single child element in .story-details. GO ME. This one will show up when they have visited a few stories. If they check the layers panel they'll see it too.

#### onStoryData

- Loops through manually rather than using a querySelector to get the right element.
- Makes visual changes outside of a rAF.

#### onStoryClick

- Uses a setTimeout to start showing the story.
- Just splats the DOM in rather than using a rAF.
- Same for the comments.

#### showStory

- Adds an overbroad class on the body.
- Uses setTimeout for animation and runs it every 4ms
- Causes forced sync layouts if it runs multiple times per frame due to getBoundingClientRect and storyDetails left style setting.

#### hideStory

- Same as above.

#### colorizeAndScaleStories

- Completely unnecessary effect (interesting to see if any students drop it altogether - they should consider it imo, but if not there's loads they can do).
- Colors every single score.
- Sets the width and height (should be a scale transform) triggering a global layout.
- Then reads it back to figure the color it needs (way daft).
- Triggers layout thrashing in the process.

#### touchstart

- This just shouldn't be here and it just periodically kills touch input, so hopefully they'll realize what a bad thing touch handlers can be.

#### scroll

- Really, we don't want to color and scale the scores.
- Should be in a requestAnimationFrame as it makes visual changes.

#### loadStoryBatch

- Making visual changes outside of a requestAnimationFrame.

####App.Data.get*

- Could be done in a worker (although likely not a big deal)

####Bonuses

- Inline scripts in the top of the head.
- Fixed position header will be repainting (.header) on low DPI devices.
- So will .main (low DPI only) so ideally it needs promoting.
