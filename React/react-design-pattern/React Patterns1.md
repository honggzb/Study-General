# React Patterns

## Overview
This reference guide summarizes practical React design patterns that improve maintainability, scalability, and performance by encouraging separation of concerns, predictable state updates, reusable logic, and safer rendering.

## Patterns and Practices

### Pattern 1: Container & Presentational (Smart/Dumb) Components

**Description:**
Separate business logic (data fetching, transformations, side-effects) from UI rendering. The container owns the data lifecycle; the presentational component focuses on layout and view.

**When to Use:**
- You need to fetch/compute data and render it in multiple UIs.
- You want cleaner tests by isolating UI from side-effects.
- You want to keep components small and focused.

**Implementation:**
```typescript
import React, { useEffect, useState } from "react";

export interface Character {
  id: number;
  name: string;
}

type CharacterListProps = {
  loading: boolean;
  error: boolean;
  characters: Character[];
};

export const CharacterList: React.FC<CharacterListProps> = ({ loading, error, characters }) => {
  if (loading && !error) return <div>Loading...</div>;
  if (!loading && error) return <div>Unable to load characters.</div>;
  return (
    <ul>
      {characters.map((c) => (
        <li key={c.id}>{c.name}</li>
      ))}
    </ul>
  );
};

export const StarWarsCharactersContainer: React.FC = () => {
  const [characters, setCharacters] = useState<Character[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    let cancelled = false;

    (async () => {
      try {
        setLoading(true);
        const res = await fetch("https://akabab.github.io/starwars-api/api/all.json");
        const data: Character[] = await res.json();
        if (!cancelled) setCharacters(data);
      } catch {
        if (!cancelled) setError(true);
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, []);

  return <CharacterList loading={loading} error={error} characters={characters} />;
};
```

**Benefits:**
- Cleaner separation of concerns and more reusable UI components.
- Easier testing (render-only components are trivial to test).
- Reduced cognitive load in UI components.

**Trade-offs:**
- More files/components; can feel verbose for small screens.
- Data and UI may drift if contracts (props) aren’t kept strict.

---

### Pattern 2: Component Composition with Custom Hooks

**Description:**
Extract stateful logic into reusable hooks so multiple components can share behavior without duplicating code.

**When to Use:**
- Multiple components need the same data-fetching, subscriptions, or stateful behavior.
- You want to unit test logic separate from UI.

**Implementation:**
```typescript
import { useEffect, useMemo, useState } from "react";

export interface Character {
  id: number;
  name: string;
}

export function useFetchCharacters(url: string) {
  const [data, setData] = useState<Character[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const controller = useMemo(() => new AbortController(), []);

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        setError(null);
        const res = await fetch(url, { signal: controller.signal });
        const json: Character[] = await res.json();
        setData(json);
      } catch (e) {
        if ((e as any)?.name !== "AbortError") setError(e as Error);
      } finally {
        setLoading(false);
      }
    })();

    return () => controller.abort();
  }, [url, controller]);

  return { data, loading, error };
}
```

**Benefits:**
- Promotes reuse without wrappers (unlike HOCs).
- Makes components smaller and easier to read.
- Great testability for logic.

**Trade-offs:**
- Hooks can become overly generic or huge if not scoped.
- Dependency arrays require discipline to avoid subtle bugs.

---

### Pattern 3: State Management with Reducers

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

---

### Pattern 4: Data Management with Providers (Context)

**Description:**
Use Context Provider components to share data (e.g., theme, auth, locale) across deep trees without prop drilling.

**When to Use:**
- Many descendants need the same data.
- You need to avoid passing props through multiple layers.

**Implementation:**
```typescript
import React, { createContext, useContext, useMemo, useState } from "react";

type Theme = "light" | "dark";

type ThemeContextValue = {
  theme: Theme;
  setTheme: (t: Theme) => void;
};

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

export const ThemeProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  const [theme, setTheme] = useState<Theme>("light");
  const value = useMemo(() => ({ theme, setTheme }), [theme]);
  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
};

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used within ThemeProvider");
  return ctx;
}

export const TopNav: React.FC = () => {
  const { theme, setTheme } = useTheme();
  return (
    <div style={{ backgroundColor: theme === "light" ? "#fff" : "#000", color: theme === "light" ? "#000" : "#fff" }}>
      <button onClick={() => setTheme(theme === "light" ? "dark" : "light")}>
        Toggle theme
      </button>
    </div>
  );
};
```

**Benefits:**
- Eliminates prop drilling.
- Centralizes cross-cutting state.

**Trade-offs:**
- Context changes can trigger broad re-renders if values aren’t memoized.
- Overuse can create “hidden dependencies.”

---

