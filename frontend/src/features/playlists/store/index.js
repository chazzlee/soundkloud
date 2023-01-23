import produce from "immer";
import { createSelector } from "reselect";
import { PlaylistsApi } from "../../../api/playlists";
import { LOAD_TRACK } from "../../player/store";

const PLAYLISTS_RECEIVED = "playlists/PLAYLISTS_RECEIVED";
const PLAYLIST_RECEIVED = "playlists/PLAYLIST_RECEIVED";
const TRACK_ADDED_TO_PLAYLIST = "playlists/TRACK_ADDED_TO_PLAYLIST";
const TRACK_REMOVED_FROM_PLAYLIST = "playlists/TRACK_REMOVED_FROM_PLAYLIST";
export const START_PLAYLIST = "playlists/playlistStarted";
export const PLAY_NEXT = "playlists/nextPlaying";
const PLAY_PREV = "playlists/prevPlaying";

export const playlistStarted = (playlistId) => ({
  type: START_PLAYLIST,
  payload: playlistId,
});

export const playNext = () => ({
  type: PLAY_NEXT,
});

export const playPrev = () => ({ type: PLAY_PREV });

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
  active: {
    id: null,
    trackIds: [],
    current: 0,
    next: 1,
    prev: null,
  },
};

export const playlistsReducer = produce((state = initialState, action) => {
  switch (action.type) {
    case START_PLAYLIST: {
      state.active.id = action.payload;
      state.active.trackIds = state.entities[action.payload].tracks.map(
        (track) => track.id
      );
      break;
    }
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

    case PLAY_NEXT: {
      if (state.active.current < state.active.trackIds.length - 1) {
        state.active.current = state.active.current + 1;
      } else {
        state.active.current = null;
      }

      if (
        state.active.next !== null &&
        state.active.next < state.active.trackIds.length - 1
      ) {
        state.active.next = state.active.current + 1;
      } else {
        state.active.next = null;
      }

      if (
        state.active.prev !== null &&
        state.active.prev > state.active.trackIds.length - 1
      ) {
        state.active.prev = state.active.current - 1;
      } else if (state.active.current === 0) {
        state.active.prev = null;
      } else {
        state.active.prev = 0;
      }
      break;
    }

    case PLAY_PREV: {
      break;
    }

    case LOAD_TRACK: {
      state.active.id = null;
      state.active.trackIds = [];
      state.active.current = 0;
      state.active.next = 1;
      state.active.prev = null;
      break;
    }
    default:
      return state;
  }
});

export const selectPlaylistsLoaded = (state) => state.playlists.loaded;
export const selectPlaylists = (state) =>
  Object.values(state.playlists?.entities ?? {});

export const selectIsTrackInPlaylist = (state, { playlistId, trackId }) =>
  !!state.playlists?.entities[playlistId].tracks.find(
    (track) => track.id === trackId
  );

export const selectActivePlaylistId = (state) =>
  state.playlists.active.trackIds.length ? state.playlists.active.id : null;

export const selectCurrentPlaylistTrackUrl = createSelector(
  [(state) => state.playlists.entities, (state) => state.playlists.active],
  (playlists, active) =>
    playlists[active?.id]?.tracks.find(
      (track) => track.id === active.trackIds[active?.current]
    )?.upload ?? undefined
);
