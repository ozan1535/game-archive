import { getSession } from "next-auth/react";
import { Card } from "@/components/Card/Card";
import { getLayoutCardPages } from "@/layouts/LayoutCardPages";
import { Pagination } from "@/components/Pagination/Pagination";
import styles from "@/styles/Favourites.module.scss";

export default function Favourites({ data }) {
  if (!data?.length || data?.error) {
    return (
      <div className={styles["Favourites"]}>
        <p> {data?.error?.message || "You don't have any favourite game"}</p>
      </div>
    );
  }

  return (
    <>
      <Card data={data} />
      {data.length > 20 && (
        <div className={"layoutCardPages__Pagination"}>
          <Pagination count={data.length} />
        </div>
      )}
    </>
  );
}

Favourites.getLayout = getLayoutCardPages;

export async function getServerSideProps(context) {
  const session = await getSession(context);

  if (session?.user) {
    try {
      const res = await fetch(
        `${process.env.SERVER_LINK}/api/users/${session?.user?.id}?populate=*`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json; charset=utf-8",
            Authorization: `Bearer ${session?.user?.jwt}`,
          },
        }
      );

      const data = await res.json();

      if (!res.ok) {
        throw data;
      }

      const favourites = data.favourites.map((item) => {
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

      return {
        props: { session, data: favourites },
      };
    } catch (error) {
      return { props: { session, data: error } };
    }
  } else {
    return { props: {} };
  }
}
