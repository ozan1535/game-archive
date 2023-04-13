import Link from "next/link";
import styles from "./styles.module.scss";

export function Dialog({ setShowDialog }) {
  return (
    <div className={styles["Dialog"]}>
      <div className={styles["Dialog__Container"]}>
        <div className={styles["Dialog__Container__Text"]}>
          You should Sign In in order to add favourite games
        </div>
        <div className={styles["Dialog__Container__Button"]}>
          <Link href="/login">Sign In</Link>
          <button onClick={() => setShowDialog(false)}>Okay</button>
        </div>
      </div>
    </div>
  );
}
