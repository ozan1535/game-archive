import { ICardInformationKeyAndValueProps } from "./CardInformationKeyAndValue.types";
import styles from "./styles.module.scss";

export function CardInformationKeyAndValue({
  name,
  color,
}: ICardInformationKeyAndValueProps) {
  return (
    <>
      <div
        className={styles["CardInformationKeyAndValue"]}
        style={{
          color: color || "#bfbdbd",
        }}
      >
        {name}
      </div>
    </>
  );
}
