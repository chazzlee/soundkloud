import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import slug from "slug";
import { Modal } from "../../../context/Modal";
import { selectCurrentUser } from "../../auth/store";
import {
  fetchAllGenresAsync,
  selectGenres,
  selectGenresLoaded,
} from "../../genres/store";
import { CoverImagePreview } from "../../tracks/components/CoverImagePreview";
import { updateTrackAsync } from "../../tracks/store";
import styles from "./EditTrackModal.module.css";

export function EditTrackModal({ track, onClose, onSuccess }) {
  const dispatch = useDispatch();
  const currentUser = useSelector(selectCurrentUser);
  const genresLoaded = useSelector(selectGenresLoaded);
  const genres = useSelector(selectGenres);
  const trackGenre = genres.find((genre) => genre.label === track.genre);

  const [coverImage, setCoverImage] = useState(track.cover ?? null);
  const [title, setTitle] = useState(track.title || "");
  const [permalink, setPermalink] = useState(track.permalink || "");
  const [tagInput, setTagInput] = useState("");
  const [tagsDisplay, setTagsDisplay] = useState([]);
  const [submitted, setSubmitted] = useState(false);
  // const [errors, setErrors] = useState({ title: "", artist: "" });

  const [formValues, setFormValues] = useState({
    playlist: false,
    artist: track.artist || "",
    genre_id: trackGenre.id || "",
    description: track.artist || "",
    caption: track.caption || "",
    privacy: track.privacy || "public",
  });

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
    setTagInput("");
    setTagsDisplay([]);
    setSubmitted(false);
    setFormValues({
      playlist: false,
      artist: "",
      genre_id: "",
      description: "",
      caption: "",
      privacy: "public",
    });
  };

  const handleCancel = () => {
    resetForm();
    onClose();
  };

  const addTag = (tagList) => {
    setTagsDisplay(tagList.split(" "));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formValues.artist || !title) {
      // setErrors({
      //   title: "Title is required",
      //   artist: "Artist is required",
      // });
      return;
    }

    setSubmitted(true);
    const formData = new FormData();
    formData.set("id", track.id);
    formData.set("uploader", track.uploader.id);
    formData.set("title", title.trim());
    formData.set("artist", formValues.artist.trim());
    formData.set("permalink", permalink.trim());
    formData.set("description", formValues.description.trim());
    formData.set("caption", formValues.caption.trim());
    formData.set("privacy", formValues.privacy.trim());
    formData.set("genre_id", parseInt(formValues.genre_id, 10));
    formData.set("tags", JSON.stringify(tagsDisplay));
    coverImage && formData.set("cover", coverImage, coverImage.name);

    dispatch(updateTrackAsync(formData));
    resetForm();
    onSuccess();
  };

  useEffect(() => {
    if (!genresLoaded) {
      dispatch(fetchAllGenresAsync());
    }
  }, [dispatch, genresLoaded]);

  useEffect(() => {
    setPermalink(slug(title));
  }, [title]);

  return (
    <Modal onClose={onClose} className={styles.large}>
      <div className={styles.modalForm}>
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
                      process.env.NODE_ENV === "development"
                        ? `http://localhost:3000/${currentUser.slug}/${permalink}`
                        : `https://soundkloud-rails.onrender.com/${currentUser.slug}/${permalink}`
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
                    placeholder="Add tags to describe the genre and mood of your track"
                    value={tagInput}
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
                      checked={formValues.privacy === "public"}
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
                      checked={formValues.privacy === "private"}
                    />
                    <label className={styles.label} htmlFor="private">
                      Private
                    </label>
                  </div>
                </div>
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
                      Save changes
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
}
