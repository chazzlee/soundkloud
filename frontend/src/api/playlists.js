import { csrfFetch } from "./csrfFetch";

export const PlaylistsApi = {
  fetchAll() {
    return csrfFetch("/api/playlists");
  },
  fetchUserPlaylists() {
    // FIXME:
    return csrfFetch("/api/playlists");
  },
  destroy(playlistId) {
    return csrfFetch(`/api/playlists/${playlistId}`, { method: "DELETE" });
  },
  addToPlaylist(playlistId, trackId) {
    return csrfFetch(`/api/playlists/${playlistId}/playlist_tracks`, {
      method: "POST",
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
  updatePlaylist(playlist) {
    return csrfFetch(`/api/playlists/${playlist.get("id")}`, {
      method: "PUT",
      body: playlist,
    });
  },
};
