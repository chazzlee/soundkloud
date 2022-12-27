import { Spinner } from "./Spinner";
import styles from "./FullSpinner.module.css";

export function FullSpinner() {
  return (
    <div className={styles.fullSpinner}>
      <Spinner />
    </div>
  );
}
