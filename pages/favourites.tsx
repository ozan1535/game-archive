import { GetServerSideProps } from "next";
import { doc, getDoc } from "firebase/firestore";
import { getSession } from "next-auth/react";
import { useState } from "react";
import { Card } from "@/components/Card/Card";
import { getLayoutCardPages } from "@/layouts/LayoutCardPages";
import { Pagination } from "@/components/Pagination/Pagination";
import { PageHead } from "@/components/PageHead/PageHead";
import { firestoreDatabase } from "@/services/firebase";
import { IFavourite } from "@/layouts/LayoutDefault/types";
import styles from "@/styles/Favourites.module.scss";

export default function Favourites({
  favourites,
}: {
  favourites: IFavourite[];
}) {
  const [updatedData, setUpdatedData] = useState<IFavourite[]>([]);

  if (!favourites.length && !updatedData.length) {
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

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession(context);

  const docRef = doc(
    firestoreDatabase,
    "favourites",
    `${session?.user?.email}`
  );

  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    const favourites = Object.values(docSnap.data()).sort((a, b) =>
      a.gameName.localeCompare(b.gameName)
    );

    return {
      props: {
        session,
        favourites,
      },
    };
  } else {
    return {
      props: {
        session,
      },
    };
  }
};
