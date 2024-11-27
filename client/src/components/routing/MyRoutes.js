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
import Feedback from "../layout/Feedback";

import PrivateRoute from "./PrivateRoute";
// import BookBus from "../layout/BookBus";
import SeatSelection from "../layout/SeatSelection/SeatSelection";
import SeatSelection2 from "../layout/SeatSelection/SeatSelectionSecondBus";
import SeatSelection3 from "../layout/SeatSelection/SeatSelectionThirdBus";
import TicketPage from "../layout/TicketPage/TicketPage";
//payment
import Pay from "../layout/PaymentTab/Pay";
import Airtel from "../layout/PaymentTab/Airtel";
import Zamtel from "../layout/PaymentTab/Zamtel";
import Mtn from "../layout/PaymentTab/Mtn";
//end of payment

//admin
import Adminlgoin from "../auth/Admin_login";
import Admindashboard from "../layout/admin/Admindashboard";
import Editprice from "../layout/admin/Editprice";
import EditpriceAll from "../layout/admin/EditpriceAll";
import BookedTickets from "../layout/admin/bookedTickets";

//

const MyRoutes = () => {
  return (
    <section className="container">
      <Alert />
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/about" element={<About />} />
        <Route path="/feedback" element={<Feedback />} />

        <Route path="/admin_login" element={<Adminlgoin />} />
        <Route path="/admin_dashboard" element={<Admindashboard />} />
        <Route path="/editprice" element={<Editprice />} />
        <Route path="/editpriceAll" element={<EditpriceAll />} />
        <Route path="/bookedtickets" element={<BookedTickets />} />

        <Route
          path="/dashboard"
          element={<PrivateRoute element={<Dashboard />} />}
        />
        <Route
          path="/profile"
          element={<PrivateRoute element={<Profile />} />}
        />
        <Route
          path="/book/First Bus"
          element={<PrivateRoute element={<SeatSelection />} />}
        />
        <Route
          path="/book/Second Bus"
          element={<PrivateRoute element={<SeatSelection2 />} />}
        />
        <Route
          path="/book/Third Bus"
          element={<PrivateRoute element={<SeatSelection3 />} />}
        />
        {/* testing */}
        <Route path="/pay" element={<Pay />} />
        <Route path="/book/payments" element={<Pay />} />
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
