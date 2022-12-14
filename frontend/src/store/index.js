import { createStore, combineReducers, applyMiddleware } from "redux";
import { composeWithDevToolsDevelopmentOnly } from "@redux-devtools/extension";
import thunk from "redux-thunk";
import { authReducer } from "../features/auth/store";
import { tracksReducer } from "../features/tracks/store";
import { genresReducer } from "../features/genres/store";
import { discoverReducer } from "../features/discover/store";
// import { repliesReducer } from "../features/replies/store";

const rootReducer = combineReducers({
  auth: authReducer,
  discover: discoverReducer,
  tracks: tracksReducer,
  genres: genresReducer,
});

export const configureStore = (preloadedState = {}) => {
  const middlewares = [thunk];

  return createStore(
    rootReducer,
    preloadedState,
    composeWithDevToolsDevelopmentOnly(applyMiddleware(...middlewares))
  );
};
