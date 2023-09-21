import { useState } from "react";
import { Card } from "@/components/Card/Card";
import { getLayoutCardPages } from "@/layouts/LayoutCardPages";
import { Pagination } from "@/components/Pagination/Pagination";
import { useGetFavourites } from "@/layouts/LayoutCardPages/hooks/useGetFavourites";
import { IData } from "@/layouts/LayoutCardPages/types";
import styles from "@/styles/Favourites.module.scss";

export default function Favourites() {
  const { favourites } = useGetFavourites();
  const [updatedData, setUpdatedData] = useState<IData[]>([]);

  if (!favourites && !updatedData) {
    return (
      <div className={styles["Favourites"]}>
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

// export async function getServerSideProps(context) {
//   const session = await getSession(context);

//   if (session?.user) {
//     try {
//       const res = await fetch(
//         `${process.env.SERVER_LINK}/api/users/${session?.user?.user?.id}?populate=*`,
//         {
//           method: "GET",
//           headers: {
//             "Content-Type": "application/json; charset=utf-8",
//             Authorization: `Bearer ${session?.user?.jwt}`,
//           },
//         }
//       );

//       const data = await res.json();

//       if (!res.ok) {
//         throw data;
//       }

//       return {
//         props: { session, data },
//       };
//     } catch (error) {
//       return { props: { session, data: error } };
//     }
//   } else {
//     return { props: { session } };
//   }
// }
