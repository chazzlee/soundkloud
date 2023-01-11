import produce from "immer";
import { csrfFetch } from "../../../api/csrfFetch";

const AUTHENTICATE_USER = "auth/authenticatedAsUser";
const AUTHENTICATE_GUEST = "auth/authenticatedAsGuest";
const LOGOUT_USER = "auth/userLoggedOut";

const userAuthenticated = (user) => ({
  type: AUTHENTICATE_USER,
  payload: user,
});

const userLoggedOut = () => ({
  type: LOGOUT_USER,
});

const authenticatedAsGuest = () => ({
  type: AUTHENTICATE_GUEST,
});

async function restoreCSRF() {
  const response = await csrfFetch("/api/session");
  storeCSRFToken(response);
  return response;
}

function storeCSRFToken(response) {
  const csrfToken = response.headers.get("X-CSRF-Token");
  if (csrfToken) {
    sessionStorage.setItem("X-CSRF-Token", csrfToken);
  }
}
export const restoreSession = () => async (dispatch) => {
  const response = await restoreCSRF();
  const data = await response.json();
  storeCurrentUser(data.user);
  if (data.user) {
    dispatch(userAuthenticated(data.user));
  } else {
    dispatch(authenticatedAsGuest());
  }
  return response;
};

function storeCurrentUser(user) {
  if (user) {
    sessionStorage.setItem("currentUser", JSON.stringify(user));
  } else {
    sessionStorage.removeItem("currentUser");
  }
}

export const loginUser = (user) => async (dispatch) => {
  const response = await csrfFetch("/api/session", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(user),
  });
  const data = await response.json();
  storeCurrentUser(data.user);
  dispatch(userAuthenticated(data.user));
  return response;
};

export const logoutUser = () => async (dispatch) => {
  const response = await csrfFetch("/api/session", { method: "DELETE" });
  storeCurrentUser(null);
  dispatch(userLoggedOut());
  return response;
};

export const registerUser = (user) => async (dispatch) => {
  const response = await csrfFetch("/api/users", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(user),
  });
  const data = await response.json();
  storeCurrentUser(data.user);
  dispatch(userAuthenticated(data.user));
  return response;
};

const initialState = {
  current: JSON.parse(sessionStorage.getItem("currentUser")),
};

export const authReducer = produce((state = initialState, action) => {
  switch (action.type) {
    case AUTHENTICATE_USER: {
      state.current = action.payload;
      break;
    }
    case LOGOUT_USER: {
      state.current = null;
      break;
    }
    default:
      return state;
  }
});

export const selectCurrentUser = (state) => state.auth.current;
