// import React, { useState, useEffect } from "react";
// import { Link } from "react-router-dom";
// import Landing from "./Landing";
import SeatSelection from "./SeatSelection/SeatSelection";
import PaymentTab from "./PaymentTab/PaymentTab";
import { connect } from "react-redux";
import { setAlert } from "../../actions/alert";
import PropTypes from "prop-types";

const BookBus = (setAlert) => {
  return (
    <div className="container">
      <div>
        <ul className="nav nav-pills">
          <li className="nav-item">
            <a className="nav-link " data-toggle="pill" href="/book/menu1">
              Select Seat
            </a>
            ``
          </li>
          <li className="nav-item">
            <a className="nav-link" data-toggle="pill" href="/book/menu2">
              Payment
            </a>
          </li>
        </ul>

        <div className="tab-content">
          <div className="tab-pane container fade mn-box" id="menu1">
            <SeatSelection />
          </div>
          <div className="tab-pane container fade mn-box" id="menu2">
            <PaymentTab />
          </div>
        </div>
      </div>
    </div>
  );
};

BookBus.propTypes = {
  setAlert: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { setAlert })(BookBus);
