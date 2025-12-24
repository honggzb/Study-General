import { Box, Modal, SimpleGrid, Stack, Text } from "@mantine/core";
import { useQuery } from "@tanstack/react-query";
import { getOneContactQueryOptions } from "../api/query";
import { Spinner } from "./Spinner";

type ContactDetailsModalProps = {
  contactId?: string;
  onClose: () => void;
};

export const ContactDetailsModal = ({
  contactId,
  onClose,
}: ContactDetailsModalProps) => {
  const { data, isPending } = useQuery(getOneContactQueryOptions(contactId));

  return (
    <Modal opened={!!contactId} onClose={onClose} title="Contact Details">
      {isPending && <Spinner />}
      {data && (
        <Stack>
          <SimpleGrid cols={2}>
            <Box>
              <Text size="sm" c="dimmed">
                First name
              </Text>
              <Text inline>{data.firstName}</Text>
            </Box>
            <Box>
              <Text size="sm" c="dimmed">
                Last name
              </Text>
              <Text inline>{data.lastName}</Text>
            </Box>
          </SimpleGrid>
          <Box>
            <Text size="sm" c="dimmed">
              Phone number
            </Text>
            <Text inline>{data.phoneNumber}</Text>
          </Box>
          <Box>
            <Text size="sm" c="dimmed">
              Adress{" "}
            </Text>
            <Text inline>{data.address}</Text>
          </Box>
        </Stack>
      )}
    </Modal>
  );
};
