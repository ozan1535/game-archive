import { LayoutDefault } from "../LayoutDefault";
import { ILayoutCardPage } from "./types";
import styles from "@/styles/Home.module.css";

export function LayoutCardPages(props: ILayoutCardPage) {
  const { children } = props;

  return <div className={styles["main"]}>{children}</div>;
}

export function getLayoutCardPages(page: JSX.Element) {
  return (
    <LayoutDefault>
      <LayoutCardPages>{page}</LayoutCardPages>
    </LayoutDefault>
  );
}
