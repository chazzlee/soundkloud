import { csrfFetch } from "./csrfFetch";

export const PlaylistsApi = {
  fetchUserPlaylists() {
    return csrfFetch("/api/playlists");
  },
  addToPlaylist(playlistId, trackId) {
    return csrfFetch(`/api/playlists/${playlistId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ track: trackId }),
    });
  },
  createNewPlaylist(playlist) {
    return csrfFetch("/api/playlists", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(playlist),
    });
  },
};
