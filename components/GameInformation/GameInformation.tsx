import Link from "next/link";
import { IGameInformation } from "./GameInformation.types";

export function GameInformation({ items, hasLink }: IGameInformation) {
  return (
    <div>
      {items.length
        ? items.map((item, index) => (
            <>
              <span>{`${index ? ", " : ""}`}</span>
              {hasLink ? (
                <Link
                  href={`/genres/${item.id}/${item.slug}`}
                  style={{ textDecoration: "underline" }}
                >
                  {item.name}
                </Link>
              ) : (
                item.name
              )}
            </>
          ))
        : "-"}
    </div>
  );
}
