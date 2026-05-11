
[React typescript -10.Error Boundaries and Suspense Boundaries](#top)

- [Enhanced Error Boundary with Reset Capability](#enhanced-error-boundary-with-reset-capability)
- [Suspense Boundaries: Handling Async Gracefully](#suspense-boundaries-handling-async-gracefully)
  - [Common Pitfalls of Error boundaries](#common-pitfalls-of-error-boundaries)
  - [Testing Error Boundaries](#testing-error-boundaries)
- [Combining Error and Suspense Boundaries](#combining-error-and-suspense-boundaries)

-----------------------------------------------------

- **Error boundaries** catch javaScript errors during rendering, in lifecycle methods, and in constructors
- **Suspense boundaries** handle **async** operations by catching thrown promises and displaying loading states

## Enhanced Error Boundary with Reset Capability

- Error boundaries are special components that catch javaScript errors anywhere in their child component tree, log those errors, and display a fallback UI instead of the component tree that crashed
  - Error boundaries are **class components** that implement **either componentDidCatch or the static getDerivedStateFromError** method
- **Key Characteristics**
  - **Declarative Catching**: Think of them like a try/catch block, but specifically designed for the declarative nature of React components.
  - **Must be Class Components**: Currently, can only create a "true" error boundary using a `Class Component`. There is no hook equivalent like `useErrorBoundary` yet
  - **Granularity**: can wrap your entire app in one big boundary or use multiple small ones to isolate crashes (e.g., if the "Comments" section fails, the rest of the page stays functional)
- Typed error boundary captures both the error and additional error information
- Use generics when your error boundaries need to handle specific error types. For example, ErrorBoundary<ApiError> could provide typed access to API-specific error properties
- Modern Alternative: [react-error-boundary](https://github.com/bvaughn/react-error-boundary)

```ts
interface ErrorBoundaryState {
  hasError: boolean;
  error?: Error;
  errorInfo?: ErrorInfo;
  retryCount: number;
}
interface ErrorBoundaryProps {
  children: ReactNode;
  fallback: React.ComponentType<ErrorFallbackProps>;
  onError?: (error: Error, errorInfo: ErrorInfo) => void;
  maxRetries?: number;
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, retryCount: 0 };
  }
  static getDerivedStateFromError(error: Error): Partial<ErrorBoundaryState> {
    // Update state to trigger fallback UI(Update state so the next render will show the fallback UI)
    return { hasError: true, error };
  }
  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    this.setState({ errorInfo });              // Log error information
    // console.error('Error caught by ErrorBoundary: ', error, errorInfo);
    this.props.onError?.(error, errorInfo);    // Call optional error reporting callback
  }
  resetErrorBoundary = () => {
    const { maxRetries = 3 } = this.props;
    const { retryCount } = this.state;
    if (retryCount < maxRetries) {
      this.setState({
        hasError: false,
        error: undefined,
        errorInfo: undefined,
        retryCount: retryCount + 1,
      });
    }
  };
  render() {
    const { hasError, error, errorInfo, retryCount } = this.state;
    const { maxRetries = 3, fallback: FallbackComponent } = this.props;
    if (hasError && error) {            // Custom fallback or default error message(You can render any custom fallback UI)
      return (
        <FallbackComponent
          error={error}
          errorInfo={errorInfo}
          resetErrorBoundary={retryCount < maxRetries ? this.resetErrorBoundary : undefined}
          retryCount={retryCount}
          maxRetries={maxRetries}
        />
      );
    }
    return this.props.children;
  }
}
//  Typed Fallback Components
interface ErrorFallbackProps {
  error: Error;
  errorInfo?: ErrorInfo;
  resetErrorBoundary?: () => void;
}
function FallbackComponent({ error, errorInfo, resetErrorBoundary }: ErrorFallbackProps) {
  return (
    <div className="error-boundary">
      <h2>Oops! Something went wrong</h2>
      <p>{error.message}</p>
      {process.env.NODE_ENV === 'development' && errorInfo && (
        <details>
          <summary>Error Details (Dev Only)</summary>
          <pre>{errorInfo.componentStack}</pre>
        </details>
      )}
      {resetErrorBoundary && <button onClick={resetErrorBoundary}>Try Again</button>}
    </div>
  );
}
```

[🚀back to top](#top)

## Suspense Boundaries: Handling Async Gracefully

```ts
import { Suspense, ReactNode } from 'react';
interface LoadingFallbackProps {
  message?: string;
  progress?: number;
}
function LoadingFallback({ message = 'Loading...', progress }: LoadingFallbackProps) {
  return (
    <div className="loading-boundary">
      <div className="spinner" />
      <p>{message}</p>
      {progress !== undefined && (
        <div className="progress-bar">
          <div className="progress-fill" style={{ width: `${progress}%` }} />
        </div>
      )}
    </div>
  );
}
interface AsyncWrapperProps {
  children: ReactNode;
  fallback?: ReactNode;
  loadingMessage?: string;
}
function AsyncWrapper({ children, fallback, loadingMessage }: AsyncWrapperProps) {
  return (
    <Suspense fallback={fallback || <LoadingFallback message={loadingMessage} />}>
      {children}
    </Suspense>
  );
}
```

### Common Pitfalls of Error boundaries

- Error boundaries only catch errors in the component tree below them. They don’t catch:
  - Errors in event handlers
  - Errors in async code
  - Errors during server-side rendering
  - Errors in the error boundary itself
- Dealing with Errors in Asynchronous Operations
  - use the `.catch()` method with Promises or `try-catch blocks` with async functions

```ts
// ❌ This won't be caught by error boundaries
const BadComponent = () => {
  const handleClick = () => {
    throw new Error('Event handler error');
  };
  return <button onClick={handleClick}>Click me</button>;
};
// ✅ Wrap async operations properly
// Dealing with Errors in Asynchronous Operations
fetchData()
  .then((response) => setData(response))
  .catch((error) => {
    console.error("Error fetching data:", error);
    setError(true); // We can show an error message in the UI
  });
// or
const GoodAsyncComponent = () => {
  const [error, setError] = useState<Error | null>(null);
  const handleAsyncOperation = async () => {   //
    try {
      await riskyAsyncOperation();
    } catch (error) {
      setError(error instanceof Error ? error : new Error('Unknown error'));
    }
  };
  if (error) throw error; // Now the error boundary can catch it
  return <button onClick={handleAsyncOperation}>Safe Async</button>;
};
```

[🚀back to top](#top)

### Testing Error Boundaries

```ts
// Mock errors in child components and check if the fallback UI renders as expected
it("renders fallback UI on error", () => {
  const { getByText } = render(
    <ErrorBoundary>
      <BrokenComponent />
    </ErrorBoundary>,
  );
  expect(getByText("Something went wrong")).toBeInTheDocument();
});
```

[🚀back to top](#top)

## Combining Error and Suspense Boundaries

```ts
interface BoundaryWrapperProps {
  children: ReactNode;
  loadingFallback?: ReactNode;
  errorFallback?: React.ComponentType<ErrorFallbackProps>;
  onError?: (error: Error, errorInfo: ErrorInfo) => void;
}
function BoundaryWrapper({
  children,
  loadingFallback = <LoadingFallback />,
  errorFallback = ErrorFallback,
  onError,
}: BoundaryWrapperProps) {
  return (
    <ErrorBoundary fallback={errorFallback} onError={onError}>
      <Suspense fallback={loadingFallback}>{children}</Suspense>
    </ErrorBoundary>
  );
}
// Usage with proper type safety
<BoundaryWrapper
  loadingFallback={<LoadingFallback message="Loading user data..." />}
  errorFallback={UserErrorFallback}
  onError={(error, errorInfo) => {
    // TypeScript knows exactly what error and errorInfo contain
    analytics.track('error_boundary_triggered', {
      error: error.message,
      stack: errorInfo.componentStack,
    });
  }}
>
  <UserProfile userId={userId} />
</BoundaryWrapper>;
```

[🚀back to top](#top)
