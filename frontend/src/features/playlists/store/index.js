import produce from "immer";
import { PlaylistsApi } from "../../../api/playlists";

const PLAYLISTS_RECEIVED = "playlists/PLAYLISTS_RECEIVED";
const PLAYLIST_RECEIVED = "playlists/PLAYLIST_RECEIVED";
const TRACK_ADDED_TO_PLAYLIST = "playlists/TRACK_ADDED_TO_PLAYLIST";
const TRACK_REMOVED_FROM_PLAYLIST = "playlists/TRACK_REMOVED_FROM_PLAYLIST";

const playlistsReceived = (playlists) => ({
  type: PLAYLISTS_RECEIVED,
  payload: playlists,
});

const playlistReceived = (playlist) => ({
  type: PLAYLIST_RECEIVED,
  payload: playlist,
});

const trackAddedToPlaylist = ({ id, track }) => ({
  type: TRACK_ADDED_TO_PLAYLIST,
  payload: { id, track },
});

const trackRemovedFromPlaylist = ({ id, trackId }) => ({
  type: TRACK_REMOVED_FROM_PLAYLIST,
  payload: { id, trackId },
});

// TODO: loading and error
export const fetchPlaylistsAsync = () => async (dispatch) => {
  try {
    const response = await PlaylistsApi.fetchUserPlaylists();
    const data = await response.json();
    dispatch(playlistsReceived(data));
  } catch (err) {
    console.error("fetchplaylistsAsync", err);
  }
};

export const addToPlaylistAsync = (playlistId, track) => async (dispatch) => {
  try {
    const response = await PlaylistsApi.addToPlaylist(playlistId, track.id);
    await response.json();
    dispatch(trackAddedToPlaylist({ id: playlistId, track }));
  } catch (err) {
    console.error("addToPlaylistAsync", err);
  }
};

export const removeFromPlaylistAsync =
  (playlistId, trackId) => async (dispatch) => {
    try {
      await PlaylistsApi.removeFromPlaylist(playlistId, trackId);
      dispatch(trackRemovedFromPlaylist({ id: playlistId, trackId }));
    } catch (err) {
      console.error("removeFromPlaylistAsync", err);
    }
  };

export const createNewPlaylistAsync = (playlist) => async (dispatch) => {
  try {
    const response = await PlaylistsApi.createNewPlaylist(playlist);
    const data = await response.json();
    dispatch(playlistReceived(data));
  } catch (err) {
    console.error("createNewPlaylistsAsync", err);
  }
};

const initialState = {
  loaded: false,
  loading: false,
  errors: null,
  entities: {},
  current: {},
};
export const playlistsReducer = produce((state = initialState, action) => {
  switch (action.type) {
    case PLAYLISTS_RECEIVED: {
      state.loaded = true;
      state.loading = false;
      state.errors = null;
      state.entities = action.payload;
      break;
    }
    case PLAYLIST_RECEIVED: {
      state.errors = null;
      state.entities[action.payload.id] = action.payload;
      break;
    }
    case TRACK_ADDED_TO_PLAYLIST: {
      state.entities[action.payload.id].tracks.push(action.payload.track);
      break;
    }
    case TRACK_REMOVED_FROM_PLAYLIST: {
      const index = state.entities[action.payload.id].tracks.findIndex(
        (track) => track.id === action.payload.trackId
      );
      if (index > -1) {
        state.entities[action.payload.id].tracks.splice(index, 1);
      }
      break;
    }
    default:
      return state;
  }
});

export const selectPlaylists = (state) =>
  Object.values(state.playlists?.entities ?? {});

export const selectIsTrackInPlaylist = (state, { playlistId, trackId }) =>
  !!state.playlists?.entities[playlistId].tracks.find(
    (track) => track.id === trackId
  );
