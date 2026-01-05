import { notifications } from "@mantine/notifications";
import { IconCircleCheckFilled, IconCircleXFilled } from "@tabler/icons-react";
import {
  queryOptions,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
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

export const useDeleteContact = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (contactId: string) => client.deleteContact(contactId),
    onSuccess: () =>
      notifications.show({
        icon: <IconCircleCheckFilled />,
        color: "green",
        message: "Contact deleted",
      }),
    onError: () =>
      notifications.show({
        icon: <IconCircleXFilled />,
        color: "red",
        message: "Error deleting contact",
      }),
    onSettled: () => queryClient.invalidateQueries({ queryKey: ["contacts"] }),
  });
};
export const getProfilePictureQueryOptions = (contactId?: string) =>
  queryOptions({
    queryKey: ["profile", "picture", { contactId }],
    queryFn: () => client.getProfilePictureUrl(),
  });
