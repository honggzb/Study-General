import { queryOptions } from "@tanstack/react-query";
import { client } from "./client";

export const getContactsQueryOptions = queryOptions({
  queryKey: ["contacts", "list"],
  queryFn: () => client.getContacts(),
});
