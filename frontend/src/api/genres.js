import { csrfFetch } from "./csrfFetch";

export const GenresApi = {
  fetchAll() {
    return csrfFetch("/api/genres");
  },
};
