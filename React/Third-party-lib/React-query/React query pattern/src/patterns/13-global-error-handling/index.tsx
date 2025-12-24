import {
  MutationCache,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { ContactsPage } from "./components/ContactsPage";

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

export default function Pattern() {
  return (
    <QueryClientProvider client={queryClient}>
      <ContactsPage />
    </QueryClientProvider>
  );
}
