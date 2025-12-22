import { queryOptions } from "@tanstack/react-query";
import { client } from "./client";

const queryKeys = {
  all: () => ["contacts"],
  getContacts: (page: number, count: number) => [
    ...queryKeys.all(),
    "list",
    { page },
    { count },
  ],
  getContact: (contactId: string | undefined) => [
    ...queryKeys.all(),
    "one",
    { contactId },
  ],
};

export const getContactsQueryOptions = (page: number, count: number) =>
  queryOptions({
    queryKey: queryKeys.getContacts(page, count),
    queryFn: () => client.getContacts(page, count),
  });

export const getOneContactQueryOptions = (contactId?: string) =>
  queryOptions({
    queryKey: queryKeys.getContact(contactId),
    queryFn: () => client.getContact(contactId!),
    enabled: contactId !== undefined,
  });
