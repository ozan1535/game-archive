import { useRouter } from "next/router";
import Image from "next/image";
import { useState } from "react";
import useSWR from "swr";
import { GetServerSideProps } from "next";
import Link from "next/link";
import { getSession, useSession } from "next-auth/react";
import { getLayoutDefault } from "@/layouts/LayoutDefault";
import { SingleGameVideo } from "@/components/SingleGame/SingleGameVideo";
import { PageHead } from "@/components/PageHead/PageHead";
import { SingleGamePlatform } from "@/components/SingleGame/SingleGamePlatform";
import { Comments } from "@/components/Comments/Comments";
import { useDialogContext } from "@/components/Dialog/DialogContext";
import { IGameInfo } from "@/layouts/LayoutDefault/types";
import styles from "@/styles/Game.module.scss";

export default function Game({ data }: { data: IGameInfo }) {
  const { setDialogProps } = useDialogContext();
  const [commentValue, setCommentValue] = useState("");

  const router = useRouter();
  const { data: session } = useSession();

  const { data: dataComment, mutate } = useSWR(
    `/api/firebase?slug=${router.query.slug}`
  );

  const handleCommentRequest = async (
    e: React.MouseEvent<HTMLInputElement>
  ) => {
    e.preventDefault();

    if (!session) {
      setDialogProps((prev) => ({
        ...prev,
        showDialog: true,
        dialogText:
          "In order to comment to this game and enjoy the website, please log in.",
        canShowLogin: true,
        title: "Level Up!",
      }));
      return;
    }

    const requestData = {
      userEmail: session.user?.email,
      comment: commentValue,
      slug: data.slug,
      gameName: data.name,
      userName: session.user?.name,
      userImage: session.user?.image,
    };

    if (commentValue !== "") {
      fetch("/api/firebase", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestData),
      }).then((response) => {
        if (response.ok) {
          setCommentValue("");
          mutate();
        } else {
          setDialogProps((prev) => ({
            ...prev,
            showDialog: true,
            dialogText:
              "Oh no! Our servers are currently having a game of hide-and-seek. Please try again later.",
            canShowLogin: false,
            title: "Error",
          }));
        }
      });
    } else {
      setDialogProps((prev) => ({
        ...prev,
        showDialog: true,
        dialogText: "Please write your experience and try again.",
        canShowLogin: false,
        title: "Warning",
      }));
    }
  };

  return (
    <div className={styles["Game"]}>
      <PageHead
        title={`Game Archive - ${data.name}`}
        description={data.description.slice(0, 50)}
        keywords={`game archive, ${data.name}, game`}
      />
      <div className={styles["Game__Name"]}>
        <b>{data.name}</b>
      </div>

      {data.clip?.clip ? (
        <SingleGameVideo src={data.clip?.clip} />
      ) : (
        <Image
          alt="image"
          src={
            data.background_image?.includes("media.rawg.io")
              ? data.background_image
              : "/not-found.png"
          }
          className={styles["Game__Media"]}
          width={700}
          height={300}
        />
      )}

      <div className={styles["Game__Description"]}>
        <b>About</b>
        <div dangerouslySetInnerHTML={{ __html: data.description }}></div>
      </div>
      <div className={styles["Game__Info"]}>
        <SingleGamePlatform data={data.platforms} />
        <div className={styles["Game__Metascore"]}>
          <p> Metascore</p>
          <div>
            <span>{data.metacritic || "-"}</span>
          </div>
        </div>
        <div className={styles["Game__Genres"]}>
          <p> Genre</p>
          <div>
            {data.genres.length
              ? data.genres.map((genre, index) => (
                  <>
                    <span>{`${index ? ", " : ""}`}</span>
                    <Link
                      href={`/genres/${genre.id}/${genre.slug}`}
                      style={{ textDecoration: "underline" }}
                    >
                      {genre.name}
                    </Link>
                  </>
                ))
              : "-"}
          </div>
        </div>
        <div className={styles["Game__Release"]}>
          <p>Release date</p>
          <div>
            <span>{data.released || "-"}</span>
          </div>
        </div>
        <div className={styles["Game__Developer"]}>
          <p>Developer</p>
          <div>
            {data.developers.length
              ? data.developers.map((developer, index) => (
                  <>
                    <span>{`${index ? ", " : ""}`}</span>
                    <Link
                      href={`/developers/${developer.id}/${developer.slug}`}
                      style={{ textDecoration: "underline" }}
                    >
                      {developer.name}
                    </Link>
                  </>
                ))
              : "-"}
          </div>
        </div>
        <div className={styles["Game__Publisher"]}>
          <p>Publisher</p>
          <div>
            {data.publishers.length
              ? data.publishers.map((publisher, index) => (
                  <>
                    <span>{`${index ? ", " : ""}`}</span>
                    {publisher.name}
                  </>
                ))
              : "-"}
          </div>
        </div>
      </div>
      <div className={styles["Game__Tag"]}>
        <p>Tags</p>
        <div>
          {data.tags.length
            ? data.tags.map((tag, index) => (
                <>
                  <span>{`${index ? ", " : ""}`}</span>
                  {tag.name}
                </>
              ))
            : "-"}
        </div>
      </div>
      <div className={styles["Game__Website"]}>
        <p>Website</p>
        <div>
          {data.website ? (
            <Link
              href={data.website}
              target="_blank"
              style={{ textDecoration: "underline" }}
            >
              {data.website}
            </Link>
          ) : (
            "-"
          )}
        </div>
      </div>
      <div className={styles["Game__Comment"]}>
        <p>Comments</p>
        <div>
          <Comments
            defaultText={"There is not any comment for this game."}
            dataComment={dataComment}
            canEdit={false}
          />
          <form action="">
            <textarea
              rows={6}
              placeholder="Share your experience"
              onChange={(e) => setCommentValue(e.target.value)}
              value={commentValue}
            />
            <input
              type="submit"
              value="SHARE"
              onClick={(e) => handleCommentRequest(e)}
            />
          </form>
        </div>
      </div>
    </div>
  );
}

Game.getLayout = getLayoutDefault;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession(context);

  const { slug } = context.query; // get the slug from the query parameters

  // Fetch the data for the specified slug
  const res = await fetch(
    `https://api.rawg.io/api/games/${slug}?key=${process.env.API_KEY}`
  );
  const data = await res.json();

  const resComment = await fetch(
    `${process.env.SERVER_LINK as string}/api/firebase?slug=${slug}`
  );
  const dataComment = await resComment.json();

  return {
    props: {
      session,
      data,
      dataComment,
    },
  };
};
