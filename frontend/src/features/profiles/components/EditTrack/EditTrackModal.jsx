import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { MdCameraAlt } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import slug from "slug";
import { Modal } from "../../../../context/Modal";
import {
  fetchGenresAsync,
  selectGenres,
  selectGenresLoaded,
} from "../../../genres/store";
import {
  updateTrackFailed,
  updateTrackInitiate,
  updateTrackSuccess,
} from "../../../tracks/store";
import "../EditModal/EditModal.css";
import { TracksApi } from "../../../../api/tracks";

function fullPermalink(permalink) {
  return `localhost:3000${permalink}`;
}

function generatePermalink(uploader, title) {
  return fullPermalink(`/${uploader}/${slug(title)}`);
}
export function EditTrackModal({ track, onClose }) {
  const [uploader] = track.permalink.split("/").slice(1);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isValid, isSubmitting },
  } = useForm({
    defaultValues: {
      id: track.id,
      title: track.title,
      artist: track.artist,
      permalink: fullPermalink(track.permalink),
      releaseDate: track.releaseDate,
      genre_id: track.genre,
      description: track.description,
      privacy: track.privacy,
      cover: track.cover,
    },
  });
  const dispatch = useDispatch();
  const title = watch("title");
  const previewImage = watch("cover", track.cover);
  const genresLoaded = useSelector(selectGenresLoaded);
  const genres = useSelector(selectGenres);
  const onSubmit = async (data) => {
    if (isValid) {
      const formData = new FormData();

      for (let key of Object.keys(data)) {
        if (key === "cover") {
          if (data?.cover instanceof FileList) {
            formData.set(key, data[key][0], data[key][0].name);
          }
        } else if (key === "permalink") {
          formData.set(key, slug(data.title));
        } else {
          formData.set(key, data[key]);
        }
      }

      dispatch(updateTrackInitiate());
      try {
        const response = await TracksApi.updateOne(formData);
        if (response.ok) {
          const data = await response.json();
          dispatch(updateTrackSuccess(data));
          onClose();
          navigate(data.permalink);
        }
      } catch (ex) {
        dispatch(updateTrackFailed(ex.message));
      }
    }
  };

  useEffect(() => {
    setValue("permalink", generatePermalink(uploader, title));
  }, [setValue, title, uploader]);

  useEffect(() => {
    if (!genresLoaded) {
      dispatch(fetchGenresAsync());
    }
  }, [dispatch, genresLoaded]);

  return (
    <Modal onClose={onClose}>
      <div className="edit-modal-container">
        <header className="edit-modal-header">
          <nav>
            <ul className="edit-modal-tabs">
              <li className="edit-modal-tab selected">Basic info</li>
            </ul>
          </nav>
        </header>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid-form">
            <div
              className="edit-cover"
              style={{
                backgroundSize: "cover",
                backgroundPosition: "center center",
                backgroundImage:
                  typeof previewImage?.[0] === "string"
                    ? `url(${track.cover})`
                    : previewImage?.[0] instanceof Blob
                    ? `url(${URL.createObjectURL(previewImage?.[0])})`
                    : "linear-gradient(135deg, #846170, #70929c)",
              }}
              onLoad={() =>
                previewImage?.[0] instanceof Blob &&
                URL.revokeObjectURL(previewImage?.[0])
              }
            >
              <label htmlFor="cover" role="button" className="cover-trigger">
                <input
                  type="file"
                  id="cover"
                  name="cover"
                  accept="image/*"
                  {...register("cover")}
                />
                <MdCameraAlt />
                {previewImage?.[0] ? "Replace image" : "Upload image"}
              </label>
            </div>
            <div>
              <div className="form-control sm">
                <label htmlFor="title">
                  Title <span className="required">*</span>
                </label>
                <input
                  className={`input-full ${errors.title ? "invalid" : ""}`}
                  type="text"
                  name="title"
                  id="title"
                  placeholder="Name your track"
                  {...register("title", {
                    required: { value: true, message: "Enter a title." },
                  })}
                />
                <span className="input-error-message">
                  {errors?.title?.message}
                </span>
              </div>
              <div className="form-control sm">
                <label htmlFor="artist">
                  Artist <span className="required">*</span>
                </label>
                <input
                  className={`input-full ${errors.artist ? "invalid" : ""}`}
                  type="text"
                  name="artist"
                  id="artist"
                  placeholder="Name the artist"
                  {...register("artist", {
                    required: { value: true, message: "Enter an artist." },
                  })}
                />
                <span className="input-error-message">
                  {errors?.artist?.message}
                </span>
              </div>
              <div className="form-control sm">
                <label htmlFor="permalink">
                  Permalink <span className="required">*</span>
                </label>
                <input
                  className="input-full disabled"
                  type="text"
                  name="permalink"
                  id="permalink"
                  disabled
                  aria-disabled
                  {...register("permalink", { required: true })}
                />
              </div>
              <div className="form-control sm">
                <label htmlFor="release-date">Release date</label>
                <input
                  className="input-sm"
                  type="date"
                  name="releaseDate"
                  id="release-date"
                  {...register("releaseDate")}
                />
              </div>
              <div className="form-control sm">
                <label htmlFor="genre">Genre</label>
                <select
                  id="genre"
                  className="input-sm"
                  {...register("genre_id")}
                >
                  {genres.map((genre) => (
                    <option key={genre.id} value={genre.id}>
                      {genre.label}
                    </option>
                  ))}
                </select>
              </div>
              <div className="form-control sm">
                <label htmlFor="description">Description</label>
                <textarea
                  className="textarea input-full"
                  name="description"
                  id="description"
                  placeholder="Describe your playlist"
                  {...register("description")}
                />
              </div>
              <div className="form-control sm">
                <label htmlFor="privacy">Privacy:</label>
                <div className="input-radio-container">
                  <input
                    className="radio"
                    type="radio"
                    id="public"
                    name="privacy"
                    value="public"
                    {...register("privacy")}
                  />
                  <div>
                    <label htmlFor="public">Public</label>
                    <p className="helper-text">
                      Anyone will be able to listen to this playlist.
                    </p>
                  </div>
                </div>
                <div className="input-radio-container">
                  <input
                    className="radio"
                    type="radio"
                    id="private"
                    name="privacy"
                    value="private"
                    {...register("privacy", { required: true })}
                  />
                  <label htmlFor="private">Private</label>
                </div>
              </div>
            </div>
          </div>
          <div className="form-footer">
            <p className="required-helper-text">
              <span className="required">*</span> Required fields
            </p>
            <div className="form-footer-button-group">
              <button type="button" className="cancel-btn" onClick={onClose}>
                Cancel
              </button>
              <button
                type="submit"
                className="submit-btn"
                disabled={!isValid || isSubmitting}
              >
                Save changes
              </button>
            </div>
          </div>
        </form>
      </div>
    </Modal>
  );
}
