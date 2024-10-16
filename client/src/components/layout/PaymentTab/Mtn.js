import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import "./network-service.css";
import Spinner from "../Spinner";

//use profile
const {
  getCurrentProfile,
  requesttopay,
  verifyPayment,
} = require("../../../actions/profile");

export default function Mtn() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const currentUser = useSelector((state) => state.profile.profile); //.profile.profile, file name, then profile defined in profile.js
  // const verifiedPayment = useSelector((state) => state.profile.verifypayment);

  //get current user
  useEffect(() => {
    getCurrentProfile();
  }, [dispatch]);

  //get verified payment

  const [userContact, setUsercontact] = useState(currentUser.phoneNumber);
  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(false);

  const handleMechantID = (e) => {
    e.preventDefault();
    setUsercontact(e.target.value);
  };

  const handlePrice = (e) => {
    e.preventDefault();
    setAmount(e.target.value);
  };

  const moveToTicketPage = (e) => {
    e.preventDefault();

    //only triger when a button is clicked
    const PayInfo = {
      userContact,
      amount,
    };
    setLoading(true); //show loading state
    try {
      dispatch(requesttopay(PayInfo));

      setTimeout(async () => {
        // await dispatch(verifyPayment()).then((verifiedPayment) => {
        //   console.log("verifiedPayment", verifiedPayment); //verifiedPayment); testing
        // if (verifiedPayment) {
        navigate("/book/ticket");
        // } else {
        //   alert("Payment verification failed");
        // }
        // });
      }, 5000);
    } catch (error) {
      alert("An error occurred during payment verification.");
    }
  };

  return (
    <>
      <section className="network-container">
        <h5> Pay using Mtn </h5>
        <p>
          Easily pay using Mtn Mobile Money. Simply enter mechantID and amount
          to pay below{" "}
        </p>

        <form className="mtn-form">
          <img src="/mtn-logo.svg" />
          <span>Your Mobile number</span>
          <p>0770309802</p>
          <div className="service">
            <label>Amount</label>
            <input
              type="text"
              placeholder="Mtn phone number"
              value={userContact}
              onChange={(e) => {
                handleMechantID(e);
              }}
            />
            <input
              type="text"
              placeholder="Price"
              value={amount}
              onChange={(e) => {
                handlePrice(e);
              }}
            />
            <button onClick={moveToTicketPage}> Make Payment </button>
            {loading && <Spinner />}{" "}
            {/* render Spinner when only if loading is true */}
          </div>
        </form>
      </section>
    </>
  );
}
