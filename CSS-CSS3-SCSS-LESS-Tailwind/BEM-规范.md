```html
<!-- nested sample -->
<div class="component">
    <div class="component__element"></div>
</div>
<div class="component">
    <div class="component__element">
      <div class="component__element-modifier"></div>
    </div>
</div>
<!-- scope sample -->
<div class="component component-reversed">
    <div class="component__element"></div>
</div>
```

```css
.component {
  $self: &;
  /* nested sample */
  &__element {     /* .component__element */
    /* ... */
    &-modifier {     /* .component__element-modifier */
      /* ... */     /* Do not nest selectors more than three levels deep! */
    }
  }
  /* scope sample */
  &-reversed {     /* .component-reversed */
    /* ... */
    /* Here, use $self to get the correct scope*/
    #{$self}__element {  /* .component__element */
      /* ... */
    }
  }
}
```
