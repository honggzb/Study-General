
[React typescript -6.Compound Components+Polymorphism Components+Refs](#top)

- [Type-Safe Menu Components using Context](#type-safe-menu-components-using-context)
  - [Basic example](#basic-example)
  - [Advanced Menu with Slot Props](#advanced-menu-with-slot-props)
- [Type-Safe Tab Components using Context](#type-safe-tab-components-using-context)
- [Type-Safe Generic List Components with Item Constraints using Context](#type-safe-generic-list-components-with-item-constraints-using-context)
- [Polymorphic Component using as](#polymorphic-component-using-as)
  - [General Polymorphic Component](#general-polymorphic-component)
  - [Advanced Polymorphic Patterns with Ref Forwarding](#advanced-polymorphic-patterns-with-ref-forwarding)
  - [“asChild” Pattern](#aschild-pattern)
  - [Real-World Use Cases](#real-world-use-cases)
  - [Performance Considerations](#performance-considerations)
- [useRef, Callback Refs, forwardRef, and Imperative Handles, memo](#useref-callback-refs-forwardref-and-imperative-handles-memo)
  - [Common Patterns and Pitfalls](#common-patterns-and-pitfalls)
  - [Real World Use Cases - Focus Management](#real-world-use-cases---focus-management)

--------------------------------------------------

- Compound Components is a group of components designed to work together, where:
  - The parent component manages shared state and context
  - Child components receive props and context to render appropriately
  - The API feels intuitive and declarative to consumers
- **Compound Components Use Cases**
  - **Design System Components**: Building libraries where components need to work together seamlessly
  - **Form Builders**: Creating dynamic forms where field components share validation state
  - **Data Tables**: Where header, body, and pagination components need to coordinate
  - **Navigation Components**: Breadcrumbs, sidebars, and multi-level menus
  - **Modal Systems**: Where trigger, content, and action components work together
- **Polymorphic Components** is one that can dynamically change the type of element rendered
  - **polymorphic components render as different elements based on props passed to them**

## Type-Safe Menu Components using Context

- <mark>Using React Context eliminates the need for React.cloneElement, which can be problematic with TypeScript and doesn’t preserve ref forwarding.</mark>

### Basic example

```ts
import React, { useState, createContext, useContext } from 'react';
// First, define the shape of our menu item data
interface MenuItemData {
  id: string;
  label: string;
  disabled?: boolean;
}
// Context for sharing state between Menu and MenuItem
interface MenuContextValue {
  selectedId: string | null;
  onSelect: (id: string) => void;
}
const MenuContext = createContext<MenuContextValue | null>(null);
// Custom hook to access menu context with proper error handling
function useMenuContext() {
  const context = useContext(MenuContext);
  if (!context) {
    throw new Error('MenuItem must be used within a Menu component');
  }
  return context;
}
// Props for the Menu component
interface MenuProps {
  children: React.ReactNode;
  onSelectionChange?: (selectedId: string | null) => void;
  defaultSelected?: string;
}
export function Menu({
  children,
  onSelectionChange,
  defaultSelected = null
}: MenuProps) {
  const [selectedId, setSelectedId] = useState<string | null>(defaultSelected);
  const handleSelect = (id: string) => {
    setSelectedId(id);
    onSelectionChange?.(id);
  };
  const contextValue: MenuContextValue = {
    selectedId,
    onSelect: handleSelect,
  };
  return (
    <MenuContext.Provider value={contextValue}>
      <div role="menu" className="menu">
        {children}
      </div>
    </MenuContext.Provider>
  );
}
// Props for MenuItem - notice we don't need selectedId or onSelect
// because they come from context
interface MenuItemProps {
  id: string;
  disabled?: boolean;
  children: React.ReactNode;
}
function MenuItem({ id, disabled = false, children }: MenuItemProps) {
  const { selectedId, onSelect } = useMenuContext();
  return (
    <button
      role="menuitem"
      disabled={disabled}
      className={`menu-item ${selectedId === id ? 'selected' : ''}`}
      onClick={() => !disabled && onSelect(id)}
    >
      {children}
    </button>
  );
}
// use type-safe Menu:
function App() {
  return (
    <Menu onSelectionChange={(id) => console.log('Selected:', id)}>
      <MenuItem id="file">File</MenuItem>
      <MenuItem id="edit">Edit</MenuItem>
      <MenuItem id="view" disabled>
        View
      </Menu.Item>
    </Menu>
  );
}
```

[🚀back to top](#top)

### Advanced Menu with Slot Props

- support render props (also known as “slot props” in some frameworks)

```ts
// Extended MenuItem that supports custom rendering
interface MenuItemRenderProps {
  isSelected: boolean;
  isDisabled: boolean;
  select: () => void;
}
interface MenuItemSlotProps extends Omit<MenuItemProps, 'children'> {
  children: (props: MenuItemRenderProps) => React.ReactNode;
}

function MenuItemSlot({ id, disabled = false, children }: MenuItemSlotProps) {
  const { selectedId, onSelect } = useMenuContext();
  const renderProps: MenuItemRenderProps = {
    isSelected: selectedId === id,
    isDisabled: disabled,
    select: () => !disabled && onSelect(id),
  };
  return (
    <div className="menu-item-slot">
      {children(renderProps)}
    </div>
  );
}
//
<Menu>
  <MenuItemSlot id="custom">
    {({ isSelected, isDisabled, select }) => (
      <div className={`custom-item ${isSelected ? 'active' : ''}`} onClick={select}>
        <Icon name="star" />
        Custom Item
        {isSelected && <Badge>Selected</Badge>}
      </div>
    )}
  </MenuItemSlot>
</Menu>
```

[🚀back to top](#top)

## Type-Safe Tab Components using Context

```ts
interface TabData {
  id: string;
  title: string;
  disabled?: boolean;
}
interface TabContextValue {
  activeTab: string;
  setActiveTab: (id: string) => void;
  tabs: TabData[];
  registerTab: (tab: TabData) => void;
}

const TabContext = createContext<TabContextValue | null>(null);
function useTabContext() {
  const context = useContext(TabContext);
  if (!context) {
    throw new Error('Tab components must be used within a TabContainer');
  }
  return context;
}

interface TabContainerProps {
  defaultTab?: string;
  onTabChange?: (tabId: string) => void;
  children: React.ReactNode;
}

export function TabContainer({
  defaultTab,
  onTabChange,
  children
}: TabContainerProps) {
  const [tabs, setTabs] = useState<TabData[]>([]);
  const [activeTab, setActiveTab] = useState<string>(defaultTab || '');
  const registerTab = (tab: TabData) => {
    setTabs(current => {
      const exists = current.some(t => t.id === tab.id);
      if (exists) return current;
      return [...current, tab];
    });
    // Set as active if it's the first tab or matches defaultTab
    if (!activeTab || tab.id === defaultTab) {
      setActiveTab(tab.id);
    }
  };
  const handleTabChange = (id: string) => {
    setActiveTab(id);
    onTabChange?.(id);
  };
  const contextValue: TabContextValue = {
    activeTab,
    setActiveTab: handleTabChange,
    tabs,
    registerTab,
  };
  return (
    <TabContext.Provider value={contextValue}>
      <div className="tab-container">
        {children}
      </div>
    </TabContext.Provider>
  );
}
// TabList renders the actual tab buttons
function TabList() {
  const { tabs, activeTab, setActiveTab } = useTabContext();
  return (
    <div className="tab-list" role="tablist">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          role="tab"
          disabled={tab.disabled}
          aria-selected={activeTab === tab.id}
          className={`tab ${activeTab === tab.id ? 'active' : ''}`}
          onClick={() => !tab.disabled && setActiveTab(tab.id)}
        >
          {tab.title}
        </button>
      ))}
    </div>
  );
}

interface TabPanelProps {
  id: string;
  title: string;
  disabled?: boolean;
  children: React.ReactNode;
}
function TabPanel({ id, title, disabled = false, children }: TabPanelProps) {
  const { activeTab, registerTab } = useTabContext();
  // Register this tab on mount
  React.useEffect(() => {
    registerTab({ id, title, disabled });
  }, [id, title, disabled, registerTab]);

  if (activeTab !== id) return null;
  return (
    <div role="tabpanel" className="tab-panel" aria-labelledby={id}>
      {children}
    </div>
  );
}

// Usage is clean and declarative
// TabPanel automatically registers itself with the container. This prevents the common issue of forgetting to add a tab to the tab list.
function App() {
  return (
    <TabContainer defaultTab="profile" onTabChange={(id) => console.log(id)}>
      <TabContainerList />
      <TabContainerPanel id="profile" title="Profile">
        <ProfileForm />
      </TabContainerPanel>
      <TabContainerPanel id="settings" title="Settings">
        <SettingsPanel />
      </TabContainerPanel>
      <TabContainerPanel id="billing" title="Billing" disabled>
        <BillingInfo />
      </TabContainerPanel>
    </TabContainer>
  );
}
```

[🚀back to top](#top)

## Type-Safe Generic List Components with Item Constraints using Context

```ts
// Generic interface for list items
interface ListItem {
  id: string;
}
interface ListContextValue<T extends ListItem> {
  items: T[];
  selectedIds: Set<string>;
  onToggleItem: (id: string) => void;
  multiSelect: boolean;
}
const ListContext = createContext<ListContextValue<any> | null>(null);

function useListContext<T extends ListItem>() {
  const context = useContext(ListContext) as ListContextValue<T> | null;
  if (!context) {
    throw new Error('List items must be used within a List component');
  }
  return context;
}

interface ListProps<T extends ListItem> {
  items: T[];
  multiSelect?: boolean;
  onSelectionChange?: (selectedIds: string[]) => void;
  children: (item: T) => React.ReactNode;
}

export function List<T extends ListItem>({
  items,
  multiSelect = false,
  onSelectionChange,
  children
}: ListProps<T>) {
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const onToggleItem = (id: string) => {
    setSelectedIds(current => {
      const newSet = new Set(current);

      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        if (!multiSelect) {
          newSet.clear();
        }
        newSet.add(id);
      }
      onSelectionChange?.(Array.from(newSet));
      return newSet;
    });
  };
  const contextValue: ListContextValue<T> = {
    items,
    selectedIds,
    onToggleItem,
    multiSelect,
  };

  return (
    <ListContext.Provider value={contextValue}>
      <div className="list">
        {items.map((item) => (
          <div key={item.id} className="list-item-wrapper">
            {children(item)}
          </div>
        ))}
      </div>
    </ListContext.Provider>
  );
}
// Reusable ListItem component that works with any item type
interface ListItemProps<T extends ListItem> {
  item: T;
  children: (props: {
    item: T;
    isSelected: boolean;
    onToggle: () => void;
  }) => React.ReactNode;
}
function ListItem<T extends ListItem>({ item, children }: ListItemProps<T>) {
  const { selectedIds, onToggleItem } = useListContext<T>();
  return (
    <>
      {children({
        item,
        isSelected: selectedIds.has(item.id),
        onToggle: () => onToggleItem(item.id),
      })}
    </>
  );
}

// create type-safe lists for any data:
interface User extends ListItem {
  id: string;
  name: string;
  email: string;
}
interface Product extends ListItem {
  id: string;
  title: string;
  price: number;
}
function UserList({ users }: { users: User[] }) {
  return (
    <List items={users} multiSelect>
      {(user) => (
        <ListItem item={user}>
          {({ item, isSelected, onToggle }) => (
            <div className={`user-card ${isSelected ? 'selected' : ''}`} onClick={onToggle}>
              <h3>{item.name}</h3>
              <p>{item.email}</p>
            </div>
          )}
        </ListItem>
      )}
    </List>
  );
}
```

[🚀back to top](#top)

## Polymorphic Component using as

### General Polymorphic Component

- **base props**(all Polymorphic Components should have): `BaseButtonProps`
- **other props**
  - `ComponentPropsWithoutRef`: gives us all the standard props for element T
  - `PolymorphicButtonProps<T extends ElementType>`: merge our base props with the props of whatever element type T represents

```ts
import { ComponentPropsWithoutRef, ElementType } from 'react';
// the props that every Button should have, regardless of what element it renders as
interface BaseButtonProps {
  variant?: 'primary' | 'secondary' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
}
// a polymorphic prop type that merges base props with the props of whatever element we're rendering as
type PolymorphicButtonProps<T extends ElementType> =
  BaseButtonProps &
  { as?: T } &
  ComponentPropsWithoutRef<T>;
// The component itself, using a generic to preserve the element type
const Button = <T extends ElementType = 'button'>({
  as,                          // using as props
  variant = 'primary',
  size = 'md',
  children,
  ...props                     // other props
}: PolymorphicButtonProps<T>) => {
  const Component = as ?? 'button';
  const baseClasses = 'px-4 py-2 rounded font-medium focus:outline-none focus:ring-2';
  const variantClasses = {
    primary: 'bg-blue-500 hover:bg-blue-600 text-white',
    secondary: 'bg-gray-200 hover:bg-gray-300 text-gray-900',
    danger: 'bg-red-500 hover:bg-red-600 text-white',
  };
  const sizeClasses = {
    sm: 'text-sm px-2 py-1',
    md: 'text-base px-4 py-2',
    lg: 'text-lg px-6 py-3',
  };
  const className = [baseClasses, variantClasses[variant], sizeClasses[size]].join(' ');
  return (
    <Component className={className} {...props}>
      {children}
    </Component>
  );
};
export default Button;
// Using Polymorphic Button
// ✅ Renders a <button> with onClick
<Button onClick={() => console.log('clicked')}>
  Default Button
</Button>
// ✅ Renders an <a> with href - TypeScript knows href is valid here
<Button as="a" href="https://example.com" target="_blank">
  Link Button
</Button>
// ✅ Renders a Next.js Link component
import Link from 'next/link';
<Button as={Link} href="/dashboard">
  Next.js Link
</Button>
// ✅ All your custom props work too
<Button variant="danger" size="lg" onClick={handleDelete}>
  Delete Account
</Button>
```

[🚀back to top](#top)

### Advanced Polymorphic Patterns with Ref Forwarding

```ts
import { ComponentPropsWithoutRef, ElementType, forwardRef } from 'react';
type PolymorphicRef<T extends ElementType> = React.ComponentPropsWithRef<T>['ref'];
type PolymorphicButtonProps<T extends ElementType> = BaseButtonProps & {
  as?: T;
} & ComponentPropsWithoutRef<T>;
type ButtonComponent = <T extends ElementType = 'button'>(
  props: PolymorphicButtonProps<T> & { ref?: PolymorphicRef<T> },
) => React.ReactElement | null;

const Button: ButtonComponent = forwardRef(
  <T extends ElementType = 'button'>(
    { as, variant = 'primary', size = 'md', children, ...props }: PolymorphicButtonProps<T>,
    ref?: PolymorphicRef<T>,
  ) => {
    const Component = as ?? 'button';
    // ... same styling logic as before
    return (
      <Component ref={ref} className={className} {...props}>
        {children}
      </Component>
    );
  },
);
Button.displayName = 'Button'
```

[🚀back to top](#top)

### “asChild” Pattern

- Use asChild when need to control the rendered element (e.g., Next.js Link, Reach Router links) but want to keep Button’s styling and behavior.
- The ref type becomes a bit more flexible (generic + element guards are possible); for most cases, forwarding as HTMLElement works well with DOM elements.

```ts
import { forwardRef, cloneElement, isValidElement } from 'react';
type AsChildProps = {
  asChild?: boolean;
  children: React.ReactElement;
};
type BaseButtonProps = {
  variant?: 'primary' | 'secondary';
  disabled?: boolean;
} & AsChildProps;

const cx = (...xs: Array<string | false | undefined>) => xs.filter(Boolean).join(' ');

export const Button = forwardRef<HTMLElement, BaseButtonProps>(
  ({ asChild, children, variant = 'primary', disabled, ...rest }, ref) => {
    const className = cx('btn', `btn-${variant}`, disabled && 'btn-disabled');
    if (asChild) {
      // Render the passed child, merging props and ref
      if (isValidElement(children)) {
        return cloneElement(children as React.ReactElement, {
          className: cx((children.props as any).className, className),
          ref,
          ...rest,
        });
      }
      return null;
    }
    return (
      <button className={className} disabled={disabled} ref={ref as any} {...rest}>
        {children}
      </button>
    );
  },
);
```

[🚀back to top](#top)

### Real-World Use Cases

- Design System Components
- Router Integration: such as integrating with different routing libraries

```ts
// Works with React Router
<Button as={NavLink} to="/profile" variant="secondary">
  Profile
</Button>
// Works with Next.js
<Button as={Link} href="/profile" variant="secondary">
  Profile
</Button>
// Works with Gatsby
<Button as={GatsbyLink} to="/profile" variant="secondary">
  Profile
</Button>
```

[🚀back to top](#top)

### Performance Considerations

- Polymorphic components are essentially zero-cost abstractions at runtime—the generic types disappear after compilation, and you’re just passing props to regular React elements.
- The main performance consideration is the same as any React component: **avoid recreating the component on every render if you’re passing it inline**

```ts
// ✅ Good - component reference is stable
const LinkComponent = Link;
<Button as={LinkComponent} href="/dashboard">Dashboard</Button>
// ❌ Potentially problematic - creates new component reference each render
<Button as={React.forwardRef((props, ref) => <Link ref={ref} {...props} />)}>
  Dashboard
</Button>
```

[🚀back to top](#top)

## useRef, Callback Refs, forwardRef, and Imperative Handles, memo

- **Storing Values with `useRef`**: `useRef` storing mutable values that persist across renders without triggering re-renders
- **Callback Refs**:
  - Callback pass a function instead of a ref object, and React calls it with the element
  - **Callback refs** when need to handle dynamic lists or conditionally rendered elements
- **`forwardRef`**: component function receives props first, then ref second
  - this is different from the usual pattern where ref is part of props
- **Imperative Handles**: Curated imperative APIs

```ts
import { forwardRef, useRef, useImperativeHandle, useState } from 'react';
interface VideoPlayerHandle {
  play: () => void;
  pause: () => void;
  seek: (time: number) => void;
  getCurrentTime: () => number;
  getDuration: () => number;
}
interface VideoPlayerProps {
  src: string;
  onTimeUpdate?: (currentTime: number) => void;
}

export const VideoPlayer = forwardRef<VideoPlayerHandle, VideoPlayerProps>(
  ({ src, onTimeUpdate }, ref) => {
    const videoRef = useRef<HTMLVideoElement>(null);
    const [isPlaying, setIsPlaying] = useState(false);
    // ✅ Expose only specific methods via useImperativeHandle
    useImperativeHandle(ref, () => ({
      play: () => {
        videoRef.current?.play();
        setIsPlaying(true);
      },
      pause: () => {
        videoRef.current?.pause();
        setIsPlaying(false);
      },
      seek: (time: number) => {
        if (videoRef.current) {
          videoRef.current.currentTime = time;
        }
      },
      getCurrentTime: () => {
        return videoRef.current?.currentTime ?? 0;
      },
      getDuration: () => {
        return videoRef.current?.duration ?? 0;
      },
    }), []);

    return (
      <div className="video-player">
        <video
          ref={videoRef}
          src={src}
          onTimeUpdate={() => {
            if (videoRef.current && onTimeUpdate) {
              onTimeUpdate(videoRef.current.currentTime);
            }
          }}
          style={{ width: '100%', maxWidth: '500px' }}
        />
        <div style={{ marginTop: '10px' }}>
          Status: {isPlaying ? 'Playing' : 'Paused'}
        </div>
      </div>
    );
  }
);
VideoPlayer.displayName = 'VideoPlayer';    // Don't forget the display name for debugging
//parent components get a clean, controlled API instead of the entire video element
import { useRef, useState } from 'react';
export function VideoController() {
  const videoRef = useRef<VideoPlayerHandle>(null);
  const [currentTime, setCurrentTime] = useState(0);
  const handlePlay = () => videoRef.current?.play();
  const handlePause = () => videoRef.current?.pause();
  const handleSeek = (time: number) => videoRef.current?.seek(time);

  return (
    <div>
      <VideoPlayer
        ref={videoRef}
        src="/sample-video.mp4"
        onTimeUpdate={setCurrentTime}
      />
      <div style={{ marginTop: '20px' }}>
        <button onClick={handlePlay}>Play</button>
        <button onClick={handlePause} style={{ marginLeft: '10px' }}>Pause</button>
        <button onClick={() => handleSeek(30)} style={{ marginLeft: '10px' }}>Skip to 30s</button>
        <p>Current time: {currentTime.toFixed(2)}s</p>
      </div>
    </div>
  );
}
```

[🚀back to top](#top)

### Common Patterns and Pitfalls

1. **Null Check**: DOM refs start as null, so you’ll be doing null checks constantly. Here are some patterns to make it less painful
2. **Ref Timing Gotchas**: Refs aren’t available during the first render—they’re set during the commit phase. If you need to run code when the ref becomes available, use `useEffect`

```ts
/*1. Null Check*/
import { useRef, useCallback } from 'react';
export function NullCheckPatterns() {
  const elementRef = useRef<HTMLDivElement>(null);
  // ✅ Early return pattern
  const handleMeasure = useCallback(() => {
    if (!elementRef.current) return;

    const rect = elementRef.current.getBoundingClientRect();
    console.log('Dimensions:', rect.width, rect.height);
  }, []);
  // ✅ Optional chaining for simple operations
  const handleFocus = useCallback(() => {
    elementRef.current?.focus();
  }, []);
  // ✅ Helper function for common operations
  const withElement = useCallback((callback: (el: HTMLDivElement) => void) => {
    if (elementRef.current) {
      callback(elementRef.current);
    }
  }, []);
  const handleComplexOperation = useCallback(() => {
    withElement((el) => {
      el.style.backgroundColor = 'lightblue';
      el.scrollIntoView({ behavior: 'smooth' });
      // More complex operations without null checks
    });
  }, [withElement]);
  return (
    <div ref={elementRef} tabIndex={0}>
      <button onClick={handleMeasure}>Measure</button>
      <button onClick={handleFocus}>Focus</button>
      <button onClick={handleComplexOperation}>Complex Operation</button>
    </div>
  );
}
/*2. Ref Timing Gotchas*/
import { useRef, useEffect } from 'react';
export function RefTimingExample() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  // ❌ This won't work - ref is null during first render
  // const ctx = canvasRef.current?.getContext('2d');
  useEffect(() => {
    // ✅ This works - ref is available after commit
    if (canvasRef.current) {
      const ctx = canvasRef.current.getContext('2d');
      if (ctx) {
        ctx.fillStyle = '#ff6b6b';
        ctx.fillRect(10, 10, 100, 100);
      }
    }
  }, []); // Empty dependency array - run once after mount
  return <canvas ref={canvasRef} width={200} height={200} />;
}
```

[🚀back to top](#top)

### Real World Use Cases - Focus Management

```ts
import { useRef, useEffect } from 'react';
interface FocusTrapProps {
  children: React.ReactNode;
  active: boolean;
}
export function FocusTrap({ children, active }: FocusTrapProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const previousActiveElement = useRef<Element | null>(null);
  useEffect(() => {
    if (!active || !containerRef.current) return;

    // Store the currently focused element
    previousActiveElement.current = document.activeElement;
    // Focus the container
    containerRef.current.focus();
    // Return focus when deactivating
    return () => {
      if (previousActiveElement.current instanceof HTMLElement) {
        previousActiveElement.current.focus();
      }
    };
  }, [active]);

  return (
    <div ref={containerRef} tabIndex={-1}
      style={{
        outline: active ? '2px solid blue' : 'none',
        padding: '20px',
        border: '1px solid #ccc'
      }}
    >
      {children}
    </div>
  );
}
```

[🚀back to top](#top)
