import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useDropzone } from "react-dropzone";
import { fetchAllGenres, selectGenres } from "../../genres/store";
import styles from "./UploadDropzone.module.css";

export function UploadDropzone() {
  const [dropped, setDropped] = useState(false);

  const onDrop = useCallback((acceptedFiles) => {
    setDropped(true);
    console.log(acceptedFiles);
  }, []);

  const dispatch = useDispatch();
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    multiple: true,
  });

  const genres = useSelector(selectGenres);

  const initialValues = {
    title: "",
    permalink: "",
    genre: "",
    tags: [],
    description: "",
    caption: "",
    privacy: "public",
  };
  const [formValues, setFormValues] = useState(initialValues);
  const handleInputChange = (e) => {};

  useEffect(() => {
    dispatch(fetchAllGenres());
  }, [dispatch]);

  if (dropped) {
    return (
      <>
        <nav className={styles.tabs}>
          <div className={styles.activeTab}>Upload</div>
        </nav>
        <div className={styles.qualityBanner}>
          Provide FLAC, WAV, ALAC, or AIFF for highest audio quality.
        </div>
        <div className={styles.uploadedTitle}>
          <p>06-Swine of the Cross.mp3</p>
          <p>Ready. Click Save to post this track.</p>
        </div>
        <div className={styles.progress} />

        {/* FORM */}
        <div className={styles.details}>
          <header className={styles.formHeader}>
            <p className={styles.headerTab}>Basic info</p>
          </header>
          <div className={styles.form}>
            <div className={styles.column1}>
              {/* TODO: */}
              <img src="" alt="" height={260} width={260} />
            </div>
            <div className={styles.column2}>
              <form>
                <div className={styles.formControl}>
                  <label className={styles.label} htmlFor="title">
                    Title <span className={styles.required}>*</span>
                  </label>
                  <input
                    className={styles.formInput}
                    type="text"
                    id="title"
                    name="title"
                    placeholder="Name your track"
                    value={formValues.title}
                    onChange={handleInputChange}
                    autoFocus
                  />
                </div>

                <div className={styles.formControl}>
                  <label className={styles.label} htmlFor="permalink">
                    Permalink
                  </label>
                  <input
                    className={styles.formInput}
                    type="text"
                    id="permalink"
                    name="permalink"
                    disabled
                    value={formValues.permalink}
                  />
                </div>
                <div className={styles.formControl}>
                  <label className={styles.label} htmlFor="genre">
                    Genre
                  </label>
                  <select
                    name="genre"
                    id="genre"
                    className={`${styles.formInput} ${styles.formSelect}`}
                    value={formValues.genre}
                    onChange={handleInputChange}
                  >
                    {genres.map((genre) => (
                      <option key={genre.id} value={genre.id}>
                        {genre.label}
                      </option>
                    ))}
                  </select>
                </div>
                <div className={styles.formControl}>
                  <label className={styles.label} htmlFor="tags">
                    Additional tags
                  </label>
                  <input
                    className={styles.formInput}
                    type="text"
                    id="tags"
                    name="tags"
                    value={formValues.tags}
                    onChange={handleInputChange}
                  />
                </div>
                <div className={styles.formControl}>
                  <label className={styles.label} htmlFor="description">
                    Description
                  </label>
                  <textarea
                    className={`${styles.formInput} ${styles.area}`}
                    name="description"
                    id="description"
                    placeholder="Describe your track"
                    value={formValues.description}
                    onChange={handleInputChange}
                  />
                </div>
                <div className={styles.formControl}>
                  <label className={styles.label} htmlFor="caption">
                    Caption
                  </label>
                  <textarea
                    className={`${styles.formInput} ${styles.area} ${styles.areaSmall}`}
                    name="caption"
                    id="caption"
                    placeholder="Add a caption to your post (optional)"
                    value={formValues.caption}
                    onChange={handleInputChange}
                  />
                </div>
                <div className={styles.formControl}>
                  <label className={styles.label} htmlFor="privacy">
                    Privacy:
                  </label>
                  <div className={styles.radioControl}>
                    <input
                      type="radio"
                      id="public"
                      name="privacy"
                      style={{ marginRight: "8px" }}
                      value={formValues.privacy}
                      onChange={handleInputChange}
                      defaultChecked
                    />
                    <div>
                      <label className={styles.label} htmlFor="public">
                        Public
                      </label>
                      <p className={styles.label}>
                        Anyone will be able to listen to this track
                      </p>
                    </div>
                  </div>
                  <div className={styles.radioControl}>
                    <input
                      type="radio"
                      id="private"
                      name="privacy"
                      style={{ marginRight: "8px" }}
                      value={formValues.privacy}
                      onChange={handleInputChange}
                    />
                    <label className={styles.label} htmlFor="private">
                      Private
                    </label>
                  </div>
                </div>
                {/* TODO: styles */}
                <div className={styles.formFooter}>
                  <p className={styles.requiredHelper}>
                    <span className={styles.required}>*</span> Required fields
                  </p>
                  <div className={styles.formActions}>
                    <button className={`${styles.btn} ${styles.cancelBtn}`}>
                      Cancel
                    </button>
                    <button className={`${styles.btn} ${styles.saveBtn}`}>
                      Save
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </>
    );
  }

  return (
    <div className={`${styles.container}`}>
      <div
        {...getRootProps()}
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <input {...getInputProps()} />
        <p style={{ fontSize: "20px", color: "#333", lineHeight: "2.6" }}>
          Drag and drop your tracks & albums here
        </p>
        <button
          style={{
            backgroundColor: "var(--primary-orange)",
            color: "#fff",
            fontSize: "1rem",
            padding: "10px 60px",
            border: "1px solid var(--primary-orange)",
            borderRadius: "3px",
          }}
        >
          or choose files to upload
        </button>
      </div>
      <div style={{ marginTop: "16px", marginBottom: "6px" }}>
        <input type="checkbox" />{" "}
        <span
          style={{
            fontSize: "12px",
            verticalAlign: "middle",
            lineHeight: 1.6,
          }}
        >
          Make a playlist when multiple files are selected
        </span>
      </div>
      <div style={{ fontSize: "12px" }}>
        Privacy: <input type="radio" /> Public <input type="radio" /> Private
      </div>
      <div style={{ position: "absolute", bottom: 30 }}>
        <p
          style={{
            fontSize: "12px",
            color: "#333",

            textAlign: "center",
          }}
        >
          Provide FLAC, WAV, ALAC, or AIFF for highest audio quality.
        </p>
      </div>
    </div>
  );
}
