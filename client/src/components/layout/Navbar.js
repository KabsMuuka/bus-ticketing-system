import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { logout } from "../../actions/auth";

const Navbar = ({ auth: { isAuthenticated, loading }, logout }) => {
  return (
    <div className="navbar bg-slate-100 rounded-lg">
      <div className="flex-1">
        {/* if isAuthenticated show home */}
        {isAuthenticated && (
          <Link to={"/"} className="btn btn-ghost text-xl">
            Home
          </Link>
        )}
        {/* if isAuthenticated hide sigin and register */}
        {!isAuthenticated && (
          <>
            <span className="mr-0.5"> Hi! </span>{" "}
            <Link className="mr-0.5 text-blue-600 underline" to={"/login"}>
              {/* <i className="fas fa-sign-out-alt mr-2"></i> */}
              Sign in
            </Link>
            <span className="mr-1"> or </span>{" "}
            <Link className="mr-2 text-blue-600 underline" to={"/register"}>
              register
            </Link>
          </>
        )}
      </div>

      <div className="flex-none">
        <ul className="NavBar-Links flex space-x-4">
          <li>
            <Link to="/">Search</Link>
          </li>

          {isAuthenticated && (
            <li>
              <Link to="/profile" className="flex items-center">
                <i className="fas fa-user mr-2"></i>
                Profile
              </Link>
            </li>
          )}

          {/* Conditionally render the Logout link */}

          {/* Conditionally render the Logout link */}
          {isAuthenticated && (
            <li>
              <a onClick={logout} href="#!">
                <i className="fas fa-sign-out-alt mr-2"></i>
                Logout
              </a>
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
