import { useQuery } from "@tanstack/react-query";
import { client } from "./client";

export const useContacts = () =>
  useQuery({
    queryKey: ["contacts", "list"],
    queryFn: () => client.getContacts(),
  });
