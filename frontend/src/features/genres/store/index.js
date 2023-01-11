import produce from "immer";
import { GenresApi } from "../../../api/genres";

const FETCH_GENRES_START = "genres/start";
const FETCH_GENRES_SUCCESS = "genres/success";
const FETCH_GENRES_FAILED = "genres/fail";

export const requestStarted = () => ({ type: FETCH_GENRES_START });
export const requestSuccess = (genres) => ({
  type: FETCH_GENRES_SUCCESS,
  payload: genres,
});
const requestFailed = (error) => ({
  type: FETCH_GENRES_FAILED,
  payload: error,
});

export const fetchGenresAsync = () => async (dispatch) => {
  dispatch(requestStarted());
  GenresApi.fetchAll().then(
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
export const genresReducer = produce((state = initialState, action) => {
  switch (action.type) {
    case FETCH_GENRES_START: {
      state.loading = true;
      state.loaded = false;
      state.error = null;
      break;
    }
    case FETCH_GENRES_SUCCESS: {
      state.loading = false;
      state.loaded = true;
      state.entities = action.payload;
      state.ids = Object.keys(action.payload);
      state.error = null;
      break;
    }
    case FETCH_GENRES_FAILED: {
      state.error = action.payload;
      state.loading = false;
      state.loaded = false;
      state.entities = {};
      state.ids = [];
      break;
    }
    default:
      return state;
  }
});

export const selectGenres = (state) =>
  state.genres?.entities ? Object.values(state.genres.entities) : [];
export const selectGenresLoaded = (state) => state.genres?.loaded;
