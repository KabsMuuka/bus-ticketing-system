import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import "./network-service.css";
//use profile
const { getCurrentProfile } = require("../../../actions/profile");

export default function Airtel() {
  const dispatch = useDispatch();

  const currentUser = useSelector((state) => state.profile.profile); //.profile.profile, file name, then profile defined in profile.js

  useEffect(() => {
    getCurrentProfile();
  }, [dispatch]);

  const navigate = useNavigate();
  const [userContact, setMechantID] = useState(currentUser.phoneNumber);
  const [price, setPrice] = useState("230");

  const handleMechantID = (e) => {
    e.preventDefault();
    setMechantID(e.target.value);
  };

  const handlePrice = (e) => {
    e.preventDefault();
    setPrice(e.target.value);
  };

  const moveToTicketPage = (e) => {
    e.preventDefault();
    navigate("/book/ticket"); // Use navigate for routing
  };

  return (
    <>
      <div className="network-container">
        <h5> Pay using Airtel </h5>
        <p>
          Easily pay using Airtel Mobile Money. Simply enter mechantID and
          amount to pay below{" "}
        </p>
      </div>
      <form className="airtel-form">
        <img src="/airtel-png.png" />
        <span>Your Mobile number</span>
        <p>{currentUser.phoneNumber}</p>
        <div className="service">
          <label>payments</label>
          <input
            type="text"
            placeholder="mechantID"
            value={userContact}
            onChange={(e) => {
              handleMechantID(e);
            }}
          />
          <input
            type="text"
            placeholder="Price"
            value={price}
            onChange={(e) => {
              handlePrice(e);
            }}
          />
          <button onClick={moveToTicketPage}> Make payment </button>
        </div>
      </form>
    </>
  );
}
