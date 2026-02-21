[Linting and Formatting](#top)

- [Linting and Formatting](#linting-and-formatting)
- [Recommended ESLint Rules for TypeScript and React](#recommended-eslint-rules-for-typescript-and-react)

## Linting and Formatting

1. install
2. Create '.eslintrc.json' and '.prettierrc.json'

```json
npm install -D eslint @typescript-eslint/parser @typescript-eslint/eslint-plugin
npm install -D eslint-plugin-react eslint-plugin-react-hooks
npm install -D prettier eslint-config-prettier
# .eslintrc.json
{
  "extends": [
    "eslint:recommended",
    "@typescript-eslint/recommended",
    "plugin:|react/recommended",
    "plugin:react-hooks/recommended",
    "prettier"
  ],
  "parser": "@typescript-eslint/parser",
  "plugins": ["@typescript-eslint", "react"],
  "rules": {
    "|react/react-in-jsx-scope": "off",
    "@typescript-eslint/no-unused-vars": ["error", { "argsIgnorePattern": "^_" }],
    "@typescript-eslint/explicit-function-return-type": "off",
    "@typescript-eslint/explicit-module-boundary-types": "off",
    "@typescript-eslint/no-explicit-any": "warn"
  },
  "settings": {
    "react": {
      "version": "detect"
    }
  }
}
# .prettierrc.json
{
  "semi": true,
  "trailingComma": "es5",
  "singleQuote": true,
  "printWidth": 80,
  "tabWidth": 2
}
```

[back to top](#🚀)

## Recommended ESLint Rules for TypeScript and React

|||
|---|---|
|`react/display-name: 2`| Requires React components to have a displayName property (useful for debugging and React DevTools). Anonymous components in `React.memo()` or `React.forwardRef()` will trigger this error|
|`react/jsx-key: 2`| Enforces that elements in arrays/iterators must have a unique key prop. Prevents React rendering issues and performance problems|
|`react/jsx-no-comment-textnodes: 2`| Prevents accidentally rendering comment text as visible content (e.g., `<div>// comment</div>` would show `// comment` on screen)|
|`react/jsx-no-duplicate-props: 2`| Disallows duplicate properties in JSX elements (e.g., `<div id="1" id="2" />` is an error)|
|`react/jsx-no-target-blank: 2`| Requires `rel="noopener noreferrer"` when using `target="_blank"` on links to prevent security vulnerabilities (reverse tabnabbing)|
|`react/jsx-no-undef: 2`| Prevents using undefined components in JSX (catches typos like `<Buton>` instead of `<Button>`)|
|`react/jsx-uses-react: 2`| Marks React as used when JSX is present (prevents “React is defined but never used” errors). Set to 0 for React 17+ with new JSX transform|
|`react/jsx-uses-vars: 2`| Marks JSX component variables as used (prevents `<MyComponent>` from triggering “MyComponent is defined but never used”)|
|`react/no-children-prop: 2`| Prevents passing children as a prop explicitly (<div children="foo" />) - children should be nested instead (`<div>foo</div>`)|
|`react/no-danger-with-children: 2`| Prevents using `dangerouslySetInnerHTML` and `children` props together (they conflict - React doesn’t know which to render)|
|`react/no-deprecated: 2`| Warns about deprecated React methods (`componentWillMount`, `componentWillReceiveProps`, etc.)|
|`react/no-direct-mutation-state: 2`| Prevents directly mutating this.state (must use `setState()` instead). Only applies to class components|
|react/no-find-dom-node: 2| Prevents using deprecated `ReactDOM.findDOMNode()` - use `refs` instead|
|`react/no-is-mounted: 2`| Prevents using deprecated `isMounted()` method (anti-pattern that indicates problematic code design)|
|`react/no-render-return-value: 2`| Prevents using the return value of `ReactDOM.render()` (it’s deprecated and will be removed)|
|`react/no-string-refs: 2`| Disallows string refs (ref="myRef"), enforces callback refs or useRef instead|
|`react/no-unescaped-entities: 2`| Prevents unescaped HTML entities in JSX that look like typos (e.g., `>` or " appearing as text)|
|`react/no-unknown-property: 2`| Prevents unknown DOM properties (catches class instead of className, for instead of htmlFor)|
|`react/no-unsafe: 0`| When enabled, warns about unsafe lifecycle methods (`componentWillMount`, `componentWillReceiveProps`, `componentWillUpdate`). Set to 0 (disabled)|
|`react/prop-types: 2`| Requires PropTypes validation for component props. Often disabled when using TypeScript|
|`react/react-in-jsx-scope: 2`| Requires React to be in scope when using JSX. Set to 0 for React 17+ with new JSX transform|
|`react/require-render-return: 2`| Enforces that `render()` methods in class components must have a return statement|
|`react-hooks/rules-of-hooks: “error”`| Enforces React Hooks rules: only call hooks at top level, only call from React functions. Critical for hooks to work correctly|
|`react-hooks/exhaustive-deps: “warn”`| Warns when dependencies are missing from `useEffect`, `useCallback`, `useMemo` dependency arrays. Helps prevent bugs from stale closures|

[back to top](#🚀)
