import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { searchBuses, popularRoutes } from "../../actions/profile";
import DateLimitor from "./DateLimitor";
import generatedCode from "./generateUniqueCode";
import { getTickets } from "../../actions/profile";
import { getCurrentProfile } from "../../actions/profile";

const Landing = () => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({ start: "", end: "" });
  const { start, end } = formData;
  const [busData, setBusData] = useState([]);
  const [hasSearched, setHasSearched] = useState(false);
  const [showmessage, setShowmessage] = useState(false);
  const [message, setMessage] = useState(false);

  const Routes = useSelector((state) => state.profile.popularRoutes) || [];
  const bookedtickets = useSelector((state) => state.profile.getTickets) || [];
  const currentUser =
    useSelector((state) => state.profile.getCurrentUser) || [];

  //pupular routes
  useEffect(() => {
    dispatch(popularRoutes());
  }, [dispatch]);

  //booked tickets
  useEffect(() => {
    dispatch(getTickets());
  }, [dispatch]);

  //all buses
  useEffect(() => {
    dispatch(getCurrentProfile());
  }, [dispatch]);

  useEffect(() => {
    const unique_code = generatedCode();
    localStorage.setItem("uniqueCode", unique_code);
  }, []);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    localStorage.setItem(e.target.name, e.target.value);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    setHasSearched(true);
    setTimeout(() => {
      setHasSearched(false);
    }, 3000);

    searchBuses({ start, end }).then((data) => {
      setBusData(Array.isArray(data) ? data : []);
    });
  };

  const userId = currentUser.id; // Assuming you have the current user's id
  const userTickets = bookedtickets.filter(
    (ticket) => ticket.userId === userId
  );

  //if user has book more than 1 but less than 2 tickets disable book bus btn
  const disablebookButton = userTickets.length >= 5;
  useEffect(() => {
    if (disablebookButton) {
      setShowmessage(true);
      setMessage(
        "You have reached the maximum number of tickets allowed. Thank you for booking with us!"
      );
    }
  }, []);

  //search button
  const isButtonDisabled = !start || !end;

  //date for popular routes

  const date = new Date();
  const presentDate = date.toISOString().split("T")[0]; // Format as YYYY-MM-DD

  const to = busData.map((bus) => bus.stops[1]);

  return (
    <div className="container mx-auto px-4 py-2">
      {/* Input Form */}
      <form className="flex flex-wrap items-center justify-center gap-4 w-full max-w-lg mx-auto p-6 bg-white rounded-lg shadow-md">
        <input
          type="text"
          className="input bg-slate-100 input-bordered w-[200px] p-4 rounded-md"
          name="start"
          placeholder="Where from ?"
          value={start}
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="end"
          placeholder="Where to ?"
          className="input bg-slate-100 input-bordered w-[200px] p-4 rounded-md"
          value={end}
          onChange={handleInputChange}
        />
        <DateLimitor />
        <button
          onClick={onSubmit}
          className="bg-green-500 text-white px-6 py-3 rounded-md hover:bg-green-600 transition duration-300"
          disabled={isButtonDisabled}
        >
          Search
        </button>
      </form>

      {showmessage && (
        <p className="text-center mt-4 text-red-600 font-semibold bg-red-100 p-4 rounded-lg shadow-sm">
          {message}
        </p>
      )}
      {/* Available Buses */}
      <div className="mt-8">
        <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {busData.length > 0
            ? busData.map((bus) => (
                <li
                  key={bus.id}
                  className="border border-dashed p-6 rounded-lg shadow-md bg-white max-w-md mx-auto transition transform hover:scale-105 hover:shadow-lg"
                >
                  <div className="flex flex-col space-y-4">
                    <h3 className="font-bold text-xl text-blue-600">
                      🎟 {bus.busPosition} 🎟
                    </h3>
                    <p className="text-sm text-gray-600">
                      Route: {bus.stops.join(" - ")}
                    </p>
                    <p className="text-sm text-gray-600">
                      Time: {bus.time} Hours
                    </p>
                    <p className="text-md text-gray-800">
                      Price:{" "}
                      <span className="text-green-700"> K{bus.price} </span>
                    </p>
                    {disablebookButton ? (
                      <button
                        className="bg-gray-500 text-white px-4 py-2 rounded-md mt-2 cursor-not-allowed"
                        disabled
                      >
                        Book bus
                      </button>
                    ) : (
                      <Link
                        to={`/book/${bus.busPosition}`}
                        className="bg-blue-500 text-white px-6 py-3 rounded-md mt-4 w-full text-center hover:bg-blue-600 transition duration-300"
                        onClick={() => {
                          localStorage.setItem("price", bus.price);
                          localStorage.setItem("time", bus.time);
                          localStorage.setItem("busPosition", bus.busPosition);
                          localStorage.setItem("to", to);
                        }}
                      >
                        Book Bus
                      </Link>
                    )}
                  </div>
                </li>
              ))
            : hasSearched && (
                <div className="col-span-full flex justify-center">
                  <span className="alert alert-warning flex items-center w-full max-w-lg p-4 border border-yellow-300 rounded-lg bg-yellow-100 text-yellow-700">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6 shrink-0"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                      />
                    </svg>
                    <p className="text-center flex-1"> No Buses found!</p>
                  </span>
                </div>
              )}
        </ul>
      </div>

      {/* Popular Routes */}
      <div className="mt-8">
        <h4 className="text-lg font-semibold mb-4 text-center">
          Popular Routes
        </h4>
        <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Routes.length > 0 ? (
            Routes.map((city) => (
              <li
                key={city.id}
                className="border border-dashed p-6 rounded-lg shadow-md bg-white max-w-md mx-auto transition transform hover:scale-105 hover:shadow-lg"
              >
                <div className="flex flex-col space-y-4">
                  <h3 className="font-bold text-xl text-green-600">
                    🎟 {city.busPosition} 🎟
                  </h3>
                  <p className="text-sm text-gray-600">
                    Route: {city.stops.join(" - ")}
                  </p>
                  <p className="text-sm text-gray-600">
                    Time: {city.time} Hours
                  </p>
                  <p className="text-md text-gray-800">
                    Price:{" "}
                    <span className="text-green-700"> K{city.price} </span>
                  </p>

                  {disablebookButton ? (
                    <button
                      className="bg-gray-500 text-white px-4 py-2 rounded-md mt-2 cursor-not-allowed"
                      disabled
                    >
                      Book bus
                    </button>
                  ) : (
                    <Link
                      to={`/book/${city.busPosition}`}
                      className="bg-green-500 text-white px-6 py-3 rounded-md mt-4 w-full text-center hover:bg-green-600 transition duration-300"
                      onClick={() => {
                        localStorage.setItem("price", city.price);
                        localStorage.setItem("busPosition", city.busPosition);
                        localStorage.setItem("time", city.time);
                        localStorage.setItem("date", presentDate);
                        localStorage.setItem("stops", city.stops);
                      }}
                    >
                      Book Bus
                    </Link>
                  )}
                </div>
              </li>
            ))
          ) : (
            <div>No popular routes found.</div>
          )}
        </ul>
      </div>
    </div>
  );
};

export default Landing;
