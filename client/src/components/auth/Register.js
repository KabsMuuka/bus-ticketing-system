import React, { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { connect } from "react-redux";
import { setAlert } from "../../actions/alert";
import PropTypes from "prop-types";
import { register } from "../../actions/auth";

const Register = ({ setAlert, register, isAuthenticated }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phoneNumber: "",
    password: "",
    password2: "",
    gender: "",
  });

  const { name, email, phoneNumber, password, password2, gender } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    if (password !== password2) {
      setAlert("Passwords do not match", "danger");
    } else {
      register({ name, email, phoneNumber, gender, password });
    }
  };

  if (isAuthenticated) {
    return <Navigate to="/login" />;
  }

  return (
    <div className="flex items-center justify-center min-h-96 mt-2 bg-gray-100">
      <div className="w-full max-w-md bg-white rounded-lg shadow-md p-6">
        <h3 className="text-2xl font-semibold text-center mb-4">Signup Here</h3>
        <form onSubmit={onSubmit}>
          <div className="mb-4">
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700"
            >
              Name
            </label>
            <input
              type="text"
              placeholder="Name"
              name="name"
              value={name}
              className="mt-1 block bg-slate-300 w-full border border-gray-300 rounded-md p-2"
              onChange={onChange}
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              required
              name="email"
              placeholder="Ex: example@gmail.com"
              value={email}
              type="email"
              className="mt-1 bg-slate-300 block w-full border border-gray-300 rounded-md p-2"
              onChange={onChange}
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="phoneNumber"
              className="block text-sm font-medium text-gray-700"
            >
              Phone Number
            </label>
            <input
              required
              name="phoneNumber"
              placeholder="076xxxx02"
              value={phoneNumber}
              type="text"
              className="mt-1 bg-slate-300 block w-full border border-gray-300 rounded-md p-2"
              onChange={onChange}
            />
          </div>

          <div className="mb-4 flex items-center">
            <input
              required
              type="radio"
              id="Male"
              name="gender"
              value="Male"
              className="mr-2"
              onChange={onChange}
            />
            <label htmlFor="Male" className="mr-4">
              Male
            </label>
            <input
              required
              type="radio"
              id="Female"
              name="gender"
              value="Female"
              className="mr-2 bg-slate-300"
              onChange={onChange}
            />
            <label htmlFor="Female">Female</label>
          </div>

          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
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
              className="mt-1 block bg-slate-300 w-full border border-gray-300 rounded-md p-2"
              onChange={onChange}
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="password2"
              className="block text-sm font-medium text-gray-700"
            >
              Confirm Password
            </label>
            <input
              required
              id="password2"
              name="password2"
              value={password2}
              placeholder="Confirm Password"
              type="password"
              className="mt-1 block bg-slate-300 w-full border border-gray-300 rounded-md p-2"
              onChange={onChange}
            />
          </div>
          <div className="mb-4">
            <input
              required
              type="submit"
              value="Register"
              className="w-full bg-blue-500 text-white font-semibold py-2 rounded-md hover:bg-blue-600"
            />
          </div>
          <div className="text-center">
            <small className="text-gray-600">Already a User?</small>
            <span className="text-blue-500 hover:underline">
              <Link to="/login">Sign-In</Link>
            </span>
          </div>
        </form>
      </div>
    </div>
  );
};

Register.propTypes = {
  setAlert: PropTypes.func.isRequired,
  register: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { setAlert, register })(Register);
