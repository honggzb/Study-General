# React Design Patterns

## Overview  

This reference guide provides comprehensive information for frontend developer.

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
function withSharedStyle<P extends { style?: React.CSSProperties }>(
  Wrapped: React.ComponentType<P>
) {
  return (props: P) => {
    const style = { padding: "5px", margin: "2px" };
    return <Wrapped {...props} style={{ ...style, ...props.style }} />;
  };
}
```

**Benefits:**  
- Centralized logic reuse  
- Cleaner UI components  
- Better separation of concerns  

**Trade-offs:**  
- Potential for prop name collisions  
- Deep wrapper nesting (“HOC stacking”)  
- Harder DevTools debugging  

---

### Pattern 2: Provider Pattern (React Context / Redux Provider)  
**Description:**  
The Provider pattern uses React Context or Redux to expose global state to deeply nested components without prop drilling. It simplifies state sharing across an application.  

**When to Use:**  
- When many components require the same global data  
- To eliminate prop drilling  
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

---

### Pattern 3: Container / Presentational Pattern  
**Description:**  
This pattern separates *data + logic* (Container) from *UI rendering* (Presentational). Presentational components handle appearance only, while containers fetch or prepare data.  

**When to Use:**  
- UI/logic separation is important  
- When multiple views reuse the same data logic  
- For improved testability and modularity  

**Implementation:**  
```typescript
// Presentational
export function FoodImages({ foods }: { foods: string[] }) {
  return foods.map((f, i) => <img key={i} src={f} alt="Food" />);
}
```

**Benefits:**  
- Clear separation of concerns  
- Highly reusable UI components  
- Better testability  

**Trade-offs:**  
- Traditionally tied to class components  
- Pattern is less needed when using modern Hooks  

---

### Pattern 4: Compound Components Pattern  
**Description:**  
Compound components provide a flexible API by allowing components like `<Select>` and `<Select.Option>` to share implicit state via context. This enables natural composability without excessive props.  

**When to Use:**  
- For building complex UI widgets (Tabs, Dropdowns, Selects)  
- When nested parts must share behavior seamlessly  
- When you want a clean, declarative API  

**Implementation:**  
```typescript
const SelectContext = React.createContext<{
  activeOption: string | null;
  setActiveOption: (v: string) => void;
} | null>(null);
```

**Benefits:**  
- Flexible and intuitive API  
- Eliminates prop drilling  
- Internal state remains encapsulated  

**Trade-offs:**  
- Cloning children can limit deep nesting  
- Can introduce naming collisions when injecting props  

---

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

---

## Guidelines  

### Code Organization  
- Modular, predictable structure  
- Clear UI/logic boundaries  
- Consistent domain-driven naming  
- Document reusable hooks and components  

### Performance Considerations  
- Use memoization to avoid excess rerenders  
- Split context when possible  
- Lazy-load heavy components  
- Monitor expensive operations  

### Security Best Practices  
- Validate all user input  
- Use proper authentication/authorization  
- Avoid leaking sensitive data via client state  
- Sanitize external or dynamic content  

---

## Common Patterns  

### Pattern A  
Encapsulate shared UI logic in reusable hooks or context.  

### Pattern B  
Use composition instead of inheritance for component reuse.  

### Pattern C  
Create structured subcomponent architectures for complex widgets.  

---

## Anti-Patterns to Avoid  

### Anti-Pattern 1  
Prop drilling deeply—use Provider or hooks instead.  

### Anti-Pattern 2  
Overuse of HOCs causing wrapper bloat and debugging difficulty.  

---

## Tools and Resources  

### Recommended Tools  
- React DevTools  
- ESLint “Rules of Hooks”  
- TypeScript for reliable component contracts  

### Further Reading  
- Official React Documentation  
- Advanced Context Patterns  
- Large-scale React architecture resources  

---

## Conclusion  
React’s core design patterns—HOC, Provider, Container/Presentational, Compound Components, and Hooks—provide scalable, maintainable architecture for modern applications. Applying these patterns helps build flexible, reusable, and stable React systems.  
