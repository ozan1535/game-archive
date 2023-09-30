import styles from "@/styles/Game.module.scss";

export function SingleGameVideo({ src }: { src: string }) {
  return (
    <div className={styles["Game__Media"]}>
      <video width="720" height="500" controls>
        <source src={src} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
  );
}
