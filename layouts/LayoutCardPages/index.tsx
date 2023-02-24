import styles from "@/styles/Home.module.css";
import { LayoutDefault } from "../LayoutDefault";

export function LayoutCardPages(props) {
  const { children } = props;

  return <div className={styles["main"]}>{children}</div>;
}

export function getLayoutCardPages(page) {
  return (
    <LayoutDefault>
      <LayoutCardPages>{page}</LayoutCardPages>
    </LayoutDefault>
  );
}
