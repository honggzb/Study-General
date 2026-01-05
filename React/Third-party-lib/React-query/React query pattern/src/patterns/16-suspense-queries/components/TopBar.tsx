import { Title } from "@mantine/core";
import { Avatar } from "./Avatar";

export const TopBar = () => {
  return (
    <div className="p-4 border-b border-gray-500 flex items-center justify-between">
      <Title order={4}>
        Contacts
      </Title>
      <Avatar />
    </div>
  );
};
