import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ContactsPage } from "./components/ContactsPage";

const queryClient = new QueryClient();

export default function Pattern() {
  return (
    <QueryClientProvider client={queryClient}>
      <ContactsPage />
    </QueryClientProvider>
  );
}
