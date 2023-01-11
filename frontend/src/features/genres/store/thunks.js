import { GenresApi } from "../../../api/genres";
import { requestStarted, requestSuccess, requestFailed } from "./actions";

export const fetchGenresAsync = () => async (dispatch) => {
  dispatch(requestStarted());
  GenresApi.fetchAll().then(
    async (response) => dispatch(requestSuccess(await response.json())),
    (error) => dispatch(requestFailed(error.error))
  );
};
