import { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useDropzone } from "react-dropzone";
import slug from "slug";
import { fetchAllGenres, selectGenres } from "../../genres/store";
import {
  selectCurrentTrack,
  selectTracksLoading,
  uploadNewTrack,
} from "../store";
import styles from "./UploadDropzone.module.css";
import { CoverImagePreview } from "./CoverImagePreview";
import { ProgressBar } from "./ProgressBar";
import { selectCurrentUser } from "../../auth/store";
import { Spinner } from "../../../components/Spinner";
import { useRef } from "react";
import { MdContentCopy } from "react-icons/md";
import { wait } from "../../../utils/wait";

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
  const trackLoading = useSelector(selectTracksLoading);

  const [formValues, setFormValues] = useState(initialValues);
  const [title, setTitle] = useState("");
  const [permalink, setPermalink] = useState("");
  const [coverImage, setCoverImage] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [success, setSuccess] = useState(false);
  const [originalFilename, setOriginalFilename] = useState("");

  const [tagInput, setTagInput] = useState("");
  const [tagsDisplay, setTagsDisplay] = useState([]);

  const [showCopyHelper, setShowCopyHelper] = useState(false);

  const onDrop = useCallback((acceptedFiles) => {
    setSuccess(false);
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
    setTagInput("");
    setTagsDisplay([]);
    setSubmitted(false);
    setFormValues(initialValues);
  };

  const addTag = (tagList) => {
    setTagsDisplay(tagList.split(" "));
  };

  const [readyText, setReadyText] = useState("");

  useEffect(() => {
    wait(2000).then(() =>
      setReadyText("Ready. Click Save to post this track.")
    );
  }, []);

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

  const shareLinkRef = useRef(null);

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
                height: "210px",
                display: "grid",
                gridTemplateColumns: "20% 44% 30%",
                gap: 14,
                padding: "25px",
                boxShadow: "0 2px 12px -5px rgb(0 0 0 / 10%)",
              }}
            >
              {!trackLoading ? (
                <>
                  <div
                    style={{
                      boxShadow: "rgba(17, 17, 26, 0.18) 0px 0px 6px 2px",
                      background: uploadedTrack?.cover
                        ? `no-repeat center url(${uploadedTrack.cover})`
                        : "linear-gradient(135deg, rgb(132, 97, 112), rgb(112, 146, 156))",
                      backgroundSize: "cover",
                    }}
                  />
                  <div style={{ padding: "4px" }}>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                      }}
                    >
                      <h4
                        style={{
                          fontSize: "1rem",
                          fontWeight: 600,
                          paddingBottom: "4px",
                        }}
                      >
                        {uploadedTrack?.title}
                      </h4>
                      <p
                        style={{
                          backgroundColor: "var(--primary-orange)",
                          color: "#fff",
                          width: "fit-content",
                          padding: "0 10px",
                          lineHeight: "1.6",
                          fontSize: "13px",
                          borderRadius: "12px",
                          textTransform: "capitalize",
                        }}
                      >
                        {uploadedTrack?.privacy}
                      </p>
                    </div>
                    <p
                      style={{
                        fontSize: "14px",
                        color: "#999",
                        paddingBottom: "8px",
                      }}
                    >
                      {uploadedTrack?.artist}
                    </p>

                    <p
                      style={{
                        fontSize: "14px",
                        color: "#999",
                        marginBottom: "6px",
                      }}
                    >
                      {uploadedTrack?.caption}
                    </p>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "4px",
                        marginBottom: "4px",
                      }}
                    >
                      {uploadedTrack?.tags.slice(0, 4).map((tag) => (
                        <p
                          key={tag.id}
                          style={{
                            backgroundColor: "rgb(153, 153, 153)",
                            color: "#fff",
                            width: "fit-content",
                            padding: "0 10px",
                            lineHeight: "1.6",
                            fontSize: "12px",
                            borderRadius: "12px",
                            textTransform: "capitalize",
                          }}
                        >
                          #{tag.label}
                        </p>
                      ))}
                    </div>
                    <p
                      style={{
                        fontSize: "14px",
                        color: "#333",
                        marginBottom: "24px",
                      }}
                    >
                      Upload complete.
                    </p>
                    <Link
                      to={`/${uploadedTrack?.uploader?.slug}/${uploadedTrack?.permalink}`}
                      style={{ fontSize: "14px", color: "var(--link-blue)" }}
                    >
                      Go to your track
                    </Link>
                  </div>
                </>
              ) : (
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Spinner />
                </div>
              )}
              <div
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                  justifyContent: "center",
                  flexDirection: "column",
                  borderLeft: "1px solid #e2e2e2",
                  paddingLeft: "8px",
                  visibility: uploadedTrack ? "visible" : "hidden",
                }}
              >
                <div>
                  <h4
                    style={{
                      fontSize: "14px",
                      fontWeight: 500,
                      color: "#999",
                      marginBottom: "6px",
                    }}
                  >
                    Share your new track
                  </h4>
                </div>
                <div style={{ position: "relative" }}>
                  <input
                    type="text"
                    ref={shareLinkRef}
                    defaultValue={uploadedTrack?.permalink}
                    disabled
                    style={{
                      color: showCopyHelper ? "#333" : "#999",
                      display: "block",
                      width: "230px",
                      fontSize: "12px",
                      padding: "2px",
                      borderRadius: "4px",
                      border: showCopyHelper
                        ? "2px solid var(--link-blue)"
                        : "2px solid #999",
                    }}
                  />
                  <button
                    style={{
                      position: "absolute",
                      top: 4,
                      right: 2,
                      color: "#999",
                      background: "transparent",
                      zIndex: 2,
                    }}
                    onClick={() => {
                      if (shareLinkRef.current) {
                        const link = shareLinkRef.current;
                        navigator.clipboard.writeText(link.value);
                        setShowCopyHelper(true);
                      }
                    }}
                  >
                    <MdContentCopy />
                  </button>
                </div>
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
            <p>{readyText}</p>
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
