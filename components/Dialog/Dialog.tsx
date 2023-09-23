import Link from "next/link";
import styles from "./styles.module.scss";

export function Dialog({ setShowDialog }) {
  return (
    <div className={styles["Dialog"]}>
      <div className={styles["Dialog__Container"]}>
        <div className={styles["Dialog__Container__Text"]}>
          <b>Level Up!</b>
          In order to add this item to your favourites and enjoy the website,
          please log in.
        </div>
        <div className={styles["Dialog__Container__Button"]}>
          <button onClick={() => setShowDialog(false)}>Okay</button>
          <Link href="/login">Log in</Link>
        </div>
      </div>
    </div>
  );
}
