import React, { useState } from "react";
import { Navigate } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { admin } from "../../actions/auth";

const Login = ({ admin, isAuthenticated }) => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const { email, password } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });
  const onSubmit = async (e) => {
    e.preventDefault();
    admin(email, password);
  };
  if (isAuthenticated) {
    return <Navigate to="/admin_dashboard" />;
  }

  return (
    <div className="h-96 p-3">
      <h3 className="text-center p-2 font-bold 2xl:">Login as admin </h3>
      <div className="left-divider">
        <div className="flex justify-center">
          <form className="" onSubmit={(e) => onSubmit(e)}>
            <div className="form-group2">
              <label htmlFor="email">Email </label>
              <input
                required
                name="email"
                placeholder="Ex:- example@gmail.com"
                value={email}
                type="email"
                className="form-control sgnUp"
                onChange={(e) => onChange(e)}
              />
            </div>

            <div className="form-group2">
              <label htmlFor="password">Password </label>
              <input
                required
                id="password"
                name="password"
                value={password}
                placeholder="password"
                type="password"
                className="form-control sgnUp"
                onChange={(e) => onChange(e)}
              />

              <input
                required
                type="submit"
                value="Login"
                className="bg-blue-500 p-1 w-30 rounded-lg text-white mt-1"
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

Login.propTypes = {
  login: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { admin })(Login);
