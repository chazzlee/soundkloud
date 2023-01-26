import { csrfFetch } from "./csrfFetch";

export const PlaylistsApi = {
  fetchAll() {
    return csrfFetch("/api/playlists");
  },
  fetchUserPlaylists() {
    // FIXME:
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
  removeFromPlaylist(playlistId, trackId) {
    return csrfFetch(
      `/api/playlists/${playlistId}/playlist_tracks/${trackId}`,
      {
        method: "DELETE",
      }
    );
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
