Angular NgClass Example

1. basic
`<input type="text" [ngClass]="{ error: control.isInvalid }" />`
`<input type="text" [class.error]="control.isInvalid" />`

2. With Object Literals

- traditional way: `<td [ngClass]="{ low: val >= 0 && val <=5, medium: val > 5 && val <= 10, high: val > 10}">
  {{ val }}
</td>`
- using class name

```javascript
type Val = 1 | 2 | 3;
class MyComponent {
  classMap = {      //using ECMAScript
    1: 'first-element',
    2: 'second-element',
    3: 'third-element',
  }
  val: Val = 1;
}
<td [ngClass]="classMap[val]"></td>
```

3. `[ngClass]` vs `[class]` in angular

- The `[class]` is almost backward-compatible with `[ngClass]`, with some discrepancies:
- `[ngClass]="{'a b': true}"` does work, but `[class]="{'a b': true}"` won't work. See this open issue.
The value of `[class]` is not "deepwatched". See [here](https://hackmd.io/jzDc7hIDTdWtQblv2TbL9A)

> [Angular NgClass Example – How to Add Conditional CSS Classes](https://www.freecodecamp.org/news/angular-ngclass-example/)
