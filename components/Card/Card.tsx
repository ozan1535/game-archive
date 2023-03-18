import Link from "next/link";
import Image from "next/image";
import { IData } from "@/layouts/LayoutCardPages/types";
import { CardInformationKeyAndValue } from "./CardInformationKeyAndValue";
import styles from "./styles.module.scss";

export function Card({ data }: IData) {
  return (
    <div className="layoutCardPages__Cards">
      {data.map((item, index) => (
        <div className={styles["Card"]} key={index}>
          <Image
            alt="image"
            src={item.background_image}
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
            <div className={styles["Card__Information__InfoKey"]}>
              <CardInformationKeyAndValue name={"Release date:"} />
              <CardInformationKeyAndValue name={"Genres:"} />
              <CardInformationKeyAndValue name={"Rating:"} />
            </div>
            <div className={styles["Card__Information__InfoValue"]}>
              <CardInformationKeyAndValue name={item.released} color="white" />

              <div style={{ display: "flex" }}>
                {item.genres?.map((genre, index) => (
                  <>
                    <div
                      className={styles["CardInformationKeyAndValue"]}
                      style={{
                        color: "white",
                      }}
                    >
                      <span>{`${index ? ", " : ""}`}</span>
                      <Link
                        href="/hello"
                        target="_blank"
                        style={{ textDecoration: "underline" }}
                      >
                        {genre.name}
                      </Link>
                    </div>
                  </>
                ))}
              </div>

              <CardInformationKeyAndValue name={item.rating} color="white" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
