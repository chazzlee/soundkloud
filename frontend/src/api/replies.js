import { csrfFetch } from "./csrfFetch";

export const RepliesApi = {
  fetchByTrack(trackId) {
    return csrfFetch(`/api/tracks/${trackId}/replies`);
  },
  replyToTrack(trackId, reply) {
    return csrfFetch(`/api/tracks/${trackId}/replies`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ reply }),
    });
  },
  destroy(replyId) {
    return csrfFetch(`/api/replies/${replyId}`, { method: "DELETE" });
  },
};
