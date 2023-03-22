import Link from "next/link";
import Image from "next/image";
import { IData } from "@/layouts/LayoutCardPages/types";
import { CardInformationKeyAndValue } from "./CardInformationKeyAndValue";
import styles from "./styles.module.scss";

export function Card({ data }: IData) {
  return (
    <div className="layoutCardPages__Cards">
      {data?.map((item, index) => (
        <div className={styles["Card"]} key={index}>
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

          <div className={styles["Card__Information"]}>
            <div className={styles["Card__Information__Platform"]}>
              platforms
            </div>
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
            <div className={styles["Card__Information__Genres"]}>
              <div>Genres:</div>
              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  justifyContent: "flex-end",
                }}
              >
                {item.genres.length ? (
                  item.genres?.map((genre, index) => (
                    <>
                      <div
                        style={{
                          color: "white",
                        }}
                      >
                        <span>{`${index ? ", " : ""}`}</span>
                        <Link
                          href={`/genres/${genre.id}/${genre.name}`}
                          target="_blank"
                          style={{
                            textDecoration: "underline",
                            transition: "0.75s",
                          }}
                        >
                          {genre.name}
                        </Link>
                      </div>
                    </>
                  ))
                ) : (
                  <CardInformationKeyAndValue name="Not found" color="white" />
                )}
              </div>
            </div>
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
