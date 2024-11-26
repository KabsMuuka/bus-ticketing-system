import React, { Fragment, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";

import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer"; // Import your Footer component

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
  const location = useLocation();
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);

  return (
    <Provider store={store}>
      <Fragment>
        {/* Conditionally render Navbar if pathname is not included in the location.pathname  other render*/}
        {![
          "/book/ticket",
          "/login",
          "/register",
          "/feedback",
          "/admin_login",
          "/admin_dashboard",
          "/editprice",
          "/editpriceAll",
        ].includes(location.pathname) && <Navbar />}

        <Routes>
          <Route exact path="/" element={<Landing />} />
          <Route path="/*" element={<MyRoutes />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        {/* Render Footer for all routes */}
        <Footer />
      </Fragment>
    </Provider>
  );
};

export default App;
