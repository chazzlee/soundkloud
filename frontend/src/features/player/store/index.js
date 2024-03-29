import produce from "immer";
import { createSelector } from "reselect";
import {
  PLAYLIST_FINISHED,
  PLAY_NEXT,
  PLAY_PREV,
  PLAY_SELECTED,
  START_PLAYLIST,
} from "../../playlists/store";
import { DESTROY_TRACK_SUCCESS } from "../../tracks/store";

export const WAVE_PLAYER = "wave";
export const GLOBAL_PLAYER = "global";

export const PLAYER_STATUS = Object.freeze({
  IDLE: "idle",
  LOADED: "loaded",
  PLAYING: "playing",
  PAUSED: "paused",
  SEEKED: "seeked",
});

const CLEAR_TRACK = "player/trackCleared";
export const LOAD_TRACK = "player/trackLoaded";
export const PLAY_TRACK = "player/trackPlaying";
const PAUSE_TRACK = "player/trackPaused";
const SEEK_TRACK = "player/trackSeeked";
const UPDATE_PROGRESS = "player/progressUpdating";
const UPDATE_DURATION = "player/durationUpdated";

// FROM PROFILE
const LOAD_TRACK_FROM_PROFILE = "player/trackLoadedFromProfile";
const PLAY_TRACK_FROM_PROFILE = "player/trackPlayingFromProfile";
const PAUSE_TRACK_FROM_PROFILE = "player/trackPausedFromProfile";

export const trackPlayingFromProfile = (sourceInfo) => ({
  type: PLAY_TRACK_FROM_PROFILE,
  payload: sourceInfo,
});

export const trackPausedFromProfile = () => ({
  type: PAUSE_TRACK_FROM_PROFILE,
});

export const trackCleared = () => ({
  type: CLEAR_TRACK,
});

export const trackLoaded = (sourceInfo) => ({
  type: LOAD_TRACK,
  payload: sourceInfo,
});

export const trackPlaying = (trackId) => ({
  type: PLAY_TRACK,
  payload: trackId,
});

export const trackPaused = () => ({
  type: PAUSE_TRACK,
});

export const trackSeeked = (currentTime) => ({
  type: SEEK_TRACK,
  payload: currentTime,
});

export const progressUpdating = (progress) => ({
  type: UPDATE_PROGRESS,
  payload: progress,
});

export const updateDuration = (duration) => ({
  type: UPDATE_DURATION,
  payload: duration,
});

const initialState = {
  wave: {
    status: PLAYER_STATUS.IDLE,
    sourceId: null,
    sourceUrl: "",
    duration: 0,
    progress: 0,
  },
  global: {
    status: PLAYER_STATUS.IDLE,
    sourceId: null,
    sourceUrl: "",
    duration: 0,
    progress: 0,
  },
};

