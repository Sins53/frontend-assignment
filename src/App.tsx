import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { appRoutes } from "./routes";

const App: React.FC = () => {
  return <RouterProvider router={createBrowserRouter(appRoutes)} />;
};

export default App;
