import { useSession } from "next-auth/react";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import {
  editFavouriteItemData,
  getFavouriteGameData,
} from "@/layouts/LayoutCardPages/helpers";
import { useGetFavourites } from "@/layouts/LayoutCardPages/hooks/useGetFavourites";
import { useHttpRequest } from "@/layouts/LayoutDefault/hooks/useHttpRequest";
import styles from "./styles.module.scss";

export function CardHeart({ data, favouriteItems, setShowDialog }) {
  const { data: session } = useSession();
  const sendRequest = useHttpRequest();
  const { favourites, currentUser, mutateCurrentUser } = useGetFavourites();

  const favouriteItemRequest = (option: string, game: Record<string, any>) => {
    if (!session) {
      setShowDialog(true);
      return;
    }
    const filteredFavourites = favourites?.data.map((item) => {
      return {
        favouriteItemId: item.id,
        gameId: item.attributes.gameId,
      };
    });

    if (option === "add") {
      const isGameOnServer = filteredFavourites?.some(
        (item) => item.gameId.toString() === game.id.toString()
      );

      if (isGameOnServer) {
        const favouriteItemId = filteredFavourites.filter(
          (item) => item.gameId.toString() === game.id.toString()
        )[0].favouriteItemId;
        const favouriteItemsIds = currentUser.favourites.map((item) => {
          return {
            id: item.id,
          };
        });

        const favouriteGameData = editFavouriteItemData(
          [...favouriteItemsIds, { id: favouriteItemId }],
          session
        );

        sendRequest(
          `/api/server/users/${session?.user?.user?.id}`,
          favouriteGameData,
          "PUT"
        );
        mutateCurrentUser(currentUser);
      } else {
        const favouriteGameData = getFavouriteGameData(game, session);
        sendRequest("/api/server/favourites", favouriteGameData, "POST");
        mutateCurrentUser(currentUser);
        console.log(favouriteGameData, "add new");
      }
    } else if (option === "remove") {
      const favouriteItemsIds = currentUser.favourites
        .filter((item) => item.gameId.toString() !== game.id.toString())
        .map((item) => {
          return {
            id: item.id,
          };
        });

      const favouriteGameData = editFavouriteItemData(
        favouriteItemsIds,
        session
      );

      sendRequest(
        `/api/server/users/${session?.user?.user?.id}`,
        favouriteGameData,
        "PUT"
      );
      mutateCurrentUser(currentUser);
    }
    mutateCurrentUser(currentUser);
  };

  return (
    <div className={styles["Card__Heart"]}>
      {favouriteItems?.some(
        (fav) => fav.gameId.toString() === data.id.toString()
      ) ? (
        <AiFillHeart
          onClick={() => favouriteItemRequest("remove", data)}
          title="Remove Favourite"
        />
      ) : (
        <AiOutlineHeart
          onClick={() => favouriteItemRequest("add", data)}
          title="Add Favourite"
        />
      )}
    </div>
  );
}
