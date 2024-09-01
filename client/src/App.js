import React, { Fragment, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Navbar from "./components/layout/Navbar";
import Landing from "./components/layout/Landing";
import "./App.css";
import MyRoutes from "./components/routing/MyRoutes"; //from rounting Routers
import NotFound from "./components/layout/NotFound";
import { loadUser } from "./actions/auth";
import setAuthToken from "./utils/setAuthToken";
// redux

import { Provider } from "react-redux";
import store from "./store";

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

const App = () => {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);
  return (
    <Router>
      {" "}
      <Provider store={store}>
        {" "}
        <Fragment>
          <Navbar />
          {typeof Routes === "function" && (
            <Routes>
              {/* Check if it's a function */}
              <Route exact path="/" element={<Landing />} />
              <Route path="/*" element={<MyRoutes />} />
              <Route path="*" element={<NotFound />} />
              {/* Not Found route for unmatched paths */}
            </Routes>
          )}
        </Fragment>
      </Provider>{" "}
    </Router>
  );
};

export default App;
