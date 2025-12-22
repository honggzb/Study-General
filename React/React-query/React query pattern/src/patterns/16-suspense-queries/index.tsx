import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ContactsPage } from "./components/ContactsPage";
import { QueryErrorBoundary } from "./components/QueryErrorBoundary";
import { QueryLoadingBoundary } from "./components/QueryLoadingBoundary";

const queryClient = new QueryClient();

export default function Pattern() {
  return (
    <QueryClientProvider client={queryClient}>
      <QueryErrorBoundary>
        <QueryLoadingBoundary>
          <ContactsPage />
        </QueryLoadingBoundary>
      </QueryErrorBoundary>
    </QueryClientProvider>
  );
}
