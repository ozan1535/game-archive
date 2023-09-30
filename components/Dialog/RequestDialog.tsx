import { useEffect, useState } from "react";
import { useDialogContext } from "./DialogContext";
import { IRequestDialogProps } from "./RequestDialog.types";
import styles from "./styles.module.scss";

export function RequestDialog({
  comment,
  setShowDialog,
  requestType,
  mutate,
}: IRequestDialogProps) {
  const { setDialogProps } = useDialogContext();
  const [updatedCommentText, setUpdatedCommentText] = useState("");
  useEffect(() => {
    function handleEscapeKey(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setShowDialog(false);
      }
    }

    window.addEventListener("keydown", handleEscapeKey);

    // Clean up the event listener when the component unmounts
    return () => {
      window.removeEventListener("keydown", handleEscapeKey);
    };
  }, [setShowDialog]);

  const handleRequest = () => {
    if (requestType === "edit") {
      fetch("/api/firebase", {
        method: "PUT",
        body: JSON.stringify({
          comment: updatedCommentText,
          commentId: comment?.id,
          gameSlug: comment?.slug,
        }),
      }).then((res) => {
        if (!res.ok) {
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
      fetch("/api/firebase", {
        method: "DELETE",
        body: JSON.stringify({
          commentId: comment?.id,
          gameSlug: comment?.slug,
        }),
      }).then((res) => {
        if (!res.ok) {
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
    }
    if (mutate) {
      mutate();
    }
    setShowDialog(false);
  };

  return (
    <div className={styles["Dialog"]}>
      <div className={styles["Dialog__Container"]}>
        <div className={styles["Dialog__Container__Text"]}>
          <b>{requestType === "edit" ? "Update" : "Delete"}</b>
          {requestType === "edit" ? (
            <textarea
              rows={6}
              placeholder="Share your experience"
              onChange={(e) => setUpdatedCommentText(e.target.value)}
              defaultValue={comment?.comment}
            />
          ) : (
            <span style={{ color: "black" }}>
              Are you sure you want to delete your comment?
            </span>
          )}
        </div>
        <div className={styles["Dialog__Container__Button"]}>
          <button
            onClick={() => setShowDialog(false)}
            className={styles["Dialog__Container__Button--Primary"]}
          >
            Cancel
          </button>
          <button
            onClick={handleRequest}
            style={{ margin: "0 1rem 0 0.25rem" }}
          >
            {requestType === "edit" ? "Update" : "Delete"}
          </button>
        </div>
      </div>
    </div>
  );
}
