import React from "react"
import ReactDOM from "react-dom/client"
import App from "./App"
import { store, persistor } from "~/redux/store"
import { Provider } from "react-redux"
import { PersistGate } from "redux-persist/integration/react"
import GlobalStyles from "~/components/GlobalStyles"
import { GoogleOAuthProvider } from "@react-oauth/google"

ReactDOM.createRoot(document.getElementById("root")).render(
  // <React.StrictMode>
  <Provider store={store}>
    <GlobalStyles>
      <GoogleOAuthProvider clientId="33809345843-ielufpgnck33iva2r1oqi8e89tndv6dv.apps.googleusercontent.com">
        <PersistGate loading={null} persistor={persistor}>
          <App />
        </PersistGate>
      </GoogleOAuthProvider>
    </GlobalStyles>
  </Provider>
  // </React.StrictMode>
)
