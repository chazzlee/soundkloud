import produce from "immer";

export const PLAYER_STATUS = Object.freeze({
  IDLE: "idle",
  LOADED: "loaded",
  PLAYING: "playing",
  PAUSED: "paused",
  SEEKING: "seeking",
  FINISHED: "finished",
});

// ----------------------------
const LOAD_TRACK = "player/trackLoaded";
const PLAY_TRACK = "player/trackPlaying";
const PAUSE_TRACK = "player/trackPaused";
const FINISH_TRACK = "player/trackFinished";
const SEEKING_TRACK = "player/trackSeeking";
const RESUME_TRACK = "player/trackResumed";

export const trackLoaded = (sourceInfo) => ({
  type: LOAD_TRACK,
  payload: sourceInfo,
});

export const trackPlaying = (sourceInfo) => ({
  type: PLAY_TRACK,
  payload: sourceInfo,
});

export const trackPaused = (sourceInfo) => ({
  type: PAUSE_TRACK,
  payload: sourceInfo,
});

export const trackFinished = (sourceInfo) => ({
  type: FINISH_TRACK,
  payload: sourceInfo,
});

export const trackSeeking = (sourceInfo) => ({
  type: SEEKING_TRACK,
  payload: sourceInfo,
});

export const trackResumed = (sourceInfo) => ({
  type: RESUME_TRACK,
  payload: sourceInfo,
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
      state[action.payload.player].status = PLAYER_STATUS.LOADED;
      state[action.payload.player].sourceId = action.payload.id;
      state[action.payload.player].sourceUrl = action.payload.url;
      state[action.payload.player].duration = action.payload.duration;
      state[action.payload.player].progress = 0;
      if (state.global.status !== PLAYER_STATUS.PLAYING) {
        state.global.sourceId = action.payload.id;
        state.global.sourceUrl = action.payload.url;
      }
      break;
    }
    case PLAY_TRACK: {
      state[action.payload.player].status = PLAYER_STATUS.PLAYING;
      if (state.global.sourceId !== state.wave.sourceId) {
        state.global.sourceUrl = state.wave.sourceUrl;
        state.global.duration = state.wave.duration;
        state.global.progress = state.wave.progress;
        state.global.status = PLAYER_STATUS.PLAYING;
      }
      break;
    }
    case PAUSE_TRACK: {
      state[action.payload.player].status = PLAYER_STATUS.PAUSED;
      state.global.status = PLAYER_STATUS.PAUSED;
      break;
    }
    case FINISH_TRACK: {
      state[action.payload.player].status = PLAYER_STATUS.FINISHED;
      break;
    }
    case SEEKING_TRACK: {
      state[action.payload.player].status = PLAYER_STATUS.SEEKING;
      state[action.payload.player].progress = action.payload.progress;
      state.global.status = PLAYER_STATUS.SEEKING;
      state.global.progress = action.payload.progress;
      break;
    }
    case RESUME_TRACK: {
      state[action.payload.player].status = PLAYER_STATUS.PLAYING;
      state.global.status = PLAYER_STATUS.PLAYING;
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

// ----------------------------

// const LOAD_WAVE_TRACK = "player/waveTrackLoaded";
// const LOAD_GLOBAL_TRACK = "player/globalTrackLoaded";
// const CHANGE_WAVE_STATUS = "player/waveStatusChanged";
// const CHANGE_GLOBAL_STATUS = "player/globalStatusChanged";
// const CLEAR_WAVE_TRACK = "player/waveTrackCleared";
// const CLEAR_GLOBAL_TRACK = "player/globalTrackCleared";
// const RECORD_GLOBAL_TIME = "player/globalTimeRecorded";
// const UPDATE_GLOBAL_DURATION = "player/globalDurationUpdated";

// export const waveTrackLoaded = ({ id, url, duration }) => ({
//   type: LOAD_WAVE_TRACK,
//   payload: { id, url, duration },
// });

// export const globalTrackLoaded = ({ id, url, duration }) => ({
//   type: LOAD_GLOBAL_TRACK,
//   payload: { id, url, duration },
// });

// export const waveStatusChanged = (status) => ({
//   type: CHANGE_WAVE_STATUS,
//   payload: status,
// });

// export const globalStatusChanged = (status) => ({
//   type: CHANGE_GLOBAL_STATUS,
//   payload: status,
// });

// export const waveTrackCleared = () => ({ type: CLEAR_WAVE_TRACK });
// export const globalTrackCleared = () => ({ type: CLEAR_GLOBAL_TRACK });

// export const globalTimeUpdated = (timeInSeconds) => ({
//   type: RECORD_GLOBAL_TIME,
//   payload: timeInSeconds,
// });

// export const globalDurationUpdated = (durationInSeconds) => ({
//   type: UPDATE_GLOBAL_DURATION,
//   payload: durationInSeconds,
// });

// // export const selectWaveStatus = (state) => state.player.wave.status;
// export const selectGlobalStatus = (state) => state.player.global.status;
// export const selectGlobalSource = (state) => state.player.global;
// export const selectWaveSource = (state) => state.player.wave;
// export const selectWaveSourceId = (state) => state.player.wave.sourceId;
// export const selectGlobalSourceId = (state) => state.player.global.sourceId;
// export const selectCurrentPlayerSource = (state) => state.player.current;
// export const selectCurrentPlayerStatus = (state) => state.player.current.status;
// export const selectGlobalProgress = (state) =>
//   state.player.global.currentTimeInSeconds / state.player.global.totalDuration;
