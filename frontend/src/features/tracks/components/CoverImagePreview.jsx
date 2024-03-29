import { BsCameraFill } from "react-icons/bs";
import styles from "./UploadDropzone.module.css";

export function CoverImagePreview({ image, onChange, edit = false }) {
  return (
    <div
      style={{
        background: "linear-gradient(135deg, #846170, #70929c)",
        height: "260px",
        width: "260px",
        position: "relative",
        boxShadow: "0px 0px 6px 2px rgba(17, 17, 26, 0.18)",
      }}
    >
      {image && (
        <img
          src={
            edit && typeof image === "string"
              ? image
              : URL.createObjectURL(image)
          }
          alt="track cover"
          height="100%"
          width="100%"
          style={{ objectFit: "cover" }}
          onLoad={() => URL.revokeObjectURL(image)}
        />
      )}
      <div
        style={{
          position: "absolute",
          top: "85%",
          left: "50%",
          transform: "translate(-50%, -50%)",
        }}
      >
        <label htmlFor="cover" role="button" className={styles.coverImageBtn}>
          <input
            type="file"
            id="cover"
            name="cover"
            style={{ display: "none" }}
            accept="image/*"
            onChange={onChange}
          />
          <BsCameraFill />
          <span style={{ marginLeft: "6px" }}>
            {image ? "Replace image" : "Upload image"}
          </span>
        </label>
      </div>
    </div>
  );
}
