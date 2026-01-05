import { notifications } from "@mantine/notifications";
import { IconCircleCheckFilled, IconCircleXFilled } from "@tabler/icons-react";
import { queryOptions, useMutation } from "@tanstack/react-query";
import { client } from "./client";

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

export const useDeleteContact = () =>
  useMutation({
    mutationFn: (contactId: string) => client.deleteContact(contactId),
    meta: {
      invalidatesQuery: ["contacts"],
      successMessage: "Contact deleted",
      errorMessage: "Error deleting contact",
    },
  });
