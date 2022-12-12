import produce from "immer";
import { TracksApi } from "../../../api/tracks";

const FETCH_TRACKS_START = "tracks/fetchTracksInitiate";
const FETCH_TRACKS_SUCCESS = "tracks/fetchTracksSuccess";
const FETCH_TRACKS_FAILED = "tracks/fetchTracksFailed";

const FETCH_TRACK_START = "tracks/fetchTrackInitiate";
const FETCH_TRACK_SUCCESS = "tracks/fetchTrackSuccess";
const FETCH_TRACK_FAILED = "tracks/fetchTrackFailed";

const UPLOAD_TRACK_START = "tracks/uploadTrackStart";
const UPLOAD_TRACK_SUCCESS = "tracks/uploadTrackSuccess";
const UPLOAD_TRACK_FAILED = "tracks/uploadTrackFailed";
// const REMOVE_TRACK = "tracks/trackRemoved";
// const UPDATE_TRACK = "tracks/trackUpdated";
const uploadTrackInitiate = () => ({
  type: UPLOAD_TRACK_START,
});
const uploadTrackSuccess = (track) => ({
  type: UPLOAD_TRACK_SUCCESS,
  payload: track,
});
const uploadTrackFailed = (error) => ({
  type: UPLOAD_TRACK_SUCCESS,
  payload: error,
});

// const trackRemoved = (trackId) => ({
//   type: REMOVE_TRACK,
//   payload: trackId,
// });
// const trackUpdated = (track) => ({
//   type: UPDATE_TRACK,
//   payload: track,
// });

const fetchTracksInitiate = () => ({ type: FETCH_TRACKS_START });
const fetchTracksSuccess = (tracks) => ({
  type: FETCH_TRACKS_SUCCESS,
  payload: tracks,
});
const fetchTracksFailed = (error) => ({
  type: FETCH_TRACKS_FAILED,
  payload: error,
});

const fetchTrackInitiate = () => ({ type: FETCH_TRACK_START });
const fetchTrackSuccess = (track) => ({
  type: FETCH_TRACK_SUCCESS,
  payload: track,
});
const fetchTrackFailed = (error) => ({
  type: FETCH_TRACK_FAILED,
  payload: error,
});

export const fetchAllTracks = () => async (dispatch) => {
  dispatch(fetchTracksInitiate());
  try {
    const response = await TracksApi.fetchAll();
    const data = await response.json();
    dispatch(fetchTracksSuccess(data));
  } catch (error) {
    dispatch(fetchTracksFailed(error));
  }
};

export const fetchTrack = (profileId, trackId) => async (dispatch) => {
  dispatch(fetchTrackInitiate());
  try {
    const response = await TracksApi.fetchOne(profileId, trackId);
    const data = await response.json();
    dispatch(fetchTrackSuccess(data));
  } catch (error) {
    dispatch(fetchTrackFailed(error));
  }
};

//TODO: errors not being caught
export const uploadNewTrack = (track) => async (dispatch) => {
  let response;
  try {
    response = await TracksApi.uploadOne(track);
  } catch (error) {
    dispatch(uploadTrackFailed(error));
    return;
  }
  const data = await response.json();
  dispatch(uploadTrackSuccess(data));
};

const initialState = {
  error: null,
  loading: false,
  loaded: false,
  entities: {
    recentlyPlayed: {},
    mostPlayed: {},
    byGenre: {},
  },
  current: null,
  ids: [],
};

export const tracksReducer = produce((state = initialState, action) => {
  switch (action.type) {
    case FETCH_TRACKS_START: {
      state.error = null;
      state.loading = true;
      break;
    }
    case FETCH_TRACKS_SUCCESS: {
      state.error = null;
      state.loading = false;
      state.loaded = true;
      state.entities.recentlyPlayed = action.payload.recentlyPlayed;
      state.entities.mostPlayed = action.payload.mostPlayed;
      state.entities.byGenre = action.payload.byGenre;
      state.ids = Object.keys(action.payload);
      break;
    }
    case FETCH_TRACKS_FAILED: {
      state.error = action.payload;
      state.loading = false;
      state.loaded = false;
      break;
    }
    case FETCH_TRACK_START: {
      state.error = null;
      state.loading = true;
      break;
    }
    case FETCH_TRACK_SUCCESS: {
      state.error = null;
      state.loading = false;
      state.current = action.payload;
      break;
    }
    case FETCH_TRACK_FAILED: {
      state.error = action.payload;
      state.loading = false;
      break;
    }
    case UPLOAD_TRACK_START: {
      state.error = null;
      state.loading = true;
      break;
    }
    case UPLOAD_TRACK_SUCCESS: {
      // TODO:
      state.error = null;
      state.loading = false;
      break;
    }
    case UPLOAD_TRACK_FAILED: {
      state.error = action.payload;
      state.loading = false;
      break;
    }
    default:
      return state;
  }
});

// TODO: use createSelector/reselect
export const selectTracksError = (state) => state.tracks.error;
export const selectIsTracksLoading = (state) => state.tracks.loading;
export const selectHasTracksLoaded = (state) => state.tracks.loaded;

export const selectRecentlyPlayedTracks = (state) =>
  Object.values(state.tracks.entities.recentlyPlayed);

export const selectMostPlayedTracks = (state) =>
  Object.values(state.tracks.entities.mostPlayed);

export const selectTracksByGenre = (genre) => (state) =>
  Object.values(state.tracks?.entities?.byGenre?.[genre] || {});

export const selectCurrentTrack = (state) => state.tracks.current;
