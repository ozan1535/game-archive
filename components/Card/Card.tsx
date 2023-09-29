import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { CardInformationKeyAndValue } from "./CardInformationKeyAndValue";
import { IData } from "@/layouts/LayoutCardPages/types";
import { useGetFavourites } from "@/layouts/LayoutCardPages/hooks/useGetFavourites";
import { CardHeart } from "./CardHeart";
import { CardGenres } from "./Genres/CardGenres";
import styles from "./styles.module.scss";
export function Card({ data, setUpdatedData = null }: IData) {
  const { favourites, fetchFavouriteItems } = useGetFavourites();
  useEffect(() => {
    if (setUpdatedData) {
      setUpdatedData(favourites);
    }
  }, [favourites, setUpdatedData]);

  return (
    <div className="layoutCardPages__Cards">
      {data?.map((item, index) => (
        <div className={styles["Card"]} key={index}>
          <CardHeart
            data={item}
            favouriteItems={favourites}
            fetchFavouriteItems={fetchFavouriteItems}
          />
          <Link
            href={`/games/${item.slug}`}
            style={{ width: "328px", height: "160px" }}
          >
            <Image
              alt="image"
              src={
                item.background_image?.includes("media.rawg.io")
                  ? item.background_image
                  : "/not-found.png"
              }
              className={styles["Card__Picture"]}
              width={328}
              height={160}
            />
          </Link>
          <div className={styles["Card__Information"]}>
            <div className={styles["Card__Information__Name"]}>
              <Link href={`/games/${item.slug}`}>{item.name}</Link>
            </div>

            <div className={styles["Card__Information__Release"]}>
              <div>Release date:</div>
              <CardInformationKeyAndValue
                name={item.released || "Not found"}
                color="white"
              />
            </div>
            <CardGenres item={item} />
            <div className={styles["Card__Information__Rating"]}>
              <div>Rating:</div>
              <CardInformationKeyAndValue
                name={item.rating || "Not found"}
                color="white"
              />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
