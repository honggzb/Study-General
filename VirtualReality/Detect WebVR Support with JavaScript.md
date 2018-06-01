```javascript
const supportsVR = 'getVRDisplays' in navigator;
if (supportsVR) {
    navigator.getVRDisplays().then(function(displays) {
      // ... Load VR experience
    });
}
else {
    // ... Show "you need {x} browser" message
}
```

[compatibility](https://caniuse.com/#search=getVRDisplays)

> [Detect WebVR Support with JavaScript](https://davidwalsh.name/detect-webvr)
