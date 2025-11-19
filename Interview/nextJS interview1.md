[Next.js Interview Questions and Answers](#top)

- [What is the difference between Next.js and React JS?](#what-is-the-difference-between-nextjs-and-react-js)
- [Difference between the pre-rendering types available in Next.js](#difference-between-the-pre-rendering-types-available-in-nextjs)
- [What is client-side rendering, and how does it differ from server-side rendering?](#what-is-client-side-rendering-and-how-does-it-differ-from-server-side-rendering)
- [How do you pass data between pages in a Next.js application?](#how-do-you-pass-data-between-pages-in-a-nextjs-application)


## What is the difference between Next.js and React JS?

|Next.js|React|
|---|---|
|an open-source framework based on Node.js and Babel, seamlessly integrates with React to facilitate the development of single-page apps|a JavaScript library, empowers the construction of user interfaces through the assembly of components|
|Supports SSR and Static Site Generation (SSG)|Primarily client-side rendering (CSR)|
|Built-in features like Image Optimization, SSR, and automatic static optimization|No out-of-the-box performance optimization|
|Enhanced by SSR and SSG for better SEO and faster load time|Requires extra configuration for SEO optimization|

[⬆ back to top](#top)

## Difference between the pre-rendering types available in Next.js

|Static Generation (SG)|Server-Side Rendering (SSR)|
|---|---|
|HTML is pre-generated at build time|HTML is generated on each request|
|The pre-generated HTML can be reused on every request|HTML is generated anew for each request|
|Recommended for performance and efficiency|Suitable for cases where content changes frequently or cannot be determined at build time|
|Export the page component or use 'getStaticProps'|Export 'getServerSideProps'|
|Less dependent on server resources during runtime|Depends on server resources for generating content dynamically.|
|Easily cache static HTML|Requires server-side caching mechanisms|
|Scales well as static content can be served efficiently|May require additional server resources to handle dynamic content generation|

[⬆ back to top](#top)

## What is client-side rendering, and how does it differ from server-side rendering?

- Server-Side Rendering (SSR): Sends a fully rendered HTML page from the server to the browser.
- Client-Side Rendering (CSR): Sends an initially minimal HTML page, which is then populated and rendered using JavaScript in the browser.
- CSR may result in slower initial page load compared to SSR but allows for highly interactive client-side applications


[⬆ back to top](#top)

## How do you pass data between pages in a Next.js application?

- **URL Query Parameters**: Send data through the URL and access it via the useRouter hook.
- **Router API**: Use Next.js routing to programmatically navigate and pass state.
- **State Management Libraries**: Use tools like Redux or React Context to share data across pages.
- **Server-Side Data Fetching**: Use `getServerSideProps` to fetch data on the server and pass it as props to the page component.

[⬆ back to top](#top)

> https://www.geeksforgeeks.org/reactjs/next-js-interview-questions-answers/
