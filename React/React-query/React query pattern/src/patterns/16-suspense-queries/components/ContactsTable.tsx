import { Alert, Anchor, Button, Card, Pagination, Table } from "@mantine/core";
import { useSuspenseQuery } from "@tanstack/react-query";
import { useState } from "react";
import { getContactsQueryOptions } from "../api/query";
import { ContactNumber } from "./ContactNumber";
import { DeleteContactButton } from "./DeleteContactButton";

type ContactsTableProps = {
  onContactClick: (contactId: string) => void;
};
export const ContactsTable = ({ onContactClick }: ContactsTableProps) => {
  const [page, setPage] = useState(1);
  const { data, isError, refetch } = useSuspenseQuery(
    getContactsQueryOptions(page, 50)
  );

  if (isError)
    return (
      <Alert variant="light" color="red" title="Error loading contacts" m="sm">
        <Button color="red" onClick={() => refetch()}>
          Try Again
        </Button>
      </Alert>
    );
  return (
    <Card withBorder radius={"md"} shadow="md" m="sm">
      <Table>
        <Table.Thead>
          <Table.Tr>
            <Table.Th>Name</Table.Th>
            <Table.Th></Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>
          {data.contacts.map((contact) => (
            <Table.Tr key={contact.id} className="group">
              <Table.Td>
                <Anchor onClick={() => onContactClick(contact.id)}>
                  {contact.firstName + " " + contact.lastName}
                </Anchor>
                <ContactNumber contactId={contact.id} />
              </Table.Td>
              <Table.Td className="flex justify-end opacity-0 group-hover:opacity-100 transition-all">
                <DeleteContactButton contactId={contact.id} />
              </Table.Td>
            </Table.Tr>
          ))}
        </Table.Tbody>
      </Table>

      <Pagination
        total={data.pagination.pagesCount}
        value={page}
        onChange={setPage}
        className="mx-auto"
      />
    </Card>
  );
};
