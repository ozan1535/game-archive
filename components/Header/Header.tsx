import Link from "next/link";
import { getHeaderItems } from "./Header.helpers";
import styles from "./styles.module.scss";

const headerItems = getHeaderItems();

export function Header() {
  return (
    <div className={styles["Header"]}>
      {headerItems.map((item, index) => {
        return (
          <Link
            href={`/${item.title.toLowerCase()}`}
            key={index}
            className={styles["Header__Link"]}
          >
            {item.title === "/" ? "Home" : item.title}
          </Link>
        );
      })}
    </div>
  );
}
