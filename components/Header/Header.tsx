import { AiOutlineMenu } from "react-icons/ai";
import { useEffect, useState } from "react";
import { signOut } from "next-auth/react";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { getHeaderItems } from "./Header.helpers";
import styles from "./styles.module.scss";

const headerItems = getHeaderItems();

export function Header() {
  const { data: session } = useSession();
  const [isMenuResponsive, setIsMenuResponsive] = useState(false);

  const router = useRouter();

  useEffect(() => {
    setIsMenuResponsive(false);
  }, [router.asPath]);

  return (
    <div className={styles[isMenuResponsive ? "Header__Responsive" : "Header"]}>
      <div className={styles["Header__Title"]}>
        <Link href="/" className={styles["Header__Link"]}>
          Game Archive
        </Link>
      </div>
      <div className={styles["Header__Pages"]}>
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
      <div className={styles["Header__Login"]}>
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
      <AiOutlineMenu
        onClick={() => {
          setIsMenuResponsive((prev) => !prev);
        }}
        className={styles["Header--Menu"]}
      />
    </div>
  );
}
