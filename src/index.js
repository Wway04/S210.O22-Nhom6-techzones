import React from "react";
import "react-app-polyfill/ie11";
import "react-app-polyfill/stable";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { applyMiddleware, createStore } from "redux";
import { load, save } from "redux-localstorage-simple";
import thunk from "redux-thunk";
import App from "./App";
import "./assets/scss/style.scss";
import rootReducer from "./redux/reducers/rootReducer";
import * as serviceWorker from "./serviceWorker";

import { composeWithDevTools } from "redux-devtools-extension";

export const store = createStore(rootReducer, load(), composeWithDevTools(applyMiddleware(thunk, save())));

// fetch products from json file

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
