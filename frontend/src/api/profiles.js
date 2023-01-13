import { csrfFetch } from "./csrfFetch";

export const ProfilesApi = {
  update(profile) {
    return csrfFetch(`/api/profiles/${profile.get("id")}`, {
      method: "PUT",
      body: profile,
    });
  },
};
