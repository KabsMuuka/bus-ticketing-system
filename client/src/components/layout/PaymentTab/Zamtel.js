import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Spinner from "../Spinner";

const {
  getCurrentProfile,
  requesttopay,
  verifyPayment,
} = require("../../../actions/profile");

export default function Mtn() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const currentUser = useSelector((state) => state.profile.profile);

  useEffect(() => {
    dispatch(getCurrentProfile());
  }, [dispatch]);

  const [userContact, setUserContact] = useState(currentUser.phoneNumber);
  const [amount, setAmount] = useState(localStorage.getItem("price"));
  const [loading, setLoading] = useState(false);

  const handleMerchantID = (e) => {
    e.preventDefault();
    setUserContact(e.target.value);
  };

  const moveToTicketPage = (e) => {
    e.preventDefault();
    const PayInfo = {
      userContact,
      amount,
    };
    setLoading(true);
    try {
      dispatch(requesttopay(PayInfo));
      setTimeout(() => {
        navigate("/book/ticket");
      }, 5000);
    } catch (error) {
      alert("An error occurred during payment verification.");
    }
  };

  return (
    <section className="container mx-auto p-4">
      <form className="flex flex-col items-center bg-white p-6 rounded-lg shadow-lg">
        <h5 className="text-xl font-semibold mb-2">Pay using Zamtelamtel</h5>
        <img src="/zamtel.png" width={200} alt="Zamtel Logo" />

        <div className="flex flex-col space-y-4 w-full max-w-xs">
          {loading && <Spinner className="mt-4" />}{" "}
          {/* Spinner below the form */}
          <label className="font-medium">{userContact}</label>
          <input
            type="text"
            className="input bg-slate-200 border border-gray-300 rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="phone number"
            value={userContact}
            onChange={handleMerchantID}
          />
          <label className="font-medium">Amount</label>
          <input
            type="text"
            className="input bg-slate-200 border border-gray-300 rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Price"
            value={amount}
            readOnly // Make it read-only as it's retrieved from localStorage
          />
          <button
            type="button"
            onClick={moveToTicketPage}
            className="bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
          >
            Make Payment
          </button>
        </div>
      </form>
    </section>
  );
}
