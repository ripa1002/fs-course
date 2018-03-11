import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { createStore, combineReducers, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import blogReducer from "./reducers/BlogReducer";
import userReducer from "./reducers/UserReducer";
import thunk from "redux-thunk";

const logger = store => next => action => {
    let result = next(action)
    return result
  }

const store = createStore(
  combineReducers({
    blogs: blogReducer,
    user: userReducer
  }),
  applyMiddleware(thunk, logger)
);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);