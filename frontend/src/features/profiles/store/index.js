import produce from "immer";
import { ProfilesApi } from "../../../api/profiles";

const FETCH_ALL_PROFILES = "profiles/fetchAll";

export const UPDATE_PROFILE_SUCCESS = "profiles/profileUpdatedSucess";
export const UPDATE_PROFILE_FAILED = "profiles/updateProfileFailed";
export const UPDATE_PROFILE_HEADER_COVER_SUCCESS =
  "profiles/headerCoverUpdated";

export const allProfilesFetched = (profiles) => ({
  type: FETCH_ALL_PROFILES,
  payload: profiles,
});

export const profileUpdatedSuccess = (profile) => ({
  type: UPDATE_PROFILE_SUCCESS,
  payload: profile,
});

export const profileUpdateFailed = (error) => ({
  type: UPDATE_PROFILE_FAILED,
  payload: error,
});

export const headerCoverUpdatedSuccess = (profile) => ({
  type: UPDATE_PROFILE_HEADER_COVER_SUCCESS,
  payload: profile,
});

export const fetchProfilesAsync = () => async (dispatch) => {
  const response = await ProfilesApi.fetchAll();
  if (response.ok) {
    const data = await response.json();
    dispatch(allProfilesFetched(data));
  }
};

const initialState = {
  loading: false,
  loaded: false,
  entities: {},
  errors: [],
};

export const profilesReducer = produce((state = initialState, action) => {
  switch (action.type) {
    case FETCH_ALL_PROFILES: {
      state.loaded = true;
      state.entities = action.payload;
      break;
    }
    case UPDATE_PROFILE_SUCCESS: {
      state.errors = [];
      break;
    }
    case UPDATE_PROFILE_FAILED: {
      state.errors = action.payload;
      break;
    }
    default:
      return state;
  }
});

export const selectProfileErrors = (state) => state.profiles.errors;
export const selectProfilesLoaded = (state) => state.profiles.loaded;
export const selectProfileBySlug = (state, slug) =>
  Object.values(state.profiles.entities).find(
    (profile) => profile.slug === slug
  );
