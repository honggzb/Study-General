[React query pattern](#top)

- [Simple Queries](#simple-queries)
- [custom Queries](#custom-queries)
- [selectors](#selectors)
- [Parameterized Queries](#parameterized-queries)
- [Pagination](#pagination)
- [Diabling Queries](#diabling-queries)
- [Infinite Queries](#infinite-queries)
- [Query Key Factories](#query-key-factories)
- [Simple Mutations](#simple-mutations)
- [Mutations - query Invalidation](#mutations---query-invalidation)
- [Mutations - automatic query Invalidation](#mutations---automatic-query-invalidation)
- [Global Error Handling](#global-error-handling)
- [Optimistic Updates in UI](#optimistic-updates-in-ui)
- [Optimistic Updates in cache](#optimistic-updates-in-cache)
- [Suspense queries](#suspense-queries)

-------------------------------------------------------------------------------

## Simple Queries

```ts
const useContacts = useQuery({
  queryKey: ["contacts", "list"],
  queryFn: () => client.getContacts(),
});
```

## custom Queries

```ts
const {data, isPending, isError, refetch} = useQuery({
  queryKey: ["contacts", "list"],
  queryFn: () => client.getContacts(),
});
if(isPending) return <LoadingCard />;
if(isError) return <Alert onRetryClick={refresh} />
```

## selectors

```ts
export const useContactsCount = (select: xxx) =>
useQuery({
  queryKey: ["contacts", "list"],
  queryFn: () => client.getContacts(),
  select: (data) => data.contacts.length
});
```

- make it more componentable

```ts
import { queryOptions } from "@tanstack/react-query";
export const getContactsQueryOptions = queryOptions({
  queryKey: ["contacts", "list"],
  queryFn: () => client.getContacts(),
});

export const useContacts = () => useQuery(getContactsQueryOptions);

export const TopBar = () => {
  const {data} = useQuery({
    ...getContactsQueryOptions,
    select: (data) => data.contacts.length,
  });
  return (
    <div className="p-4 border-b border-gray-500">
      <Title>{data} contacts</Title>
    </div>
  )
}
```

[⬆️back to top](#top)

## Parameterized Queries

```ts
export const getContactsQueryOptions = (contactId: string) =>
  queryOptions({
    queryKey: ["contacts", "list", { contactId }],
    queryFn: () => client.getContact(contactId),
  });
export const ContactPage = () => {
  const {contactId} = useUrlParameter();
  const{ data, isPending, isError } = useQuery(getContactsQueryOptions(contactId));
}
```

[⬆️back to top](#top)

## Pagination

```ts
export const getContactsQueryOptions = (page: number, count: number) =>
  queryOptions({
    queryKey: ["contacts", "list", { page }, { count }],
    queryFn: () => client.getContacts(page, count),
  });
export const ContactsTable = () => {
  const [page, setPage] = useState(1);
  const{ data, isPending, isError } = useQuery(getContactsQueryOptions(page, 50));
  function onNextPageClick() {
    setPage(page + 1);
  }
}
```

[⬆️back to top](#top)

## Diabling Queries

```ts
export const getContactsQueryOptions = (page: number, count: number) =>
  queryOptions({
    queryKey: ["contacts", "list", { page }, { count }],
    queryFn: () => client.getContacts(page, count),
  });
export const ContactsTable = ({ onContactClick }: ContactsTableProps) => {
  const [page, setPage] = useState(1);
  const{ data, isPending, isError, refetch } = useQuery(getContactsQueryOptions(page, 50));
  const queryClient = useQueryClient();
  useEffect(() => {
    queryClient.prefetchQuery(getContactsQueryOptions(page+1, 50));
  }, [queryClient, page]);
}
```

[⬆️back to top](#top)

## Infinite Queries

```ts
// the fetching function
type GetContacts = (param: { cursor: string | undefined }) => {
  contacts: Array<Contact>;
  nextCursor: string;
};
export const getContactsQueryOptions = queryOptions({
    queryKey: ["contacts", "list"],
    queryFn: async (pageParam) => await client.getContacts(pageParam),
    initialPageParam: { cursor: undefined },
    getNextPageParam: (lastPage) => ({ curser: lastPage.nextCursor }),
  });
export const ContactsTable = ({ onContactClick }: ContactsTableProps) => {
  const{ data, isPending, isError, refetch, isFetchingNextPage, fetchNextPage } = useInfiniteQuery(getContactsQueryOptions);
  return (
    <button onClick={() => fetchNextPage()} loading={isFetchingNextPage} >Load more</button>
  )
}
```

[⬆️back to top](#top)

## Query Key Factories

```ts
const queryKeys = {
  all: () => ["contacts"];
  getContacts: (page: number, count: number) => [
    ...queryKeys.all(),
    "list",
    { page },
    { count },
  ],
  getContact: (contactId: string | undefined) => [
    ...queryKeys.all(),,
    "one",
    { contactId }
  ],
}
export const getContactsQueryOptions = (page: number, count: number) =>
  queryOptions({
    queryKey: queryKeys.getContacts(page, count),
    queryFn: () => client.getContacts(page, count),
  });
export const getOneContactQueryOptions = (contactId: string) =>
  queryOptions({
    queryKey: queryKeys.getContact(contactId),
    queryFn: () => client.getContact(contactId),
  });
```

[⬆️back to top](#top)

## Simple Mutations

```ts
export const useDecleteContact = () => useMutation({
  mutationFn: (contactId: string) => client.deleteContact(contactId),
  onSucess: () =>
    notifications.show({
      icon: ...,
      color: "green",
      message: "Contact deleted",
    }),
  onError: () =>
    notifications.show({
      icon: ...,
      color: "red",
      message: "Contact did not be deleted",
    }),
})
export const DeleteContactButton =({ contactId }: DeleteContactButtonProps ) => {
  const { mutate, isPending } = useDecleteContact();
  return (
    <ActionIcon variant="light" loading={isPending} onClick={() => mutate(contactId)}> <IconTrash size={14} /></ActionIcon>
  )
}
```

[⬆️back to top](#top)

## Mutations - query Invalidation

```ts
export const useDecleteContact = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (contactId: string) => client.deleteContact(contactId),
    onSucess: () =>
      notifications.show({
        icon: ...,
        color: "green",
        message: "Contact deleted",
      }),
    onError: () =>
      notifications.show({
        icon: ...,
        color: "red",
        message: "Contact did not be deleted",
      }),
    onSettled: () => queryClient.invalidateQueries({ queryKey: queryKeys.all() })
  })
}
```

[⬆️back to top](#top)

## Mutations - automatic query Invalidation

```ts
export const useDecleteContact = () => {
  return useMutation({
    mutationFn: (contactId: string) => client.deleteContact(contactId),
    meta: { invalidatesQuery, ["contacts"], }
  })
}
// need settle by hand in main.tsx
const queryClient = new QueryClient({
  mutationCache: new MutationCache({
    onSettled: (_data, _error, _variables, _context, mutation) => {
      {
        if (mutation.meta?.invalidatesQuery) {
          queryClient.invalidateQueries({
            queryKey: mutation.meta?.invalidatesQuery,
          });
        }
      },
    });
//...
export default function Pattern() {
  return (
    <QueryClientProvider client={queryClient}>
      <ContactsPage />
    </QueryClientProvider>
  );
}
```

[⬆️back to top](#top)

## Global Error Handling

```ts
//index.tsx
declare module "@tanstack/react-query" {
  interface Register {
    defaultError: {
      status: number;
    };
  }
}
const queryClient = new QueryClient({
  mutationCache: new MutationCache({
    onError: (error) => {
      if (error?.status === 401) {
        // perform logout
        localStorage.removeItem("token"); // or whatever you store
        window.location.href = "/login"; // or navigate with router
      }
    },
  }),
});
```

[⬆️back to top](#top)


## Optimistic Updates in UI

```ts
// method 1. exec in U1(ContactsTable.tsx)
const { data, isPending, isError, refetch } = useQuery(
    getContactsQueryOptions(page, 50)
  );
const { contactIds } = useContactsBeingDeleted();
const contacts = data.contacts.filter(                  //filter
    (contact) => !contactIds.includes(contact.id)
);
// mehthod 2. exec in mutation (query.tsx)
const mutations = useMutationState({
    filters: { mutationKey: ["delete-contact"] },
  });
const contactIds = mutations
    .filter((mutation) => mutation.status === "pending")   // filter
    .map((mutation) => mutation.variables as string);
```

[⬆️back to top](#top)

## Optimistic Updates in cache

```ts
// query.tsx
export const useDeleteContact = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (contactId: string) => client.deleteContact(contactId),
    onMutate: async (contactId) => {
      // Cancel any outgoing refetches (so they don't overwrite our optimistic update)
      await queryClient.cancelQueries({ queryKey: ["contacts", "list"] });
      const previousContactPages =                            // Snapshot the previous value
        queryClient.getQueriesData<GetContactsResponse>({
          queryKey: ["contacts", "list"],
        });
      const filtereContactPages = previousContactPages.map(   // filter actual data 
        ([queryKey, page]) =>
          [
            queryKey,
            {
              ...page,
              contacts: page?.contacts.filter(
                (contact) => contact.id !== contactId
              ),
            },
          ] as const
      ); ;
      filtereContactPages.forEach(([key, data]) => {   //update data
        queryClient.setQueryData(key, data);
      });
      // Return a context with the previous and new todo
      return { previousContactPages };
    },
    // If the mutation fails, use the context we returned above
    onError: (_1, _2, context) => {
      queryClient.setQueryData(
        ["contacts", "list"],
        context?.previousContactPages
      );
      notifications.show({
        icon: <IconCircleXFilled />,
        color: "red",
        message: "Error deleting contact",
      });
    },
    onSuccess: () =>
      notifications.show({
        icon: <IconCircleCheckFilled />,
        color: "green",
        message: "Contact deleted",
      }),
    onSettled: () => queryClient.invalidateQueries({ queryKey: ["contacts"] }),
  });
```

[⬆️back to top](#top)

## Suspense queries

```ts
export const ContactsTable = ({ onContactClick }: ContactsTableProps) => {
  const { data, isError, refetch } = useSuspenseQuery(
      getContactsQueryOptions(page, 50)
    );
    // render UI
}
export const Avatar = () => {
   const { data } = useSuspenseQuery(getProfilePictureQueryOptions());
    // render UI
}
export const ContactNumber = ({ contactId }: ContactNumberProps) => {
   const { data } = useSuspenseQuery(getOneContactQueryOptions(contactId));
    // render UI
}
```

[⬆️back to top](#top)

> references
- https://github.com/cosdensolutions/code/tree/master/videos/long/react-query-tutorial
- https://github.com/youssefbenlemlih/react-patterns
- https://github.com/josefbender/react-patterns/