### Pattern 5: Component Enhancement with Higher-Order Components (HOCs)

**Description:**
Wrap components to inject props/behavior (logging, permissions, instrumentation). Useful for cross-cutting concerns.

**When to Use:**
- You need to reuse cross-cutting behavior across many components.
- You can’t easily express the behavior as a hook (e.g., legacy class components).

**Implementation:**
```typescript
import React from "react";

type WithNameInjected = { name: string };

type Without<T, K extends keyof any> = Pick<T, Exclude<keyof T, K>>;

export function withName<P extends WithNameInjected>(
  Component: React.ComponentType<P>
) {
  return function WithName(props: Without<P, "name">) {
    const name = "John Doe";
    return <Component {...(props as P)} name={name} />;
  };
}

type AvatarProps = {
  description: string;
} & WithNameInjected;

const Avatar: React.FC<AvatarProps> = ({ name, description }) => (
  <div>
    <div style={{ borderRadius: 999, background: "#fee", padding: 12, display: "inline-block" }}>
      {name}
    </div>
    <p>I am a {description}.</p>
  </div>
);

export const AvatarWithName = withName(Avatar);
```

**Benefits:**
- Strong reuse for cross-cutting concerns.
- Can wrap both function and class components.

**Trade-offs:**
- Can cause “wrapper hell” and makes debugging component trees harder.
- Prop name collisions and typing complexity (mitigated with generics).

---

### Pattern 6: Compound Components

**Description:**
Expose related subcomponents that share implicit state via context, enabling flexible APIs (Tabs, Accordion, Toggle).

**When to Use:**
- You want a flexible and expressive component API.
- Parent and children must coordinate state.

**Implementation:**
```typescript
import React, { createContext, useContext, useMemo, useState } from "react";

type ToggleContextValue = {
  on: boolean;
  toggle: () => void;
};

const ToggleContext = createContext<ToggleContextValue | undefined>(undefined);

export const Toggle: React.FC<React.PropsWithChildren> & {
  On: React.FC<React.PropsWithChildren>;
  Off: React.FC<React.PropsWithChildren>;
  Button: React.FC<React.ButtonHTMLAttributes<HTMLButtonElement>>;
} = ({ children }) => {
  const [on, setOn] = useState(false);
  const value = useMemo(() => ({ on, toggle: () => setOn((v) => !v) }), [on]);
  return <ToggleContext.Provider value={value}>{children}</ToggleContext.Provider>;
};

function useToggle() {
  const ctx = useContext(ToggleContext);
  if (!ctx) throw new Error("Toggle.* must be used within <Toggle>");
  return ctx;
}

Toggle.On = ({ children }) => {
  const { on } = useToggle();
  return on ? <>{children}</> : null;
};

Toggle.Off = ({ children }) => {
  const { on } = useToggle();
  return on ? null : <>{children}</>;
};

Toggle.Button = (props) => {
  const { toggle } = useToggle();
  return <button {...props} onClick={(e) => { props.onClick?.(e); toggle(); }} />;
};
```

**Benefits:**
- Elegant APIs and strong reusability.
- Encourages composition over prop drilling.

**Trade-offs:**
- Requires context; misuse (wrong nesting) can cause runtime errors.
- Slight learning curve for consumers.

---

### Pattern 7: Prop Combination (Object Spread)

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

---

### Pattern 8: Lazy Loading with `React.lazy` and `Suspense`

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
- Defers cost until actually required.

**Trade-offs:**
- Requires loading states.
- Over-splitting can increase request overhead.

---

### Pattern 9: Controlled Inputs

**Description:**
Use component state as the single source of truth for form inputs. Ensures predictable updates.

**When to Use:**
- You need validation, formatting, or conditional UI based on input value.
- You want consistent behavior across browsers.

**Implementation:**
```typescript
import React, { useState } from "react";

export const ControlledInput: React.FC = () => {
  const [value, setValue] = useState<string>("");

  return (
    <input
      type="text"
      value={value}
      onChange={(e) => setValue(e.target.value)}
      placeholder="Type here"
    />
  );
};
```

**Benefits:**
- Predictable forms and easier validation.
- Centralized state for form logic.

**Trade-offs:**
- More code than uncontrolled inputs.
- Very large forms may need optimization to avoid frequent re-renders.

---

### Pattern 10: Error Boundaries

**Description:**
Catch rendering/runtime errors in component subtrees and render fallback UI instead of crashing the entire app.

**When to Use:**
- You want resilience around critical UI areas.
- Third-party components might throw.

