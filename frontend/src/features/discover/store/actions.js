export const FETCH_DISCOVER_START = "discover/start";
export const FETCH_DISCOVER_SUCCESS = "discover/success";
export const FETCH_DISCOVER_FAIL = "discover/fail";

export const requestStarted = () => ({
  type: FETCH_DISCOVER_START,
});

export const requestSuccess = (data) => ({
  type: FETCH_DISCOVER_SUCCESS,
  payload: data,
});

export const requestFailed = (error) => ({
  type: FETCH_DISCOVER_FAIL,
  payload: error,
});
