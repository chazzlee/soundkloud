import produce from "immer";
import { createSelector } from "reselect";
import { TracksApi } from "../../../api/tracks";

const INITIATE_DISCOVER_REQUEST = "discover/requestInitiated";
const FETCH_DISCOVER_DATA_SUCCESS = "discover/discoverDataReceived";

const requestInitiated = () => ({
  type: INITIATE_DISCOVER_REQUEST,
});

const discoverDataReceived = (data) => ({
  type: FETCH_DISCOVER_DATA_SUCCESS,
  payload: data,
});

export const fetchDiscoverAsync = () => async (dispatch) => {
  dispatch(requestInitiated());
  try {
    const response = await TracksApi.fetchDiscover();
    const data = await response.json();
    dispatch(discoverDataReceived(data));
  } catch (ex) {
    console.error("fetchDiscoverAsync", ex);
  }
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
    case INITIATE_DISCOVER_REQUEST: {
      state.error = null;
      state.loading = true;
      state.loaded = false;
      break;
    }
    case FETCH_DISCOVER_DATA_SUCCESS: {
      state.error = null;
      state.loaded = true;
      state.loading = false;
      state.entities = action.payload;
      state.ids = Object.keys(action.payload);
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
      .map((genre) => {
        return {
          genreName: genre.name,
          genreLabel: genre.label,
          tracks: Object.values(tracks[genre.name] ?? {}),
        };
      })
);
