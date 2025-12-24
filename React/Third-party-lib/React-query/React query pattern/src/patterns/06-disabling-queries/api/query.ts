import { queryOptions } from "@tanstack/react-query";
import { client } from "./client";

export const getContactsQueryOptions = queryOptions({
  queryKey: ["contacts", "list"],
  queryFn: () => client.getContacts(),
});
export const getOneContactQueryOptions = (contactId?: string) =>
  queryOptions({
    queryKey: ["contacts", "one", { contactId }],
    queryFn: () => client.getContact(contactId!),
    enabled: contactId !== undefined,
  });
