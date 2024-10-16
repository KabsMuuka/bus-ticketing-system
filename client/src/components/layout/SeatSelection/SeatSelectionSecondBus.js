import React, { useState, useEffect } from "react";
import { FaAngleDoubleDown } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { storebus_secondBus } from "../../../actions/profile";
import { GetReservedSeats_secondbus } from "../../../actions/profile";
import "./Tab.css";

export default function SeatSelection() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [name, setName] = useState([]);
  const [arrowDown, setArrowDown] = useState(false);
  const [gender, setGender] = useState([]);
  const [reservedSeat, setReservedSeat] = useState([]);
  const [seatNumber, setSeatnumber] = useState([]);

  //using axios to fetch stored seats and compare
  const storedSeats = useSelector((state) => state.profile.getSeat_2);

  //dispatch GetReservedSeats
  useEffect(() => {
    dispatch(GetReservedSeats_secondbus());

    if (storedSeats) {
      const storedseates = storedSeats.map((seats) => {
        return seats.seatNumber;
      });
      setReservedSeat(storedseates);
    }
  }, [dispatch]);

  const getSeatNumber = (e) => {
    let newSeat = e.target.value;

    // Update state with the selected seat number
    setSeatnumber(seatNumber.concat(newSeat));

    // Display the dropdown (arrow down) when a seat is selected
    setArrowDown(true);

    dispatch(storebus_secondBus(newSeat)); // Store the selected seat
    localStorage.setItem("reservedSeats", newSeat);
  };

  const handleGender = (e, seatNo) => {
    const { value } = e.target;
    setGender(gender.concat(value));
  };

  const handlePassengerName = (e, seatNo) => {
    e.preventDefault();
    let value = e.target.value;

    // console.log(value);
    if (!value) {
      return setName("name is required");
    } else {
      // Update state and localStorage in a single operation
      setName((prevNames) => {
        const updatedNames = [...prevNames, value]; // Create a new array
        localStorage.setItem("passengerName", JSON.stringify(updatedNames)); // Store it in localStorage
        return updatedNames; // Return the updated state
      });
    }
  };

  let passengerName = JSON.parse(localStorage.getItem("passengerName")) || [];

  console.log(passengerName);

  const handleSubmitDetails = (e) => {
    e.preventDefault();
    setArrowDown(true);
    alert("Seat Confirmed.");
    navigate("/book/payments");
  };

  const renderPassengerData = (seatArray) => {
    return seatArray.map((seat, idx) => {
      return (
        <div key={idx}>
          <form className="form seatfrm">
            <p className="text-capitalize text-center">Seat No:{seat}</p>
            <input
              className="form-control"
              onBlur={(e) => handlePassengerName(e, seat)}
              type="text"
              name="passenger-name"
              placeholder="Enter Name"
            />
            <div className="form-check form-check-inline">
              <input
                className="form-check-input"
                type="radio"
                name={`gender-${seat}`}
                id="male"
                value="Male"
                onClick={(e) => handleGender(e, seat)}
              />
              <label className="form-check-label" htmlFor="male">
                Male
              </label>
            </div>
            <div className="form-check form-check-inline">
              <input
                className="form-check-input"
                type="radio"
                name={`gender-${seat}`}
                id="female"
                value="Female"
                onClick={(e) => handleGender(e, seat)}
              />
              <label className="form-check-label" htmlFor="female">
                Female
              </label>
            </div>
          </form>
        </div>
      );
    });
  };

  const renderSeat = (seatId) => {
    const isReserved = reservedSeat.includes(seatId);

    return (
      <li className="seat">
        <input
          type="checkbox"
          value={seatId}
          id={seatId}
          disabled={isReserved}
          onChange={getSeatNumber}
        />
        <label htmlFor={seatId}>{isReserved ? "X" : seatId}</label>
      </li>
    );
  };

  return (
    <div>
      <div className="ss">
        <div className="row">
          <div className="column1">
            <div className="plane">
              <form>
                <ol className="cabin fuselage">
                  {/* Row 1 */}
                  <li className="row row--1">
                    <ol className="seats" type="A">
                      {renderSeat("1A")}
                      {renderSeat("1B")}
                      {renderSeat("1C")}
                      {renderSeat("1D")}
                      {/* More seats */}
                    </ol>
                  </li>
                  <li className="row row--1">
                    <ol className="seats" type="A">
                      {renderSeat("2A")}
                      {renderSeat("2B")}
                      {renderSeat("2C")}
                      {renderSeat("2D")}
                      {/* More seats */}
                    </ol>
                  </li>
                  {/* More rows */}
                  <li className="row row--1">
                    <ol className="seats" type="A">
                      {renderSeat("3A")}
                      {renderSeat("3B")}
                      {renderSeat("3C")}
                      {renderSeat("3D")}
                      {/* More seats */}
                    </ol>
                  </li>
                  <li className="row row--1">
                    <ol className="seats" type="A">
                      {renderSeat("4A")}
                      {renderSeat("4B")}
                      {renderSeat("4C")}
                      {renderSeat("4D")}
                      {/* More seats */}
                    </ol>
                  </li>
                  <li className="row row--1">
                    <ol className="seats" type="A">
                      {renderSeat("5A")}
                      {renderSeat("5B")}
                      {renderSeat("5C")}
                      {renderSeat("5D")}
                      {/* More seats */}
                    </ol>
                  </li>

                  <li className="row row--1">
                    <ol className="seats" type="A">
                      {renderSeat("6A")}
                      {renderSeat("6B")}
                      {renderSeat("6C")}
                      {renderSeat("6D")}
                      {/* More seats */}
                    </ol>
                  </li>
                  <li className="row row--1">
                    <ol className="seats" type="A">
                      {renderSeat("7A")}
                      {renderSeat("7B")}
                      {renderSeat("7C")}
                      {renderSeat("7D")}
                      {/* More seats */}
                    </ol>
                  </li>
                  <li className="row row--1">
                    <ol className="seats" type="A">
                      {renderSeat("8A")}
                      {renderSeat("8B")}
                      {renderSeat("8C")}
                      {renderSeat("8D")}
                      {/* More seats */}
                    </ol>
                  </li>
                  <li className="row row--1">
                    <ol className="seats" type="A">
                      {renderSeat("9A")}
                      {renderSeat("9B")}
                      {renderSeat("9C")}
                      {renderSeat("9D")}
                      {/* More seats */}
                    </ol>
                  </li>
                  <li className="row row--1">
                    <ol className="seats" type="A">
                      {renderSeat("10A")}
                      {renderSeat("10B")}
                      {renderSeat("10C")}
                      {renderSeat("10D")}
                      {/* More seats */}
                    </ol>
                  </li>
                  <li className="row row--1">
                    <ol className="seats" type="A">
                      {renderSeat("11A")}
                      {renderSeat("11B")}
                      {renderSeat("11C")}
                      {renderSeat("11D")}
                      {/* More seats */}
                    </ol>
                  </li>
                  <li className="row row--1">
                    <ol className="seats" type="A">
                      {renderSeat("12A")}
                      {renderSeat("12B")}
                      {renderSeat("12C")}
                      {renderSeat("12D")}
                      {/* More seats */}
                    </ol>
                  </li>
                  <li className="row row--1">
                    <ol className="seats" type="A">
                      {renderSeat("13A")}
                      {renderSeat("13B")}
                      {renderSeat("13C")}
                      {renderSeat("13")}
                      {/* More seats */}
                    </ol>
                  </li>
                  <li className="row row--1">
                    <ol className="seats" type="A">
                      {renderSeat("14A")}
                      {renderSeat("14B")}
                      {renderSeat("14C")}
                      {renderSeat("14D")}
                      {/* More seats */}
                    </ol>
                  </li>
                  <li className="row row--1">
                    <ol className="seats" type="A">
                      {renderSeat("15A")}
                      {renderSeat("15B")}
                      {renderSeat("15C")}
                      {renderSeat("15D")}
                      {/* More seats */}
                    </ol>
                  </li>
                </ol>
              </form>
            </div>
          </div>
          <div className="column2">
            <div className="seatInfo">
              <form className="form-group">
                {renderPassengerData(seatNumber)}
              </form>
              <div>
                <button
                  onClick={(e) => handleSubmitDetails(e)}
                  className="confirmBtn seatBT"
                >
                  Confirm Details
                </button>
              </div>
              <div className={arrowDown ? "activeArrow2" : "nonActive"}>
                <FaAngleDoubleDown />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
