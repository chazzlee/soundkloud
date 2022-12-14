import { csrfFetch } from "./csrfFetch";

export const TracksApi = {
  fetchAllByUser(userId) {
    return csrfFetch(`/api/users/${userId}/tracks`);
  },
  fetchOneByUser(profileId, trackId) {
    return csrfFetch(`/api/profiles/${profileId}/tracks/${trackId}`);
  },
  fetchDiscover() {
    return csrfFetch("/api/discover");
  },
  uploadOne(track) {
    return csrfFetch("/api/tracks", {
      method: "POST",
      body: track,
    });
  },
};
