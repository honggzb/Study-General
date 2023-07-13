## [JavaScript专题之Lazy Loading Images and Video](#top)

- [1. Lazy Loading Images](#Images)
  - [1.1 lazy loading with inline images in HTML](#HTML)
    - method 1: intersection observer API
    - method 2: event handlers (the most compatible way)
  - [1.2 lazy loading with Images in CSS](#event)
- [2. Lazy Loading Video](#Video)
- [3. Lazy loading libraries](#libraries)

<h2 id="Images">1. Lazy Loading Images</h2>

`<img class="lazy" src="placeholder-image.jpg" data-src="image-to-lazy-load-1x.jpg" data-srcset="image-to-lazy-load-2x.jpg 2x, image-to-lazy-load-1x.jpg 1x" alt="I'm an image!">`

- `src`
- `data-src` and `data-srcset`: the URL for the image we'll load once the element is in the viewport

<h3 id="HTML">1.1 lazy loading with inline images in HTML</h3>

**method 1: intersection observer API**

- [intersection observer API](https://developers.google.com/web/updates/2016/04/intersectionobserver)

```javascript
document.addEventListener("DOMContentLoaded", function() {
  var lazyImages = [].slice.call(document.querySelectorAll("img.lazy"));
  if ("IntersectionObserver" in window) {
    let lazyImageObserver = new IntersectionObserver(function(entries, observer) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting) {
          let lazyImage = entry.target;
          lazyImage.src = lazyImage.dataset.src;
          lazyImage.srcset = lazyImage.dataset.srcset;
          lazyImage.classList.remove("lazy");
          lazyImageObserver.unobserve(lazyImage);
        }
      });
    });

    lazyImages.forEach(function(lazyImage) {
      lazyImageObserver.observe(lazyImage);
    });
  } else {
    // Possibly fall back to a more compatible method here
  }
});
```

**method 2: event handlers (the most compatible way)**

```javascript
document.addEventListener("DOMContentLoaded", function() {
  let lazyImages = [].slice.call(document.querySelectorAll("img.lazy"));
  let active = false;
  const lazyLoad = function() {
    if (active === false) {
      active = true;
      setTimeout(function() {
        lazyImages.forEach(function(lazyImage) {
          // getBoundingClientRect() to check if any of img.lazy elements are in the viewport
          if ((lazyImage.getBoundingClientRect().top <= window.innerHeight && lazyImage.getBoundingClientRect().bottom >= 0) && getComputedStyle(lazyImage).display !== "none") {
            lazyImage.src = lazyImage.dataset.src;
            lazyImage.srcset = lazyImage.dataset.srcset;
            lazyImage.classList.remove("lazy");
            lazyImages = lazyImages.filter(function(image) {
              return image !== lazyImage;
            });
            // if there is no lazyimage, the event handler is removed
            if (lazyImages.length === 0) {
              document.removeEventListener("scroll", lazyLoad);
              window.removeEventListener("resize", lazyLoad);
              window.removeEventListener("orientationchange", lazyLoad);
            }
          }
        });
        active = false;
      }, 200);
    }
  };
  document.addEventListener("scroll", lazyLoad);
  window.addEventListener("resize", lazyLoad);
  window.addEventListener("orientationchange", lazyLoad);
});
```

[back to top](#top)

<h3 id="event">1.2 lazy loading with Images in CSS</h3>

```HTML
<style>
.lazy-background {
  background-image: url("hero-placeholder.jpg"); /* Placeholder image */
}
.lazy-background.visible {
  background-image: url("hero.jpg"); /* The final image */
}
</style>
<script type="text/javascript">
document.addEventListener("DOMContentLoaded", function() {
var lazyBackgrounds = [].slice.call(document.querySelectorAll(".lazy-background"));
if ("IntersectionObserver" in window) {
  let lazyBackgroundObserver = new IntersectionObserver(function(entries, observer) {
    entries.forEach(function(entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        lazyBackgroundObserver.unobserve(entry.target);
      }
    });
  });
  lazyBackgrounds.forEach(function(lazyBackground) {
    lazyBackgroundObserver.observe(lazyBackground);
  });
}
});
</script>
```

[back to top](#top)

<h2 id="Video">2. Lazy Loading Video</h2>

**video that doesn't autoplay**

```html
<video controls preload="none" poster="one-does-not-simply-placeholder.jpg">
  <source src="one-does-not-simply.webm" type="video/webm">
  <source src="one-does-not-simply.mp4" type="video/mp4">
</video>
```

- using **poster** attribute to specify a placeholder to occupy the <video> element's space until the video is lazy loaded
- Browser compatiblilty: `preload="none"` is important
  - In Chrome, the default for preload used to be auto, but as of Chrome 64, it now defaults to metadata. Even so, on the desktop version of Chrome, a portion of the video may be preloaded using the Content-Range header. Firefox, Edge and Internet Explorer 11 behave similarly.
  - As with Chrome on desktop, 11.0 desktop versions of Safari will preload a range of the video. In version 11.2 (currently Safari's Tech Preview version), only the video metadata is preloaded. In Safari on iOS, videos are never preloaded.
- When [Data Saver](https://support.google.com/chrome/answer/2392284) mode is enabled, preload defaults to none

**animated GIFs**

- They play automatically when loaded
- They loop continuously
- hey don't have an audio track

```HTML
<video autoplay muted loop playsinline>
  <source src="one-does-not-simply.webm" type="video/webm">
  <source src="one-does-not-simply.mp4" type="video/mp4">
</video>
```

> playsinline is necessary for autoplaying to occur in iOS

**solution for a serviceable video-as-GIF that works across platforms**

```html
<video autoplay muted loop playsinline width="610" height="254" poster="one-does-not-simply.jpg">
  <source data-src="one-does-not-simply.webm" type="video/webm">   <!--using data-src attribute-->
  <source data-src="one-does-not-simply.mp4" type="video/mp4">
</video>
<script type="text/javascript">
document.addEventListener("DOMContentLoaded", function() {
var lazyVideos = [].slice.call(document.querySelectorAll("video.lazy"));
if ("IntersectionObserver" in window) {
  var lazyVideoObserver = new IntersectionObserver(function(entries, observer) {
    entries.forEach(function(video) {
      if (video.isIntersecting) {
        // iterate through all of the child <source> elements and flip their data-src attributes to src attributes
        for (var source in video.target.children) {
          var videoSource = video.target.children[source];
          if (typeof videoSource.tagName === "string" && videoSource.tagName === "SOURCE") {
            videoSource.src = videoSource.dataset.src;
          }
        }
        video.target.load();
        video.target.classList.remove("lazy");
        lazyVideoObserver.unobserve(video.target);
      }
    });
  });
  lazyVideos.forEach(function(lazyVideo) {
    lazyVideoObserver.observe(lazyVideo);
  });
}
});
</script>
```

[back to top](#top)

<h2 id="libraries">3.Lazy loading libraries</h2>

- lazysizes: uses intersection observer
- lozad.js: uses intersection observer only
- [blazy](https://github.com/dinbror/blazy): IE7+. Unfortunately, it doesn't use intersection observer
- [yall.js](https://github.com/malchata/yall.js): uses IntersectionObserver, IE11+

> reference

- [Lazy Loading Images and Video](https://developers.google.com/web/fundamentals/performance/lazy-loading-guidance/images-and-video/)
- [IntersectionObserver: defer, lazy-load](https://github.com/honggzb/Study-General/blob/master/HTML5/IntersectionObserver%20API:%20defer%2C%20lazy-load.md#Sample)
