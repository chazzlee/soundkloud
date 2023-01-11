import produce from "immer";
import {
  FETCH_GENRES_FAILED,
  FETCH_GENRES_START,
  FETCH_GENRES_SUCCESS,
} from "./actions";

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
