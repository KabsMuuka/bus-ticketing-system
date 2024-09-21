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
    <div className="container1">
      <div className="flex-container">
        <div className="row full">
          <div className="col-md-12">
            <div className="form-container">
              <div className="row sgnUp ">
                <div className="col-md-6 right-divider pdding">
                  <h3 className="lead-text mn-txt">Admin </h3>
                </div>
                <div className="left-divider">
                  <div className="col-md-6">
                    <form className="form" onSubmit={(e) => onSubmit(e)}>
                      <div className="form-group2">
                        <label htmlFor="email">Email :</label>
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
                        <label htmlFor="password">Password :</label>
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
                      </div>

                      <div className="form-group2">
                        <input
                          required
                          type="submit"
                          value="Login"
                          className="btn-primary btnn form-submit sub-btn sgnUp"
                        />
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
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