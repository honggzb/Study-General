[React typescript -5.Component Props and Children2-Prop Combinations And Unions](#top)

- [Pattern 1: Permit Specific Combinations](#pattern-1-permit-specific-combinations)
- [Pattern 2: Limit Based on Conditions](#pattern-2-limit-based-on-conditions)
- [Pattern 3: Require Dependent Props](#pattern-3-require-dependent-props)
- [Real-World Example: Form Field Combinations](#real-world-example-form-field-combinations)
- [Advanced Pattern: Function Overloads](#advanced-pattern-function-overloads)

-------------------------------------------------------------------------

|Pattern|When to Use|
|---|---|
||distinct modes of operation (controlled vs uncontrolled)|
|Permit patterns|Props have fundamentally different meanings in different contexts
||You want to prevent conceptual confusion|
|---------------|-----------------------------------------------|
||Components with multiple variants that need different props|
|Limit patterns|Preventing props that don’t make sense together|
||Creating focused, single-purpose interfaces|
|---------------|-----------------------------------------------|
||Accessibility requirements must be enforced|
|Require patterns |Props have strong dependencies (e.g., validation rules)|
||want to guide developers toward best practices|

## Pattern 1: Permit Specific Combinations

- **Use the nevertype to explicitly forbid props in specific variants**
- This makes the mutual exclusivity obvious to both TypeScript and developers reading the code

```ts
type ControlledDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  defaultOpen?: never;                      // Explicitly forbidden
};
type UncontrolledDialogProps = {
  defaultOpen?: boolean;
  open?: never;               // Explicitly forbidden
  onOpenChange?: never;       // Explicitly forbidden
};
type DialogProps = {
  children: React.ReactNode;
  title?: string;
} & (ControlledDialogProps | UncontrolledDialogProps);

function Dialog(props: DialogProps) {
  const { children, title } = props;
  // TypeScript narrows the type based on the presence of 'open'
  if ('open' in props) {
    // Controlled variant - TypeScript knows onOpenChange exists
    return (
      <dialog open={props.open}>
        {title && <h2>{title}</h2>}
        {children}
        <button onClick={() => props.onOpenChange(false)}>
          Close
        </button>
      </dialog>
    );
  }
  // Uncontrolled variant - manage state internally
  const [isOpen, setIsOpen] = useState(props.defaultOpen ?? false);

  return (
    <dialog open={isOpen}>
      {title && <h2>{title}</h2>}
      {children}
      <button onClick={() => setIsOpen(false)}>
        Close
      </button>
    </dialog>
  );
}
//
// ✅ Controlled - all required props present
<Dialog open={isOpen} onOpenChange={setIsOpen}>
  Content here
</Dialog>
// ✅ Uncontrolled - simple and self-contained
<Dialog defaultOpen={true}>
  Content here
</Dialog>
// ❌ These combinations are impossible
<Dialog open={true} defaultOpen={false} /> {/* TypeScript error */}
<Dialog open={isOpen} />                   {/* Missing onOpenChange */}
```

[🚀back to top](#top)


## Pattern 2: Limit Based on Conditions

```ts
type BaseButtonProps = {
  children: React.ReactNode;
  disabled?: boolean;
  className?: string;
};
type PrimaryButtonProps = BaseButtonProps & {
  variant: 'primary';
  onClick: () => void;     // Primary buttons must have click handlers
  href?: never;
  target?: never;
};
type SecondaryButtonProps = BaseButtonProps & {
  variant: 'secondary';
  onClick?: () => void;     // Optional for secondary
  href?: never;
  target?: never;
};
type LinkButtonProps = BaseButtonProps & {
  variant: 'link';
  href: string;
  target?: '_blank' | '_self' | '_parent' | '_top';
  onClick?: never;          // Links don't need onClick
};
type ButtonProps = PrimaryButtonProps | SecondaryButtonProps | LinkButtonProps;

function Button(props: ButtonProps) {
  const { children, disabled, className, variant } = props;
  const baseClasses = `btn btn-${variant} ${className || ''}`;
  if (variant === 'link') {
    return (
      <a href={props.href} target={props.target} className={baseClasses}>
        {children}
      </a>
    );
  }
  return (
    <button className={baseClasses} disabled={disabled} onClick={props.onClick}>
      {children}
    </button>
  );
}
//
// ✅ Primary buttons require onClick
<Button variant="primary" onClick={handleSubmit}>
  Submit Form
</Button>
// ✅ Link buttons require href
<Button variant="link" href="/dashboard" target="_blank">
  Go to Dashboard
</Button>
// ✅ Secondary buttons work with or without onClick
<Button variant="secondary">Cancel</Button>
// ❌ Invalid combinations caught at compile time
<Button variant="primary" href="/somewhere" /> {/* href not allowed */}
<Button variant="link" onClick={handleClick} /> {/* onClick not allowed */}
```

[🚀back to top](#top)

## Pattern 3: Require Dependent Props

```ts
type HasIcon<T> = T extends { icon: string }
  ? T & { 'aria-label': string }       // Icon requires aria-label
  : T;
type HasTooltip<T> = T extends { tooltip: string }
  ? T & { 'aria-describedby'?: string } // Tooltip can have describedby
  : T;
type IconButtonProps = HasTooltip<HasIcon<{
  icon?: string;
  tooltip?: string;
  'aria-label'?: string;
  'aria-describedby'?: string;
  onClick: () => void;
  children?: never; // Icon buttons don't show text
}>>;

function IconButton(props: IconButtonProps) {
  if (!props.icon) {
    // Without icon, this becomes a regular button
    // But TypeScript still enforces the constraints above
    return <button onClick={props.onClick} />;
  }
  return (
    <button
      onClick={props.onClick}
      aria-label={props['aria-label']} // Required when icon exists
      aria-describedby={props['aria-describedby']}
      title={props.tooltip}
    >
      <Icon name={props.icon} />
    </button>
  );
}
```

[🚀back to top](#top)

## Real-World Example: Form Field Combinations

```ts
type BaseFieldProps = {
  name: string;
  label: string;
  error?: string;
  disabled?: boolean;
  required?: boolean;
};
// Pattern 1: Permit specific input types
type TextFieldProps = BaseFieldProps & {
  type: 'text' | 'email' | 'password' | 'tel';
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  maxLength?: number;
  // These don't make sense for text inputs
  multiple?: never;
  options?: never;
};
type SelectFieldProps = BaseFieldProps & {
  type: 'select';
  value: string | string[];
  onChange: (value: string | string[]) => void;
  options: Array<{ value: string; label: string; disabled?: boolean }>;
  // Pattern 2: Limit multiple based on value type
  multiple?: boolean;
  // These don't make sense for selects
  placeholder?: never;
  maxLength?: never;
};
type FileFieldProps = BaseFieldProps & {
  type: 'file';
  value?: never; // File inputs handle their own state
  onChange: (files: FileList | null) => void;
  accept?: string;
  multiple?: boolean;
  // These don't make sense for file inputs
  placeholder?: never;
  maxLength?: never;
  options?: never;
};
// Pattern 3: Require validation when needed
type WithValidation<T> = T extends { required: true }
  ? T & { validationMessage?: string }
  : T;
type FieldProps = WithValidation<TextFieldProps | SelectFieldProps | FileFieldProps>;

function Field(props: FieldProps) {
  const { label, name, error, disabled, required } = props;

  const renderInput = () => {
    switch (props.type) {
      case 'text':
      case 'email':
      case 'password':
      case 'tel':
        return (
          <input
            type={props.type}
            name={name}
            value={props.value}
            onChange={(e) => props.onChange(e.target.value)}
            placeholder={props.placeholder}
            maxLength={props.maxLength}
            disabled={disabled}
            required={required}
          />
        );
      case 'select':
        return (
          <select
            name={name}
            value={props.value}
            onChange={(e) => {
              if (props.multiple) {
                const values = Array.from(e.target.selectedOptions).map(o => o.value);
                props.onChange(values);
              } else {
                props.onChange(e.target.value);
              }
            }}
            multiple={props.multiple}
            disabled={disabled}
            required={required}
          >
            {props.options.map((option) => (
              <option
                key={option.value}
                value={option.value}
                disabled={option.disabled}
              >
                {option.label}
              </option>
            ))}
          </select>
        );

      case 'file':
        return (
          <input
            type="file"
            name={name}
            onChange={(e) => props.onChange(e.target.files)}
            accept={props.accept}
            multiple={props.multiple}
            disabled={disabled}
            required={required}
          />
        );
    }
  };
  return (
    <div className="field">
      <label htmlFor={name}>
        {label}
        {required && <span className="required">*</span>}
      </label>
      {renderInput()}
      {error && <span className="error">{error}</span>}
    </div>
  );
}
```

[🚀back to top](#top)

## Advanced Pattern: Function Overloads

```ts
// Define overloads for different use cases
function Toast(props: {
  type: 'success';
  message: string;
  duration?: number;
}): JSX.Element;
function Toast(props: {
  type: 'error';
  message: string;
  action?: { label: string; onClick: () => void };
  persistent?: true; // Error toasts can be persistent
}): JSX.Element;
function Toast(props: {
  type: 'loading';
  message: string;
  duration?: never; // Loading toasts don't auto-dismiss
  persistent?: true;
}): JSX.Element;
// Implementation handles all cases
function Toast(props: {
  type: 'success' | 'error' | 'loading';
  message: string;
  duration?: number;
  action?: { label: string; onClick: () => void };
  persistent?: boolean;
}) {
  const { type, message, duration, action, persistent } = props;
  useEffect(() => {
    if (type === 'success' && !persistent && duration !== undefined) {
      const timer = setTimeout(() => dismiss(), duration);
      return () => clearTimeout(timer);
    }
  }, [type, persistent, duration]);

  return (
    <div className={`toast toast-${type}`}>
      <span>{message}</span>
      {action && (
        <button onClick={action.onClick}>
          {action.label}
        </button>
      )}
    </div>
  );
}
```

[🚀back to top](#top)
