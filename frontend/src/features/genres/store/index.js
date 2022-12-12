import produce from "immer";
import { GenresApi } from "../../../api/genres";

const FETCH_GENRES_START = "genres/fetchGenresInitiate";
const FETCH_GENRES_SUCCESS = "genres/fetchGenresInitiate";
const FETCH_GENRES_FAILED = "genres/fetchGenresInitiate";

const fetchGenresInitiate = () => ({ type: FETCH_GENRES_START });
const fetchGenresSuccess = (genres) => ({
  type: FETCH_GENRES_SUCCESS,
  payload: genres,
});
const fetchGenresFailed = (error) => ({
  type: FETCH_GENRES_FAILED,
  payload: error,
});

export const fetchAllGenres = () => async (dispatch) => {
  dispatch(fetchGenresInitiate());
  try {
    const response = await GenresApi.fetchAll();
    const data = await response.json();
    dispatch(fetchGenresSuccess(data));
  } catch (error) {
    dispatch(fetchGenresFailed(error));
  }
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
      state.error = null;
      state.loading = true;
      break;
    }
    case FETCH_GENRES_SUCCESS: {
      state.error = null;
      state.loading = false;
      state.loaded = true;
      state.entities = action.payload;
      state.ids = Object.keys(action.payload);
      break;
    }
    case FETCH_GENRES_FAILED: {
      state.error = action.payload;
      state.loading = false;
      state.loaded = false;
      break;
    }
    default:
      return state;
  }
});

export const selectGenres = (state) =>
  state.genres?.entities ? Object.values(state.genres.entities) : [];
