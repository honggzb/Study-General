## [React学习- use SVG in react](#top)

- [use SVG in react](#use-svg-in-react)
- [Inline SVG in TSX](#inline-svg-in-tsx)
- [Import as React component with SVGR](#import-as-react-component-with-svgr)

|Use case|	Method|	Code snippet|
|---|---|---|
|Inline SVG components|	SVGR	|`import Icon from './icon.svg'`|
|Static decorative images|	/public folder + <img>	|`<img src="/logo.svg" alt="Logo" />`|
|Optimized images (incl. SVG)|	Next.js <Image />	|`<Image src="/logo.svg" alt="Logo" width={100} height={100} />`|
|Custom inline SVG markup	|Paste SVG JSX inline	| Direct JSX copy/paste inside your component|

## Inline SVG in TSX

```tsx
const TwitterIcon = ({ props }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={48} height={48} {...props}>
    <linearGradient
      id="a"
      x1={10.341}
      x2={40.798}
      y1={8.312}
      y2={38.769}
      gradientUnits="userSpaceOnUse"
    >
      <stop offset={0} stopColor="#2aa4f4" />
      <stop offset={1} stopColor="#007ad9" />
    </linearGradient>
    <path
      fill="url(#a)"
      d="M46.105 ..."
    />
  </svg>
)
```

## Import as React component with SVGR

1. `npm install --save-dev @svgr/webpack`
2. modify 'next.config.js'
3. using
    - `import TwitterIcon from "./twitter-icon.svg";`
    - `const Example = () => <TwitterIcon />; `

```js
module.exports = {
  webpack(config) {
    const fileLoaderRule = config.module.rules.find((rule) =>
      rule.test?.test?.(".svg")
    );
    config.module.rules.push(
      {
        ...fileLoaderRule,
        test: /\.svg$/i,
        resourceQuery: /url/,
      },
      {
        test: /\.svg$/i,
        issuer: fileLoaderRule.issuer,
        resourceQuery: { not: [...fileLoaderRule.resourceQuery.not, /url/] },
        use: ["@svgr/webpack"],
      }
    );
    fileLoaderRule.exclude = /\.svg$/i;
    return config;
  },
};
```


