import React from "react";
import { useNavigate } from "react-router-dom";

function withNavigation(Component) {
  return function WithNavigationProp(props) {
    const navigate = useNavigate();
    return <Component {...props} navigate={navigate} />;
  };
}
export default withNavigation;
