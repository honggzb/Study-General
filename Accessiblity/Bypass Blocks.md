### Bypass Blocks- SC 2.4.1

**2.4.1 Bypass Blocks: A mechanism is available to bypass blocks of content that are repeated on multiple Web pages. (Level A)**

- explaination: https://www.w3.org/TR/UNDERSTANDING-WCAG20/navigation-mechanisms-skip.html
- Related Resources
  - [WebAIM: Semantic Structure](http://webaim.org/techniques/semanticstructure/)
  - [Heading Tags](http://accessibility.psu.edu/headingshtml/)
  
`<div><a href="#content" class="header__skip-to-content" role="navigation" aria-label="Skip to Main Content">{{ 'NAV.SKIP_TO_MAIN_CONTENT' | translate }}</a></div>` 
 
```css
// Skip Navigation link
// ------------------------------------------------------
.header__skip-to-content {
  position: absolute;
  top: -1000px;
  left: -1000px;
  height: 1px;
  width: 1px;
  text-align: left;
  overflow: hidden;
}

a.header__skip-to-content:active, a.header__skip-to-content:focus {
  left: 0; 
  top: 0;
  width: auto; 
  height: auto; 
  overflow: visible;
  z-index: 1;
}
```
