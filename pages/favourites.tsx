import { useState } from "react";
import { Card } from "@/components/Card/Card";
import { getLayoutCardPages } from "@/layouts/LayoutCardPages";
import { Pagination } from "@/components/Pagination/Pagination";
import { useGetFavourites } from "@/layouts/LayoutCardPages/hooks/useGetFavourites";
import { IData } from "@/layouts/LayoutCardPages/types";
import styles from "@/styles/Favourites.module.scss";
import { PageHead } from "@/components/PageHead/PageHead";

export default function Favourites() {
  const { favourites } = useGetFavourites();
  const [updatedData, setUpdatedData] = useState<IData[]>([]);

  if (!favourites && !updatedData) {
    return (
      <div className={styles["Favourites"]}>
        <PageHead
          title={"Game Archive - Favourites"}
          description={
            "Game archive favourites page. See all your favourite games."
          }
          keywords={"game archive, game, favourites, user"}
        />
        <p> You don&apos;t have any favourite game</p>
      </div>
    );
  }

  const favouriteItems = (updatedData || favourites)?.map((item) => {
    return {
      name: item.gameName,
      slug: item.gameSlug,
      id: item.gameId,
      released: item.gameRelease,
      rating: item.gameRating,
      background_image: item.gameImage,
      genres: item.gameGenres.genres,
    };
  });

  return (
    <>
      <PageHead
        title={"Game Archive - Favourites"}
        description={
          "Game archive favourites page. See all your favourite games."
        }
        keywords={"game archive, game, favourites, user"}
      />
      <Card data={favouriteItems} setUpdatedData={setUpdatedData} />
      {(updatedData || favourites).length > 20 && (
        <div className={"layoutCardPages__Pagination"}>
          <Pagination count={(updatedData || favourites).length} />
        </div>
      )}
    </>
  );
}

Favourites.getLayout = getLayoutCardPages;
