import { csrfFetch } from "./csrfFetch";

export const TracksApi = {
  fetchAll() {
    return csrfFetch("/api/tracks");
  },
  fetchOne(profileId, trackId) {
    return csrfFetch(`/api/profiles/${profileId}/tracks/${trackId}`);
  },
  uploadOne(track) {
    return csrfFetch("/api/tracks", {
      method: "POST",
      body: track,
    });
  },
};
