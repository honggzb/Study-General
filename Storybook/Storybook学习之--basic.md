- [Context for mocking](#context-for-mocking)
- [Decorator](#decorator)
  - [Story decorator](#story-decorator)
  - [Global decorator](#global-decorator)

----------------------------------------------

## Context for mocking

- args - the story arguments. You can use some args in your decorators and drop them in the story implementation itself.
- argTypes- Storybook's argTypes allow you to customize and fine-tune your stories args.
globals - Storybook-wide globals. In particular you can use the toolbars feature to allow you to change these values using Storybook’s UI.
- hooks - Storybook's API hooks (e.g., useArgs).
- parameters- the story's static metadata, most commonly used to control Storybook's behavior of features and addons
  - Available parameters are listed in the [parameters API](https://storybook.js.org/docs/api/parameters#available-parameters) reference
- viewMode- Storybook's current active window (e.g., canvas, docs)

```ts
export const options = {
  colors: ['primary', 'secondary'],
  sizes: ['sm', 'lg'],
  isClickable: false,
  isDragable: false
}
argTypes: {
    color: {
      description: '**options:**',
      table: {
        type: { summary: options.colors.map(o => `'${o}'`).join('|') }
      },
      control: { type: 'select', options: options.colors}
    },
}
```

[⬆ back to top](#top)

## Decorator

### Story decorator

```js
//card.stories.ts
const meta = {
  title: 'Components/Card1',
  component: Card1,
  decorators: [
    (Story) => (
      <div style={styles}> <Story /> </div>
    )
  ],
  //...
}
```

[⬆ back to top](#top)

### Global decorator

```js
//.storybook/preview.ts

```

[⬆ back to top](#top)

-----------------------------------------------
> GIthub
- [React Admin Dashboard App | React, Material UI, Data Grid, Light & Dark Mode](https://github.com/ed-roh/react-admin-dashboard/tree/master)
- [Vue 3 + Ts + Vite + storybook](https://github.com/baobaomi900901/storybook8/tree/main)
- [next14-storybook8-mui5-custom-theming-template](https://github.com/zautke/next14-storybook8-mui5-custom-theming-template)
- [Storybook-Mui](https://github.com/panntod/Storybook-Mui/tree/master)

> Create an Angular Component Library w/ StoryBook
- [Create an Angular Component Library w/ StoryBook](https://peakup.org/blog/create-an-angular-component-library-w-storybook/)
- https://github.com/marcelorl/angular-lib-storybook
