import { csrfFetch } from "../csrf";

const RECEIVE_USER = "users/RECEIVE_USER";
const REMOVE_USER = "users/REMOVE_USER";

export const receiveUser = (user) => ({
  type: RECEIVE_USER,
  payload: user,
});

export const removeUser = () => ({
  type: REMOVE_USER,
});

let currentUser = JSON.parse(sessionStorage.getItem("currentUser"));
let initialState = {
  current: null,
};
if (currentUser) {
  initialState = {
    current: currentUser,
  };
}

export async function restoreCSRF() {
  const response = await csrfFetch("/api/session");
  storeCSRFToken(response);
  return response;
}

export const restoreSession = () => async (dispatch) => {
  const response = await csrfFetch("/api/session");
  storeCSRFToken(response);
  const data = await response.json();
  storeCurrentUser(data.user);
  if (data.user) {
    dispatch(receiveUser(data.user));
  }
};

function storeCSRFToken(response) {
  const csrfToken = response.headers.get("X-CSRF-Token");
  if (csrfToken) {
    sessionStorage.setItem("X-CSRF-Token", csrfToken);
  }
}

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
    body: JSON.stringify(user),
  });
  const data = await response.json();
  storeCurrentUser(data.user);
  dispatch(receiveUser(data.user));
};

export const logoutUser = () => async (dispatch) => {
  await csrfFetch("/api/session", { method: "DELETE" });
  storeCurrentUser(null);
  dispatch(removeUser());
};

export const registerUser = (user) => async (dispatch) => {
  const response = await csrfFetch("/api/users", {
    method: "POST",
    body: JSON.stringify(user),
  });
  const data = await response.json();
  sessionStorage.setItem("currentUser", JSON.stringify(data.user));
  dispatch(receiveUser(data.user));
};

export function authReducer(state = initialState, action) {
  switch (action.type) {
    case RECEIVE_USER: {
      return {
        ...state,
        current: action.payload,
      };
    }
    case REMOVE_USER: {
      return { ...state, current: null };
    }
    default:
      return state;
  }
}
