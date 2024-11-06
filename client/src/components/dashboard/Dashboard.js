import React, { Fragment, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { useDispatch, useSelector } from "react-redux";
import { getCurrentProfile, getTickets } from "../../actions/profile";
import { Link } from "react-router-dom";

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
  localStorage.setItem("currentUserId", currentUser.id); // save user id

  const hasCurrentUserTicket = booked_tickets.some(
    (ticket) => ticket.userId === currentUser.id
  ); // check if the user has booked tickets

  return (
    <div className="flex flex-col items-center justify-center h-96 bg-gray-100">
      <Fragment>
        <h1 className="text-3xl font-bold mb-4">Welcome To Dashboard</h1>
        <p className="text-lg mb-6">
          <i className="fas fa-user"></i> Hello{" "}
          <strong>{currentUser.name}</strong>, Nice To Meet You!!
        </p>
        {/* Checking if false */}
        {hasCurrentUserTicket === false ? (
          <Fragment>
            <p className="text-red-500 mb-4">
              You don't have any booked buses.
            </p>
            <Link
              to="/"
              className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition"
            >
              Book Bus
            </Link>
          </Fragment>
        ) : (
          <Fragment>
            <div className="my-2">
              <p className="text-green-500 mb-4">
                <i className="fas fa-user"></i> You have pending tickets, check
                your profile.
              </p>
              <Link
                to="/"
                className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition"
              >
                Book Bus
              </Link>
            </div>
          </Fragment>
        )}
      </Fragment>
    </div>
  );
};

Dashboard.propTypes = {
  currentUser: PropTypes.array.isRequired,
  booked_tickets: PropTypes.array.isRequired,
};

const mapStateToProps = (state) => ({
  currentUser: state.profile.profile,
  booked_tickets: state.profile.getTickets,
});

export default connect(mapStateToProps, { getCurrentProfile, getTickets })(
  Dashboard
);
