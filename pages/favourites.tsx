import { Card } from "@/components/Card/Card";
import { getLayoutCardPages } from "@/layouts/LayoutCardPages";
import { getSession, useSession } from "next-auth/react";
import styles from "@/styles/Favourites.module.scss";
import Link from "next/link";
import { useEffect } from "react";

export default function Favourites({ data, session }) {
  console.log(session, "sessiononfav");

  //const { data: session } = useSession();

  useEffect(() => {
    const selam = async () => {
      const res = await fetch(
        `https://game-archive-strapi.onrender.com/api/users/${session?.user?.id}?populate=*`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json; charset=utf-8",
            Authorization: `Bearer ${session?.user?.jwt}`,
          },
        }
      );
      const data = await res.json();

      console.log(data);
    };

    console.log(selam());
  }, [session?.user?.id, session?.user?.jwt]);

  if (!session) {
    return (
      <div className={styles["Favourites"]}>
        <Link href={"/login"}>Sign in to save favourite games</Link>
      </div>
    );
  }
  if (!data.length || data.error) {
    return (
      <div className={styles["Favourites"]}>
        <p> {data?.error?.message || "You don't have any favourite game"}</p>
      </div>
    );
  }

  return <Card data={data} />;
}

Favourites.getLayout = getLayoutCardPages;

export async function getServerSideProps(context) {
  const session = await getSession(context);
  console.log(session, "fewfjifjwojfoiejwf");

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

    const favourites =
      session &&
      data.favourites.map((item) => {
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

    // Pass data to the page via props
    return {
      props: {
        data: favourites,
        session,
      },
    };
  } catch (error) {
    return {
      props: {
        data: error,
        session,
      },
    };
  }
}
