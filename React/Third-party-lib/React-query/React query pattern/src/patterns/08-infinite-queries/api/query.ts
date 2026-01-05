import { infiniteQueryOptions, queryOptions } from "@tanstack/react-query";
import { client } from "./client";

export const contactsQueryOptions = infiniteQueryOptions({
    queryKey: ["contacts", "list"],
    queryFn: async ({ pageParam }) => await client.getContacts(pageParam),
    initialPageParam: { cursor: undefined as string | undefined },
    getNextPageParam: (lastPage) => ({ cursor: lastPage.nextCursor }),
  });

export const getOneContactQueryOptions = (contactId?: string) =>
  queryOptions({
    queryKey: ["contacts", "one", { contactId }],
    queryFn: () => client.getContact(contactId!),
    enabled: contactId !== undefined,
  });
