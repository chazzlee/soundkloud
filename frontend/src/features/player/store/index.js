import produce from "immer";
import { createSelector } from "reselect";

export const WAVE_PLAYER = "wave";
export const GLOBAL_PLAYER = "global";

export const PLAYER_STATUS = Object.freeze({
  IDLE: "idle",
  LOADED: "loaded",
  PLAYING: "playing",
  PAUSED: "paused",
  SEEKED: "seeked",
});

const LOAD_TRACK = "player/trackLoaded";
const PLAY_TRACK = "player/trackPlaying";
const PAUSE_TRACK = "player/trackPaused";
const SEEK_TRACK = "player/trackSeeked";
const UPDATE_PROGRESS = "player/progressUpdating";

export const trackLoaded = (sourceInfo) => ({
  type: LOAD_TRACK,
  payload: sourceInfo,
});

export const trackPlaying = () => ({
  type: PLAY_TRACK,
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
    case LOAD_TRACK: {
      state.wave.sourceId = action.payload.id;
      state.wave.sourceUrl = action.payload.url;
      state.wave.duration = action.payload.duration;

      if (
        state.global.status !== PLAYER_STATUS.PLAYING &&
        state.global.status !== PLAYER_STATUS.PAUSED
      ) {
        state.global.status = PLAYER_STATUS.LOADED;
        state.global.sourceId = action.payload.id;
        state.global.sourceUrl = action.payload.url;
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
      break;
    }
    case PLAY_TRACK: {
      if (state.wave.sourceId !== state.global.sourceId) {
        state.global.sourceId = state.wave.sourceId;
        state.global.sourceUrl = state.wave.sourceUrl;
        state.global.duration = state.wave.duration;
        state.global.progress = 0;
      }
      state.wave.status = PLAYER_STATUS.PLAYING;
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
