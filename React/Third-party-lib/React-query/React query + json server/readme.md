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

## method 3 - nextjs+json-server

```
    "dev": "concurrently \"pnpm run json-server\" \"pnpm run json-graphql-server\" \"next dev --turbopack\"",
    "json-server": "json-server --watch ./data/posts.json --port 3001",
    "json-graphql-server": "json-graphql-server ./data/posts.json --port 3002"
```

```
├── 📂api/
│   ├── 📂graphql/
│   │   ├── 📄client.ts
│   │   ├── 📄index.ts
│   │   ├── 📄mutations.ts
│   │   └── 📄queries.ts
│   ├── 📂rest/
│   │   ├── 📄index.ts
│   │   └── 📄posts.ts
│   └── 📄index.ts
├── 📂app/
│   ├── 📂posts-graphql/
│   │   └── 📄page.tsx
│   ├── 📂posts-rest/
│   │   └── 📄page.tsx
│   ├── 📄layout.tsx
│   └── 📄page.tsx
├── 📂components/
│   ├── 📂ButtonGoBack/
│   │   └── 📄index.tsx
│   ├── 📂PostCard/
│   │   ├── 📄index.tsx
│   │   └── 📄PostCard.types.tsx
│   ├── 📂PostForm/
│   │   ├── 📄index.tsx
│   │   └── 📄PostForm.types.tsx
├── 📂config/
│   └── 📄react-query.ts
├── 📂constants/
│   └── 📄api.ts
├── 📂types/
│   └── 📄Post.ts
```
