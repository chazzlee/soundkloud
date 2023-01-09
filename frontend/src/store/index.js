import { createStore, combineReducers, applyMiddleware } from "redux";
import { composeWithDevToolsDevelopmentOnly } from "@redux-devtools/extension";
import thunk from "redux-thunk";
import { authReducer } from "../features/auth/store";
import { tracksReducer } from "../features/tracks/store";
import { genresReducer } from "../features/genres/store";
import { discoverReducer } from "../features/discover/store";
import { playlistsReducer } from "../features/playlists/store";
import { playerReducer } from "../features/player/store";

const rootReducer = combineReducers({
  auth: authReducer,
  discover: discoverReducer,
  tracks: tracksReducer,
  genres: genresReducer,
  playlists: playlistsReducer,
  player: playerReducer,
});

export const configureStore = (preloadedState = {}) => {
  const middlewares = [thunk];
  const composeEnhancers = composeWithDevToolsDevelopmentOnly({ trace: true });

  return createStore(
    rootReducer,
    preloadedState,
    composeEnhancers(applyMiddleware(...middlewares))
  );
};
