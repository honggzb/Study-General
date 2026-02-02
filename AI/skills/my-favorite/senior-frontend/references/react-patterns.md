# React Design Patterns

## Overview
This reference guide provides comprehensive information for senior frontend.

## Patterns and Practices

### Pattern 1: Higher-Order Component (HOC) Pattern

**Description:**
A Higher-Order Component is a function that accepts a component and returns an enhanced version of it. It centralizes and reuses cross-cutting logic—such as styling, analytics, or data injection—across multiple components.

**When to Use:**
- When multiple components share the same behavior.
- When injecting additional props or functionality.
- When avoiding repetitive logic across UI layers.

**Implementation:**
```typescript
import React, { useState, ComponentType } from 'react';
// 1. Define the props the HOC will inject
interface WithLoadingProps {
  isLoading: boolean;
}
// 2. Define the props the original component expects, including the injected ones
interface UserListProps extends WithLoadingProps {
  users: string[];
}
// 3. The original component (wrapped component)
const UserList = (props: UserListProps) => {
  if (props.isLoading) {
    return <div>Loading users...</div>;
  }
  return (
    <ul>
      {props.users.map((user, index) => (
        <li key={index}>{user}</li>
      ))}
    </ul>
  );
};
// 4. The HOC creator function
function withLoading<P extends WithLoadingProps>(
  WrappedComponent: ComponentType<P>
) {
  // Use a descriptive display name for React DevTools
  const displayName = WrappedComponent.displayName || WrappedComponent.name || "Component";
  // This inner component manages the loading state and passes it as a prop
  const ComponentWithLoading = (props: Omit<P, keyof WithLoadingProps>) => {
    // In a real application, you might fetch data here and manage state
    const [isLoading] = useState(true); // For this example, it's always true initially
    const injectedProps = { isLoading };
    // Return the wrapped component with all original props plus injected props
    return <WrappedComponent {...(props as P)} {...injectedProps} />;
  };

  ComponentWithLoading.displayName = `withLoading(${displayName})`;

  // Return the new, enhanced component
  return ComponentWithLoading;
}

// 5. Create the enhanced component
const EnhancedUserList = withLoading(UserList);

// 6. Usage in the application
const App = () => {
  // We need to provide the 'users' prop, but 'isLoading' is handled by the HOC
  const usersData = ["Alice", "Bob", "Charlie"];
  return (
    <div>
      <h1>User List Example</h1>
      <EnhancedUserList users={usersData} />
    </div>
  );
};
export default App;
```

**Benefits:**
- Centralized logic reuse
- Cleaner UI components
- Better separation of concerns
- Can wrap both function and class components.

**Trade-offs:**
- Potential for prop name collisions
- Deep wrapper nesting (“HOC stacking”)
- Harder DevTools debugging

### Pattern 2: Provider Pattern (React Context)

**Description:**
The Provider pattern uses React Context to expose global state to deeply nested components without prop drilling. It simplifies state sharing across an application.

**When to Use:**
- When many components require the same global data
- You need to avoid passing props through multiple layers(prop drilling)
- For themes, authentication, localization, configuration

**Implementation:**

```typescript
interface Data {
  list: string[];
  text: string;
  header: string;
}

const DataContext = createContext<Data | null>(null);

export function useData() {
  const ctx = useContext(DataContext);
  if (!ctx) throw new Error("useData must be used within Provider");
  return ctx;
}
```

**Benefits:**
- No more prop drilling
- Centralized shared data
- Predictable application structure

**Trade-offs:**
- Overuse may trigger unnecessary rerenders
- Not ideal for fast-changing state


### Pattern 3: Container / Presentational Pattern

**Description:**
This pattern separates *data + logic* (Container) from *UI rendering* (Presentational). Presentational components handle appearance only, while containers fetch or prepare data.

**When to Use:**
- UI/logic separation is important
- When multiple views reuse the same data logic
- For improved testability and modularity

**Implementation:**

- The Presentational Component (UI/Dumb)

```typescript
import React from 'react';
// Define the type for the props the component accepts
interface UserProfileProps {
  name: string;
  email: string;
  bio?: string;
}
/**
 * Presentational component to display user profile details.
 */
const UserProfile: React.FC<UserProfileProps> = ({ name, email, bio }) => {
  return (
    <div className="user-profile">
      <h2>{name}</h2>
      <p>Email: {email}</p>
      {bio && <p>Bio: {bio}</p>}
    </div>
  );
};
export default UserProfile;
//
```

- The Container Component (Logic/Smart)

