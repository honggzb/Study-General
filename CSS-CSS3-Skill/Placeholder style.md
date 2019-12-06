## Placeholder style

## pseudo class- non-standard

![](https://i.imgur.com/U1KPC7H.png)

- `::placeholder`      : did not support by IE
- `:placeholder-shown` : 

> note: `::placeholder{font-size: 50%; }` will resize an input field at well

## Browser compatible

```css
::-webkit-input-placeholder { /* Chrome/Opera/Safari */
  color: pink;
}
::-moz-placeholder { /* Firefox 19+ */
  color: pink;
}
:-ms-input-placeholder { /* IE 10+ */
  color: pink;
}
:-moz-placeholder { /* Firefox 18- */
  color: pink;
}
```

- https://css-tricks.com/almanac/selectors/p/placeholder/
