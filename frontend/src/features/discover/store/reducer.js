import produce from "immer";
import { UPDATE_PROFILE } from "../../profiles/store";
import {
  FETCH_DISCOVER_FAIL,
  FETCH_DISCOVER_START,
  FETCH_DISCOVER_SUCCESS,
} from "./actions";

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
    case UPDATE_PROFILE: {
      state.loaded = false;
      break;
    }
    default:
      return state;
  }
});
