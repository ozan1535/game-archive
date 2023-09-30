import { useSession } from "next-auth/react";
import { deleteField, doc, setDoc, updateDoc } from "firebase/firestore";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { firestoreDatabase } from "@/services/firebase";
import { useDialogContext } from "../Dialog/DialogContext";
import { ICardHeart } from "@/layouts/LayoutDefault/types";
import styles from "./styles.module.scss";

export function CardHeart({
  data,
  favouriteItems,
  fetchFavouriteItems,
}: ICardHeart) {
  const { data: session } = useSession();
  const { setDialogProps } = useDialogContext();

  const favouriteItemRequest = async (
    option: string,
    game: Record<string, any>
  ) => {
    if (!session) {
      setDialogProps((prev) => ({
        ...prev,
        showDialog: true,
        dialogText:
          "In order to add this game to your favourites and enjoy the website, please log in.",
        canShowLogin: true,
        title: "Level Up!",
      }));
      return;
    }
    switch (option) {
      case "add":
        await setDoc(
          doc(firestoreDatabase, "favourites", `${session.user?.email}`),
          {
            [game.slug]: {
              gameName: game.name,
              gameSlug: game.slug,
              gameId: game.id.toString(),
              gameImage: game.background_image,
              gameRelease: game.released,
              gameRating: game.rating,
              gameGenres: {
                genres: game.genres,
              },
            },
          },
          { merge: true }
        );
        await fetchFavouriteItems();
        break;
      case "remove":
        const favouriteItemRef = doc(
          firestoreDatabase,
          "favourites",
          `${session.user?.email}`
        );
        await updateDoc(favouriteItemRef, {
          [game.slug]: deleteField(),
        });
        await fetchFavouriteItems();
      default:
        break;
    }
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
