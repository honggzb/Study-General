[react accessiblity-study](#top)

- [Accessible Dialog/Model](#accessible-dialogmodel)
- [Accessible Form Elements](#accessible-form-elements)
  - [Semantic HTML structure for form components](#semantic-html-structure-for-form-components)
  - [Mouse and pointer events on options](#mouse-and-pointer-events-on-options)
- [Immediate feedback on form validation and errors](#immediate-feedback-on-form-validation-and-errors)

----------------------------------------------

## Accessible Dialog/Model

- Ensure that all clickable and interactive elements (like buttons and links) are focusable
- Manage focus for modals, dialogs, and dynamic components
- Use the `tabIndex` attribute to control the order of focusable elements
- Provide Visual Feedback for Focused Elements

```ts
button:focus, a:focus {
  outline: 2px solid #007bff;
  outline-offset: 2px;
}
const Modal = ({ isOpen, onClose }) => {
  const modalRef = useRef(null);
  useEffect(() => {
    if (isOpen) {
      modalRef.current.focus();  // Set focus to modal when opened
    }
  }, [isOpen]);

  return isOpen ? (
    <div
      ref={modalRef}
      role="dialog"
      aria-modal="true"
      tabIndex="-1"
      className="modal"
    >
      <button onClick={onClose}>Close</button>
      <p>Modal content goes here</p>
    </div>
  ) : null;
};
```

## Accessible Form Elements

### Semantic HTML structure for form components

- Using `<label>` elements that are correctly associated with form inputs via the for attribute or `htmlFor` in React
- Using the role of placeholders
- consider using `aria-live` to announce form errors to screen reader users dynamically
- `fieldset` and `legend` - the fieldset element groups related form controls together, while the legend element provides a caption for the fieldset. This is particularly useful for grouping related form fields and providing context for screen reader users, especially in large multistep or dynamic forms

```html
<form onSubmit={handleSubmit}>
  <label htmlFor="email">Email Address</label>
  <input type="email" id="email" name="email" required />
  <label htmlFor="message">Message:</label>
  <textarea id="message" name="message" placeholder="Type your message here…"></textarea>
  <div role="alert" aria-live="assertive">
    {formErrors.email && <span>{formErrors.email}</span>}
  </div>
  <fieldset>
    <legend>Personal Information</legend>
    {/* Form fields */}
  </fieldset>
  <button type="submit">Submit</button>
</form>
```

### Mouse and pointer events on options

- options elements
  - a user can disable an opened popover by clicking outside the element
  - using `onBlur` and `onFocus` event handlers

```ts
const OuterClickExample = () => {
  const [isOpen, setIsOpen] = useState(false);
  componentDidMount() {
    window.addEventListener('click', this.onClickOutsideHandler);
  }

  componentWillUnmount() {
    window.removeEventListener('click', this.onClickOutsideHandler);
  }

  onClickHandler() {
    this.setState(currentState => ({
      isOpen: !currentState.isOpen
    }));
  }

  onClickOutsideHandler(event) {
    if (this.state.isOpen && !this.toggleContainer.current.contains(event.target)) {
      this.setState({ isOpen: false });
    }
  }
  // We close the popover on the next tick by using setTimeout.
  // This is necessary because we need to first check if
  // another child of the element has received focus as
  // the blur event fires prior to the new focus event.
  onBlurHandler() {
    this.timeOutId = setTimeout(() => {
      this.setState({
        isOpen: false
      });
    });
  }
  // If a child receives focus, do not close the popover.
  onFocusHandler() {
    clearTimeout(this.timeOutId);
  }

  return (
      <div ref={this.toggleContainer} onBlur={this.onBlurHandler} onFocus={this.onFocusHandler}>
        <button
          onClick={this.onClickHandler}
          aria-haspopup="true"
          aria-expanded={this.state.isOpen}>
        >Select an option</button>
        {this.state.isOpen && (
          <ul>
            <li>Option 1</li>
            <li>Option 2</li>
            <li>Option 3</li>
          </ul>
        )}
      </div>
    );
}
```

## Immediate feedback on form validation and errors

- Providing helpful error messages and guidance

```ts
import { useState } from "react";
function LoginForm() {
  const [error, setError] = useState("");
  const handleSubmit = (event) => {
    event.preventDefault(); // Prevent form submission
    // Perform validation logic...
    // If an error is detected:
    setError("Invalid login credentials. Please try again.");
    // If no error, process form submission...
  };
  return (
    <form onSubmit={handleSubmit}>
      {/* Form fields go here */}
      {/* Display error message if an error exists */}
      {error && (
        <div
          role="alert"
          aria-live="assertive" // Assistive technologies will announce this region's updates
          aria-atomic="true" // Announce the entire message, not just changed parts
          style={{ color: "red" }} // Red color for error text visibility
        >
          {error}
        </div>
      )}

      <button type="submit">Login</button>
    </form>
  );
}
```

- https://legacy.reactjs.org/docs/accessibility.html
