import { useSuspenseQuery } from "@tanstack/react-query";
import { getProfilePictureQueryOptions } from "../api/query";

export const Avatar = () => {
  const { data } = useSuspenseQuery(getProfilePictureQueryOptions());
  return (
    <img src={data} className="w-6 h-6 rounded-full" alt="profile picture" />
  );
};
