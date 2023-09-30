import Link from "next/link";
import { ISingleGamePlatform } from "./SingleGamePlatform.types";
import styles from "@/styles/Game.module.scss";

export function SingleGamePlatform({ data }: { data: ISingleGamePlatform[] }) {
  return (
    <div className={styles["Game__Platforms"]}>
      <p> Platforms</p>
      <div>
        {data.map((platform, index) => (
          <>
            <span>{`${index ? ", " : ""}`}</span>
            <Link
              href={`/platforms/${platform.platform.id}/${platform.platform.slug}`}
              style={{ textDecoration: "underline" }}
            >
              {platform.platform.name}
            </Link>
          </>
        ))}
      </div>
    </div>
  );
}
