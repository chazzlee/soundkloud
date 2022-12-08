import { csrfFetch } from "./csrfFetch";

export const TracksApi = {
  fetchAll() {
    return csrfFetch("/api/tracks");
  },
};
