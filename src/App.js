import React from "react";
import { Provider } from "react-redux";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import store from "./utils/store";
import Layout from "./components/Layout";
import MainContainer from "./components/MainContainer";
import Watchpage from "./components/Watchpage";
import Results from "./components/Results";

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <Layout />, // Use the new Layout component
    children: [
      {
        path: "/",
        element: <MainContainer />,
      },
      {
        path: "watch",
        element: <Watchpage />,
      },
      {
        path: "results",
        element: <Results />,
      },
    ],
  },
]);

function App() {
  return (
    <Provider store={store}>
      <div className="app">
        <RouterProvider router={appRouter} />
      </div>
    </Provider>
  );
}

export default App;
