import React, { Fragment, useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer"; // Import your Footer component
import Landing from "./components/layout/Landing";
import "./App.css";
import MyRoutes from "./components/routing/MyRoutes"; //from rounting Routers
import NotFound from "./components/layout/NotFound";
import { loadUser } from "./actions/auth";
import setAuthToken from "./utils/setAuthToken";
// redux

const App = () => {
  const dispatch = useDispatch();
  const location = useLocation();

  useEffect(() => {
    if (localStorage.token) {
      console.log("token", localStorage.token);
      setAuthToken(localStorage.token);
    }
    dispatch(loadUser());
  }, [dispatch]);

  return (
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
        "/bookedtickets",
        "/report",
      ].includes(location.pathname) && <Navbar />}

      <Routes>
        <Route exact path="/" element={<Landing />} />
        <Route path="/*" element={<MyRoutes />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      {/* Render Footer for all routes */}
      <Footer />
    </Fragment>
  );
};

export default App;
