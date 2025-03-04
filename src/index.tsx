import React, { Suspense } from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "./assets/scss/index.scss";
import Spinner from "./components/Spinner";

ReactDOM.render(
  <React.StrictMode>
    <Suspense fallback={<Spinner />}>
      <App />
    </Suspense>
  </React.StrictMode>,
  document.getElementById("root")
);
