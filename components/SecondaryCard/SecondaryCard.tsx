import Image from "next/image";
import { IData } from "@/layouts/LayoutCardPages/types";
import styles from "./styles.module.scss";

export function SecondaryCard({ data }: IData) {
  return (
    <>
      {data.map((item, index) => (
        <div key={index} className={styles["SecondaryCard"]}>
          <div className={styles["SecondaryCard__Name"]}>{item.name}</div>
          <Image
            src={item.image_background}
            alt={item.image_background}
            width={350}
            height={350}
            className={styles["SecondaryCard__Picture"]}
          />
        </div>
      ))}
    </>
  );
}
