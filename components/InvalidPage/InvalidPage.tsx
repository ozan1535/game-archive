import { useRouter } from "next/router";
import styles from "./styles.module.scss";

export function InvalidPage({ detail }) {
  const router = useRouter();

  return (
    <div className={styles["InvalidPage"]}>
      <span> {detail}</span>
      <div
        className={styles["InvalidPage__Back"]}
        onClick={() => router.back()}
      >
        Click here to go back
      </div>
    </div>
  );
}
