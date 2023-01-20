import produce from "immer";

export const PLAYER_STATUS = Object.freeze({
  IDLE: "idle",
  LOADED: "loaded",
  PLAYING: "playing",
  PAUSED: "paused",
  SEEKING: "seeking",
  FINISHED: "finished",
});

const UPDATE_STATUS = "player/statusUpdated";
const LOAD_TRACK = "player/trackLoaded";
const PLAY_TRACK = "player/trackPlaying";
const PAUSE_TRACK = "player/trackPaused";
const FINISH_TRACK = "player/trackFinished";
const SEEKING_TRACK = "player/trackSeeking";
const RESUME_TRACK = "player/trackResumed";

export const statusUpdated = ({ status }) => ({
  type: UPDATE_STATUS,
  payload: { status },
});

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

const GLOBAL_PLAYER = "global";
const WAVE_PLAYER = "wave";
export const playerReducer = produce((state = initialState, action) => {
  switch (action.type) {
    case UPDATE_STATUS: {
      state.global.status = action.payload.status;
      state.wave.status = action.payload.status;
      break;
    }
    case LOAD_TRACK: {
      state.wave.status = PLAYER_STATUS.LOADED;
      state.wave.sourceId = action.payload.id;
      state.wave.sourceUrl = action.payload.url;
      state.wave.duration = action.payload.duration;

      if (state.global.status !== PLAYER_STATUS.PLAYING) {
        state.global.status = PLAYER_STATUS.LOADED;
        state.global.sourceId = action.payload.id;
        state.global.sourceUrl = action.payload.url;
        state.global.duration = action.payload.duration;
      }
      break;
    }
    case PLAY_TRACK: {
      state.wave.status = PLAYER_STATUS.PLAYING;
      if (state.wave.sourceId !== state.global.sourceId) {
        state.global.sourceId = state.wave.sourceId;
        state.global.sourceUrl = state.wave.sourceUrl;
        state.global.duration = state.wave.duration;
        state.global.status = PLAYER_STATUS.PLAYING;
      }
      break;
    }
    case PAUSE_TRACK: {
      state.wave.status = PLAYER_STATUS.PAUSED;
      state.global.status = PLAYER_STATUS.PAUSED;
      break;
    }
    case FINISH_TRACK: {
      state.wave.status = PLAYER_STATUS.FINISHED;
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
// export const playerReducer = produce((state = initialState, action) => {
//   switch (action.type) {
//     case LOAD_TRACK: {
//       state[action.payload.player].status = PLAYER_STATUS.LOADED;
//       state[action.payload.player].sourceId = action.payload.id;
//       state[action.payload.player].sourceUrl = action.payload.url;
//       state[action.payload.player].duration = action.payload.duration;
//       state[action.payload.player].progress = 0;
//       if (state.global.status !== PLAYER_STATUS.PLAYING) {
//         state.global.sourceId = action.payload.id;
//         state.global.sourceUrl = action.payload.url;
//       }
//       break;
//     }
//     case PLAY_TRACK: {
//       state[action.payload.player].status = PLAYER_STATUS.PLAYING;
//       if (state.global.sourceId !== state.wave.sourceId) {
//         state.global.sourceUrl = state.wave.sourceUrl;
//         state.global.duration = state.wave.duration;
//         state.global.progress = state.wave.progress;
//       }
//       state.global.status = PLAYER_STATUS.PLAYING;
//       break;
//     }
//     case PAUSE_TRACK: {
//       state[action.payload.player].status = PLAYER_STATUS.PAUSED;
//       state.global.status = PLAYER_STATUS.PAUSED;
//       break;
//     }
//     case FINISH_TRACK: {
//       state[action.payload.player].status = PLAYER_STATUS.FINISHED;
//       break;
//     }
//     case SEEKING_TRACK: {
//       state[action.payload.player].status = PLAYER_STATUS.SEEKING;
//       state[action.payload.player].progress = action.payload.progress;
//       state.global.status = PLAYER_STATUS.SEEKING;
//       state.global.progress = action.payload.progress;
//       break;
//     }
//     case RESUME_TRACK: {
//       state[action.payload.player].status = PLAYER_STATUS.PLAYING;
//       state.global.status = PLAYER_STATUS.PLAYING;
//       break;
//     }
//     default:
//       return state;
//   }
// });

export const selectPlayerStatus = (state, player) =>
  state.player[player].status;
export const selectPlayerProgress = (state, player) =>
  state.player[player].progress;
export const selectPlayerSource = (state, player) =>
  state.player[player].sourceUrl;
export const selectPlayerSourceId = (state, player) =>
  state.player[player].sourceId;
