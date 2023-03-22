import Image from "next/image";
import { IData } from "@/layouts/LayoutCardPages/types";
import styles from "./styles.module.scss";
import Link from "next/link";

export function SecondaryCard({ data, page }: IData) {
  return (
    <div className="layoutCardPages__Cards">
      {data?.map((item, index) => (
        <div key={index} className={styles["SecondaryCard"]}>
          <div className={styles["SecondaryCard__Name"]}>
            <Link href={`/${page}/${item.id}/${item.slug}`}>{item.name}</Link>
          </div>
          <Image
            src={
              item.image_background?.includes("media.rawg.io")
                ? item.image_background
                : "/not-found.png"
            }
            alt={item.name}
            width={350}
            height={350}
            className={styles["SecondaryCard__Picture"]}
          />
        </div>
      ))}
    </div>
  );
}
