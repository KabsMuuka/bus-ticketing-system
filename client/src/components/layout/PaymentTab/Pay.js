import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./network-service.css";
export default function Pay() {
  return (
    <>
      <form>
        <div className="networkContainer">
          {/* Airtel */}
          {/* Airtel */}
          <div className="Network-indiviual-component">
            <Link to={"/airtel"}>
              <img
                className="networkSevice"
                src="/airtel-png.png"
                alt="airtel"
              />
            </Link>
            <div className="label-container">
              <label className="label-network"> Airtel </label>
              <label className="label-network"> Max:230 </label>
            </div>
            <label className="arrow">
              {" "}
              <img className="arrow-icon" src="/arrow.png" />{" "}
            </label>
          </div>
          {/* Mtn */}
          {/* Mtn */}
          <div className="Network-indiviual-component">
            <Link to={"/mtn"}>
              <img className="networkSevice" src="/mtn-logo.svg" alt="mtn" />
            </Link>
            <div className="label-container">
              <label className="label-network"> Mtn </label>
              <label className="label-network"> Max:230 </label>
            </div>
            <label className="arrow">
              {" "}
              <img className="arrow-icon" src="/arrow.png" />{" "}
            </label>
          </div>
          {/* Zamtel */}
          {/* Zamtel */}
          <div className="Network-indiviual-component">
            <Link to={"/zamtel"}>
              <img className="networkSevice" src="/zamtel.png" alt="zamtel" />
            </Link>
            <div className="label-container">
              <label className="label-network"> Zamtel </label>
              <label className="label-network"> Max:230 </label>
            </div>
            <label className="arrow">
              {" "}
              <img className="arrow-icon" src="/arrow.png" />{" "}
            </label>
          </div>
        </div>
      </form>
    </>
  );
}
