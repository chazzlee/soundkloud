import produce from "immer";

export const PLAYER_STATUS = Object.freeze({
  IDLE: "idle",
  LOADED: "loaded",
  PLAYING: "playing",
  PAUSED: "paused",
  SEEKING: "seeking",
});

const initialState = {
  wave: {
    status: PLAYER_STATUS.IDLE,
    sourceId: null,
    sourceUrl: null,
    totalDuration: 0,
    currentTimeInSeconds: 0,
  },
  global: {
    status: PLAYER_STATUS.IDLE,
    sourceId: null,
    sourceUrl: null,
    totalDuration: 0,
    currentTimeInSeconds: 0,
  },
};

const LOAD_WAVE_TRACK = "player/waveTrackLoaded";
const LOAD_GLOBAL_TRACK = "player/globalTrackLoaded";
const CHANGE_WAVE_STATUS = "player/waveStatusChanged";
const CHANGE_GLOBAL_STATUS = "player/globalStatusChanged";
const CLEAR_WAVE_TRACK = "player/waveTrackCleared";
const CLEAR_GLOBAL_TRACK = "player/globalTrackCleared";
const RECORD_GLOBAL_TIME = "player/globalTimeRecorded";

export const waveTrackLoaded = ({ id, url, duration }) => ({
  type: LOAD_WAVE_TRACK,
  payload: { id, url, duration },
});

export const globalTrackLoaded = ({ id, url, duration }) => ({
  type: LOAD_GLOBAL_TRACK,
  payload: { id, url, duration },
});

export const waveStatusChanged = (status) => ({
  type: CHANGE_WAVE_STATUS,
  payload: status,
});

export const globalStatusChanged = (status) => ({
  type: CHANGE_GLOBAL_STATUS,
  payload: status,
});

export const waveTrackCleared = () => ({ type: CLEAR_WAVE_TRACK });
export const globalTrackCleared = () => ({ type: CLEAR_GLOBAL_TRACK });

export const globalTimeUpdated = (timeInSeconds) => ({
  type: RECORD_GLOBAL_TIME,
  payload: timeInSeconds,
});

export const playerReducer = produce((state = initialState, action) => {
  switch (action.type) {
    case LOAD_WAVE_TRACK: {
      state.wave.status = PLAYER_STATUS.LOADED;
      state.wave.sourceId = action.payload.id;
      state.wave.sourceUrl = action.payload.url;
      state.wave.totalDuration = action.payload.duration;
      break;
    }
    case LOAD_GLOBAL_TRACK: {
      state.global.status = PLAYER_STATUS.LOADED;
      state.global.sourceId = action.payload.id;
      state.global.sourceUrl = action.payload.url;
      state.global.totalDuration = action.payload.duration;
      break;
    }
    case CHANGE_WAVE_STATUS: {
      state.wave.status = action.payload;
      break;
    }
    case CHANGE_GLOBAL_STATUS: {
      state.global.status = action.payload;
      break;
    }
    case CLEAR_WAVE_TRACK: {
      state.wave.status = PLAYER_STATUS.IDLE;
      state.wave.sourceId = null;
      state.wave.sourceUrl = null;
      state.wave.totalDuration = 0;
      state.wave.currentTimeInSeconds = 0;
      break;
    }
    case CLEAR_GLOBAL_TRACK: {
      state.global.status = PLAYER_STATUS.IDLE;
      state.global.sourceId = null;
      state.global.sourceUrl = null;
      state.global.totalDuration = 0;
      state.global.currentTimeInSeconds = 0;
      break;
    }
    case RECORD_GLOBAL_TIME: {
      state.global.currentTimeInSeconds = action.payload;
      break;
    }
    default:
      return state;
  }
});

export const selectWaveStatus = (state) => state.player.wave.status;
export const selectGlobalStatus = (state) => state.player.global.status;
export const selectGlobalSource = (state) => state.player.global;
export const selectWaveSource = (state) => state.player.wave;
export const selectWaveSourceId = (state) => state.player.wave.sourceId;
export const selectGlobalSourceId = (state) => state.player.global.sourceId;
export const selectCurrentPlayerSource = (state) => state.player.current;
export const selectCurrentPlayerStatus = (state) => state.player.current.status;
