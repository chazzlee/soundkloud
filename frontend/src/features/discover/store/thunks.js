import { requestFailed, requestStarted, requestSuccess } from "./actions";
import { GenresApi } from "../../../api/genres";
import { TracksApi } from "../../../api/tracks";
import {
  fetchGenresAsync,
  requestStarted as genresRequestStarted,
  requestSuccess as genresRequestSuccess,
} from "../../genres/store";
import { fetchAllTracksByUserAsync } from "../../tracks/store";

export const fetchDiscoverAsync = () => async (dispatch) => {
  dispatch(requestStarted());
  TracksApi.fetchDiscover().then(
    async (response) => dispatch(requestSuccess(await response.json())),
    (error) => dispatch(requestFailed(error.error))
  );
};

export const fetchDiscoverPageAsync = () => async (dispatch, getState) => {
  const state = getState();
  if (state.auth.current && !state.tracks.loaded) {
    dispatch(fetchAllTracksByUserAsync(state.auth.current.id));
  }

  if (!state.genres.loaded && !state.discover.loaded) {
    dispatch(requestStarted());
    dispatch(genresRequestStarted());
    Promise.all([TracksApi.fetchDiscover(), GenresApi.fetchAll()]).then(
      async ([tracks, genres]) => {
        dispatch(requestSuccess(await tracks.json()));
        dispatch(genresRequestSuccess(await genres.json()));
      },
      (error) => {
        dispatch(requestFailed(error.error));
      }
    );
  } else if (!state.genres.loaded) {
    dispatch(fetchGenresAsync());
  } else if (!state.discover.loaded) {
    dispatch(fetchDiscoverAsync());
  }
};
