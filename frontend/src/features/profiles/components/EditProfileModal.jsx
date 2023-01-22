import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ProfilesApi } from "../../../api/profiles";
import { Modal } from "../../../context/Modal";
import {
  profileUpdated,
  profileUpdateFailed,
  selectProfileErrors,
} from "../store";
import styles from "./EditTrackModal.module.css";

export function EditProfileModal({ onClose, currentUser }) {
  const dispatch = useDispatch();

  const [profileData, setProfileData] = useState({
    displayName: currentUser?.displayName,
    age: currentUser?.age,
    gender: currentUser?.gender,
    location: currentUser?.location || "",
  });

  const [photo, setPhoto] = useState(null);

  const profileErrors = useSelector(selectProfileErrors);

  const handleChange = (e) => {
    if (e.target.type === "file") {
      setPhoto(e.target.files[0]);
    } else {
      setProfileData((prev) => ({
        ...prev,
        [e.target.name]: e.target.value,
      }));
    }
  };

  const handleProfileUpdate = (e) => {
    e.preventDefault();
    const formData = new FormData();
    const updatedProfile = {
      ...currentUser,
      ...profileData,
    };

    for (let key of Object.keys(updatedProfile)) {
      if (key !== "photo") {
        formData.set(key, updatedProfile[key]);
      }
    }

    if (photo && photo instanceof Blob) {
      formData.set("photo", photo, photo.name);
    }

    ProfilesApi.update(formData)
      .then(async (response) => {
        if (response.ok) {
          const data = await response.json();
          dispatch(profileUpdated(data.user));
          onClose();
        }
      })
      .catch((error) => dispatch(profileUpdateFailed(error)));
  };

  return (
    <Modal onClose={onClose}>
      <div style={{ padding: 12 }}>
        <h2 style={{ fontSize: 22, fontWeight: 500, marginTop: 12 }}>
          Update profile details
        </h2>
        <form onSubmit={handleProfileUpdate} style={{ padding: "16px 0" }}>
          <div className={styles.formControl}>
            <label htmlFor="displayName" className={styles.label}>
              Display name
            </label>
            <input
              className={styles.formInput}
              type="text"
              name="displayName"
              id="displayName"
              value={profileData.displayName}
              onChange={handleChange}
              placeholder="Display name"
              autoFocus
            />
          </div>
          <div className={styles.formControl}>
            <label htmlFor="age" className={styles.label}>
              Age
            </label>
            <input
              className={styles.formInput}
              type="text"
              name="age"
              id="age"
              value={profileData.age}
              onChange={handleChange}
              placeholder="Age"
            />
          </div>
          <div className={styles.formControl}>
            <label htmlFor="gender" className={styles.label}>
              Gender
            </label>
            <select
              className={styles.formSelect}
              style={{ fontSize: 13 }}
              name="gender"
              id="gender"
              value={profileData.gender}
              onChange={handleChange}
            >
              <option value="">Select gender</option>
              <option value="female">Female</option>
              <option value="male">Male</option>
              <option value="custom">Custom</option>
              <option value="none">Prefer not to say</option>
            </select>
          </div>
          <div className={styles.formControl}>
            <label htmlFor="location" className={styles.label}>
              Location
            </label>
            <input
              className={styles.formInput}
              type="text"
              name="location"
              id="location"
              value={profileData.location}
              onChange={handleChange}
              placeholder="Location"
            />
          </div>
          <div style={{ marginBottom: 12 }}>
            <input
              style={{ fontSize: 13 }}
              type="file"
              name="photo"
              id="photo"
              accept="image/*"
              onChange={handleChange}
            />
          </div>
          <div
            style={{
              fontSize: 12,
              color: "var(--error-red)",
              textAlign: "center",
            }}
          >
            {profileErrors?.map((error, index) => (
              <p key={index}>{error}</p>
            ))}
          </div>
          <div style={{ display: "flex", justifyContent: "flex-end", gap: 10 }}>
            <button
              type="button"
              onClick={onClose}
              className={styles.btn}
              style={{ background: "#999", borderColor: "#999" }}
            >
              Cancel
            </button>
            <button type="submit" className={styles.btn}>
              Save
            </button>
          </div>
        </form>
      </div>
    </Modal>
  );
}
