import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";

const PrivateRoute = ({
  element: Element,
  auth: { isAuthenticated, loading },
}) => {
  const location = useLocation();

  if (loading) {
    return <div>Loading...</div>; // Or some loading spinner
  }

  return isAuthenticated ? (
    Element // Render the JSX element directly
  ) : (
    <Navigate to="/login" state={{ from: location }} />
  );
};

PrivateRoute.propTypes = {
  auth: PropTypes.object.isRequired,
  element: PropTypes.element.isRequired, // Expect a component type
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(PrivateRoute);