export const playerReducer = produce((state = initialState, action) => {
  switch (action.type) {
    case CLEAR_TRACK: {
      state.wave.status = PLAYER_STATUS.IDLE;
      state.wave.sourceId = null;
      state.wave.sourceUrl = "";
      state.wave.duration = 0;
      state.wave.progress = 0;
      break;
    }
    case LOAD_TRACK: {
      state.wave.sourceId = action.payload.id;
      state.wave.sourceUrl = action.payload.url;
      if (
        state.wave.status !== PLAYER_STATUS.IDLE &&
        state.wave.duration >= 0
      ) {
        state.wave.duration = action.payload.duration;
        state.global.duration = action.payload.duration;
      }

      if (
        state.global.status === PLAYER_STATUS.PLAYING &&
        state.global.sourceId === action.payload.id
      ) {
        state.wave.status = PLAYER_STATUS.PLAYING;
      } else {
        state.wave.status = PLAYER_STATUS.LOADED;
      }

      if (
        state.global.status !== PLAYER_STATUS.PLAYING &&
        state.global.status !== PLAYER_STATUS.PAUSED
      ) {
        state.global.status = PLAYER_STATUS.LOADED;
        state.global.sourceId = action.payload.id;
        state.global.sourceUrl = action.payload.url;
      }

      if (action.payload.duration === null) {
        state.global.status = PLAYER_STATUS.PLAYING;
        state.global.sourceId = action.payload.id;
        state.global.sourceUrl = action.payload.url;
      }
      break;
    }
    case PLAY_TRACK: {
      if (state.wave.sourceId === state.global.sourceId) {
        state.wave.status = PLAYER_STATUS.PLAYING;
      }
      if (
        state.wave.sourceId &&
        state.wave.sourceId !== state.global.sourceId
      ) {
        state.global.sourceId = state.wave.sourceId;
        state.global.sourceUrl = state.wave.sourceUrl;
        state.global.duration = state.wave.duration;
        state.global.progress = 0;
      }
      state.global.status = PLAYER_STATUS.PLAYING;
      break;
    }
    case PAUSE_TRACK: {
      state.wave.status = PLAYER_STATUS.PAUSED;
      state.global.status = PLAYER_STATUS.PAUSED;
      break;
    }
    case SEEK_TRACK: {
      state.global.progress = action.payload / state.global.duration;
      break;
    }
    case UPDATE_PROGRESS: {
      state.global.progress = action.payload;
      break;
    }
    case UPDATE_DURATION: {
      state.global.duration = action.payload;
      state.wave.duration = action.payload;
      break;
    }

    // FROM PROFILE
    case PLAY_TRACK_FROM_PROFILE: {
      state.global.status = PLAYER_STATUS.PLAYING;
      state.global.sourceId = action.payload.id;
      state.global.sourceUrl = action.payload.upload;
      state.global.duration = action.payload.duration;
      state.global.progress = 0;
      break;
    }

    case PAUSE_TRACK_FROM_PROFILE: {
      state.global.status = PLAYER_STATUS.PAUSED;
      break;
    }

    // PLAYLIST
    case START_PLAYLIST: {
      state.wave.status = PLAYER_STATUS.PLAYING;
      state.wave.sourceId = action.payload.tracks[0].id;
      state.wave.sourceUrl = action.payload.tracks[0].upload;
      state.wave.progress = 0;

      state.global.status = PLAYER_STATUS.PLAYING;
      state.global.sourceId = action.payload.tracks[0].id;
      state.global.sourceUrl = action.payload.tracks[0].upload;
      state.global.progress = 0;

      // state.wave.sourceId = null;
      // state.wave.sourceUrl = "";
      // state.wave.duration = 0;
      // state.wave.progress = 0;
      // state.global.duration = 0;
      break;
    }

    case PLAY_NEXT: {
      state.global.status = PLAYER_STATUS.PLAYING;
      state.global.sourceId = action.payload.id;
      state.global.sourceUrl = action.payload.upload;
      state.global.duration = 0;
      state.global.progress = 0;
      if (state.wave.sourceId !== state.global.sourceId) {
        state.wave.status = PLAYER_STATUS.PAUSED;
      }
      break;
    }
    case PLAY_PREV: {
      state.global.status = PLAYER_STATUS.PLAYING;
      state.global.sourceId = action.payload.id;
      state.global.sourceUrl = action.payload.upload;
      state.global.duration = 0;
      state.global.progress = 0;
      if (state.wave.sourceId !== state.global.sourceId) {
        state.wave.status = PLAYER_STATUS.PAUSED;
      }
      break;
    }
    case PLAY_SELECTED: {
      state.global.status = PLAYER_STATUS.PLAYING;
      state.global.sourceId = action.payload.selectedTrack.id;
      state.global.sourceUrl = action.payload.selectedTrack.upload;
      state.global.duration = 0;
      state.global.progress = 0;
      if (state.wave.sourceId !== state.global.sourceId) {
        state.wave.status = PLAYER_STATUS.PAUSED;
      }
      break;
    }
    case PLAYLIST_FINISHED: {
      state.global.status = PLAYER_STATUS.PAUSED;
      state.global.duration = 0;
      state.global.progress = 0;
      break;
    }

    // Tracks
    case DESTROY_TRACK_SUCCESS: {
      if (state.global.sourceId === action.payload) {
        state.global.status = PLAYER_STATUS.IDLE;
        state.global.sourceId = null;
        state.global.sourceUrl = null;
        state.global.duration = 0;
        state.global.progress = 0;
      }
      break;
    }

    default:
      return state;
  }
});

export const selectPlayerStatus = (state, player) =>
  state.player[player].status;
export const selectPlayerProgress = (state, player) =>
  state.player[player].progress;
export const selectPlayerSource = (state, player) =>
  state.player[player].sourceUrl;
export const selectPlayerSourceId = (state, player) =>
  state.player[player].sourceId;

export const selectCurrentlyPlaying = createSelector(
  [(state) => state.tracks, (state) => state.player.global.sourceId],
  (tracks, sourceId) => {
    if (
      Object.keys(tracks.entities).length === 0 &&
      tracks.current?.id === sourceId
    ) {
      return tracks.current;
    }

    return tracks.entities[sourceId] ?? null;
  }
);
