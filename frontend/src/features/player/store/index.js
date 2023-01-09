import produce from "immer";

// const NOW_PLAYING = "tracks/nowPlaying";
// const STOP_PLAYING = "tracks/stopPlaying";
// const PAUSE_PLAYING = "tracks/pausePlaying";
// const SWITCH_TRACK = "tracks/switchTrack";
// const SWITCH_TO = "tracks/switchTo";
// export const startNowPlaying = (track, from) => ({
//   type: NOW_PLAYING,
//   payload: { track, from },
// });
// export const pausePlaying = () => ({ type: PAUSE_PLAYING });
// export const stopPlaying = () => ({ type: STOP_PLAYING });
// export const switchTrack = (track) => ({ type: SWITCH_TRACK, payload: track });
// export const switchTo = (to) => ({ type: SWITCH_TRACK, payload: to });
export const LOCATION = Object.freeze({
  PLAYBAR: "playbar",
  WAVESURFER: "wavesurfer",
});

export const STATUS = Object.freeze({
  INIT: "initial",
  PLAYING: "playing",
  PAUSED: "paused",
});

const PLAY_TRACK = "player/PLAY_TRACK";
const PAUSE_TRACK = "player/PAUSE_TRACK";
const SWITCH_TRACK = "player/SWITCH_TRACK";
const SET_LAST_RECORDED_TIME = "player/SET_LAST_RECORDED_TIME";
const SET_DURATION_ON_LOAD = "player/SET_DURATION_ON_LOAD";

export const playTrack = ({ source, location }) => ({
  type: PLAY_TRACK,
  payload: { source, location },
});

export const pauseTrack = () => ({
  type: PAUSE_TRACK,
});

export const switchTrack = ({ source, location }) => ({
  type: SWITCH_TRACK,
  payload: { source, location },
});

export const setLastRecordedTime = (timeInSeconds) => ({
  type: SET_LAST_RECORDED_TIME,
  payload: timeInSeconds,
});

export const setDurationOnLoad = (durationInSeconds) => ({
  type: SET_DURATION_ON_LOAD,
  payload: durationInSeconds,
});

const initialState = {
  status: STATUS.INIT,
  nowPlaying: null,
  location: null,
  duration: 0,
  lastRecordedTimeInSeconds: 0,
};

export const playerReducer = produce((state = initialState, action) => {
  switch (action.type) {
    case SET_DURATION_ON_LOAD: {
      state.duration = action.payload;
      break;
    }
    case PLAY_TRACK: {
      state.status = STATUS.PLAYING;
      state.nowPlaying = action.payload.source;
      state.location = action.payload.location;
      break;
    }
    case PAUSE_TRACK: {
      state.status = STATUS.PAUSED;
      break;
    }
    case SET_LAST_RECORDED_TIME: {
      state.lastRecordedTimeInSeconds = action.payload;
      break;
    }
    // case STOP_PLAYING: {
    //   state.nowPlaying.status = "stopped";
    //   break;
    // }
    // case SWITCH_TRACK: {
    //   state.nowPlaying.status = "playing";
    //   state.nowPlaying.src = action.payload.track;
    //   state.nowPlaying.from = action.payload.from;
    //   break;
    // }
    // case SWITCH_TO: {
    //   state.nowPlaying.from = action.payload;
    //   return;
    // }
    default:
      return state;
  }
});

export const selectPlayingStatus = (state) => state.player.status;
export const selectNowPlayingSource = (state) => state.player.nowPlaying;
// export const selectNowPlayingSource = (state) => state.tracks.nowPlaying.src;
// export const selectPlayingStatus = (state) => state.tracks.nowPlaying.status;
// export const selectPlayingFrom = (state) => state.tracks.nowPlaying.from;
