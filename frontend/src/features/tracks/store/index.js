import produce from "immer";
import { RepliesApi } from "../../../api/replies";
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

const UPDATE_TRACK_START = "tracks/updateTrackInitiate";
const UPDATE_TRACK_SUCCESS = "tracks/updateTrackSuccess";

const DESTROY_TRACK_SUCCESS = "tracks/destroyTrackSuccess";

const REPLY_TO_TRACK_SUCCESS = "replies/replyToTrackSuccess";

const uploadTrackInitiate = () => ({
  type: UPLOAD_TRACK_START,
});
const uploadTrackSuccess = (track) => ({
  type: UPLOAD_TRACK_SUCCESS,
  payload: track,
});

const updateTrackInitiate = () => ({
  type: UPDATE_TRACK_START,
});
const updateTrackSuccess = (track) => ({
  type: UPDATE_TRACK_SUCCESS,
  payload: track,
});

const destroyTrackSuccess = (trackId) => ({
  type: DESTROY_TRACK_SUCCESS,
  payload: trackId,
});

const replyToTrackSuccess = (reply) => ({
  type: REPLY_TO_TRACK_SUCCESS,
  payload: reply,
});

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

export const fetchAllTracksByUserAsync = (userId) => async (dispatch) => {
  dispatch(fetchTracksInitiate());
  try {
    const response = await TracksApi.fetchAllByUser(userId);
    const data = await response.json();
    dispatch(fetchTracksSuccess(data));
  } catch (error) {
    dispatch(fetchTracksFailed(error));
  }
};

export const fetchTrackAsync = (profileId, trackId) => async (dispatch) => {
  dispatch(fetchTrackInitiate());
  try {
    const response = await TracksApi.fetchOneByUser(profileId, trackId);
    const data = await response.json();
    dispatch(fetchTrackSuccess(data));
  } catch (error) {
    dispatch(fetchTrackFailed(error));
  }
};

//TODO: errors not being caught
export const uploadNewTrack = (track) => async (dispatch) => {
  dispatch(uploadTrackInitiate());
  await TracksApi.uploadOne(track)
    .then((res) => res.json())
    .then((data) => dispatch(uploadTrackSuccess(data)));
  // .catch((err) => dispatch(uploadTrackFailed(err)));
};

export const updateTrackAsync = (updatedTrack) => async (dispatch) => {
  dispatch(updateTrackInitiate());
  try {
    const response = await TracksApi.updateOne(updatedTrack);
    const data = await response.json();
    dispatch(updateTrackSuccess(data));
  } catch (error) {
    console.error(error);
  }
};

export const replyToTrackAsync = (trackId, reply) => async (dispatch) => {
  try {
    const response = await RepliesApi.replyToTrack(trackId, reply);
    const data = await response.json();
    dispatch(replyToTrackSuccess(data));
  } catch (error) {}
};

export const destroyTrackAsync = (trackId) => async (dispatch) => {
  try {
    await TracksApi.destroyOne(trackId);
    dispatch(destroyTrackSuccess(trackId));
  } catch (error) {}
};

const initialState = {
  error: null,
  loading: false,
  loaded: false,
  entities: {},
  ids: [],
  current: null,
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
      state.entities = action.payload;
      state.ids = Object.keys(action.payload).map((id) => +id);
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
      state.error = null;
      state.loading = false;
      state.entities[action.payload.id] = action.payload;
      state.current = action.payload;
      break;
    }
    case UPLOAD_TRACK_FAILED: {
      state.error = action.payload;
      state.loading = false;
      break;
    }
    case UPDATE_TRACK_START: {
      state.error = null;
      state.loading = true;
      break;
    }
    case UPDATE_TRACK_SUCCESS: {
      state.loading = false;
      state.error = null;
      state.entities[action.payload.id] = action.payload;
      break;
    }
    case REPLY_TO_TRACK_SUCCESS: {
      state.current.replies.unshift(action.payload);
      break;
    }
    case DESTROY_TRACK_SUCCESS: {
      delete state.entities[action.payload];
      state.current = null;
      break;
    }

    default:
      return state;
  }
});

// TODO: use createSelector/reselect
export const selectTracksError = (state) => state.tracks.error;
export const selectTracksLoading = (state) => state.tracks.loading;
export const selectHasTracksLoaded = (state) => state.tracks.loaded;

export const selectCurrentTrack = (state) => state.tracks.current;
export const selectUserTracks = (state) =>
  Object.values(state.tracks.entities ?? {});