```typescript
import React, { useState, useEffect } from 'react';
import UserProfile from './UserProfile'; // Import the presentational component

// Define the type for the user data
interface UserData {
  id: number;
  name: string;
  email: string;
  company?: { catchPhrase: string }; // Optional nested data
}

/**
 * Container component responsible for fetching data and managing state.
 */
const UserProfileContainer: React.FC = () => {
  const [user, setUser] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Simulate fetching data from an API
    const fetchUserData = async () => {
      try {
        setLoading(true);
        const response = await fetch('https://jsonplaceholder.typicode.com');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data: UserData = await response.json();
        setUser(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An unknown error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);
  if (loading) {
    return <div>Loading user profile...</div>;
  }
  if (error) {
    return <div>Error: {error}</div>;
  }
  // Pass data to the presentational component
  return user ? (
    <UserProfile
      name={user.name}
      email={user.email}
      bio={user.company?.catchPhrase}
    />
  ) : (
    <div>No user data found.</div>
  );
};
export default UserProfileContainer;
```

**Benefits:**
- Clear separation of concerns
- Highly reusable UI components
- Better testability

**Trade-offs:**
- Traditionally tied to class components
- Pattern is less needed when using modern Hooks

### Pattern 4: Compound Components Pattern

**Description:**

Compound components provide a flexible API by allowing components like `<Select>` and `<Select.Option>` to share implicit state via context. This enables natural composability without excessive props.

**When to Use:**
- For building complex UI widgets (Tabs, Dropdowns, Selects)
- When nested parts must share behavior seamlessly
- Parent and children must coordinate state.
- When you want a clean, declarative API

**Implementation:**

1. Define the Context and Types - create the shared context and initialize the Context object

```typescript
// ProductCardContext.tsx
import { createContext, useContext, ReactNode } from 'react';
// Define the type for the product data
type Product = {
  id: number;
  name: string;
  description: string;
  thumbnailUrl: string;
};
// Define the type for the context value
interface ProductCardContextType {
  product: Product;
}
const ProductCardContext = createContext<ProductCardContextType | undefined>(undefined);

// Custom hook to use the context in child components
export const useProductCardContext = () => {
  const context = useContext(ProductCardContext);
  if (context === undefined) {
    throw new Error('useProductCardContext must be used within a ProductCard.Root provider');
  }
  return context;
};
// Define Root component props
interface RootProps {
  product: Product;
  children: ReactNode;
}
```

2. Create the Root (Parent) Component - Root component wraps the children with the Provider and manages the shared state

```typescript
// ProductCard.tsx
import React, { useProductCardContext, ProductCardContext } from './ProductCardContext';
const Root = ({ product, children }: RootProps) => {
  return (
    <ProductCardContext.Provider value={{ product }}>
      <div className="product-card">
        {children}
      </div>
    </ProductCardContext.Provider>
  );
};
```

3. Create Sub-components (Children) - child components use the custom hook to access the shared context without prop drilling

```typescript
// ProductCard.tsx (continued)
const Thumbnail = () => {
  const { product } = useProductCardContext();
  return <img src={product.thumbnailUrl} alt={product.name} className="product-thumbnail" />;
};
const Title = () => {
  const { product } = useProductCardContext();
  return <h2 className="product-title">{product.name}</h2>;
};
const Description = () => {
  const { product } = useProductCardContext();
  return <p className="product-description">{product.description}</p>;
};
const AddToCartButton = () => {
  const { product } = useProductCardContext();
  const handleAddToCart = () => {
    console.log(`Adding ${product.name} to cart`);
    // Logic to add to cart
  };
  return <button onClick={handleAddToCart}>Add to Cart</button>;
};
```

4. Attach Sub-components as Properties  - attach the child components as static properties of the parent component to create the compound structure

```typescript
// ProductCard.tsx (continued)
// Use a type assertion to inform TypeScript about the attached sub-components
export const ProductCard = Root as typeof Root & {
  Thumbnail: typeof Thumbnail;
  Title: typeof Title;
  Description: typeof Description;
  AddToCartButton: typeof AddToCartButton;
};
ProductCard.Thumbnail = Thumbnail;
ProductCard.Title = Title;
ProductCard.Description = Description;
ProductCard.AddToCartButton = AddToCartButton;
```

**Benefits:**
- Flexible and intuitive API
- Eliminates prop drilling
- Internal state remains encapsulated

**Trade-offs:**
- Cloning children can limit deep nesting
- Can introduce naming collisions when injecting props

### Pattern 5: Hooks Pattern

**Description:**

