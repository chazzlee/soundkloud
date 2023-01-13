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
      [e.target.name]: e.target.value.trim(),
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
      <div>
        <h2>Update profile details</h2>
        <form onSubmit={handleProfileUpdate}>
          <div>
            <label htmlFor="displayName">Display name</label>
            <input
              type="text"
              name="displayName"
              id="displayName"
              value={profileData.displayName}
              onChange={handleChange}
              placeholder="Display name"
            />
          </div>
          <div>
            <label htmlFor="age">Age</label>
            <input
              type="text"
              name="age"
              id="age"
              value={profileData.age}
              onChange={handleChange}
              placeholder="Age"
            />
          </div>
          <div>
            <select
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
          <div>
            <label htmlFor="location">Location</label>
            <input
              type="text"
              name="location"
              id="location"
              value={profileData.location}
              onChange={handleChange}
              placeholder="Location"
            />
          </div>
          <div>
            <input
              type="file"
              name="photo"
              id="photo"
              onChange={handleChange}
            />
          </div>
          <div>
            <button type="submit">Save</button>
          </div>
        </form>
      </div>
    </Modal>
  );
}
