import produce from "immer";
import { createSelector } from "reselect";
import { TracksApi } from "../../../api/tracks";

const FETCH_DISCOVER_START = "discover/start";
const FETCH_DISCOVER_SUCCESS = "discover/success";
const FETCH_DISCOVER_FAIL = "discover/fail";

const requestStarted = () => ({
  type: FETCH_DISCOVER_START,
});

const requestSuccess = (data) => ({
  type: FETCH_DISCOVER_SUCCESS,
  payload: data,
});

const requestFailed = (error) => ({
  type: FETCH_DISCOVER_FAIL,
  payload: error,
});

export const fetchDiscoverAsync = () => async (dispatch) => {
  dispatch(requestStarted());
  TracksApi.fetchDiscover().then(
    async (response) => dispatch(requestSuccess(await response.json())),
    (error) => dispatch(requestFailed(error.error))
  );
};

const initialState = {
  error: null,
  loading: false,
  loaded: false,
  entities: {},
  ids: [],
};
export const discoverReducer = produce((state = initialState, action) => {
  switch (action.type) {
    case FETCH_DISCOVER_START: {
      state.loading = true;
      state.loaded = false;
      state.error = null;
      break;
    }
    case FETCH_DISCOVER_SUCCESS: {
      state.loaded = true;
      state.loading = false;
      state.entities = action.payload;
      state.ids = Object.keys(action.payload);
      state.error = null;
      break;
    }
    case FETCH_DISCOVER_FAIL: {
      state.error = action.payload;
      state.loaded = false;
      state.loading = false;
      state.entities = {};
      state.ids = [];
      break;
    }
    default:
      return state;
  }
});

export const selectDiscoverLoading = (state) => state.discover?.loading;
export const selectDiscoverLoaded = (state) => state.discover?.loaded;

export const selectDiscoverListByType = (state, type) =>
  Object.values(state.discover?.entities?.[type] || {});

export const selectDiscoverGroupedByGenres = createSelector(
  [
    (state) => Object.values(state.genres?.entities),
    (state) => state.discover?.entities,
  ],
  (genres, tracks) =>
    genres
      .filter((genre) => !["none", "custom"].includes(genre.name))
      .map((genre) => ({
        genreName: genre.name,
        genreLabel: genre.label,
        tracks: Object.values(tracks[genre.name] ?? {}),
      }))
);
