import Link from "next/link";
import { getLayoutDefault } from "@/layouts/LayoutDefault";
import styles from "@/styles/Game.module.scss";

export default function Game({ data }) {
  return (
    <div className={styles["Game"]}>
      <div className={styles["Game__Name"]}>
        <b>{data.name}</b>
      </div>

      <div className={styles["Game__Media"]}>
        <video width="720" height="500" controls>
          <source src={data.clip?.clip} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>

      <div className={styles["Game__Description"]}>
        <b>About</b>
        <div dangerouslySetInnerHTML={{ __html: data.description }}></div>
      </div>
      <div className={styles["Game__Info"]}>
        <div className={styles["Game__Platforms"]}>
          <p> Platforms</p>
          <div>
            {data.platforms.map((platform, index) => (
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
        <div className={styles["Game__Metascore"]}>
          <p> Metascore</p>
          <div>
            <span>{data.metacritic || "?"}</span>
          </div>
        </div>
        <div className={styles["Game__Genres"]}>
          <p> Genre</p>
          <div>
            {data.genres.map((genre, index) => (
              <>
                <span>{`${index ? ", " : ""}`}</span>
                <Link
                  href={`/genres/${genre.id}/${genre.slug}`}
                  style={{ textDecoration: "underline" }}
                >
                  {genre.name}
                </Link>
              </>
            ))}
          </div>
        </div>
        <div className={styles["Game__Release"]}>
          <p>Release date</p>
          <div>
            <span>{data.released}</span>
          </div>
        </div>
        <div className={styles["Game__Developer"]}>
          <p>Developer</p>
          <div>
            {data.developers.map((developer, index) => (
              <>
                <span>{`${index ? ", " : ""}`}</span>
                <Link
                  href={`/developers/${developer.id}/${developer.slug}`}
                  style={{ textDecoration: "underline" }}
                >
                  {developer.name}
                </Link>
              </>
            ))}
          </div>
        </div>
        <div className={styles["Game__Publisher"]}>
          <p>Publisher</p>
          <div>
            {data.publishers.map((publisher, index) => (
              <>
                <span>{`${index ? ", " : ""}`}</span>
                <Link
                  href="/hello"
                  target="_blank"
                  style={{ textDecoration: "underline" }}
                >
                  {publisher.name}
                </Link>
              </>
            ))}
          </div>
        </div>
      </div>
      <div className={styles["Game__Tag"]}>
        <p>Tags</p>
        <div>
          {data.tags.map((tag, index) => (
            <>
              <span>{`${index ? ", " : ""}`}</span>
              <Link
                href="/hello"
                target="_blank"
                style={{ textDecoration: "underline" }}
              >
                {tag.name}
              </Link>
            </>
          ))}
        </div>
      </div>
      <div className={styles["Game__Website"]}>
        <p>Website</p>
        <div>
          <Link
            href={data.website}
            target="_blank"
            style={{ textDecoration: "underline" }}
          >
            {data.website}
          </Link>
        </div>
      </div>
    </div>
  );
}

Game.getLayout = getLayoutDefault;

export async function getServerSideProps(context) {
  const { slug } = context.query; // get the slug from the query parameters

  // Fetch the data for the specified slug
  const res = await fetch(
    `https://api.rawg.io/api/games/${slug}?key=${process.env.API_KEY}`
  );
  const data = await res.json();

  return {
    props: {
      data,
    },
  };
}