import { useState } from "react";
import { ContactsTable } from "./ContactsTable";
import { Layout } from "./Layout";
import { TopBar } from "./TopBar";
import { ContactDetailsModal } from "./ContactDetailsModal";

export function ContactsPage() {
  const [selectedContactId, setSelectedContactId] = useState<
    string | undefined
  >(undefined);
  return (
    <Layout>
      <TopBar />
      <ContactsTable onContactClick={setSelectedContactId} />
      <ContactDetailsModal
        contactId={selectedContactId}
        onClose={() => setSelectedContactId(undefined)}
      />
    </Layout>
  );
}
