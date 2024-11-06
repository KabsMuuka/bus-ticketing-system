import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { logout } from "../../actions/auth";

const Navbar = ({ auth: { isAuthenticated, loading }, logout }) => {
  return (
    <div className="navbar bg-slate-300 rounded-lg">
      <div className="flex-1">
        <Link to={"/"} className="btn btn-ghost text-xl">
          Home
        </Link>
      </div>
      <div className="flex-none">
        <ul className="NavBar-Links flex space-x-4">
          <li>
            <Link to="/">Search Buses</Link>
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
          {!isAuthenticated && (
            <li>
              <Link to={"/login"}>
                <i className="fas fa-sign-out-alt mr-2"></i>
                login
              </Link>
            </li>
          )}

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
