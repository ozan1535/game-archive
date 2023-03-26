import { signOut } from "next-auth/react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { getHeaderItems } from "./Header.helpers";
import styles from "./styles.module.scss";

const headerItems = getHeaderItems();

export function Header() {
  const { data: session } = useSession();

  return (
    <div className={styles["Header"]}>
      <div style={{ fontFamily: "monospace", fontSize: "1.25rem" }}>
        <Link href="/" className={styles["Header__Link"]}>
          Game Archive
        </Link>
      </div>
      <div>
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
      <div>
        {session ? (
          <Link
            href="/login"
            className={styles["Header__Link"]}
            onClick={() => signOut({ callbackUrl: "/login" })}
          >
            Sign out
          </Link>
        ) : (
          <Link href="/login" className={styles["Header__Link"]}>
            Login
          </Link>
        )}
      </div>
    </div>
  );
}
