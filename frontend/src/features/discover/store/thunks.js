import { requestFailed, requestStarted, requestSuccess } from "./actions";
import { GenresApi } from "../../../api/genres";
import { TracksApi } from "../../../api/tracks";
import {
  fetchGenresAsync,
  requestStarted as genresRequestStarted,
  requestSuccess as genresRequestSuccess,
} from "../../genres/store";
import { fetchAllTracksByUserAsync } from "../../tracks/store";
import { ProfilesApi } from "../../../api/profiles";
import { allProfilesFetched } from "../../profiles/store";

export const fetchDiscoverAsync = () => async (dispatch) => {
  dispatch(requestStarted());
  TracksApi.fetchDiscover().then(
    async (response) => dispatch(requestSuccess(await response.json())),
    (error) => dispatch(requestFailed(error.error))
  );
};

export const fetchDiscoverPageAsync = () => async (dispatch, getState) => {
  const state = getState();
  if (state.auth.current) {
    dispatch(fetchAllTracksByUserAsync(state.auth.current.id));
  }

  dispatch(requestStarted());
  dispatch(genresRequestStarted());
  Promise.all([
    TracksApi.fetchDiscover(),
    GenresApi.fetchAll(),
    ProfilesApi.fetchAll(),
  ]).then(
    async ([tracks, genres, profiles]) => {
      dispatch(requestSuccess(await tracks.json()));
      dispatch(genresRequestSuccess(await genres.json()));
      dispatch(allProfilesFetched(await profiles.json()));
    },
    (error) => {
      dispatch(requestFailed(error.error));
    }
  );
};
