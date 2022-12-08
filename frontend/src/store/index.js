import { createStore, combineReducers, applyMiddleware } from "redux";
import { composeWithDevToolsDevelopmentOnly } from "@redux-devtools/extension";
import thunk from "redux-thunk";
import { authReducer } from "../features/auth/store";
import { tracksReducer } from "../features/tracks/store";

const rootReducer = combineReducers({
  auth: authReducer,
  tracks: tracksReducer,
});

export const configureStore = (preloadedState = {}) => {
  const middlewares = [thunk];

  return createStore(
    rootReducer,
    preloadedState,
    composeWithDevToolsDevelopmentOnly(applyMiddleware(...middlewares))
  );
};
