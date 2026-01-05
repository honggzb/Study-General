## react query + json server

- `"server": "json-server --watch data/products.json --port 5000"`
- `"server": "json-server --watch data/todos.json --port 5000"`

### method 1 - repository

```
├── 📂components/
│   ├── 📄Products.ts
│   └── 📄SearchForm.ts
├── 📂repository/
│   └── 📄ProductRepository.ts
```

### method 2 - hooks
```
├── 📂pages/
│   └── 📂list/
│       └── 📄index.tsx
├── 📂components/
│   ├── 📄paginate.ts
│   └── 📄infinitescroll.ts
├── 📂hooks/
│   └── 📄useTodo.ts
```