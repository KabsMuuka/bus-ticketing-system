import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import "./network-service.css";
//use profile
const { getCurrentProfile } = require("../../../actions/profile");
export default function Zamtel() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const currentUser = useSelector((state) => state.profile.profile); //.profile.profile, file name, then profile defined in profile.js

  useEffect(() => {
    getCurrentProfile();
  }, [dispatch]);

  const [userContact, setUsercontact] = useState(currentUser.phoneNumber);
  const [price, setPrice] = useState("230");

  const handleMechantID = (e) => {
    e.preventDefault();
    setUsercontact(e.target.value);
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
      <div className="network-content">
        <h5> Pay using Zamtel </h5>
        <p>
          Easily pay using Zamtel Mobile Money. Simply enter mechantID and
          amount to pay below{" "}
        </p>
      </div>
      <form className="airtel-form">
        <img src="/zamtel.png" />
        <span>Your Mobile number</span>
        <p>0770309802</p>
        <div className="service">
          <label>Amount</label>
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
          <button onClick={moveToTicketPage}> Pay </button>
        </div>
      </form>
    </>
  );
}
