import { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useDropzone } from "react-dropzone";
import slug from "slug";
import { fetchAllGenres, selectGenres } from "../../genres/store";
import { selectCurrentTrack, uploadNewTrack } from "../store";
import styles from "./UploadDropzone.module.css";
import { CoverImagePreview } from "./CoverImagePreview";
import { ProgressBar } from "./ProgressBar";
import { selectCurrentUser } from "../../auth/store";

const initialValues = {
  playlist: false,
  artist: "",
  genre_id: "",
  description: "",
  caption: "",
  privacy: "public",
};

export const withoutExtensionExp = /\.[^/.]+$/;

//TODO: FIX bug, --current track---put it to recentlyuploaded in store

export function UploadDropzone() {
  const currentUser = useSelector(selectCurrentUser);
  const [dropped, setDropped] = useState(false);
  const dispatch = useDispatch();

  const genres = useSelector(selectGenres);

  const [formValues, setFormValues] = useState(initialValues);
  const [title, setTitle] = useState("");
  const [permalink, setPermalink] = useState("");
  const [coverImage, setCoverImage] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [success, setSuccess] = useState(false);
  const [originalFilename, setOriginalFilename] = useState("");

  const [tagInput, setTagInput] = useState("");
  const [tagsDisplay, setTagsDisplay] = useState([]);

  const onDrop = useCallback((acceptedFiles) => {
    setDropped(true);
    setOriginalFilename(acceptedFiles[0].name);
    setTitle(acceptedFiles[0].name.replace(withoutExtensionExp, ""));
  }, []);

  const { getRootProps, getInputProps, acceptedFiles } = useDropzone({
    onDrop,
    multiple: true,
  });

  const uploadedTrack = useSelector(selectCurrentTrack);

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

  const addTag = (tagList) => {
    console.log(tagList);
    setTagsDisplay(tagList.split(" "));
  };

  console.log(tagsDisplay);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);

    const file = acceptedFiles[0];
    const formData = new FormData();
    formData.set("title", title.trim());
    formData.set("artist", formValues.artist.trim());
    formData.set("permalink", permalink.trim());
    formData.set("description", formValues.description.trim());
    formData.set("caption", formValues.caption.trim());
    formData.set("privacy", formValues.privacy);
    formData.set("genre_id", parseInt(formValues.genre_id, 10));
    formData.set("upload", file, file.name);
    formData.set("tags", JSON.stringify(tagsDisplay));

    coverImage && formData.set("cover", coverImage, coverImage.name);

    dispatch(uploadNewTrack(formData));
    // TODO:
    setSuccess(true);
    resetForm();
  };
  const handleCancel = () => {
    resetForm();
    setDropped(false);
  };

  useEffect(() => {
    dispatch(fetchAllGenres());
  }, [dispatch]);

  useEffect(() => {
    setPermalink(slug(title));
  }, [title]);

  if (success) {
    return (
      <div className="full-page" style={{ height: "100%" }}>
        <main
          className="page-container"
          style={{
            backgroundColor: "#fff",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
            height: "100%",
          }}
        >
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
                  marginBottom: "32px",
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
            <div
              style={{
                width: "800px",
                height: "190px",
                display: "grid",
                gridTemplateColumns: "20% 50% 30%",
                padding: "25px",
                boxShadow: "0 2px 12px -5px rgb(0 0 0 / 10%)",
              }}
            >
              <div>image</div>
              <div>
                <h4>{uploadedTrack?.title}</h4>
                <p>{uploadedTrack?.artist}</p>
                <p>{uploadedTrack?.privacy}</p>
                <p>{uploadedTrack?.caption}</p>
                <p>Upload complete.</p>
                <Link
                  to={`/${uploadedTrack?.uploader?.slug}/${uploadedTrack?.permalink}`}
                >
                  Go to your track
                </Link>
              </div>
              <div>
                <h4>Share your new track</h4>
              </div>
            </div>
          </div>
        </main>
      </div>
    );
  }

  if (dropped) {
    return (
      <div className="full-page">
        <main
          className="page-container"
          style={{
            backgroundColor: "#fff",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
            height: "100%",
          }}
        >
          <nav className={styles.tabs}>
            <div className={styles.activeTab}>Upload</div>
          </nav>
          <div className={styles.qualityBanner}>
            Provide FLAC, WAV, ALAC, or AIFF for highest audio quality.
          </div>
          <div className={styles.uploadedTitle}>
            <p>{originalFilename}</p>
            <p>Ready. Click Save to post this track.</p>
          </div>

          <ProgressBar />
          {/* FORM */}
          <div
            className={styles.details}
            style={{
              borderBottom: "3px solid var(--primary-orange)",
              paddingBottom: "20px",
            }}
          >
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
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
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
                    />
                  </div>

                  <div className={styles.formControl}>
                    <label className={styles.label} htmlFor="permalink">
                      Permalink
                    </label>
                    <input
                      className={styles.formInput}
                      style={{ backgroundColor: "lightgray" }}
                      type="text"
                      id="permalink"
                      name="permalink"
                      disabled
                      value={
                        `http://localhost:3000/${currentUser.slug}/` + permalink
                      }
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
                  <div
                    className={styles.formControl}
                    style={{ position: "relative" }}
                  >
                    <label className={styles.label} htmlFor="tags">
                      Additional tags
                    </label>
                    <input
                      className={styles.formInput}
                      type="text"
                      id="tags"
                      name="tags"
                      value={tagInput}
                      placeholder="Add tags to describe the genre and mood of your track"
                      onChange={(e) => setTagInput(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          e.preventDefault();
                          addTag(tagInput);
                        }
                      }}
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
                  {/* TODO: styles FIXME:!!!!!! */}
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
                        className={`${styles.btn}`}
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
          <footer
            style={{
              fontSize: "12px",
              color: "#333",
              textAlign: "center",
              padding: "20px 0",
              borderBottom: "1px solid #e5e5e5",
            }}
          >
            <p>
              By uploading, you confirm that your sounds comply with our Terms
              of Use and you don't infringe anyone else's rights.
            </p>
          </footer>
          <div style={{ paddingBottom: "40px" }}></div>
        </main>
      </div>
    );
  }

  // INITIAL STEP
  return (
    <div className="full-page" style={{ height: "100%" }}>
      <main
        className="page-container"
        style={{
          backgroundColor: "#fff",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
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
      </main>
    </div>
  );
}
