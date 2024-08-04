# React State Management

||Libraries|
|---|---|
|Reducer-based|Redux, Zustand|
|Atom-based|Recoil, Jotai|
|Mutable-based|MobX, Valtio|

----------------------------------------

## Reducer-based Libraries

```
+---------------------+
|        Actions      |
+----------|----------+
           |
           v
+---------------------+        +---------------------+
|        Reducers     |        |       Store         |
+----------|----------+        +----------|----------+
           |                              |
           v                              v
+---------------------+        +---------------------+
|        State        |        |     Subscriptions   |
+---------------------+        +---------------------+
```

## Atom-based Libraries

```
+---------------------+
|     Atoms (State)   |
+----------|----------+
           |
           v
+---------------------+        +---------------------+
|  Selectors (Derived |        |   RecoilRoot        |
|     State)          |        +----------|----------+
+----------|----------+                   |
           v                              v
+---------------------+        +---------------------+
|    State Snapshot   |        |   React Components  |
+---------------------+        +---------------------+
```

## Mutable-based Libraries

```
+---------------------+
|     Observables     |
+----------|----------+
           |
           v
+---------------------+        +---------------------+
|   Computed Values   |        |     Actions         |
+----------|----------+        +----------|----------+
           |                              |
           v                              v
+---------------------+        +---------------------+
|   Reaction (Derived |        |    MobX Store       |
|       Value)        |        +----------|----------+
+---------------------+                   |
                                          v
                               +---------------------+
                               |   React Components  |
                               +---------------------+
```

## choice

- project size and complexity
- Learning curve

> [React State Management in 2024](https://dev.to/nguyenhongphat0/react-state-management-in-2024-5e7l)
