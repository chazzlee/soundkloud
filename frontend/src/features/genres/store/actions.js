export const FETCH_GENRES_START = "genres/start";
export const FETCH_GENRES_SUCCESS = "genres/success";
export const FETCH_GENRES_FAILED = "genres/fail";

export const requestStarted = () => ({ type: FETCH_GENRES_START });
export const requestSuccess = (genres) => ({
  type: FETCH_GENRES_SUCCESS,
  payload: genres,
});
export const requestFailed = (error) => ({
  type: FETCH_GENRES_FAILED,
  payload: error,
});
