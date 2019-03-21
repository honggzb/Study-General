[SASS and BEM](#top)

## Principle

```css
.block{} // the ‘thing’ like .list
.block__element{} // a child of the block like .list__item
.block--modifier{} // a variation of the ‘thing’ like .list-—vertical

.block {
    @at-root #{&}__element {
    }
    @at-root #{&}--modifier {
    }
}
/* or */
.block {
    &__element {
    }
    &--modifier {
    }
}
```

## using `@at-root` or `&`

```html
<nav role="navigation" aria-label="primary">
  <ul class="nav__list">
    <li class="nav__list__item">
      <a href="" class="nav__link"></a>
    </li>
    <li class="nav__list__item">
      <a href="" class="nav__link--active"></a>
    </li>
    <li class="nav__list__item">
      <a href="" class="nav__link"></a>
    </li>
  </ul>
</nav>
<style>
nav[role=navigation] {
}
.nav {
    &__list {
      &__item {
      }    
    }
  &__link {
    &--active { 
    }
  }
}
</style>
```

## improvement- define $self to instead of &

```html
<div class="component">
    <div class="component__child-element"></div>
</div>
<div class="component component--reversed">
    <div class="component__child-element"></div>
</div>
<style>
.component {
  $self: &; /* Hey look, it's our new best friend!*/
  display: block;
  max-width: 30rem;
  min-height: 30rem;
  &--reversed {     /* .component--reversed */
    background: white;
    border-color: lightgray;
    /* Here, we use $self to get the correct scope*/
    #{ $self }__child-element {  /* .component__child-element */
      background: rebeccapurple;
    }
  }
}
</style>
```

> References
- [Even Easier BEM-ing with Sass 3.3](http://alwaystwisted.com/articles/2014-02-27-even-easier-bem-ing-with-sass-33)
- [Using Sass to Control Scope With BEM Naming](https://css-tricks.com/using-sass-control-scope-bem-naming/)
