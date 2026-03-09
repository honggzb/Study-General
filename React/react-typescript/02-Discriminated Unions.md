[React typescript -2.Discriminated Unions](#top)

- [Data fetching Custom Hook with discriminated unions](#data-fetching-custom-hook-with-discriminated-unions)
- [Form Handling with Discriminated Unions](#form-handling-with-discriminated-unions)
- [Form Submission Workflow](#form-submission-workflow)
- [Reducer and action type with discriminated unions](#reducer-and-action-type-with-discriminated-unions)
- [Testing Discriminated Unions](#testing-discriminated-unions)
- [When to Use Each Pattern](#when-to-use-each-pattern)

-------------------------------------------------------------------------

- A discriminated union (tagged union) is a pattern where use a common property to distinguish between different shapes of data
  - a **union type**:  a value can be one of several different types,
    - such as: `string | number` means the value could be either a string or a number, but TypeScript doesn’t inherently know which one at any given time
  - a **discriminated union**: is a literal type, lets TypeScript narrow the type automatically in a type-safe way
- Benefits:
  - <mark>Making Invalid States Impossible</mark>:  Can’t represent incorrect combinations
  - <mark>Enable exhaustive checking</mark> - TypeScript ensures you handle all cases
  - <mark>Provide excellent IntelliSense</mark> - IDE knows exactly what properties are available
  - <mark>Document your intent</mark> - The types themselves explain the possible states
  - <mark>Simplify testing</mark> - Each state is easy to test in isolation

```ts
// ❌ Bad: Multiple booleans lead to invalid states
interface BadState {
  isLoading: boolean;
  isError: boolean;
  data?: User;
  error?: Error;
}
// What if isLoading AND isError are both true?
// What if we have data AND error?
// ✅ Good: Discriminated union makes invalid states impossible
type GoodState =
  | { status: 'loading' }
  | { status: 'error'; error: Error }
  | { status: 'success'; data: User };
// Can't be loading AND error
// Can't have data without success
// Can't have error without error status
```

[🚀back to top](#top)

## Data fetching Custom Hook with discriminated unions

```ts
type FetchState<T> =
  | { status: 'idle' }
  | { status: 'loading' }
  | { status: 'success'; data: T }
  | { status: 'error'; error: Error };
// Custom hook using the discriminated union
function useFetch<T>(url: string): FetchState<T> {
  const [state, setState] = useState<FetchState<T>>({ status: 'idle' });
  useEffect(() => {
    if (!url) return;
    const fetchData = async () => {
      setState({ status: 'loading' });

      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setState({ status: 'success', data });
      } catch (error) {
        setState({
          status: 'error',
          error: error instanceof Error ? error : new Error('Unknown error')
        });
      }
    };
    fetchData();
  }, [url]);
  return state;
}
// Component using the hook
const UserProfile = ({ userId }: { userId: string }) => {
  const userState = useFetch<User>(`/api/users/${userId}`);
  switch (userState.status) {
    case 'idle':
      return <div>Ready to load user</div>;
    case 'loading':
      return <div>Loading user...</div>;
    case 'success':
      // TypeScript knows userState.data exists and is a User
      return (
        <div>
          <h1>{userState.data.name}</h1>
          <p>{userState.data.email}</p>
        </div>
      );
    case 'error':
      // TypeScript knows userState.error exists
      return <div>Error: {userState.error.message}</div>;
    default:
      // This ensures we handle all cases
      const exhaustive: never = userState;
      throw new Error(`Unhandled state: ${exhaustive}`);
  }
};
```

[🚀back to top](#top)

## Form Handling with Discriminated Unions

```ts
// Forms are perfect for discriminated unions
type FormField<T> =
  | { status: 'empty' }
  | { status: 'validating' }
  | { status: 'valid'; value: T }
  | { status: 'invalid'; error: string; value?: T };
interface LoginForm {
  email: FormField<string>;
  password: FormField<string>;
}

const LoginComponent = () => {
  const [form, setForm] = useState<LoginForm>({
    email: { status: 'empty' },
    password: { status: 'empty' }
  });
  const validateEmail = async (email: string) => {
    setForm(prev => ({
      ...prev,
      email: { status: 'validating' }
    }));
    // Simulate async validation
    await new Promise(resolve => setTimeout(resolve, 500));
    if (!email.includes('@')) {
      setForm(prev => ({
        ...prev,
        email: { status: 'invalid', error: 'Invalid email format', value: email }
      }));
    } else {
      setForm(prev => ({
        ...prev,
        email: { status: 'valid', value: email }
      }));
    }
  };

  const canSubmit = form.email.status === 'valid' && form.password.status === 'valid';

  return (
    <form>
      <div>
        <input type="email" className={form.email.status === 'invalid' ? 'error' : ''}
          onChange={e => validateEmail(e.target.value)}
        />
        {form.email.status === 'invalid' && (
          <span className="error-message">{form.email.error}</span>
        )}
        {form.email.status === 'validating' && (
          <span className="validating">Checking...</span>
        )}
      </div>
      <button disabled={!canSubmit}>Login</button>
    </form>
  );
};
```

[🚀back to top](#top)

## Form Submission Workflow

```ts
type FormState<T> =
  | { status: 'idle' }
  | { status: 'validating' }
  | { status: 'validation-error'; errors: Record<keyof T, string[]> }
  | { status: 'submitting'; data: T }
  | { status: 'success'; result: string }
  | { status: 'error'; error: string };
interface LoginForm {
  email: string;
  password: string;
}

function LoginForm() {
  const [state, setState] = useState<FormState<LoginForm>>({ status: 'idle' });
  const [formData, setFormData] = useState<LoginForm>({ email: '', password: '' });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setState({ status: 'validating' });
    const errors = validateForm(formData);
    if (Object.keys(errors).length > 0) {
      setState({ status: 'validation-error', errors });
      return;
    }
    setState({ status: 'submitting', data: formData });
    try {
      const result = await submitLogin(formData);
      setState({ status: 'success', result });
    } catch (error) {
      setState({ status: 'error', error: error instanceof Error ? error.message : String(error) });
    }
  };
  switch (state.status) {
    case 'idle':
    case 'validating':
      return (
        <form onSubmit={handleSubmit} aria-busy={state.status === 'validating'}>
          {/* inputs omitted for brevity */}
          <button type="submit" disabled={state.status === 'validating'}>
            {state.status === 'validating' ? 'Validating…' : 'Login'}
          </button>
        </form>
      );
    case 'validation-error':
      return <ErrorsList errors={state.errors} />;
    case 'submitting':
      return <Spinner label={`Submitting for ${state.data.email}…`} />;
    case 'success':
      return <Success message={state.result} />;
    case 'error':
      return <ErrorBanner message={state.error} />;
  }
}
```

[🚀back to top](#top)

## Reducer and action type with discriminated unions

```ts
type CartAction =
  | { type: 'ADD_ITEM'; item: Product; quantity: number }
  | { type: 'REMOVE_ITEM'; productId: string }
  | { type: 'UPDATE_QUANTITY'; productId: string; quantity: number }
  | { type: 'CLEAR_CART' }
  | { type: 'APPLY_DISCOUNT'; code: string; percentage: number }
  | { type: 'CHECKOUT_START' }
  | { type: 'CHECKOUT_SUCCESS'; orderId: string }
  | { type: 'CHECKOUT_FAILURE'; error: string };
interface CartState {
  items: CartItem[];
  discount: number;
  checkoutStatus: 'idle' | 'processing' | 'success' | 'error';
  orderId?: string;
  error?: string;
}

const cartReducer = (state: CartState, action: CartAction): CartState => {
  switch (action.type) {
    case 'ADD_ITEM':  // TypeScript knows action has item and quantity
      return {
        ...state,
        items: [
          ...state.items,
          {
            product: action.item,
            quantity: action.quantity,
          },
        ],
      };
    case 'REMOVE_ITEM':   // TypeScript knows action has productId
      return {
        ...state,
        items: state.items.filter((item) => item.product.id !== action.productId),
      };
    case 'UPDATE_QUANTITY': // TypeScript knows action has productId and quantity
      return {
        ...state,
        items: state.items.map((item) =>
          item.product.id === action.productId ? { ...item, quantity: action.quantity } : item,
        ),
      };
    case 'APPLY_DISCOUNT':  // TypeScript knows action has code and percentage
      return {
        ...state,
        discount: action.percentage,
      };
    case 'CHECKOUT_SUCCESS':   // TypeScript knows action has orderId
      return {
        ...state,
        checkoutStatus: 'success',
        orderId: action.orderId,
        items: [],
      };
    case 'CHECKOUT_FAILURE':   // TypeScript knows action has error
      return {
        ...state,
        checkoutStatus: 'error',
        error: action.error,
      };
    default:
      // Exhaustiveness check
      const exhaustive: never = action;
      return state;
  }
};
```

[🚀back to top](#top)

## Testing Discriminated Unions

```ts
describe('UserProfile', () => {
  it('shows loading state', () => {
    const state: FetchState<User> = { status: 'loading' };
    const { getByText } = render(<UserDisplay state={state} />);
    expect(getByText('Loading...')).toBeInTheDocument();
  });

  it('shows user data on success', () => {
    const state: FetchState<User> = {
      status: 'success',
      data: { id: '1', name: 'Alice', email: 'alice@example.com' }
    };
    const { getByText } = render(<UserDisplay state={state} />);
    expect(getByText('Alice')).toBeInTheDocument();
  });

  it('shows error message on failure', () => {
    const state: FetchState<User> = {
      status: 'error',
      error: new Error('Network error')
    };
    const { getByText } = render(<UserDisplay state={state} />);
    expect(getByText('Network error')).toBeInTheDocument();
  });
});
```

[🚀back to top](#top)

## When to Use Each Pattern

```
------------------------|-------------------------------------------------------------------------------
                        | have clear variants of component behavior
discriminated unions    | Props have completely different meanings based on context
                        | want explicit, self-documenting APIs
                        | need exhaustive pattern matching in switch statements
------------------------|-------------------------------------------------------------------------------
                        | have a smaller number of mutually exclusive options
exclusive props         | the relationship is more about “either this or that” than distinct variants
                        | want a cleaner API without extra discriminant props
------------------------|-------------------------------------------------------------------------------
combine with            | Props come from external sources (APIs, config files)
runtime validation      | building a component library for external consumption
                        | data integrity is critical for security or business logic
------------------------|-------------------------------------------------------------------------------
```

[🚀back to top](#top)
