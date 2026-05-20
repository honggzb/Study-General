```
├── 📂Storybook/
|    ├── 📄Storybook-setup.md
|    └── 📄Storybook学习之--basic.md
```


## Control type

```
----------|----------------|--------------------------------------------------------------------------------------------
Data type |  ControlType   |                     Description
----------|----------------|--------------------------------------------------------------------------------------------
 array	  | 'object'       | Provides a JSON-based editor to handle the values of the array. Also allows editing in raw mode.
          |                |  `{ control: 'object' }`
----------|----------------|--------------------------------------------------------------------------------------------
 boolean  | 'boolean'      | Provides a toggle for switching between possible states.
          |                |  `{ control: 'boolean' }`
----------|----------------|--------------------------------------------------------------------------------------------
     	  | 'check'	       | Provides a set of stacked checkboxes for selecting multiple options.
          |                |  `{ control: 'check', options: ['email', 'phone', 'mail'] }`
          | 'inline-check' | Provides a set of inlined checkboxes for selecting multiple options.
          |                |  `{ control: 'inline-check', options: ['email', 'phone', 'mail'] }`
 enum     | 'radio'	       | Provides a set of stacked radio buttons based on the available options.
          |                |  `{ control: 'radio', options: ['email', 'phone', 'mail'] }`
          | 'inline-radio' | Provides a set of inlined radio buttons based on the available options.
          |                |  `{ control: 'inline-radio', options: ['email', 'phone', 'mail'] }`
          | 'select'	   | Provides a select to choose a single value from the options.
          |                |  `{ control: 'select', options: [20, 30, 40, 50] }`
          |'multi-select'  | Provides a select to choose multiple values from the options.
          |                |  `{ control: 'multi-select', options: ['USA', 'Canada', 'Mexico'] }`
----------|----------------|--------------------------------------------------------------------------------------------
     	  | 'number'	   | Provides a numeric input to include the range of all possible values.
number    |                |  `{ control: { type: 'number', min:1, max:30, step: 2 } }`
          |'range'	       | Provides a range slider to include all possible values.
          |                |  `{ control: { type: 'range', min: 1, max: 30, step: 3 } }`
----------|----------------|--------------------------------------------------------------------------------------------
    	  | 'file'	       | Provides a file input that returns an array of URLs. Can be further customized to accept specific file types.
object    |                |  `{ control: { type: 'file', accept: '.png' } }`
          | 'object'	   | Provides a JSON-based editor to handle the object's values. Also allows editing in raw mode.
          |                |  `{ control: 'object' }`
----------|----------------|--------------------------------------------------------------------------------------------
    	  | 'color'        | Provides a color picker to choose color values. Can be additionally configured to include a set of color presets.
          |                |  `{ control: { type: 'color', presetColors: ['red', 'green']} }`
string    |'date'	       | Provides a datepicker to choose a date.
          |                |  `{ control: 'date' }`
          |'text'	       |Provides a freeform text input.
          |                |  `{ control: 'text' }`
----------|----------------|--------------------------------------------------------------------------------------------
```


## tips of children in argTypes

```ts
argTypes: {
    children: {
      control: 'text',
      description: 'The button label/content',
    },
    // Human-readable labels
    children: {
      options: ['Button', 'ButtonwithIcon', 'BottonwithHTML'],
      mapping: {
        Button: 'Button',
        ButtonwithIcon: '⚠️ warning',
        BottonwithHTML: '<p>text</p>',
      },
      control: { type: 'select' },
    }
    // Removes the interactive control from the UI
    children: {
      control: false,
      table: {
        type: { summary: 'Text/Icon/ReactNode' }, // Keeps the type info in the docs
      },
    },
  },
```
