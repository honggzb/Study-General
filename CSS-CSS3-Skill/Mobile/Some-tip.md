### CSS only solution to :hover on touchscreens

[Finally, a CSS only solution to :hover on touchscreens](https://blog.usejournal.com/finally-a-css-only-solution-to-hover-on-touchscreens-c498af39c31c)

```css
@media(hover: hover) and (pointer: fine) {
    nav a:hover {
        background: yellow;
    }
}
```
