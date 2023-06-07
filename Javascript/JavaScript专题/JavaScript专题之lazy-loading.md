[Lazy Loading](#top)

- [1. Lazy Loading Techniques for Images](#Images)
- [2. Lazy Loading CSS Background Images](#Background)
- [3. Creating a Better User Experience With Lazy Loading](#User)
- [4. Testing Lazy Loading](#Testing)

<h2 id="images">1. Lazy Loading Techniques for Images</h2>

**Method to check when an image enters the viewport**

- Method 1: Trigger the image load using Javascript events
- Method 2: Trigger the image load using the Intersection Observer API - faster, but not support by all browsers
- Method 3: use css and background-image

```html
<style>
img {
  background: #F1F1FA;
  width: 400px;
  height: 300px;
  display: block;
  margin: 10px auto;
  border: 0;
}
</style>
<!-- first three images in this example are loaded up front -->
<img src="https://ik.imagekit.io/demo/img/image1.jpeg?tr=w-400,h-300" />
<img src="https://ik.imagekit.io/demo/img/image2.jpeg?tr=w-400,h-300" />
<img src="https://ik.imagekit.io/demo/img/image3.jpg?tr=w-400,h-300" />
<!-- following img use data-src and src is empty and the browser won’t trigger the image load -->
<img class="lazy" data-src="https://ik.imagekit.io/demo/img/image4.jpeg?tr=w-400,h-300" />
<img class="lazy" data-src="https://ik.imagekit.io/demo/img/image5.jpeg?tr=w-400,h-300" />
<img class="lazy" data-src="https://ik.imagekit.io/demo/img/image6.jpeg?tr=w-400,h-300" />
<img class="lazy" data-src="https://ik.imagekit.io/demo/img/image7.jpeg?tr=w-400,h-300" />
<img class="lazy" data-src="https://ik.imagekit.io/demo/img/image8.jpeg?tr=w-400,h-300" />
<img class="lazy" data-src="https://ik.imagekit.io/demo/img/image9.jpeg?tr=w-400,h-300" />
<img class="lazy" data-src="https://ik.imagekit.io/demo/img/image10.jpeg?tr=w-400,h-300" />
<script>
/*  method 1 */ 
document.addEventListener("DOMContentLoaded", function() {
  var lazyloadImages = document.querySelectorAll("img.lazy");    
  var lazyloadThrottleTimeout;
  function lazyload () {
    if(lazyloadThrottleTimeout) {
      clearTimeout(lazyloadThrottleTimeout);
    } 
    lazyloadThrottleTimeout = setTimeout(function() {
        var scrollTop = window.pageYOffset;
        lazyloadImages.forEach(function(img) {
            if(img.offsetTop < (window.innerHeight + scrollTop)) {
              img.src = img.dataset.src;   //assign data-src to src
              img.classList.remove('lazy');
            }
        });
        if(lazyloadImages.length == 0) { 
          document.removeEventListener("scroll", lazyload);
          window.removeEventListener("resize", lazyload);
          window.removeEventListener("orientationChange", lazyload);
        }
    }, 20);
  }
  // listening scroll, resize and orientationChange event
  document.addEventListener("scroll", lazyload);
  window.addEventListener("resize", lazyload);
  window.addEventListener("orientationChange", lazyload);
});
/*  method 2 */ 
document.addEventListener("DOMContentLoaded", function() {
  var lazyloadImages;    
  if ("IntersectionObserver" in window) {
    lazyloadImages = document.querySelectorAll(".lazy");
    var imageObserver = new IntersectionObserver(function(entries, observer) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting) {
          var image = entry.target;
          image.src = image.dataset.src;
          image.classList.remove("lazy");
          imageObserver.unobserve(image);
        }
      });
    });
    lazyloadImages.forEach(function(image) {
      imageObserver.observe(image);
    });
  } else {  
    var lazyloadThrottleTimeout;
    lazyloadImages = document.querySelectorAll(".lazy");
    function lazyload () {
      if(lazyloadThrottleTimeout) {
        clearTimeout(lazyloadThrottleTimeout);
      }    

      lazyloadThrottleTimeout = setTimeout(function() {
        var scrollTop = window.pageYOffset;
        lazyloadImages.forEach(function(img) {
            if(img.offsetTop < (window.innerHeight + scrollTop)) {
              img.src = img.dataset.src;
              img.classList.remove('lazy');
            }
        });
        if(lazyloadImages.length == 0) { 
          document.removeEventListener("scroll", lazyload);
          window.removeEventListener("resize", lazyload);
          window.removeEventListener("orientationChange", lazyload);
        }
      }, 20);
    }
    document.addEventListener("scroll", lazyload);
    window.addEventListener("resize", lazyload);
    window.addEventListener("orientationChange", lazyload);
  }
})
</script>
```

[back to top](#top)

<h2 id="Background">2. Lazy Loading CSS Background Images</h2>

- Method 3: use css and background-image
    - to load css background images need to build DOM tree as well as CSSOM tree
    - set a ID(bg-image) to img that applying background image, ID can override class
    - set a class(lazy) which `background-image: none;`

```html
<!-- method 3 -->
<div id="bg-image" class="lazy"></div>
<style>
#bg-image.lazy {
   background-image: none;
   background-color: #F1F1FA;
}
#bg-image {
  background-image: url("https://ik.imagekit.io/demo/img/image10.jpeg?tr=w-600,h-400");
  max-width: 600px;
  height: 400px;
}
</style>
<script>
//same as method 1/2
// except no need 'img.src = img.dataset.src;'
</script>
```

[back to top](#top)

<h2 id="User">3. Creating a Better User Experience With Lazy Loading</h2>

**tip 1: use right placeholder**

- 1) dominate(different) color placeholder
- 2) Low Quality Image Placeholder (LQIP)

```html
<img class="lazy" src="url of color placeholder image/url of LQIP" data-src="url of real image" />
<img class="lazy" src="https://ik.imagekit.io/demo/img/image8.jpeg?tr=h-1,w-1:w-400,h-300" data-src="https://ik.imagekit.io/demo/img/image8.jpeg?tr=w-400,h-300" />
```

**tip 2: Add buffer time for images to load**

- increase a margin to trigger point for images

```javascript
$(document).ready(function() {
  var lazyloadImages;    
  if ("IntersectionObserver" in window) {
    lazyloadImages = document.querySelectorAll(".lazy");
    var imageObserver = new IntersectionObserver(function(entries, observer) {
      console.log(observer);
      entries.forEach(function(entry) {
        if (entry.isIntersecting) {
          var image = entry.target;
          image.src = image.dataset.src;
          image.classList.remove("lazy");
          imageObserver.unobserve(image);
        }
      });
    }, {
        // root parameter and rootMargin parameter (works as standard CSS margin rule), to increase the effective bounding box
      root: document.querySelector("#container"),
      rootMargin: "0px 0px 500px 0px"
    });

    lazyloadImages.forEach(function(image) {
      imageObserver.observe(image);
    });
  } else {  
    var lazyloadThrottleTimeout;
    lazyloadImages = $(".lazy");
    
    function lazyload () {
      if(lazyloadThrottleTimeout) {
        clearTimeout(lazyloadThrottleTimeout);
      }    

      lazyloadThrottleTimeout = setTimeout(function() {
          var scrollTop = $(window).scrollTop();
          lazyloadImages.each(function() {
              var el = $(this);
              //load it when it’s, let’s say, 500px before it enters the viewport
              if(el.offset().top < window.innerHeight + scrollTop + 500) {
                var url = el.attr("data-src");
                el.attr("src", url);
                el.removeClass("lazy");
                lazyloadImages = $(".lazy");
              }
          });
          if(lazyloadImages.length == 0) { 
            $(document).off("scroll");
            $(window).off("resize");
          }
      }, 20);
    }

    $(document).on("scroll", lazyload);
    $(window).on("resize", lazyload);
  }
})
```

**tip 3: Avoid Content Reflow**

- **method**: specific the width/height of image
  - browser can paint the image container with a known height and width. Later, when the image loads, since the container size is already specified and the image fits into that perfectly, the rest of the content around that container does not move
- **reason**: 
  - When there is no image, the browser doesn’t know the size it will take up. And if we do not specify it using CSS, then the enclosing container would have no dimensions, i.e. it will be read as 0x0 pixels
  - When the image loads, the browser will drop it into the screen and reflow the content to fit it. This sudden change in the layout causes other elements to move around and it is called content reflow, or shifting.

**tip 4: Avoid Lazy Loading Every Image**

[back to top](#top)

<h2 id="Testing">4. Testing Lazy Loading</h2>

- Dev Tools -> network
- Google Chrome Lighthouse audit report

[back to top](#top)

<h2 id="Libraries">5. Popular JavaScript Libraries for Lazy Loading</h2>

- [Yet Another Lazy Loader](https://github.com/malchata/yall.js): uses the Intersection Observer API and falls back to event-based lazy loading for browsers that do not yet support it. This is great for just about any HTML element but unfortunately does not work on background images in CSS. The good news is that it supports IE back to version 11
- [jQuery Lazy](http://jquery.eisbehr.de/lazy/)
- [lazysizes](https://github.com/aFarkas/lazysizes): support for responsive image srcset and sizes attributes and provides superb performance even though it does not make use of the Intersection Observer API
- [WeltPixel Lazy Loading Enhanced](https://www.weltpixel.com/magento-2-lazy-loading-enhanced.html): A Magento 2 extension
- [Magento Lazy Image Loader](https://www.mgt-commerce.com/magento-lazy-load-images.html)

[back to top](#top)

> [The Complete Guide to Lazy Loading Images](https://css-tricks.com/the-complete-guide-to-lazy-loading-images/)
> [Lazy Loading Images? Don’t Rely On JavaScript!](https://www.robinosborne.co.uk/2016/05/16/lazy-loading-images-dont-rely-on-javascript/)
