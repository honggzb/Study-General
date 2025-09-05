[Apollo Client support for the Next.js App Router](#top)

- [FrontEnd integate Apollo Client](#frontend-integate-apollo-client)
  - [setup](#setup)
  - [ApolloProvider](#apolloprovider)
- [In Client Components and streaming SSR](#in-client-components-and-streaming-ssr)

--------------------------------------------------------------------------

**Why do you need this?**
- React Server Components: need a way of creating a client instance that is shared between all your server components for one request to prevent making duplicate requests.
- React Client Components: 
  - When using the app directory, all your "client components" will not only run in the browser. They will also be rendered on the server - in an "SSR" run that will execute after React Server Components have been rendered
  - If you want to make the most of your application, you probably already want to make your GraphQL requests on the server so that the page is fully rendered when it reaches the browser

- `npm i @apollo/client @apollo/client-integration-nextjs` or `pnpm add @apollo/client @apollo/client-integration-nextjs`
- [Apollo Client support for the Next.js App Router](https://github.com/apollographql/apollo-client-integrations/tree/main/packages/nextjs)

## In Client Components and streaming SSR

1. create 'app/apollo/apolloClient.ts'
2. create 'lib/ApolloProvider.tsx' for `ApolloProviderWrapper`
3. add `ApolloProviderWrapper` to 'client/app/layout.tsx'
4. use `useSuspenseQuery` to query data in Client component

```ts
// app/apollo/apolloClient.ts
import { HttpLink } from "@apollo/client";
import { ApolloClient, InMemoryCache } from "@apollo/client-integration-nextjs";
const client = (() => {
  const httpLink = new HttpLink({
    uri: "http://localhost:4000/graghql",
    fetchOptions: { },
  });
  return new ApolloClient({
    link: httpLink,
    cache: new InMemoryCache({}),
  });
});
export default client;
// lib/ApolloProvider.tsx
"use client";
import { ApolloNextAppProvider } from "@apollo/client-integration-nextjs";
import client from '../app/apollo/apolloClient';
const ApolloProviderWrapper = ({ children }: React.PropsWithChildren) => {
  return (
    <ApolloNextAppProvider makeClient={client}>
      {children}
    </ApolloNextAppProvider>
  );
};
export default ApolloProviderWrapper;
// app/layout.tsx
<body>
  <ApolloWrapper>{children}</ApolloWrapper>
</body>
// app/car/[id]/page.tsx
"use client";
import { useSuspenseQuery } from "@apollo/client/react";
import { useParams } from 'next/navigation'
import { GET_CAR_BY_ID } from "../../graphql/queries/car.queries";
type Props = {
    id: string;
};
const CarDetailPage = ({ id }: Props) => {
  const params = useParams<{ tag: string; id: string }>();
  const { data } = useSuspenseQuery(GET_CAR_BY_ID, {
    variables: { carId: params?.id },
  });
  const car = data?.getCarById;
  return (
    <CarDetail car={car} />
  )
}
export default CarDetailPage;
```

[⬆ back to top](#top)
