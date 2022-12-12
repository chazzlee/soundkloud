import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useDropzone } from "react-dropzone";
import { fetchAllGenres, selectGenres } from "../../genres/store";
import { uploadNewTrack } from "../store";
import styles from "./UploadDropzone.module.css";
import { CoverImagePreview } from "./CoverImagePreview";
import { ProgressBar } from "./ProgressBar";

const initialValues = {
  playlist: false,
  title: "",
  artist: "",
  permalink: "test",
  genre_id: "",
  tags: "",
  description: "",
  caption: "",
  privacy: "public",
};

export function UploadDropzone() {
  const [dropped, setDropped] = useState(false);

  const onDrop = useCallback((acceptedFiles) => {
    setDropped(true);
  }, []);

  const dispatch = useDispatch();
  const { getRootProps, getInputProps, acceptedFiles } = useDropzone({
    onDrop,
    multiple: true,
  });

  const genres = useSelector(selectGenres);

  const [formValues, setFormValues] = useState(initialValues);
  const [coverImage, setCoverImage] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [success, setSuccess] = useState(true);

  const handleInputChange = (e) => {
    setFormValues((prev) => {
      if (e.target.type === "checkbox") {
        return {
          ...prev,
          [e.target.name]: e.target.checked,
        };
      }
      return { ...prev, [e.target.name]: e.target.value };
    });
  };
  const resetForm = () => {
    setCoverImage(null);
    setDropped(false);
    setSubmitted(false);
    setFormValues(initialValues);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);

    const file = acceptedFiles[0];
    const formData = new FormData();
    formData.set("title", formValues.title.trim());
    formData.set("artist", formValues.artist.trim());
    formData.set("permalink", formValues.permalink.trim());
    formData.set("description", formValues.description.trim());
    formData.set("caption", formValues.caption.trim());
    formData.set("privacy", formValues.privacy);
    formData.set("genre_id", parseInt(formValues.genre_id, 10));
    formData.set("upload", file, file.name);
    formData.set("cover", coverImage, coverImage.name);

    dispatch(uploadNewTrack(formData)).then(() => {
      resetForm();
      setSuccess(true);
    });
  };
  const handleCancel = () => {
    resetForm();
    setDropped(false);
  };

  useEffect(() => {
    dispatch(fetchAllGenres());
  }, [dispatch]);

  if (success) {
    return (
      <>
        <nav className={styles.tabs}>
          <div className={styles.activeTab}>Upload</div>
        </nav>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div
            {...getRootProps({
              style: {
                border: "1px dashed #e5e5e5",
                width: "800px",
                height: "90px",
                color: "#333",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "0px 12px",
                fontSize: "14px",
                cursor: "pointer",
              },
            })}
          >
            <input {...getInputProps()} />
            <p>Drag and drop your tracks & albums here</p>
            <button
              style={{
                backgroundColor: "var(--primary-orange)",
                color: "#fff",
                fontSize: "14px",
                padding: "10px 32px",
                border: "1px solid var(--primary-orange)",
                borderRadius: "3px",
              }}
            >
              Upload a file
            </button>
          </div>
        </div>
      </>
    );
  }

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

        <ProgressBar />
        {/* FORM */}
        <div className={styles.details}>
          <header className={styles.formHeader}>
            <p className={styles.headerTab}>Basic info</p>
          </header>
          <div className={styles.form}>
            <div className={styles.column1}>
              {/* TODO: */}
              <CoverImagePreview
                image={coverImage}
                onChange={(e) => setCoverImage(e.target.files[0])}
              />
            </div>
            <div className={styles.column2}>
              <form onSubmit={handleSubmit} encType="multipart/form-data">
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
                  <label className={styles.label} htmlFor="artist">
                    Artist <span className={styles.required}>*</span>
                  </label>
                  <input
                    className={styles.formInput}
                    type="text"
                    id="artist"
                    name="artist"
                    placeholder="Name the artist"
                    value={formValues.artist}
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
                    name="genre_id"
                    id="genre"
                    className={`${styles.formInput} ${styles.formSelect}`}
                    value={formValues.genre_id}
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
                      value="public"
                      onChange={handleInputChange}
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
                      value="private"
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
                    <button
                      type="button"
                      className={`${styles.btn} ${styles.cancelBtn}`}
                      onClick={handleCancel}
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className={`${styles.btn} ${styles.saveBtn}`}
                      disabled={submitted}
                    >
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
        <input
          type="checkbox"
          name="playlist"
          checked={formValues.playlist}
          onChange={handleInputChange}
        />{" "}
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
        Privacy:{" "}
        <input
          type="radio"
          name="privacy"
          value="public"
          onChange={handleInputChange}
          defaultChecked
        />{" "}
        Public{" "}
        <input
          type="radio"
          name="privacy"
          value="private"
          onChange={handleInputChange}
        />{" "}
        Private
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
