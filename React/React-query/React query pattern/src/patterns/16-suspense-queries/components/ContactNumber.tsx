import { Text } from "@mantine/core";
import { useSuspenseQuery } from "@tanstack/react-query";
import { getOneContactQueryOptions } from "../api/query";

type ContactNumberProps = {
  contactId: string;
};

export const ContactNumber = ({ contactId }: ContactNumberProps) => {
  const { data } = useSuspenseQuery(getOneContactQueryOptions(contactId));
  return <Text c="dimmed">{data?.phoneNumber}</Text>;
};
