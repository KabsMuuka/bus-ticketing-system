import { Link, Navigate, useNavigate } from "react-router-dom";
import { logout } from "../../../actions/auth";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import "./network-service.css";

import { useState, useEffect } from "react";

const NetworkCard = ({
  linkTo,
  imageSrc,
  altText,
  networkName,
  bgColor,
  textColor,
}) => (
  <div className={`network-individual ${bgColor}`} style={{ color: textColor }}>
    <Link to={linkTo} aria-label={`Go to ${networkName} page`}>
      <img className="networkSevice" src={imageSrc} alt={altText} />
    </Link>
    <div className="label-container">
      <label className="label-network">{networkName}</label>
    </div>
    <label className="arrow">
      <img className="arrow-icon" src="/arrow.png" alt="arrow" />
    </label>
  </div>
);

const Pay = ({ auth: { isAuthenticated, loading }, logout }) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated && !loading) {
      navigate("/login");
    }
  }, [isAuthenticated, loading, navigate]);

  return (
    <div>
      <button className="mt-2 flex items-center space-x-1">
        <Link to={"/"}>
          <img
            class="w-5 transition-all duration-2000 hover:scale-110"
            src="/back-button-svgrepo-com.svg"
            title="back button"
          />
        </Link>
        <span>home</span>
      </button>

      <div className="networkContainer h-96">
        {/* Removed form tag if it's not being utilized */}
        <NetworkCard
          linkTo="/airtel"
          imageSrc="/airtel-png.png"
          altText="Airtel"
          networkName="Airtel"
          bgColor="bg-airtel"
          textColor="white"
        />
        <NetworkCard
          linkTo="/mtn"
          imageSrc="/mtn-logo.svg"
          altText="MTN"
          networkName="MTN"
          bgColor="bg-mtn"
          textColor="black"
        />
        <NetworkCard
          linkTo="/zamtel"
          imageSrc="/zamtel.png"
          altText="Zamtel"
          networkName="Zamtel"
          bgColor="bg-zamtel"
          textColor="white"
        />
      </div>
    </div>
  );
};
Pay.propTypes = {
  logout: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { logout })(Pay);
