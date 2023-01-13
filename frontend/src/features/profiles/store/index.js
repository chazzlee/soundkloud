import { ProfilesApi } from "../../../api/profiles";

export const UPDATE_PROFILE = "profiles/profileUpdated";
export const UPDATE_PROFILE_FAILED = "profiles/updateProfileFailed";

export const profileUpdated = (profile) => ({
  type: UPDATE_PROFILE,
  payload: profile,
});

export const profileUpdateFailed = (error) => ({
  type: UPDATE_PROFILE_FAILED,
  payload: error,
});

export const updateProfileAsync = (profile) => async (dispatch) => {
  ProfilesApi.update(profile).then(
    async (response) => {
      const data = await response.json();
      dispatch(profileUpdated(data.user));
    },
    (error) => dispatch(profileUpdateFailed(error.error))
  );
};