React Hooks (useState, useEffect, useRef, custom hooks) modernized component logic by allowing stateful behavior inside functional components.

**When to Use:**
- For reusable logic extraction
- For functional components needing state/effects
- When replacing legacy class lifecycle methods

**Implementation:**
```typescript
function ToggleButton() {
  const [isToggled, setIsToggled] = React.useState(false);
  return (
    <button onClick={() => setIsToggled(!isToggled)}>
      {isToggled ? "ON" : "OFF"}
    </button>
  );
}
```

**Benefits:**
- Cleaner, more modular component logic
- Custom hooks enable powerful logic sharing
- Eliminates class complexity

**Trade-offs:**
- Must follow Rules of Hooks
- Misuse of useEffect can introduce performance issues


### Pattern 6: Custom Hooks Pattern

**Description:**
Extract stateful logic into reusable hooks so multiple components can share behavior without duplicating code.

**When to Use:**
- Multiple components need the same data-fetching, subscriptions, or stateful behavior.
- You want to unit test logic separate from UI.

**Implementation:**
```typescript
// useCounter.ts
import { useState, useCallback } from 'react';
interface UseCounter {
  count: number;
  increment: () => void;
  decrement: () => void;
  reset: (initialValue?: number) => void;
}
/**
 * A custom hook to manage a counter state.
 * @param initialValue The starting value of the counter (defaults to 0).
 * @returns {UseCounter} The current count and functions to update it.
 */
export function useCounter(initialValue: number = 0): UseCounter {
  const [count, setCount] = useState<number>(initialValue);
  // useCallback is used to memoize functions, preventing unnecessary re-renders in consuming components
  const increment = useCallback(() => {
    setCount(prevCount => prevCount + 1);
  }, []);

  const decrement = useCallback(() => {
    setCount(prevCount => prevCount - 1);
  }, []);

  const reset = useCallback((newInitialValue: number = initialValue) => {
    setCount(newInitialValue);
  }, [initialValue]); // Dependency on initialValue
  // Return the state and functions as an object or a tuple
  return {
    count,
    increment,
    decrement,
    reset,
  };
}
```

**Benefits:**
- Promotes reuse without wrappers (unlike HOCs).
- Makes components smaller and easier to read.
- Great testability for logic.

**Trade-offs:**
- Hooks can become overly generic or huge if not scoped.
- Dependency arrays require discipline to avoid subtle bugs.

### Pattern 7: State Management with Reducers
**Description:**
Use `useReducer` to model complex state transitions with explicit actions. Improves predictability when many states change together.

**When to Use:**
- Many related state values update together.
- You want explicit, auditable state transitions.

**Implementation:**
```typescript
import React, { useReducer } from "react";

type AuthUser = { name: string };

type AuthState = {
  loggedIn: boolean;
  user: AuthUser | null;
  token: string | null;
};

type AuthAction =
  | { type: "login"; payload: { user: AuthUser; token: string } }
  | { type: "logout" };

const initialState: AuthState = {
  loggedIn: false,
  user: null,
  token: null,
};

function authReducer(state: AuthState, action: AuthAction): AuthState {
  switch (action.type) {
    case "login":
      return {
        loggedIn: true,
        user: action.payload.user,
        token: action.payload.token,
      };
    case "logout":
      return initialState;
    default:
      return state;
  }
}

export const AuthComponent: React.FC = () => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  const logIn = () => {
    dispatch({
      type: "login",
      payload: { user: { name: "John Doe" }, token: "token" },
    });
  };

  const logOut = () => dispatch({ type: "logout" });

  return (
    <div>
      {state.loggedIn ? (
        <>
          <p>Welcome {state.user?.name}</p>
          <button type="button" onClick={logOut}>
            Log out
          </button>
        </>
      ) : (
        <button type="button" onClick={logIn}>
          Log in
        </button>
      )}
    </div>
  );
};
```

**Benefits:**
- Predictable updates with clear action types.
- Easier to extend compared to scattered `useState`.
- Great fit for shared logic in custom hooks.

**Trade-offs:**
- Slightly more boilerplate.
- Poorly designed actions can still become messy.

### Pattern 8: Prop Combination (Object Spread)

**Description:**
Group related props into a single object and pass them down with spread. Reduces noisy prop lists.

**When to Use:**
- A component needs many style/behavior props that are naturally grouped.
- You want simpler call sites and fewer prop reorder diffs.

