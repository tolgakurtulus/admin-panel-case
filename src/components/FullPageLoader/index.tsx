import { Spin } from "antd";
import styles from "./styles.module.scss";

type Props = {
  size?: "small" | "default" | "large";
  tip?: string;
};

export function FullPageLoader({ size = "large", tip = "Loading..." }: Props) {
  return (
    <div className={styles["c-spin"]}>
      <Spin size={size} tip={tip} />
    </div>
  );
}
