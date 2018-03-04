import React from "react";
import ReactDOM from "react-dom";
import "./App.css";
import { Provider } from "react-redux";
import { createStore, combineReducers } from "redux";
import voteReducer from "./reducers/VoteRed";
import App from "./App";

const store = createStore(
  combineReducers({ vote: voteReducer }),
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);