**Implementation:**
```typescript
import React from "react";

type ParagraphProps = React.HTMLAttributes<HTMLParagraphElement> & {
  color?: string;
  size?: string;
};

export const P: React.FC<React.PropsWithChildren<ParagraphProps>> = ({
  color,
  size,
  children,
  style,
  ...rest
}) => {
  return (
    <p style={{ color, fontSize: size, ...style }} {...rest}>
      {children}
    </p>
  );
};

export function Demo() {
  const paragraphProps: ParagraphProps = {
    color: "red",
    size: "20px",
    lineHeight: "22px",
  };

  return <P {...paragraphProps}>This is a paragraph.</P>;
}
```

**Benefits:**
- Cleaner call sites.
- Easy to reuse prop bundles.

**Trade-offs:**
- Overusing spread can hide which props a component truly depends on.
- Potential accidental override when merging objects.

### Pattern 9: Lazy Loading with `React.lazy` and `Suspense`

**Description:**
Load heavy components only when needed to reduce initial bundle cost.

**When to Use:**
- Large routes, modals, charts, or rarely-used UI.
- You want to improve initial load time.

**Implementation:**
```typescript
import React, { Suspense } from "react";

const HeavyPanel = React.lazy(() => import("./HeavyPanel"));

export const App: React.FC = () => (
  <div>
    <Suspense fallback={<div>Loading...</div>}>
      <HeavyPanel />
    </Suspense>
  </div>
);
```

**Benefits:**
- Faster initial render and smaller initial bundle.
- Defers cost until actually required

**Trade-offs:**
- Requires loading states
- Over-splitting can increase request overhead

### Pattern 10: Data Fetching with React Server Components (RSC)

**Description:**
Use Server Components (e.g., in Next.js App Router) to fetch data on the server, reducing client JS and improving initial load.

**When to Use:**
- Data is available on the server and doesn’t need client-side interactivity.
- You want to keep secrets (DB access) on the server.

**Implementation:**
```typescript
// app/characters/page.tsx
// This is a Server Component (no "use client")

type Character = { id: number; name: string };

async function getCharacters(): Promise<Character[]> {
  const res = await fetch("https://your-internal-api/characters", {
    cache: "no-store",
  });
  if (!res.ok) throw new Error("Failed to fetch characters");
  return res.json();
}

export default async function CharactersPage() {
  const characters = await getCharacters();
  return (
    <ul>
      {characters.map((c) => (
        <li key={c.id}>{c.name}</li>
      ))}
    </ul>
  );
}
```

**Benefits:**
- Less client JavaScript and faster initial render.
- Server-only data access without exposing extra endpoints.

**Trade-offs:**
- Requires framework support and mental model shift.
- Some patterns (stateful client interactions) still need Client Components.

## Guidelines

### Code Organization
- Modular, predictable structure
- Clear UI/logic boundaries
- Keep UI (presentational) components free of side-effects; prefer containers/hooks for data and effects
- Consistent domain-driven naming
- Use typed props and explicit action types to make contracts clear
- Document reusable hooks and components
- Prefer composition (children, hooks, compound APIs) over inheritance

### Performance Considerations
- Use memoization *only after measuring* to avoid excess rerenders
- Split context when possible
- Use lazy loading for large, infrequently used components
- Monitor expensive operations

### Security Best Practices
- Validate all user input
- Use proper authentication/authorization
- Avoid leaking sensitive data via client state; prefer httpOnly cookies or server sessions
- Keep secrets and sensitive data access server-side when using RSC or server routes
- Sanitize external or dynamic content

## Common Patterns

### Pattern A
- Use containers + presentational components and custom hooks to keep code modular.
- Encapsulate shared UI logic in reusable hooks or context.

### Pattern B
- Use composition instead of inheritance for component reuse.

### Pattern C
- Create structured subcomponent architectures for complex widgets.
- Use controlled inputs and provider patterns to keep state predictable

## Anti-Patterns to Avoid

### Anti-Pattern 1
- Prop drilling deeply—use Provider or hooks instead.

### Anti-Pattern 2
- Overuse of HOCs causing wrapper bloat and debugging difficulty.
- Adding `useMemo`/`React.memo` everywhere increases complexity; measure before optimizing.

## Tools and Resources

### Recommended Tools
- React DevTools: inspect renders, props, and component trees.
- ESLint + React Hooks rules: prevents common hooks mistakes.
- TypeScript: safer refactors and explicit component contracts.

### Further Reading
- Official React Documentation
- Advanced Context Patterns
- Large-scale React architecture resources

## Conclusion

React’s core design patterns maintainable architecture for modern applications. Applying these patterns helps build flexible, reusable, and stable React systems.
