[NextJs学习-Pages Router](#top)

- [Pages and Layouts](#pages-and-layouts)
  - [Dynamic routes](#dynamic-routes)

--------------------------------------------------------------

- Next.js versions before 13 uses pages router setup

## Pages and Layouts

```ts
├── Pages                  //Pages Router
│    ├── blog/
│    │   ├── first-post.tsx      // '/blog/first-post'
│    │   ├── [id].tsx            // '/blog/1', '/blog/2', etc, Dynamic router
│    │   └── index.tsx           // '/blog'
│    ├── dashboard/              // nest router
│    │      └── settings/
│    │          └── user.tsx     //'/dashboard/settings/user'
│    ├── api/                    // API endpoint
│    │   ├── hello.tsx           // '/api/hello'
│    │   └── users/
│    │          └── [id].tsx     // '/api/users/123', etc, Dynamic router
│    ├── index.tsx               // Home page accessible at '/'
│    └── about.tsx               // '/about'
│    ├── _page.tsx               // customize the App component(for global layouts, managing state across pages, etc.)
│    ├── _document.js            // Custom Document component (which extends the default HTML structure of your pages.
                                // It's useful for adding custom <html> or <body> attributes, or injecting custom scripts)
│    ├── _error                  // Custom Error Page
│    ├── 404                     // 404 Error Page
│    ├── 500                     // 500 Error Page
│    ├── index.tsx               // Home page
│    └── layout.tsx
├── components/           // Reusable React components
```

|Routing Files||
|---|---|
|layout.tsx| This file is used to define the application's layout such a navigation bar, header etc|
|loading.tsx| This file is used to define the application's loading screen|
|error.tsx| This file is used to handle the application's errors such as 404, 500 etc|
|index.tsx| This file is used to define the application's home page|
|route.ts| This file is used to define API routes|
|not-found.tsx | This file is used render a 404 page when any route i|s not found|

### Dynamic routes

|Folder convention|	||
|---|---|---|
|`[folder]/index`|.js .jsx .tsx	|Dynamic route segment|
|`[...folder]/index`	|.js .jsx .tsx|	Catch-all |route segment|
|`[[...folder]]/index`|	.js .jsx .tsx	|Optional catch-all route segment|

|File convention	|||
|---|---|---|
|`[file]`	|.js .jsx .tsx|	Dynamic route segment|
|`[...file]`	|.js .jsx .tsx|	Catch-all route segment|
|`[[...file]]`|	.js .jsx .tsx	|Optional catch-all route segment|


