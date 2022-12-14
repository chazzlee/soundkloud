import produce from "immer";
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
export const selectDiscoverListByType = (type) => (state) =>
  Object.values(state.discover?.entities?.[type] || {});
export const selectDiscoverListByGenre = (genre) => (state) =>
  Object.values(state.discover?.entities?.byGenre?.[genre] || {});

// export const selectRecentlyPlayed = (state) =>
// Object.values(state.tracks.entities.recentlyPlayed);

// export const selectMostPlayed = (state) =>
// Object.values(state.tracks.entities.mostPlayed);

// export const selectTracksByGenre = (genre) => (state) =>
// Object.values(state.tracks?.entities?.byGenre?.[genre] || {});
