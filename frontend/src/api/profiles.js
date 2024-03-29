import { csrfFetch } from "./csrfFetch";

export const ProfilesApi = {
  fetchAll() {
    return csrfFetch("/api/profiles");
  },
  update(profile) {
    return csrfFetch(`/api/profiles/${profile.get("id")}`, {
      method: "PUT",
      body: profile,
    });
  },
  updateHeaderCover(profileId, cover) {
    return csrfFetch(`/api/profiles/${profileId}/cover`, {
      method: "PATCH",
      body: cover,
    });
  },
};
