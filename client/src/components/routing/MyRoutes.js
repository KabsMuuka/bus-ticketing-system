import React from "react";
import { Route, Routes } from "react-router-dom";
import "../../App.css";
import Login from "../auth/Login";
import Register from "../auth/Register";

import Alert from "../layout/Alert";
import Dashboard from "../dashboard/Dashboard";
// import CreateProfile from '../profile-forms/CreateProfile'
// import EditProfile from '../profile-forms/EditProfile'
// import AddExperience from '../profile-forms/AddExperience'
// import Addbuses from '../profile-forms/Addbuses'
// import Profiles from '../profiles/Profiles'
import Profile from "../layout/Profile";
// import Posts from '../posts/Posts'
// import Post from '../post/Post'
import NotFound from "../layout/NotFound";
import About from "../layout/About";
import PrivateRoute from "./PrivateRoute";
// import BookBus from "../layout/BookBus";
import PaymentTab from "../layout/PaymentTab/PaymentTab";
import SeatSelection from "../layout/SeatSelection/SeatSelection";
import TicketPage from "../layout/TicketPage/TicketPage";
//payment
import Pay from "../layout/PaymentTab/Pay";
import Airtel from "../layout/PaymentTab/Airtel";
import Zamtel from "../layout/PaymentTab/Zamtel";
import Mtn from "../layout/PaymentTab/Mtn";
//end of payment

//admin
import Admin_dashboard from "../layout/admin/Dashboard";
//

const MyRoutes = () => {
  return (
    <section className="container">
      <Alert />
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/about" element={<About />} />
        <Route path="/admin" element={<Admin_dashboard />} />
        <Route
          path="/dashboard"
          element={<PrivateRoute element={<Dashboard />} />}
        />
        <Route
          path="/profile"
          element={<PrivateRoute element={<Profile />} />}
        />
        <Route
          path="/book/menu1"
          element={<PrivateRoute element={<SeatSelection />} />}
        />
        {/* testing */}
        <Route path="/pay" element={<Pay />} />
        <Route path="/book/menu2" element={<Pay />} />s
        <Route path="/airtel" element={<Airtel />} />
        <Route path="/zamtel" element={<Zamtel />} />
        <Route path="/mtn" element={<Mtn />} />
        {/* testing */}
        {/* <Route
          path="/book/menu2"
          element={<PrivateRoute element={<PaymentTab />} />} paymentTable
        /> */}
        <Route
          path="/book/ticket"
          element={<PrivateRoute element={<TicketPage />} />}
        />
        <Route path="*" element={<NotFound />} />
      </Routes>{" "}
    </section>
  );
};

export default MyRoutes;