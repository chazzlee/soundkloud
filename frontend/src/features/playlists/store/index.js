import produce from "immer";
import { createSelector } from "reselect";
import { PlaylistsApi } from "../../../api/playlists";
import { PLAY_TRACK } from "../../player/store";

const CLEAR_PLAYLIST = "playlists/playlistCleared";
const PLAYLISTS_RECEIVED = "playlists/PLAYLISTS_RECEIVED";
const PLAYLIST_RECEIVED = "playlists/PLAYLIST_RECEIVED";
const TRACK_ADDED_TO_PLAYLIST = "playlists/TRACK_ADDED_TO_PLAYLIST";
const TRACK_REMOVED_FROM_PLAYLIST = "playlists/TRACK_REMOVED_FROM_PLAYLIST";
export const START_PLAYLIST = "playlists/playlistStarted";
export const PLAY_NEXT = "playlists/nextPlaying";
export const PLAY_PREV = "playlists/prevPlaying";
export const PLAYLIST_FINISHED = "playlists/playlistFinished";
export const PLAY_SELECTED = "playlists/selectedTrackPlaying";

export const playSelected = ({ index, selectedTrack, playlistId }) => ({
  type: PLAY_SELECTED,
  payload: { index, selectedTrack, playlistId },
});

export const playlistStarted = (playlist) => ({
  type: START_PLAYLIST,
  payload: playlist,
});

export const playNext = (nextTrack) => ({
  type: PLAY_NEXT,
  payload: nextTrack,
});

export const playPrev = (previousTrack) => ({
  type: PLAY_PREV,
  payload: previousTrack,
});

export const playlistFinished = () => ({ type: PLAYLIST_FINISHED });
export const playlistCleared = () => ({ type: CLEAR_PLAYLIST });

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

export const playNextTrack = () => (dispatch, getState) => {
  const state = getState();
  const activePlaylist = state.playlists.entities[state.playlists.active.id];
  const nextTrack = activePlaylist.tracks[state.playlists.active.next];

  dispatch(playNext(nextTrack));
};

export const playPreviousTrack = () => (dispatch, getState) => {
  const state = getState();
  const activePlaylist = state.playlists.entities[state.playlists.active.id];
  const previousTrack = activePlaylist.tracks[state.playlists.active.prev];

  dispatch(playPrev(previousTrack));
};

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
    return data;
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
    current: null,
    next: null,
    prev: null,
  },
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

    case START_PLAYLIST: {
      state.active.id = action.payload.id;
      state.active.current = 0;
      state.active.next = action.payload.tracks.length > 1 ? 1 : null;
      state.active.trackIds = state.entities[action.payload.id].tracks.map(
        (track) => track.id
      );
      break;
    }

    case PLAY_NEXT: {
      if (state.active.current >= 0) {
        state.active.current = state.active.next;
        state.active.next =
          state.active.current < state.active.trackIds.length - 1
            ? state.active.current + 1
            : null;
        state.active.prev =
          state.active.current >= 1 ? state.active.current - 1 : null;
      }
      break;
    }

    case PLAY_PREV: {
      if (state.active.current > 0) {
        state.active.current = state.active.current - 1;
        state.active.prev =
          state.active.current > 0 ? state.active.current - 1 : null;
        state.active.next = state.active.current + 1;
      }
      break;
    }

    case PLAY_SELECTED: {
      if (!state.active.id) {
        state.active.id = action.payload.playlistId;
        state.active.trackIds = Object.keys(
          state.entities[action.payload.playlistId].tracks
        ).map((id) => +id);
      }

      state.active.current = action.payload.index;
      state.active.next =
        state.active.current < state.active.trackIds.length - 1
          ? state.active.current + 1
          : null;
      state.active.prev =
        state.active.current >= 1 ? state.active.current - 1 : null;
      break;
    }

    case PLAYLIST_FINISHED: {
      state.active.current = null;
      state.active.next = null;
      state.active.prev = null;
      break;
    }
    case CLEAR_PLAYLIST: {
      state.active.id = null;
      state.active.trackIds = [];
      state.active.current = null;
      state.active.next = null;
      state.active.prev = null;
      break;
    }

    // TRACKS
    case PLAY_TRACK: {
      const currentlyPlaying = state.active.trackIds.findIndex(
        (id) => id === action.payload
      );
      if (currentlyPlaying >= 0) {
        state.active.current = currentlyPlaying;
        state.active.next =
          state.active.current < state.active.trackIds.length - 1
            ? state.active.current + 1
            : null;
        state.active.prev =
          state.active.current > 0 ? state.active.current - 1 : null;
      } else {
        state.active.current = null;
      }

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

export const selectPlaylistById = (state, playlistId) =>
  state.playlists.entities[playlistId];

export const selectPlaylistBySlug = (state, playlistSlug) =>
  Object.values(state.playlists.entities).find(
    (playlist) => playlist.slug === playlistSlug
  );

export const selectActivePlaylist = (state) => state.playlists.active;
export const selectActivePlaylistCurrentIndex = (state) =>
  state.playlists.active.current;

export const selectCurrentPlaylistTrack = createSelector(
  [(state) => state.playlists.entities, (state) => state.playlists.active],
  (playlists, active) =>
    playlists[active?.id]?.tracks.find(
      (track) => track.id === active.trackIds[active?.current]
    ) ?? undefined
);

export const selectCurrentPlaylistTrackUrl = createSelector(
  [(state) => state.playlists.entities, (state) => state.playlists.active],
  (playlists, active) =>
    playlists[active?.id]?.tracks.find(
      (track) => track.id === active.trackIds[active?.current]
    )?.upload ?? undefined
);
