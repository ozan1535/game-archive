import { useSession } from "next-auth/react";
import useSWR from "swr";

export function useGetFavourites() {
  const { data: session } = useSession();

  const { data: favourites } = useSWR("/api/server/favourites");
  const {
    data: currentUser,
    mutate: mutateCurrentUser,
    isValidating,
  } = useSWR(`/api/server/users/${session?.user?.user?.id}`);

  return { favourites, currentUser, mutateCurrentUser, isValidating };
}
