import Image from "next/image";
import { CardInformationKeyAndValue } from "./CardInformationKeyAndValue";
import styles from "./styles.module.scss";

export function Card({ data }) {
  return (
    <>
      {data.results.map((item, index) => (
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
            <div className={styles["Card__Information__Name"]}>{item.name}</div>
            <div className={styles["Card__Information__InfoKey"]}>
              <CardInformationKeyAndValue name={"Release date:"} />
              <CardInformationKeyAndValue name={"Genres:"} />
              <CardInformationKeyAndValue name={"Chart:"} />
            </div>
            <div className={styles["Card__Information__InfoValue"]}>
              <CardInformationKeyAndValue name={item.released} />
              <CardInformationKeyAndValue name={"fwefew"} />
              <CardInformationKeyAndValue name={"vewvdsd"} />
            </div>
          </div>
        </div>
      ))}
    </>
  );
}
