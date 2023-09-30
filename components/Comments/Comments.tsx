import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { MdModeEditOutline, MdDelete } from "react-icons/md";
import { RequestDialog } from "../Dialog/RequestDialog";
import { IComment, ICommentsFail } from "@/layouts/LayoutDefault/types";
import { IUserCommentData } from "@/pages/api/firebase";
import styles from "./Comments.module.scss";

export function Comments({
  defaultText,
  dataComment,
  canEdit,
  mutate,
}: IComment) {
  const [showDialog, setShowDialog] = useState(false);
  const [comment, setComment] = useState<IUserCommentData>();
  const [requestType, setRequestType] = useState("edit");
  if (
    !dataComment ||
    (dataComment as ICommentsFail).success === false ||
    !Object.values(dataComment).length
  ) {
    return (
      <p style={{ color: "#9d9fbc", margin: "0.25rem 0" }}>{defaultText}</p>
    );
  }

  const handleIconClick = (comment: IUserCommentData, type: string) => {
    setComment(comment);
    setRequestType(type);
    setShowDialog(true);
  };

  return (
    <>
      {showDialog && (
        <RequestDialog
          comment={comment}
          setShowDialog={setShowDialog}
          requestType={requestType}
          mutate={mutate}
        />
      )}
      {(dataComment as ICommentsFail).success === false ||
      !Object.values(dataComment).length ? (
        <p style={{ color: "#9d9fbc", margin: "0.25rem 0" }}>{defaultText}</p>
      ) : (
        Object.values(dataComment)
          .sort((a, b) => a.timestamp?.seconds - b.timestamp?.seconds)
          .map((comment, index) => (
            <div className={styles["Game__UserComments"]} key={index}>
              <div className={styles["Game__UserComments__Header"]}>
                <div>
                  <Image
                    src={comment.userImage || ""}
                    width={40}
                    height={40}
                    alt="User profile"
                  />
                  <b>{comment.userName}</b>
                </div>
                {canEdit && (
                  <div className={styles["Game__UserComments__Icons"]}>
                    <Link href={`/games/${comment.slug}`}>
                      {comment.gameName}
                    </Link>
                    <MdModeEditOutline
                      onClick={() => handleIconClick(comment, "edit")}
                    />
                    <MdDelete
                      onClick={() => handleIconClick(comment, "delete")}
                    />
                  </div>
                )}
              </div>
              <div className={styles["Game__UserComments__Footer"]}>
                <p>{comment.comment} </p>
                <p>
                  {new Date(
                    comment.timestamp?.seconds * 1000 +
                      comment.timestamp?.nanoseconds / 1000000
                  ).toLocaleString()}
                </p>
              </div>
            </div>
          ))
      )}
    </>
  );
}
