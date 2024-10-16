import React, { Fragment, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { useDispatch, useSelector } from "react-redux";

import { getCurrentProfile, getTickets } from "../../actions/profile";
import { Link } from "react-router-dom";
// import DashboardActions from './DashboardActions'
// import Experience from './Experience'
// import Buses from "./Buses";
// const DashboardActions = () => {
//     return (
//         <div className='dash-buttons'>
//             <Link to='/edit-profile' className='btn btn-light'>
//                 <i className='fas fa-user-circle text-primary' /> Edit Profile
//         </Link>
//             <Link to='/add-experience' className='btn btn-light'>
//                 <i className='fab fa-black-tie text-primary' /> Add Experience
//         </Link>
//             <Link to='/add-buses' className='btn btn-light'>
//                 <i className='fas fa-graduation-cap text-primary' /> Add buses
//         </Link>
//         </div>
//     );
// };

const Dashboard = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCurrentProfile());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getTickets());
  }, [dispatch]);

  const currentUser = useSelector((state) => state.profile.profile) || [];
  const booked_tickets = useSelector((state) => state.profile.getTickets) || [];
  localStorage.setItem("currentUserId", currentUser.id); //save user id

  // console.log("currentUser", currentUser);
  // console.log("booked_tickets", booked_tickets);

  const hasCurrentUserTicket = booked_tickets.some(
    (ticket) => ticket.userId === currentUser.id
  ); //should return false if no tickets exits for a specific user, otherwise true

  return (
    <Fragment>
      <h1 className="welcomeText">Welcome To Dashboard</h1>
      <p className="lead">
        <i className="fas fa-user"></i> Hello{" "}
        <strong> {currentUser.name}. </strong>Nice To Meet You!!
      </p>
      {/* checking if false */}
      {hasCurrentUserTicket === false ? (
        <Fragment>
          <p className="NoBookedTickets">You don't have any booked buses.</p>
          <Link to="/" className="btn btn-primary my-1">
            Book Bus
          </Link>{" "}
        </Fragment>
      ) : (
        //needs to be pushed in profile
        <Fragment>
          <div classame="my-2">
            <p className="lead">
              <i className="fas fa-user"></i>
              You have pending Tickets, check your profile.
            </p>
            <Link to="/" className="btn btn-primary my-1">
              Book Bus
            </Link>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

Dashboard.propTypes = {
  currentUser: PropTypes.array.isRequired, //passed currentUser propTypes has 'array' from getCurrentUser
  booked_tickets: PropTypes.array.isRequired,
};

const mapStateToProps = (state) => ({
  currentUser: state.profile.profile,
  booked_tickets: state.profile.getTickets,
});

export default connect(mapStateToProps, { getCurrentProfile, getTickets })(
  Dashboard
);
