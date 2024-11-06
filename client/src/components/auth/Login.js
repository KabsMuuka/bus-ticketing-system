import React, { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { FaFacebookF, FaGoogle } from "react-icons/fa";
import { login } from "../../actions/auth";
import Spinner from "../layout/Spinner";

const Login = ({ login, isAuthenticated }) => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { email, password } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    setTimeout(() => {
      setLoading(false);
    }, 3000);

    login(email, password);
  };

  if (isAuthenticated) {
    return <Navigate to="/dashboard" />;
  }

  return (
    <div className="flex items-center justify-center mt-2 mb-2 ">
      <div className="rounded-lg shadow-lg p-8 w-full max-w-md">
        <h3 className="text-2xl font-bold text-center mb-4">Signin Here</h3>

        <div className="flex justify-center space-x-4 mb-4">
          <div className="flex items-center justify-center bg-blue-500 text-white rounded-full p-2 cursor-pointer">
            <FaFacebookF />
          </div>
          <div className="flex items-center justify-center bg-red-500 text-white rounded-full p-2 cursor-pointer">
            <FaGoogle />
          </div>
        </div>

        <form
          className="flex items-center flex-col justify-center "
          onSubmit={(e) => onSubmit(e)}
        >
          <div className="mb-4">{loading && <Spinner />}</div>
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium mb-1">
              Email
            </label>
            <input
              required
              className="input text-black bg-slate-200 input-bordered w-full max-w-xs"
              name="email"
              placeholder="example@gmail.com"
              value={email}
              type="email"
              onChange={(e) => onChange(e)}
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-sm font-medium mb-1"
            >
              Password
            </label>
            <input
              required
              id="password"
              name="password"
              value={password}
              placeholder="Password"
              type="password"
              className="input bg-slate-200 input-bordered w-full max-w-xs"
              onChange={(e) => onChange(e)}
            />

            <div className="mb-4">
              <input
                required
                type="submit"
                value="Login"
                className="mt-2 bg-blue-500 rounded py-2 w-full cursor-pointer hover:bg-blue-600 transition duration-200"
              />
            </div>
          </div>

          <div className="text-center">
            <small className="text-gray-600">
              Don't have an account?{" "}
              <Link to="/register" className="text-blue-500 hover:underline">
                Sign-Up
              </Link>
            </small>
            <br />
            <small>
              <Link to="/admin_login" className="text-blue-500 hover:underline">
                Login as Admin
              </Link>
            </small>
          </div>
        </form>
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

export default connect(mapStateToProps, { login })(Login);
