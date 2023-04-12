import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { store } from "~/redux/store";
import { Provider } from "react-redux";
import GlobalStyles from "~/components/GlobalStyles";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <GlobalStyles>
        <App />
      </GlobalStyles>
    </Provider>
  </React.StrictMode>
);