**Implementation:**
```typescript
import React from "react";

type ErrorBoundaryProps = React.PropsWithChildren<{ fallback?: React.ReactNode }>;

type ErrorBoundaryState = { hasError: boolean };

export class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  state: ErrorBoundaryState = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: unknown, info: unknown) {
    // Send to telemetry in real apps
    console.error("Uncaught error:", error, info);
  }

  render() {
    if (this.state.hasError) return this.props.fallback ?? <h1>Something went wrong.</h1>;
    return this.props.children;
  }
}
```

**Benefits:**
- Prevents whole-app blank screens.
- Enables graceful degradation.

**Trade-offs:**
- Does not catch errors in event handlers, async code, or server rendering.
- Requires thoughtful placement and fallback UX.

---

### Pattern 11: `forwardRef` for Custom Components

**Description:**
Expose DOM refs through custom components to support imperative actions (focus, measure) or third-party libs.

**When to Use:**
- You need to focus an input from a parent.
- You integrate with libraries requiring DOM access.

**Implementation:**
```typescript
import React, { useEffect, useRef } from "react";

type CustomInputProps = React.InputHTMLAttributes<HTMLInputElement>;

export const CustomInput = React.forwardRef<HTMLInputElement, CustomInputProps>(
  (props, ref) => <input {...props} ref={ref} />
);
CustomInput.displayName = "CustomInput";

export const Parent: React.FC = () => {
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  return <CustomInput ref={inputRef} placeholder="Auto-focused" />;
};
```

**Benefits:**
- Improves interoperability and accessibility patterns.
- Keeps component encapsulation while enabling imperative control.

**Trade-offs:**
- Encourages imperative patterns if overused.
- Ref typing can be tricky without generics.

---

### Pattern 12: Data Fetching with React Server Components (RSC)

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

---

### Pattern 13: Memoization (React.memo, useMemo, useCallback)

**Description:**
Cache expensive computations and stable function references to reduce unnecessary re-renders.

**When to Use:**
- Components re-render frequently due to parent updates.
- You have expensive calculations or large lists.

**Implementation:**
```typescript
import React, { useCallback, useMemo } from "react";

export const CounterView = React.memo(function CounterView({ count, onClick }: { count: number; onClick: () => void }) {
  return (
    <button onClick={onClick}>
      Count: {count}
    </button>
  );
});

export function Parent({ num }: { num: number }) {
  const doubled = useMemo(() => {
    // expensive calculation placeholder
    return num * 2;
  }, [num]);

  const handleClick = useCallback(() => {
    console.log("Clicked");
  }, []);

  return (
    <div>
      <div>Doubled: {doubled}</div>
      <CounterView count={num} onClick={handleClick} />
    </div>
  );
}
```

**Benefits:**
- Reduces wasted renders and improves responsiveness.
- Stabilizes callback props in deeply nested trees.

**Trade-offs:**
- Adds complexity; can hurt performance if used blindly.
- Memoization only helps when you have measurable render cost.

## Guidelines

### Code Organization
- Keep UI (presentational) components free of side-effects; prefer containers/hooks for data and effects.
- Use typed props and explicit action types to make contracts clear.
- Prefer composition (children, hooks, compound APIs) over inheritance.

### Performance Considerations
- Use lazy loading for large, infrequently used components.
- Apply memoization *only after measuring* render bottlenecks.
- Memoize context values to reduce unnecessary provider-driven re-renders.

### Security Best Practices
- Keep secrets and sensitive data access server-side when using RSC or server routes.
- Validate and sanitize user input before sending to APIs.
- Avoid leaking tokens in client components; prefer httpOnly cookies or server sessions.

## Common Patterns

### Pattern A: Separation of Concerns
Use containers + presentational components and custom hooks to keep code modular.

### Pattern B: Explicit State Transitions
Prefer reducers for complex, multi-field state.

### Pattern C: Controlled Data Flow
Use controlled inputs and provider patterns to keep state predictable.

## Anti-Patterns to Avoid

### Anti-Pattern 1: Prop Drilling Everywhere
If many layers pass the same props, introduce a Provider (Context) or redesign component boundaries.

### Anti-Pattern 2: Premature Memoization
Adding `useMemo`/`React.memo` everywhere increases complexity; measure before optimizing.

## Tools and Resources

### Recommended Tools
- React DevTools: inspect renders, props, and component trees.
- TypeScript: safer refactors and explicit component contracts.
- ESLint + React Hooks rules: prevents common hooks mistakes.

### Further Reading
- Refine article: React Design Patterns (see link below)
- React Docs: Hooks, Context, Suspense, Error Boundaries, Server Components (framework-specific)

## Conclusion
Use these patterns intentionally: separate concerns, encapsulate state transitions, share data safely, and optimize only where it matters. Together, they form a practical toolkit for building robust React applications.

---

**Source:** https://refine.dev/blog/react-design-patterns/
