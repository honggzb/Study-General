[Responsive Design with Bootstrap 4](#top)

## Responsive Breakpoints

Breakpoints|screen width
---|---
xs|screen width < 576px (This is the **“default”** tier)
sm|screen width ≥ 576px
md|screen width ≥ 768px
lg|screen width ≥ 992px
xl|screen width ≥ 1200px

**Larger breakpoints, override Smaller breakpoints**

**xs(default) > overridden by sm > overridden by md > overridden by lg > overridden by xl**

```html
<div class="col-lg-3 col-md-3 col-sm-3">..</div>
          sane as 
<div class="col-sm-3">..</div>
```
## Principle

### Mobile-first

- [How the Bootstrap 4 Grid Works](https://uxplanet.org/how-the-bootstrap-4-grid-works-a1b04703a3b7)
