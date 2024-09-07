- [Basic](#basic)
- [Handling Hover, Focus, and Other States](#handling-hover-focus-and-other-states)
- [Functions \& Directives](#functions--directives)
  - [Directives](#directives)
  - [Functions](#functions)
- [Responsive design](#responsive-design)
  - [Breakpoints by default](#breakpoints-by-default)
  - [Working mobile-first](#working-mobile-first)
  - [Customizing reponsive breakpoint](#customizing-reponsive-breakpoint)
 
-----------------------------------------------------------------

## Basic

- Customizing your 'tailwind.config.js' file
- Extracting classes with `@apply`
- https://play.tailwindcss.com/
- [Tailwind Core Concepts](https://tailwindcss.com/docs/hover-focus-and-other-states)

|Flex && Grids||
|---|---|
|Flex|flex,flex-col,flex-row-reverse,md:flex-row|
|flex children size|basic-32,basic-1/4,grow,md:w-32|
|flex wrap|flex flex-wrap,w-full|
|grid|grid-cols-3,col-start-2,col-span-2,grid-rows-5,rows-span-2,lg:grid-cols-4|
|justify content|flex justify-center|
|align items|flex justify-between items-ceter|
|gap|gap-1, gap-x-0 gap-y-2|

|Layout & Border||
|---|---|
|layout|container mx-auto, column-lg|
|borders|border, border-l-3,border-dotted border-red-600,divide-y|
|Color|bg-blue-100, text-yellow-600, border-green-500|


|Typograhy||
|---|---|
|Font size|text-sm, text-xl|
|Font style|font-bold, font-thin, italic|
|Font decoration|underline, overline, line-through,decoration-end-100,decoration-wavy,decoration-8|
|Text align|text-left, text-center, text-justify|
|list style|list-disc, list-decimal|

|Spaces & Size||
|---|---|
|padding/margin|p-0, pt-6,pb-5,mb-5,-mt-8|
|width/height|w-24,h-24,w-1/2,min-w-100,max-w-full,min-w-min|
|space|space-x-5,space-y-6|

|Spaces & Size||
|---|---|
|shadow|shadow-md,shadow-inner,shadow-md shadow-cyan-300/10|
|opacity|opacity-50|
|blur|blur-sm, blur-sm hover:blur-none|
|brightness|brightness-50 hover:brightness-100|
|contrast|contrast-40 hover:contrast-100|
|grayscale|grayscale hover:grayscale-0|

|Animations||
|---|---|
|transition|transition delay-500 duration-300 hover:-translate-y-1|
|animation|animate-spin, animate-ping,animate-pulse,animate-bounce|
|transform|scale-125,rotate-45, transition origin-top-left hover:rotate-45|

|Customization||
|---|---|
|theme,extend|theme('colors.slate.950'), fonSize|

[⬆ back to top](#top)

## Handling Hover, Focus, and Other States

- These modifiers can even be stacked: `<button class="dark:md:hover:bg-fuchsia-600 ...">`

|||
|---|---|
|Pseudo-classes |`:hover`, `:focus`, `:first-child`, and `:required`|
|Pseudo-elements |`::before`, `::after`, `::placeholder`, and `::selection`|
|Media and feature queries |responsive breakpoints, `dark` mode, and `prefers-reduced-motion`|
|Attribute selectors |`[dir="rtl"]` and `[open]`|

- [pseudo-class reference](https://tailwindcss.com/docs/hover-focus-and-other-states#pseudo-class-reference): like `:visited`, `:focus-within`, `:focus-visible`, and more
- [offical: hover-focus-and-other-states](https://tailwindcss.com/docs/hover-focus-and-other-states)

|Pseudo-classes|Sample|
|---|---|
|Hover, focus, and active|`hover:bg-violet-600 active:bg-violet-700 focus:outline-none focus:ring focus:ring-violet-300`|
|First,last,odd,even|`first:pt-0 last:pb-0`<br>`odd:bg-white even:bg-slate-50`|
|Form states| `required`,`invalid`, `disabled`,`:read-only`,`:indeterminate`,`:checked`||
|Styling based on parent|`group`,`group-hover:stroke-white`,`group-focus`,`group-active`,`group-odd`|
|Styling based on sibling|`peer`,`peer-invalid:visible`|
|Styling direct children|`*`, `*:rounded-full *:border *:border-sky-100`|
|Styling based on descendants|`has-`, `has-[:checked]:bg-indigo-50 has-[:checked]:text-indigo-900 has-[:checked]:ring-indigo-200`|

[⬆ back to top](#top)

## Functions & Directives

### Directives

|Directives |	||
|:---:|---|---|
|`@tailwind`|insert `base`, `components`, `utilities` and `variants` styles into CSS|`@tailwind base;`|
|`@layer`|which “bucket” a set of custom styles belong to<br>Valid layers are `base`, `components`, and `utilities`|`@layer base {`<br>` h1 { @apply text-2xl;}`<br>`}`|
|`@apply`| to inline any existing utility classes into your own custom CSS|`.select2-dropdown {`<br>`@apply rounded-b-lg shadow-md;<br>`}`|
|`@config`|to specify which config file Tailwind should use when compiling that CSS file|**Put your `@import` statements before the `@config` directive**|

```css
/** admin.css */
@import "tailwindcss/base";
@import "./custom-base.css";
@import "tailwindcss/components";
@import "./custom-components.css";
@import "tailwindcss/utilities";

@config "./tailwind.admin.config.js"
```

[⬆ back to top](#top)

### Functions

|Functions |	||
|:---:|---|---|
|`theme()`|to access your Tailwind config values using **dot notation**|`.btn-blue {`<br>`background-color: theme(colors.blue.500 / 75%);`<br>`}`|
|`screen()`|to create media queries that reference your breakpoints by name instead of duplicating their values in your own CSS|`@media screen(sm) { /* ... */ }`|

[⬆ back to top](#top)

## Responsive design

### Breakpoints by default

|Breakpoint |prefix	|Minimum width	CSS|
|:---:|---|---|
|sm	|640px	|@media (min-width: 640px) { ... }|
|md	|768px	|@media (min-width: 768px) { ... }|
|lg	|1024px	|@media (min-width: 1024px) { ... }|
|xl	|1280px	|@media (min-width: 1280px) { ... }|
|2xl	|1536px	|@media (min-width: 1536px) { ... }|

### Working mobile-first

Tailwind generates a corresponding max-* modifier for each breakpoint

|Modifier	|Media query|
|:---:|---|
|max-sm	|@media not all and (min-width: 640px) { ... }|
|max-md	|@media not all and (min-width: 768px) { ... }|
|max-lg	|@media not all and (min-width: 1024px) { ... }|
|max-xl	|@media not all and (min-width: 1280px) { ... }|
|max-2xl	|@media not all and (min-width: 1536px) { ... }|

### Customizing reponsive breakpoint

[customizing breakpoints documentation](https://tailwindcss.com/docs/screens)

```js
/** @type {import('tailwindcss').Config} */
module.exports = {
  theme: {
    screens: {
      'sm': '576px',
      // => @media (min-width: 576px) { ... }
      'md': '960px',
      // => @media (min-width: 960px) { ... }
      'lg': '1440px',
      // => @media (min-width: 1440px) { ... }
    },
  }
}
```

- Using custom screen names

```js
/** @type {import('tailwindcss').Config} */
module.exports = {
  theme: {
    screens: {
      'tablet': '640px',
      // => @media (min-width: 640px) { ... }
      'laptop': '1024px',
      // => @media (min-width: 1024px) { ... }
    },
  }
}
// using in template
<div class="grid grid-cols-1 tablet:grid-cols-2 laptop:grid-cols-3">
  <!-- ... -->
</div>
```

[⬆ back to top](#top)

