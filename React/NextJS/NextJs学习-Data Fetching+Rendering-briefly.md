
[Data Fetching+Rendering-briefly](#top)

- [Data Fetching - consisely](#data-fetching---consisely)
  - [Server-side Fetching](#server-side-fetching)
  - [Client-side Fetching](#client-side-fetching)
  - [Incremental Static Regeneration(ISR)](#incremental-static-regenerationisr)
- [Rendering](#rendering)
  - [Pre-Rendering](#pre-rendering)
  - [Partial Pre-Rendering](#partial-pre-rendering)
  - [Server side render(SSR)](#server-side-renderssr)
  - [Incremental Static Regeneration(ISR)](#incremental-static-regenerationisr-1)
  - [Revalidation On-demand](#revalidation-on-demand)
  - [Time-based Revalidation](#time-based-revalidation)
- [Static Site Generation(SSG)](#static-site-generationssg)

-----------------------------------------------------------------------

## Data Fetching - consisely

- Server-side Fetching
- Client-side Fetching
- Incremental Static Regeneration

### Server-side Fetching

- the data is fetched on the server-side and then released to the client-side. It is two types
- **Static Site Generation: `getStaticProps`, `getStaticPaths`**: default behavior
  - static generation is the recommended method for pages that do not require frequently updated data
- **Server-side Rendering: `getServerSideProps`**: 
  - the data will be fetched for every request to server

```ts
export async function getStaticProps() {                    // Static Site Generation
//or: export async function getServerSideProps() {          // Server Site Generation
  const res = await fetch('https://jsonplaceholder.typicode.com/posts/1');
  const post = await res.json();
  return {
    props: { post },
  };
}
export default function Post({ post }) {
  return (
    <div>
        <h1>{post.title}</h1>
        <p>{post.body}</p>
    </div>
  );
}
```

[⬆ back to top](#top)

### Client-side Fetching

- the data fetching will happen on user's browser
- method: 
  1. such as: react `useEffect` hook to fetch data from an API and set it to the state
  2. Using a data fetching library like 'SWR' or 'TanStack Query' to fetch data on the client

```ts
"use client";
import { useEffect, useState } from 'react';
export default function Post() {
    const [post, setPost] = useState(null);
    useEffect(() => {
        fetch('https://jsonplaceholder.typicode.com/posts/1')
        .then(res => res.json())
        .then(data => setPost(data));
    }, []);
    if (!post) return <p>Loading...</p>;
    return (
        <div>
            <h1>{post.title}</h1>
            <p>{post.body}</p>
        </div>
    );
}
```

[⬆ back to top](#top)

### Incremental Static Regeneration(ISR)

- the static pages can be updated after deployment without requiring a full rebuild

```ts
//  pages/index.js
import { getStaticProps } from 'next';
export async function getStaticProps() {
    const data = await fetchData();     // Fetch data from API 
    return {
      props: { data },
      revalidate: 10,                   // Regenerate the page every 10 seconds
    };
  }
  export default function Home({ data }) {
    return (
        <div>
            <h1>Home Page</h1>
            <p>This is the home page.</p>
            <div>{JSON.stringify(data)}</div>
        </div>
    );
}
```

[⬆ back to top](#top)

## Rendering

- **By default, Next.js pre-renders every page**
- The process of loading JavaScript to pre-rendered HTML page is called **hydration**
  - ![hydration](./images/hydration.png)

### Pre-Rendering

- benefit
  - Pre-rendering reduces the interacting time by delivering ready-to-use HTML.
  - Search engines can crawl pre-rendered content more easily.
  - Pre-rendering give better user experience
- Types of Pre-Rendering
  - Static Site Generation:  
    - HTML is **generated at build time** and will be **reused** on each request
    - by calling `getStaticProps`
  - Server Side Rendering: 
    - HTML is generated on **each** request
    - by calling `getServerSideProps`
- Importantly, Next.js lets you choose which pre-rendering form you'd like to use for each page. 
- You can create a "hybrid" Next.js app by using Static Generation for most pages and using Server-side Rendering for others
- You can also use client-side data fetching along with Static Generation or Server-side Rendering. That means some parts of a page can be rendered entirely by clientside JavaScript

[⬆ back to top](#top)

### Partial Pre-Rendering

- Partial Pre-rendering (PPR) is a rendering pattern in Next.js that combines static and dynamic content in a single page
  - **note:** Partial Prerendering is an experimental feature only available on canary browser and is subject to change. It is not ready for production use

### Server side render(SSR)

- server processes a request and sends a fully rendered HTML page to the client
- Also referred to as "SSR" or "Dynamic Rendering"

### Incremental Static Regeneration(ISR)

- Initially, all the pages are pre-rendered at build time.
- When a user requests a page, Next.js checks if the page has expired (based on a revalidation time)
- If the page has expired, Next.js generates a new version in the background while still serving the old version to users.
- Once the new version is generated, the old version is deleted and the new version is served to the user on subsequent requests.

### Revalidation On-demand

```ts
import { revalidatePath } from 'next/cache' 
interface Post {
  id: number
  title: string
  body: string
}
async function getData() {
  const res = await fetch('https://jsonplaceholder.typicode.com/posts?_limit=3', {
    cache: 'no-cache'
  })
  const posts: Post[] = await res.json()
  return {
    timestamp: new Date().toISOString(),
    posts,
    message: 'Posts will update when revalidated'
  }
}
async function handleRevalidate() { //revalidates the cache when button clicked
  'use server'
  revalidatePath('/')
}

export default async function Home() {
  const data = await getData()
  return (
    <main>
      <h1>Path Revalidation Demo</h1>
      <div>
        <p>Last Updated: {data.timestamp}</p>
        <p>{data.message}</p>
        <div>
          {data.posts.map(post => (
            <div key={post.id}>
              <h2>{post.title}</h2>
            </div>
          ))}
        </div>
      </div>
      <form action={handleRevalidate}>
        // a button that revalidates the cache when clicked
        <button type="submit">Fetch New Posts</button>
      </form>
    </main>
  )
}
```

[⬆ back to top](#top)

### Time-based Revalidation

```ts
export async function getStaticProps() {
    const data = await fetchData();     // Fetch data from API 
    return {
      props: { data },
      revalidate: 10,                   // revalidate every 10 seconds
      timestamp: new Date().toISOString(),
      randomValue: Math.random(),
      message: 'This page revalidates every 10 seconds'
    };
  }
export default async function Page() {
  const data = await getData()
  return (
    <main>
        <h1>10 Second Revalidation</h1>
        <p>Timestamp: {data.timestamp}</p>
        <p>Random Value: {data.randomValue}</p>
        <p>{data.message}</p>
        <p>Next revalidation will occur 10 seconds after the last revalidation</p>
        div>{JSON.stringify(data)}</div>
    </main>
  )
}
```

[⬆ back to top](#top)

## Static Site Generation(SSG)

- Static Rendering (or Static Site Generation) is a **server rendering strategy** where we generate HTML pages at the time of building application. That means in production, the HTML page is generated when we run 'next build'. This HTML will then be reused on each request, can cached by CDN and severed to the client almost instantly; Improves performance and user experience
- When to Use Static Site Generation
  - Have content that rarely changes, such as blogs or documentation
  - Need to load quickly for better user experience and SEO
  - Can tolerate data being slightly outdated, as updates require rebuilding the site
- In Next.js, you can statically generate pages **with or without** data
  - **By default** all the Next.js components that **does not involve fetching data** from external source follows static rendering strategy

```ts
// page paths depend on external data
// pages/product/[id]/page.tsx file
// This function gets called at build time
export async function getStaticPaths() {
    const res = await fetch('https://link/to/api');
    const products = await res.json();
    // Get the paths we want to pre-render based on products
    const paths = products.map((product) => ({
        params: { id: product.id.toString() }, // Ensure id is a string
    }));
    // We'll pre-render only these paths at build time.
    // { fallback: false } means other routes should 404.
    return { paths, fallback: false };
}
// This also gets called at build time
export async function getStaticProps({ params }) {
    // params contains the product `id`. If the route is like /product/1, then params.id is 1
    const res = await fetch(`https://.../product/${params.id}`);
    const product = await res.json();
    // Pass product data to the page via props
    return { props: { product } };
}
// Page component to display the product details
export default function ProductPage({ product }) {
  return (
    <div>
      <h1>Product {product.id}</h1>
      <p>This is the product page for item {product.id}</p>
      <p>Title: {product.title}</p>
    </div>
  );
}
```

[⬆ back to top](#top)
