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
  updateOne(track) {
    return csrfFetch(
      `/api/users/${track.get("uploader")}/tracks/${track.get("id")}`,
      {
        method: "PUT",
        body: track,
      }
    );
  },
  destroyOne(trackId) {
    return csrfFetch(`/api/tracks/${trackId}`, { method: "DELETE" });
  },
  search(query) {
    return csrfFetch(`/api/searches?query=${query}`);
  },
};
