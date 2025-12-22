import { notifications } from "@mantine/notifications";
import { IconCircleCheckFilled, IconCircleXFilled } from "@tabler/icons-react";
import {
  MutationCache,
  QueryClient,
  QueryClientProvider,
  QueryKey,
} from "@tanstack/react-query";
import { ContactsPage } from "./components/ContactsPage";

declare module "@tanstack/react-query" {
  interface Register {
    mutationMeta: {
      invalidatesQuery?: QueryKey;
      successMessage?: string;
      errorMessage?: string;
    };
  }
}

const queryClient = new QueryClient({
  mutationCache: new MutationCache({
    onSuccess: (_data, _variables, _context, mutation) => {
      if (mutation.meta?.successMessage) {
        notifications.show({
          icon: <IconCircleCheckFilled />,
          color: "green",
          message: mutation.meta?.successMessage,
        });
      }
    },

    onError: (_error, _variables, _context, mutation) => {
      if (mutation.meta?.errorMessage) {
        notifications.show({
          icon: <IconCircleXFilled />,
          color: "red",
          message: mutation.meta?.errorMessage,
        });
      }
    },
    onSettled: (_data, _error, _variables, _context, mutation) => {
      {
        if (mutation.meta?.invalidatesQuery) {
          queryClient.invalidateQueries({
            queryKey: mutation.meta?.invalidatesQuery,
          });
        }
      }
    },
  }),
});

export default function Pattern() {
  return (
    <QueryClientProvider client={queryClient}>
      <ContactsPage />
    </QueryClientProvider>
  );
}
