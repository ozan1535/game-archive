import Link from "next/link";
import { CardInformationKeyAndValue } from "../CardInformationKeyAndValue";
import styles from "@/components/Card/styles.module.scss";

export function CardGenres({ item }) {
  return (
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
          <>
            {item.genres?.map((genre, index) => (
              <div
                key={genre.name}
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
            ))}
          </>
        ) : (
          <CardInformationKeyAndValue name="Not found" color="white" />
        )}
      </div>
    </div>
  );
}
