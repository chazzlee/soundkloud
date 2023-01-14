import { useState } from "react";
import { useDispatch } from "react-redux";
import { Modal } from "../../../context/Modal";
import { updateProfileAsync } from "../store";
import styles from "./EditTrackModal.module.css";

// TODO: validation
export function EditProfileModal({ onClose, currentUser }) {
  const dispatch = useDispatch();

  const [profileData, setProfileData] = useState({
    displayName: currentUser?.displayName,
    age: currentUser?.age,
    gender: currentUser?.gender,
    location: currentUser?.location || "",
    photo: null,
  });

  const handleChange = (e) => {
    if (e.target.type === "file") {
      setProfileData((prev) => ({
        ...prev,
        [e.target.name]: e.target.files[0],
      }));
    }
    setProfileData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleProfileUpdate = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    const updatedProfile = {
      ...currentUser,
      ...profileData,
    };

    for (let key of Object.keys(updatedProfile)) {
      formData.set(key, updatedProfile[key]);
    }

    dispatch(updateProfileAsync(formData));
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
