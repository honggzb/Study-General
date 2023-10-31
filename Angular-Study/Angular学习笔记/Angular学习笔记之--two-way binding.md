## set ngModel for span Angular

### Interpolation

```html
<div class="row rating" style="float:right;">
     <span class="fa fa-star"  name="val1">{{data.val1}}</span>
</div>
```

### Property binding

```html
<div class="row rating" style="float:right;">
     <span class="fa fa-star"  name="val1" [innerHTML]="data.val1"></span>
</div>
```

> Note: the Angular NgModel directive is a bridge that enables two-way binding to form elements.

[back to top](top)
