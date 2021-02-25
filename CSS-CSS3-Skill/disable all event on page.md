## Disable all event on page

### CSS way

```css
.loading {
    cursor: wait; /* busy cursor feedback */
}
.loading * {
    /* disable all mouse events on subElements */
    pointer-events: none; 
}
```

- need to do:

```javascript
$('#my-item').addClass('loading');
await myAsyncFunction() // wait until the function complete
$('#my-item').removeClass('loading');
```

### Javascript way

```javascript
document .addEventListener("click", (e) => {
  e.stopPropagation();                 //for prevent all capturing and bubbling
  e.stopImmediatePropagation();        //for prevent same listeners (e.g. another window click listeners)
  e.preventDefault();                  //for prevent all user agent event (e.g anchor href or form submit)
}, true)
```

- https://stackoverflow.com/questions/1755815/disable-all-click-events-on-page-javascript/
