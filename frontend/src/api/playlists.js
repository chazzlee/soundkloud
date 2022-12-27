import { csrfFetch } from "./csrfFetch";

export const PlaylistsApi = {
  fetchUserPlaylists() {
    return csrfFetch("/api/playlists");
  },
  addToPlaylist(playlistId, track) {
    return csrfFetch(`/api/playlists/${playlistId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(track),
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
