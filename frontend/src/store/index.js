import { createStore, combineReducers, applyMiddleware } from "redux";
import { composeWithDevToolsDevelopmentOnly } from "@redux-devtools/extension";
import thunk from "redux-thunk";
import { authReducer } from "./reducers/auth";

const rootReducer = combineReducers({
  auth: authReducer,
});

export const configureStore = (preloadedState = {}) => {
  const middlewares = [thunk];

  return createStore(
    rootReducer,
    preloadedState,
    composeWithDevToolsDevelopmentOnly(applyMiddleware(...middlewares))
  );
};
