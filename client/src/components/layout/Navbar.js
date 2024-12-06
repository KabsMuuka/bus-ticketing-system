import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { logout } from "../../actions/auth";

const Navbar = ({ auth: { isAuthenticated, loading }, logout }) => {
  return (
    <div className="navbar bg-slate-100 rounded-lg shadow-lg p-4">
      <div className="flex-1 flex items-center">
        {/* Display Home link if authenticated */}
        {isAuthenticated && (
          <Link to="/dashboard" className="btn btn-ghost text-xl font-semibold">
            Home
          </Link>
        )}

        {/* Sign-in and register links if not authenticated */}
        {!isAuthenticated && (
          <div className="flex items-center space-x-2">
            <span>Hi!</span>
            <Link
              className="text-blue-600 underline hover:text-blue-800"
              to="/login"
            >
              Sign in
            </Link>
            <span>or</span>

            <Link
              className="text-blue-600 underline hover:text-blue-800"
              to="/register"
            >
              Register
            </Link>
          </div>
        )}
      </div>

      {/* Right side links */}
      <div className="flex-none">
        <ul className="flex items-center space-x-6">
          <li>
            <Link
              to="/"
              className="text-gray-700 hover:text-gray-900 font-medium"
            >
              Search
            </Link>
          </li>

          {/* Profile link if authenticated */}
          {isAuthenticated && (
            <li>
              <Link
                to="/profile"
                className="flex items-center text-gray-700 hover:text-gray-900 font-medium"
              >
                <i className="fas fa-user mr-2"></i> Profile
              </Link>
            </li>
          )}

          {/* Logout link if authenticated */}
          {isAuthenticated && (
            <li>
              <button
                onClick={logout}
                className="text-red-600 hover:text-red-800 font-medium flex items-center"
              >
                <i className="fas fa-sign-out-alt mr-2"></i> Logout
              </button>
            </li>
          )}
        </ul>
      </div>
    </div>
  );
};

Navbar.propTypes = {
  logout: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { logout })(Navbar);
