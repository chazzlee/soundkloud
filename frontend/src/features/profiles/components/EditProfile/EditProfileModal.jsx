import { useForm } from "react-hook-form";
import { MdCameraAlt } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ProfilesApi } from "../../../../api/profiles";
import { Modal } from "../../../../context/Modal";
import { profileUpdatedSuccess, profileUpdateFailed } from "../../store";
import "../EditModal/EditModal.css";

// TODO: use getValue instead of watch? (useForm)
export function EditProfileModal({ onClose, profile }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isValid },
  } = useForm({
    defaultValues: {
      id: profile.id,
      displayName: profile.displayName,
      age: profile.age,
      gender: profile.gender,
      location: profile.location || "United States",
      photo: profile.photo,
    },
  });

  const previewImage = watch("photo", profile.photo);

  const onSubmit = async (data) => {
    const formData = new FormData();
    for (let key of Object.keys(data)) {
      if (key === "photo") {
        if (data?.photo instanceof FileList) {
          formData.set(key, data[key][0], data[key][0].name);
        } else {
          formData.delete("photo");
        }
      } else {
        formData.set(key, data[key]);
      }
    }

    try {
      const response = await ProfilesApi.update(formData);
      if (response.ok) {
        const data = await response.json();
        dispatch(profileUpdatedSuccess(data.user));
        onClose();
        navigate(`/${data.user.slug}`);
      }
    } catch (ex) {
      dispatch(profileUpdateFailed(ex.message));
    }
  };

  return (
    <Modal onClose={onClose}>
      <div className="edit-modal-container">
        <header className="edit-modal-header">
          <nav>
            <ul className="edit-modal-tabs">
              <li className="edit-modal-tab">Edit your Profile</li>
            </ul>
          </nav>
        </header>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid-form">
            <div
              className="edit-cover"
              style={{
                borderRadius: "100%",
                backgroundSize: "cover",
                backgroundPosition: "center center",
                backgroundImage:
                  typeof previewImage?.[0] === "string"
                    ? `url(${profile.photo})`
                    : previewImage?.[0] instanceof Blob
                    ? `url(${URL.createObjectURL(previewImage?.[0])})`
                    : "linear-gradient(135deg, #846170, #70929c)",
              }}
              onLoad={() =>
                previewImage?.[0] instanceof Blob &&
                URL.revokeObjectURL(previewImage?.[0])
              }
            >
              <label htmlFor="photo" role="button" className="cover-trigger">
                <input
                  type="file"
                  id="photo"
                  name="photo"
                  accept="image/*"
                  {...register("photo")}
                />
                <MdCameraAlt />
                {previewImage?.[0] ? "Replace image" : "Upload image"}
              </label>
            </div>
            <div>
              <div className="form-control sm">
                <label htmlFor="displayName">
                  Display name <span className="required">*</span>
                </label>
                <input
                  className={`input-sm ${errors?.displayName ? "invalid" : ""}`}
                  type="text"
                  name="displayName"
                  id="displayName"
                  placeholder="Name your playlist"
                  {...register("displayName", {
                    required: { value: true, message: "Enter a display name." },
                  })}
                />
                <span className="input-error-message">
                  {errors?.displayName?.message}
                </span>
              </div>
              <div className="form-control sm">
                <label htmlFor="age">Age</label>
                <input
                  className="input-sm"
                  type="text"
                  name="age"
                  id="age"
                  {...register("age")}
                />
              </div>
              <div className="form-control sm">
                <label htmlFor="gender">Gender</label>
                <select
                  name="gender"
                  id="gender"
                  className="input-sm"
                  {...register("gender")}
                >
                  <option value="female">Female</option>
                  <option value="male">Male</option>
                  <option value="custom">Custom</option>
                  <option value="none">Prefer not to say</option>
                </select>
              </div>
              <div className="form-control sm">
                <label htmlFor="location">Location</label>
                <input
                  className="input-sm"
                  type="text"
                  name="location"
                  id="location"
                  {...register("location")}
                />
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
              <button type="submit" className="submit-btn" disabled={!isValid}>
                Save changes
              </button>
            </div>
          </div>
        </form>
      </div>
    </Modal>
  );
}
