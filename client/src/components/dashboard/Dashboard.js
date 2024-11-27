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

  const currentUser =
    useSelector((state) => state.profile.getCurrentUser) || [];
  const booked_tickets = useSelector((state) => state.profile.getTickets) || [];
  localStorage.setItem("currentUserId", currentUser.id); // save user id

  const hasCurrentUserTicket = booked_tickets.some(
    (ticket) => ticket.userId === currentUser.id
  ); // check if the user has booked tickets

  return (
    <div className="bg-gradient-to-r from-blue-100 to-purple-100 min-h-screen flex items-center justify-center">
      <div className="w-full max-w-4xl bg-white shadow-lg rounded-lg p-8">
        <Fragment>
          <h1 className="text-3xl font-bold text-gray-800 mb-4 text-center">
            Welcome to Your Dashboard
          </h1>

          <p className="text-lg text-gray-600 mb-6 text-center">
            <i className="fas fa-user-circle text-blue-500"></i> Hello{" "}
            <strong className="text-blue-700">{currentUser.name}</strong>, glad
            to see you!
          </p>

          {/* Checking if user has tickets */}
          {hasCurrentUserTicket === false ? (
            <Fragment>
              <p className="text-red-500 mb-6 text-center">
                You don't have any booked buses. Book a bus now!
              </p>
              <div className="text-center">
                <Link
                  to="/"
                  className="inline-block bg-blue-500 text-white py-3 px-6 rounded-lg shadow-md hover:bg-blue-600 transition duration-300"
                >
                  <i className="fas fa-bus-alt mr-2"></i> Book Bus
                </Link>
              </div>
            </Fragment>
          ) : (
            <Fragment>
              <div className="my-6 text-center">
                <p className="text-green-500 mb-6">
                  <i className="fas fa-check-circle text-green-600 mr-2"></i>{" "}
                  You have pending tickets. Check your profile.
                </p>
                <div className="text-center">
                  <Link
                    to="/profile"
                    className="inline-block bg-green-500 text-white py-3 px-6 rounded-lg shadow-md hover:bg-green-600 transition duration-300"
                  >
                    <i className="fas fa-user-circle mr-2"></i> View Tickets
                  </Link>
                </div>
              </div>
            </Fragment>
          )}
        </Fragment>
      </div>
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
