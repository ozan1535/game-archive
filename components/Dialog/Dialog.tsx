import Link from "next/link";
import { useEffect } from "react";
import { useDialogContext } from "./DialogContext";
import styles from "./styles.module.scss";

export function Dialog() {
  const { dialogProps, setDialogProps } = useDialogContext();
  const { title, dialogText, canShowLogin } = dialogProps;
  useEffect(() => {
    function handleEscapeKey(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setDialogProps((prev) => ({
          ...prev,
          showDialog: false,
        }));
      }
    }

    window.addEventListener("keydown", handleEscapeKey);

    // Clean up the event listener when the component unmounts
    return () => {
      window.removeEventListener("keydown", handleEscapeKey);
    };
  }, [setDialogProps]);

  return (
    <div className={styles["Dialog"]}>
      <div className={styles["Dialog__Container"]}>
        <div className={styles["Dialog__Container__Text"]}>
          <b>{title || "Level Up!"}</b>
          <span style={{ color: "black" }}>{dialogText}</span>
        </div>
        <div className={styles["Dialog__Container__Button"]}>
          <button
            onClick={() => {
              setDialogProps((prev) => ({
                ...prev,
                showDialog: false,
              }));
            }}
          >
            Okay
          </button>
          {canShowLogin && <Link href="/login">Log in</Link>}
        </div>
      </div>
    </div>
  );
}
