[tips for React Accessiblity](#top)

- [Resources](#resources)
- [Accessibility Linter](#accessibility-linter)
- [AutoFocus](#autofocus)
- [Refs \& UseEffect()](#refs--useeffect)
- [Page Titles](#page-titles)
------------------------------------------------------


Web accessibility (also referred to as a11y)

- Semantic HTML
- WAI-ARIA -  HTML attributes
- Notifying the user of errors
- Keyboard Navigation and Focus Management
  - Ensure that all clickable and interactive elements (like buttons and links) are focusable
  - Manage focus for modals, dialogs, and dynamic components
  - Use the `tabIndex` attribute to control the order of focusable elements

## Resources

- [Accessibility in React-MDN](https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Frameworks_libraries/React_accessibility)

## Accessibility Linter

- [eslint-plugin-jsx-a11y](https://github.com/jsx-eslint/eslint-plugin-jsx-a11y):  review JSX for common accessibility issues
- catch common accessibility issues during development
- react-a11y, react-axe, or eslint-plugin-jsx-a11y

## AutoFocus

```html
<form>
  <label>
    Username
    <input name="user" type="user" />
  </label>
  <label>
    Password
    <input name="user" type="password" autoFocus />
  </label>
</form>
```

## Refs & UseEffect()

```
export default function Login(props) {
 const pwinput = useRef(null);
 useEffect(() => {
   pwinput.current.focus();
 })
 return (
      <form>
        <label>
          Username
          <input name="user" type="user"  />
        </label>
        <br/>
        <label>
          Password
          <input name="user" type="password" ref={pwinput} />
        </label>
      </form>
  )
}
```

## Page Titles

- ![Helmet](Helmet.png)
- [react-helmet](https://github.com/nfl/react-helmet)
- `<Helmet><title>My Page Title</title></Helmet>`

> references
- https://legacy.reactjs.org/docs/accessibility.html
- https://developer.mozilla.org/en-US/docs/Learn/Tools_and_testing/Client-side_JavaScript_frameworks/React_accessibility
- [Getting Started with Accessibility for React](https://www.telerik.com/blogs/getting-started-accessibility-react)
- [MDN-Accessibility in React](https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Frameworks_libraries/React_accessibility)
