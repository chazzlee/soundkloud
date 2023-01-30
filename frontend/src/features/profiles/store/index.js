import produce from "immer";

export const UPDATE_PROFILE_SUCCESS = "profiles/profileUpdatedSucess";
export const UPDATE_PROFILE_FAILED = "profiles/updateProfileFailed";

export const profileUpdatedSuccess = (profile) => ({
  type: UPDATE_PROFILE_SUCCESS,
  payload: profile,
});

export const profileUpdateFailed = (error) => ({
  type: UPDATE_PROFILE_FAILED,
  payload: error,
});

const initialState = {
  errors: [],
};
export const profilesReducer = produce((state = initialState, action) => {
  switch (action.type) {
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
