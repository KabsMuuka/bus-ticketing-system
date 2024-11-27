import React, { useState, useEffect } from "react";
import { FaAngleDoubleDown } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../../actions/auth";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import {
  storebus_secondBus,
  GetReservedSeats_secondbus,
} from "../../../actions/profile";
import { getCurrentProfile } from "../../../actions/profile";

const SeatSelection = ({ auth: { isAuthenticated, loading }, logout }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const storedSeats = useSelector((state) => state.profile.getSeat_2);
  const getcurrentUser = useSelector((state) => state.profile.getCurrentUser);

  const [name, setName] = useState([]);
  const [arrowDown, setArrowDown] = useState(false);
  const [gender, setGender] = useState([]);
  const [reservedSeat, setReservedSeat] = useState([]);
  const [seatNumber, setSeatNumber] = useState([]);
  const [currentUser, setCurrentUser] = useState([]);

  useEffect(() => {
    if (!isAuthenticated && !loading) {
      navigate("/login");
    }
  }, [isAuthenticated, loading, navigate]);

  useEffect(() => {
    dispatch(GetReservedSeats_secondbus());

    if (storedSeats) {
      const storedSeatNumbers = storedSeats.map((seat) => seat.seatNumber);
      setReservedSeat(storedSeatNumbers);
    }
  }, [dispatch, storedSeats]);

  useEffect(() => {
    dispatch(getCurrentProfile());
  }, [dispatch]);

  const getSeatNumber = (e) => {
    const newSeat = e.target.value;
    setSeatNumber([...seatNumber, newSeat]);
    setArrowDown(true);
    dispatch(storebus_secondBus(newSeat));
    localStorage.setItem("reservedSeats", newSeat);
  };

  // const handleGender = (e, seatNo) => {
  //   const { value } = e.target;
  //   setGender([...gender, value]);
  // };

  const handlePassengerName = (e, seatNo) => {
    const value = e.target.value;
    setName((prevNames) => {
      const updatedNames = [...prevNames, value];
      localStorage.setItem("passengerName", JSON.stringify(updatedNames));
      return updatedNames;
    });
  };

  const handleSubmitDetails = (e) => {
    e.preventDefault();
    setArrowDown(true);
    alert("Seat Confirmed.");
    navigate("/book/payments");
  };

  //username

  //username
  useEffect(() => {
    // Safely fetch the user's name
    const CurrentUserName = getcurrentUser?.name || "Guest";

    // Set current user only if it differs
    if (currentUser !== CurrentUserName) {
      setCurrentUser(CurrentUserName);
    }
  }, [currentUser]); // Empty dependency array ensures this only runs once
  const renderSeat = (seatId) => {
    const isReserved = reservedSeat.includes(seatId);
    return (
      <li className="inline-block m-2">
        <input
          type="checkbox"
          value={seatId}
          id={seatId}
          disabled={isReserved}
          onChange={getSeatNumber}
          className="hidden"
        />
        <label
          htmlFor={seatId}
          className={`block w-12 h-12 text-center text-white rounded ${
            isReserved
              ? "bg-gray-500 cursor-not-allowed"
              : "bg-blue-600 cursor-pointer hover:bg-blue-700"
          }`}
        >
          {isReserved ? "X" : seatId}
        </label>
      </li>
    );
  };

  const renderPassengerData = (seatArray) => {
    return seatArray.map((seat, idx) => (
      <div key={idx} className="mb-4">
        <form className="space-y-2">
          <p className="font-semibold text-center">Seat No: {seat}</p>
          <input
            type="text"
            placeholder="Enter Name"
            onBlur={(e) => handlePassengerName(e, seat)}
            value={currentUser}
            disabled
            className="w-full px-3 py-2 bg-slate-300 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {/* <div className="flex space-x-4">
            <label className="inline-flex items-center">
              <input
                type="radio"
                name={`gender-${seat}`}
                value="Male"
                onClick={(e) => handleGender(e, seat)}
                className="form-radio text-blue-600"
              />
              <span className="ml-2">Male</span>
            </label>
            <label className="inline-flex items-center">
              <input
                type="radio"
                name={`gender-${seat}`}
                value="Female"
                onClick={(e) => handleGender(e, seat)}
                className="form-radio text-blue-600"
              />
              <span className="ml-2">Female</span>
            </label>
          </div> */}
        </form>
      </div>
    ));
  };

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
        <span> home </span>
      </button>
      <div className="flex flex-col items-center min-h-screen p-8 bg-gray-100">
        <div className="flex flex-col md:flex-row w-full max-w-5xl">
          <div className="w-full md:w-2/3">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2 p-4 bg-white shadow-lg rounded-lg">
              {[
                "1A",
                "1B",
                "1C",
                "1D",
                "2A",
                "2B",
                "2C",
                "2D",
                "3A",
                "3B",
                "3C",
                "3D",
              ].map((seat) => renderSeat(seat))}

              {[
                "4A",
                "4B",
                "4C",
                "4D",
                "5A",
                "5B",
                "5C",
                "5D",
                "6A",
                "6B",
                "6C",
                "6D",
              ].map((seat) => renderSeat(seat))}

              {[
                "7A",
                "7B",
                "7C",
                "7D",
                "8A",
                "8B",
                "8C",
                "8D",
                "9A",
                "9B",
                "9C",
                "9D",
              ].map((seat) => renderSeat(seat))}

              {[
                "10A",
                "1B0",
                "10C",
                "10D",
                "11A",
                "11B",
                "11C",
                "11D",
                "12A",
                "12B",
                "12C",
                "12D",
              ].map((seat) => renderSeat(seat))}
            </div>
          </div>
          <div className="w-full md:w-1/3 p-4 space-y-4">
            <div className="bg-white shadow-lg p-6 rounded-lg">
              {renderPassengerData(seatNumber)}
            </div>
            <button
              onClick={handleSubmitDetails}
              className="px-4 py-2 w-full text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Confirm Details
            </button>
            <div
              className={`mt-4 text-center text-3xl ${
                arrowDown ? "visible" : "hidden"
              }`}
            >
              <FaAngleDoubleDown />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

SeatSelection.propTypes = {
  logout: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { logout })(SeatSelection);
