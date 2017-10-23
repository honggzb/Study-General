**Problem**

the onscroll event isn’t fired, window.scrollY isn’t updated, and the blue box does not move until the scrolling has come to a complete stop

**Why**

Unlike desktop browsers, most all mobile browsers simply do not fire an onscroll event until the scrolling action comes to a complete stop

**Solution**

Workaround Attempt 1 - setInterval

- iOS Safari, Android <= 2.3, and Opera Mobile do not run any functions queued through setInterval or setTimeout while a scroll is being performed, then [scrolling doesn’t stop asterisk creation" coming](https://www.tjvantoll.com/demos/2012-08-19/interval).

```javascript
setInterval(function() {
	// Logic
}, 20);
```

Workaround Attempt 2 - Use Touch Events

- Android: The ontouchmove event does get fired as the user moves the screen. However the DOM updates are very sporadic and feel very jerky. This is true of the default Android browser in Gingerbread, Ice Cream Sandwich, and Jelly Bean although it gets better in later versions
- Firefox for Android: The ontouchmove events fires but DOM updates made in the ontouchmove event take effect sporadicly if at all. Everything feels very jerky at best
- Opera Mobile: ontouchmove events occur but DOM changes are not applied until scrolling is complete
- iOS Safari: On ontouchmove event is fired as the screen is moved and the DOM does get re-painted. This is only mobile browser where this approach made a substantial difference

- [onscroll Event Issues on Mobile Browsers](https://www.tjvantoll.com/2012/08/19/onscroll-event-issues-on-mobile-browsers/)
