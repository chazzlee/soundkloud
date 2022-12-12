import styles from "./UploadDropzone.module.css";

export function ProgressBar() {
  return (
    <div
      style={{
        height: "6px",
        width: "800px",
        position: "relative",
        backgroundColor: "darkgray",
      }}
    >
      <div className={styles.progress} />
    </div>
  );
}
