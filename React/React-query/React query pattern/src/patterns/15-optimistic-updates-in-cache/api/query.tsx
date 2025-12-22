import { notifications } from "@mantine/notifications";
import { IconCircleCheckFilled, IconCircleXFilled } from "@tabler/icons-react";
import {
  queryOptions,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { client, GetContactsResponse } from "./client";

export const getContactsQueryOptions = (page: number, count: number) =>
  queryOptions({
    queryKey: ["contacts", "list", { page }, { count }],
    queryFn: () => client.getContacts(page, count),
  });

export const getOneContactQueryOptions = (contactId?: string) =>
  queryOptions({
    queryKey: ["contacts", "one", { contactId }],
    queryFn: () => client.getContact(contactId!),
    enabled: contactId !== undefined,
  });

export const useDeleteContact = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (contactId: string) => client.deleteContact(contactId),
    onMutate: async (contactId) => {
      // Cancel any outgoing refetches
      // (so they don't overwrite our optimistic update)
      await queryClient.cancelQueries({ queryKey: ["contacts", "list"] });

      // Snapshot the previous value
      const previousContactPages =
        queryClient.getQueriesData<GetContactsResponse>({
          queryKey: ["contacts", "list"],
        });
      const filtereContactPages = previousContactPages.map(
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
      filtereContactPages.forEach(([key, data]) => {
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
};
