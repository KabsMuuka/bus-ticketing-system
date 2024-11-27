import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Spinner from "../Spinner";

const {
  getCurrentProfile,
  requesttopay,
  verifyPayment,
} = require("../../../actions/profile");

export default function Mtn() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const currentUser = useSelector((state) => state.profile.getCurrentUser);

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
    <div>
      {/* Back Button */}
      <button className="mt-2 flex items-center space-x-1">
        <Link to={"/pay"}>
          <img
            className="w-5 transition-all duration-2000 hover:scale-110"
            src="/back-button-svgrepo-com.svg"
            title="back button"
          />
        </Link>
        <span className="font-medium text-lg text-blue-600">Back</span>
      </button>

      {/* Payment Form */}

      <section className="container flex justify-center mx-auto p-4">
        <form className="flex flex-col items-center bg-white p-6 rounded-lg shadow-lg w-full max-w-md mt-4">
          <h5 className="text-xl font-semibold mb-2">Pay using zamtel</h5>
          <img
            src="/zamtel.png"
            width={200}
            alt="Zamtel Logo"
            className="mb-4"
          />
          <p className="mb-4 text-lg text-gray-700">
            Please enter your contact details
          </p>

          {/* Form fields */}
          <div className="flex flex-col space-y-4 w-full">
            {loading && (
              <div className="flex justify-center mb-4">
                <Spinner className="mt-4" /> {/* Spinner for loading */}
              </div>
            )}
            <label className="font-medium text-gray-800">Phone Number</label>
            <input
              type="tel"
              className="input bg-slate-200 border border-gray-300 rounded p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter phone number"
              value={userContact}
              onChange={handleMerchantID}
              required
            />

            <label className="font-medium text-gray-800">Amount</label>
            <input
              type="text"
              className="input bg-slate-200 border border-gray-300 rounded p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Price"
              value={amount}
              readOnly
            />

            <button
              type="button"
              onClick={moveToTicketPage}
              className="bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition duration-300"
            >
              Make Payment
            </button>
          </div>
        </form>
      </section>
    </div>
  );
}
