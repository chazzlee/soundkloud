import produce from "immer";
import { PlaylistsApi } from "../../../api/playlists";

const PLAYLISTS_RECEIVED = "playlists/PLAYLISTS_RECEIVED";
const PLAYLIST_RECEIVED = "playlists/PLAYLIST_RECEIVED";
const TRACK_ADDED_TO_PLAYLIST = "playlists/TRACK_ADDED_TO_PLAYLIST";

const playlistsReceived = (playlists) => ({
  type: PLAYLISTS_RECEIVED,
  payload: playlists,
});

const playlistReceived = (playlist) => ({
  type: PLAYLIST_RECEIVED,
  payload: playlist,
});

const trackAddedToPlaylist = ({ playlist, track }) => ({
  type: TRACK_ADDED_TO_PLAYLIST,
  payload: { playlist, track },
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
    const response = await PlaylistsApi.addToPlaylist(playlistId, track);
    const data = await response.json();
    // TODO:!
    dispatch(
      trackAddedToPlaylist({ playlist: data.playlist, track: data.track })
    );
  } catch (err) {
    console.error("addToPlaylistAsync", err);
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
      // TODO:
      break;
    }
    default:
      return state;
  }
});

export const selectPlaylists = (state) =>
  Object.values(state.playlists?.entities ?? {});
