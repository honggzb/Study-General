[React typescript -8.DOM and React Event Types](#top)

- [The Foundation: Understanding SyntheticEvent](#the-foundation-understanding-syntheticevent)
- [Mouse Events: Clicks, Hovers, and More](#mouse-events-clicks-hovers-and-more)
- [Keyboard Events: Beyond Just “Press Ente](#keyboard-events-beyond-just-press-ente)
- [Form Events](#form-events)
- [Generic Event Handlers](#generic-event-handlers)
  - [Typed Event Helpers and Overloads](#typed-event-helpers-and-overloads)
  - [Custom Event Handlers and Event Delegation patterns](#custom-event-handlers-and-event-delegation-patterns)
- [custom Event Handlers hooks- reusable](#custom-event-handlers-hooks--reusable)
- [Async FormEvent Safely](#async-formevent-safely)
- [Drag and Drop Events](#drag-and-drop-events)
- [Use Cases- a Search Component with Debounced Input](#use-cases--a-search-component-with-debounced-input)
- [Use Cases- Modal with Proper Escape Key Handling](#use-cases--modal-with-proper-escape-key-handling)
- [Skill- Number Input Deception](#skill--number-input-deception)

-------------------------------------

## The Foundation: Understanding SyntheticEvent

- Every React event handler receives a `SyntheticEvent`
- React’s wrapper around native DOM events. These synthetic events have the same interface as native events but with **guaranteed cross-browser consistency**

|Event Type|	Usage|	Element Types|
|---|---|---|
|`MouseEvent<T>`|	Clicks, mouse movement	|`HTMLButtonElement`, `HTMLDivElement`, etc.|
|`KeyboardEvent<T>`|	Key presses|	`HTMLInputElement`, `HTMLTextAreaElement`|
|`ChangeEvent<T>`	|Form input changes	|`HTMLInputElement`, `HTMLSelectElement`, `HTMLTextAreaElement`|
|`FormEvent<T>`|Form submission	|`HTMLFormElement`|
|`FocusEvent<T>`	|Focus/blur events|	Any focusable element|
|`CompositionEvent<T>`	|IME input composition	|`HTMLInputElement`, `HTMLTextAreaElement`|
|`DragEvent<T>`	|Drag and drop operations	|Any element|
|`SyntheticEvent<T>`	|Generic fallback	|Any element|

## Mouse Events: Clicks, Hovers, and More

```ts
import { MouseEvent } from 'react';
function handleClick(event: MouseEvent<HTMLButtonElement>) {
  // ✅ Full access to mouse event properties
  console.log('Clicked at:', event.clientX, event.clientY);
  console.log('Button pressed:', event.button); // 0 = left, 1 = middle, 2 = right
  console.log('Alt key held:', event.altKey);
  // The target is properly typed as HTMLButtonElement
  /* Use event.currentTarget instead of event.target when you need the element that the event handler is attached to
  ** event.target gives you the element that triggered the event (which might be a child element)
  */
  console.log('Button text:', event.currentTarget.textContent);
}
function InteractiveButton() {
  const handleMouseEnter = (event: MouseEvent<HTMLButtonElement>) => {
    event.currentTarget.style.backgroundColor = '#blue';
  };
  const handleMouseLeave = (event: MouseEvent<HTMLButtonElement>) => {
    event.currentTarget.style.backgroundColor = '';
  };
  return (
    <button
      onClick={handleClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      Hover and click me
    </button>
  );
}
```

[🚀back to top](#top)

## Keyboard Events: Beyond Just “Press Ente

- `onKeyPress` is deprecated in favor of onKeyDown for most use cases
- `onKeyDown` for key detection
- `onKeyUp` for actions that should happen when keys are released

```ts
import { KeyboardEvent } from 'react';
function handleKeyPress(event: KeyboardEvent<HTMLInputElement>) {
  // ✅ Access to keyboard-specific properties
  if (event.key === 'Enter' && event.ctrlKey) {
    console.log('Ctrl+Enter pressed!');
    // Submit form or perform action
    return;
  }
  // Check for specific keys
  if (event.key === 'Escape') {
    event.currentTarget.blur(); // Remove focus
    return;
  }
  // Access the input value
  const currentValue = event.currentTarget.value;
  console.log('Typing in:', currentValue);
}
function KeyboardInput() {
  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    // Prevent certain keys from being processed
    if (event.key === 'Tab' && event.shiftKey) {
      event.preventDefault();
      // Handle custom tab navigation
    }
  };
  return (
    <input type="text" onKeyPress={handleKeyPress} onKeyDown={handleKeyDown} placeholder="Try Ctrl+Enter or Escape" />
  );
}
```

[🚀back to top](#top)

## Form Events

|Event Type|Description|
|---|---|
|`AnimationEvent`|	CSS Animations|
|`ChangeEvent`|	Changing the value of `<input>`, `<select>` and `<textarea>` element|
|`ClipboardEvent`|	Using copy, paste and cut events|
|`CompositionEvent`|	Events that occur due to the user indirectly entering text (e.g. depending on Browser and PC setup, a popup window may appear with additional characters if you e.g. want to type Japanese on a US Keyboard)|
|`DragEvent`|	Drag and drop interaction with a pointer device (e.g. mouse)|
|`FocusEvent`|Event that occurs when elements gets or loses focus|
|`FormEvent`|	Event that occurs whenever a `<form>` or form element gets/loses focus, a form element value is changed or the form is submitted|
|`InvalidEvent`|	Fired when validity restrictions of an input fails (e.g <input type="number" max="10"> and someone would insert number 20)|
|`KeyboardEvent`|	User interaction with the keyboard. Each event describes a single key interaction|
|`InputEvent`|	Event that occurs before the value of `<input>`, `<select>` and `<textarea>` changes|
|`MouseEvent`|	Events that occur due to the user interacting with a pointing device (e.g. mouse)
|`PointerEvent`	|Events that occur due to user interaction with a variety pointing of devices such as mouse, pen/stylus, a touchscreen and which also supports multi-touch. Unless you develop for older browsers (IE10 or Safari 12), pointer events are recommended. Extends UIEvent|
|`TouchEvent`|	Events that occur due to the user interacting with a touch device. Extends UIEvent|
|`TransitionEvent`|	CSS Transition. Not fully browser supported. Extends UIEvent|
|`UIEvent`|	Base Event for Mouse, Touch and Pointer events|
|`WheelEvent`|	Scrolling on a mouse wheel or similar input device. (Note: wheel event should not be confused with the `scroll` event)
|`SyntheticEvent`|	The base event for all above events. Should be used when unsure about event type|

- [Forms and Events](https://react-typescript-cheatsheet.netlify.app/docs/basic/getting-started/forms_and_events/)

```ts
import { FormEvent, ChangeEvent, FocusEvent } from 'react';
import { useState } from 'react';
interface FormData {
  username: string;
  password: string;
}
function LoginForm() {
  const [formData, setFormData] = useState<FormData>({
    username: '',
    email: '',
    password: ''
  });
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log('Form submitted:', formData);
  };
  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.currentTarget;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  const handleInputFocus = (event: FocusEvent<HTMLInputElement>) => {
    console.log('Focused:', event.currentTarget.name);
    // Maybe clear validation errors for this field
  };
  const handleInputBlur = (event: FocusEvent<HTMLInputElement>) => {
    console.log('Blurred:', event.currentTarget.name);
    // Maybe validate this field
  };
  const handleTextareaChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    console.log('Textarea value:', event.currentTarget.value);
  };
  const handleSelectChange = (event: ChangeEvent<HTMLSelectElement>) => {
    console.log('Selected option:', event.currentTarget.value);
    // For multi-select, you'd need to iterate through options
  };
  return (
    <form onSubmit={handleSubmit}>
      <input
        name="username"
        value={formData.username}
        onChange={handleInputChange}
        onFocus={handleInputFocus}
        onBlur={handleInputBlur}
        placeholder="Username"
      />
      <input
        name="password"
        type="password"
        value={formData.password}
        onChange={handleInputChange}
        onFocus={handleInputFocus}
        onBlur={handleInputBlur}
        placeholder="Password"
      />
      <textarea
        onChange={handleTextareaChange}
        placeholder="Long text input"
      />
      <select onChange={handleSelectChange}>
        <option value="">Choose an option</option>
        <option value="option1">Option 1</option>
        <option value="option2">Option 2</option>
      </select>
      <button type="submit">Sign In</button>
    </form>
  );
}
```

[🚀back to top](#top)

## Generic Event Handlers

- generic approach works for inputs, textareas, and select elements.

```ts
import { ChangeEvent } from 'react';
function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    age: 0,
  });
  // ✅ One handler to rule them all
  const handleInputChange = <T extends HTMLInputElement | HTMLTextAreaElement>(e: ChangeEvent<T>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  return (
    <form>
      <input name="name" value={formData.name} onChange={handleInputChange} />
      <textarea name="message" value={formData.message} onChange={handleInputChange} />
    </form>
  );
}
```

- any form element

```ts
import { ChangeEvent } from 'react';
// ✅ Generic handler that works with any form element
function createFormHandler<T extends HTMLElement>(
  callback: (name: string, value: string) => void
) {
  return (event: ChangeEvent<T>) => {
    const target = event.currentTarget;
    const name = target.getAttribute('name') || '';
    // Handle different element types
    let value = '';
    if (target instanceof HTMLInputElement || target instanceof HTMLTextAreaElement) {
      value = target.value;
    } else if (target instanceof HTMLSelectElement) {
      value = target.value;
    }

    callback(name, value);
  };
}
```

### Typed Event Helpers and Overloads

- Sometimes you want ergonomic handlers that accept either raw events or pre-extracted values. You can model this with function overloads while keeping call sites clean
- These helpers keep component code concise while preserving strong typing for both ergonomic and low-level cases.
  - input event helper
  - keyboard event helper

```tsx
// 1. Overload to accept either the event or the extracted value
function onInputChange(handler: (value: string) => void): (e: React.ChangeEvent<HTMLInputElement>) => void;
function onInputChange(handler: (e: React.ChangeEvent<HTMLInputElement>) => void): (e: React.ChangeEvent<HTMLInputElement>) => void;
function onInputChange(
  handler: ((value: string) => void) | ((e: React.ChangeEvent<HTMLInputElement>) => void),
) {
  return (e: React.ChangeEvent<HTMLInputElement>) => {
    // If the handler expects a value, pass value; otherwise pass event
    if (handler.length === 1) {
      try {
        (handler as (value: string) => void)(e.target.value);
        return;
      } catch {
        // fall-through to event
      }
    }
    (handler as (e: React.ChangeEvent<HTMLInputElement>) => void)(e);
  };
}
// Usage
<input onChange={onInputChange((value) => setQuery(value))} />
<input onChange={onInputChange((e) => console.log(e.target.selectionStart))} />

//2. Key handlers with discriminated keys
type ArrowKey = 'ArrowUp' | 'ArrowDown' | 'ArrowLeft' | 'ArrowRight';
function onArrow(handler: (key: ArrowKey, e: React.KeyboardEvent) => void) {
  return (e: React.KeyboardEvent) => {
    const k = e.key as ArrowKey;
    if (k === 'ArrowUp' || k === 'ArrowDown' || k === 'ArrowLeft' || k === 'ArrowRight') {
      handler(k, e);
    }
  };
}
<div onKeyDown={onArrow((key) => console.log('pressed', key))} />
// 3.
function GenericForm() {
  const handleChange = createFormHandler((name, value) => {
    console.log(`Field ${name} changed to: ${value}`);
  });
  return (
  <form>
    <input name="firstName" onChange={handleChange} />
    <textarea name="bio" onChange={handleChange} />
    <select name="country" onChange={handleChange}>
      <option value="us">United States</option>
      <option value="ca">Canada</option>
    </select>
  </form>
  );
}
```

[🚀back to top](#top)

### Custom Event Handlers and Event Delegation patterns

```ts
import { MouseEvent, useRef } from 'react';
interface ListItem {
  id: string;
  text: string;
  type: 'button' | 'link' | 'text';
}
function EventDelegationExample() {
  const listRef = useRef<HTMLUListElement>(null);
  const handleListClick = (event: MouseEvent<HTMLUListElement>) => {
    const target = event.target as HTMLElement;
    // Find the closest list item
    const listItem = target.closest('li');
    if (!listItem) return;
    const itemId = listItem.getAttribute('data-id');
    const itemType = listItem.getAttribute('data-type');
    console.log('Clicked item:', { itemId, itemType });
    // Handle different item types
    if (itemType === 'button') {
      // Handle button click
    } else if (itemType === 'link') {
      // Handle link click
    }
  };
  const items: ListItem[] = [
    { id: '1', text: 'Click me', type: 'button' },
    { id: '2', text: 'Visit link', type: 'link' },
    { id: '3', text: 'Just text', type: 'text' },
  ];
  return (
    <ul ref={listRef} onClick={handleListClick}>
      {items.map(item => (
        <li key={item.id} data-id={item.id} data-type={item.type}>
          {item.text}
        </li>
      ))}
    </ul>
  );
}
```

[🚀back to top](#top)

## custom Event Handlers hooks- reusable

```ts
// ✅ Extract handlers into custom hooks or separate functions
function useFormHandlers(onSubmit: (data: FormData) => void) {
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    onSubmit(formData);
  };
  const handleReset = (event: FormEvent<HTMLFormElement>) => {
    event.currentTarget.reset();
  };
  return { handleSubmit, handleReset };
}

function MyForm() {
  const { handleSubmit, handleReset } = useFormHandlers((data) => {
    console.log('Form data:', Object.fromEntries(data));
  });

  return (
    <form onSubmit={handleSubmit} onReset={handleReset}>
      <input name="username" />
      <button type="submit">Submit</button>
      <button type="reset">Reset</button>
    </form>
  );
}
```

[🚀back to top](#top)

## Async FormEvent Safely

```ts
import { FormEvent } from 'react';
import { useState } from 'react';
function AsyncFormComponent() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (isSubmitting) return; // Prevent double submission
    setIsSubmitting(true);
    try {
      const formData = new FormData(event.currentTarget);
      await submitFormData(formData);
      console.log('Form submitted successfully');
    } catch (error) {
      console.error('Submission failed:', error);
    } finally {
      setIsSubmitting(false);
    }
  };
  return (
    <form onSubmit={handleSubmit}>
      <input name="data" required />
      <button type="submit" disabled={isSubmitting}>
        {isSubmitting ? 'Submitting...' : 'Submit'}
      </button>
    </form>
  );
}
// Mock async function
async function submitFormData(data: FormData): Promise<void> {
  // Simulate API call
  await new Promise(resolve => setTimeout(resolve, 1000));
}
```

[🚀back to top](#top)

## Drag and Drop Events

```ts
// Drag and drop events are perfect for creating intuitive file upload interfaces
import { DragEvent } from 'react';
import { useState } from 'react';
function FileDropZone() {
  const [isDragOver, setIsDragOver] = useState(false);
  const [files, setFiles] = useState<File[]>([]);
  const handleDragEnter = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragOver(true);
  };
  const handleDragLeave = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragOver(false);
  };
  const handleDragOver = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault(); // Necessary to allow drop
  };
  const handleDrop = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragOver(false);
    const droppedFiles = Array.from(event.dataTransfer.files);
    // Filter for specific file types
    const imageFiles = droppedFiles.filter(file =>
      file.type.startsWith('image/')
    );
    setFiles(prev => [...prev, ...imageFiles]);
    console.log('Dropped files:', imageFiles.map(f => f.name));
  };
  return (
    <div
      onDragEnter={handleDragEnter}
      onDragLeave={handleDragLeave}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
      style={{
        border: `2px dashed ${isDragOver ? '#007acc' : '#ccc'}`,
        borderRadius: '8px',
        padding: '2rem',
        textAlign: 'center',
        backgroundColor: isDragOver ? '#f0f8ff' : '#fafafa'
      }}
    >
      {isDragOver ? ( <p>Drop files here!</p> ) : ( <p>Drag image files here to upload</p> )}
      {files.length > 0 && (
        <div>
          <h4>Uploaded files:</h4>
          <ul>
            {files.map((file, index) => ( <li key={index}>{file.name} ({file.size} bytes)</li>))}
          </ul>
        </div>
      )}
    </div>
  );
}
```

[🚀back to top](#top)

## Use Cases- a Search Component with Debounced Input

```ts
import { ChangeEvent, KeyboardEvent } from 'react';
import { useState, useEffect, useCallback } from 'react';
interface SearchProps {
  onSearch: (query: string) => void;
  placeholder?: string;
  debounceMs?: number;
}
function SearchInput({ onSearch, placeholder = 'Search...', debounceMs = 300 }: SearchProps) {
  const [query, setQuery] = useState('');
  // Debounced search effect
  useEffect(() => {
    const timer = setTimeout(() => {
      if (query.trim()) {
        onSearch(query);
      }
    }, debounceMs);
    return () => clearTimeout(timer);
  }, [query, onSearch, debounceMs]);

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setQuery(event.currentTarget.value);
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Escape') {
      setQuery('');
      event.currentTarget.blur();
    }
    if (event.key === 'Enter') {
      event.preventDefault();
      onSearch(query);
    }
  };
  return (
    <input type="text" value={query} onChange={handleInputChange} onKeyDown={handleKeyDown} placeholder={placeholder} />
  );
}
```

- Debounce Expensive Operations: reduces re-render
  - form inputs can cause a lot of re-renders, especially in controlled components

```ts
import { useMemo } from 'react';
function SearchForm() {
  const [query, setQuery] = useState('');
  // Debounce expensive searches
  const debouncedQuery = useMemo(() => {
    const timeoutId = setTimeout(() => query, 300);
    return () => clearTimeout(timeoutId);
  }, [query]);
  return <input value={debouncedQuery} onChange={(e) => setQuery(e.target.value)} placeholder="Search..." />;
}
```

[🚀back to top](#top)

## Use Cases- Modal with Proper Escape Key Handling

```ts
import { KeyboardEvent, MouseEvent } from 'react';
import { useEffect } from 'react';
interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}
function Modal({ isOpen, onClose, children }: ModalProps) {
  // Handle escape key globally when modal is open
  useEffect(() => {
    if (!isOpen) return;
    const handleEscapeKey = (event: globalThis.KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };
    document.addEventListener('keydown', handleEscapeKey);
    return () => document.removeEventListener('keydown', handleEscapeKey);
  }, [isOpen, onClose]);
  const handleBackdropClick = (event: MouseEvent<HTMLDivElement>) => {
    // Only close if clicking the backdrop, not the modal content
    if (event.target === event.currentTarget) {
      onClose();
    }
  };
  if (!isOpen) return null;

  return (
    <div
      className="modal-backdrop"
      onClick={handleBackdropClick}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}
    >
      <div className="modal-content" style={{
        backgroundColor: 'white',
        padding: '2rem',
        borderRadius: '8px',
        maxWidth: '500px',
        width: '90%'
      }}>
        {children}
      </div>
    </div>
  );
}
```

[🚀back to top](#top)

## Skill- Number Input Deception

```ts
<input type="number">
// ❌ This will bite you eventually
const [age, setAge] = useState<number>(0);
const handleAgeChange = (e: ChangeEvent<HTMLInputElement>) => {
  setAge(e.target.value);         // Type error: string is not assignable to number
};
// Option 1: Convert at the Handler Level
const handleNumberChange = (e: ChangeEvent<HTMLInputElement>) => {
  const value = e.target.value === '' ? 0 : Number(e.target.value);
  setAge(value);
};
// Option 2: Generic Number Handler with Validation
const handleNumericInput = (e: ChangeEvent<HTMLInputElement>, setter: (value: number) => void) => {
  const { value } = e.target;
  // Handle empty string case
  if (value === '') {
    setter(0);
    return;
  }
  // Convert and validate
  const numValue = Number(value);
  if (!isNaN(numValue)) {
    setter(numValue);
  }
  // If NaN, ignore the input (keeps current state)
};
// Usage:
<input type="number" value={age} onChange={(e) => handleNumericInput(e, setAge)} />;
// Option 3: Custom Hook for Number Inputs
function useNumberInput(initialValue: number = 0) {
  const [value, setValue] = useState<number>(initialValue);
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    if (inputValue === '') {
      setValue(0);
      return;
    }
    const numValue = Number(inputValue);
    if (!isNaN(numValue)) {
      setValue(numValue);
    }
  };
  return {
    value,
    onChange: handleChange,
    // Convenience setter if you need it
    setValue,
  };
}
// Usage becomes beautifully simple:
function PriceInput() {
  const price = useNumberInput(0);
  return <input type="number" min="0" step="0.01" {...price} />;
}
```

[🚀back to top](#top)
