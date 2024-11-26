import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { searchBuses, popularRoutes } from "../../actions/profile";
import DateLimitor from "./DateLimitor";
import generatedCode from "./generateUniqueCode";

const Landing = () => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({ start: "", end: "" });
  const { start, end } = formData;
  const [busData, setBusData] = useState([]);
  const [hasSearched, setHasSearched] = useState(false);

  const Routes = useSelector((state) => state.profile.popularRoutes) || [];

  useEffect(() => {
    dispatch(popularRoutes());
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

  const isButtonDisabled = !start || !end;
  return (
    <div className="container mx-auto px-4 py-8">
      {/* Input Form */}
      <form
        className="flex flex-col md:flex-row gap-1 w-full max-w-lg mx-auto mb-8"
        // onSubmit={onSubmit}
      >
        <input
          type="text"
          className="input bg-slate-100 input-bordered w-full max-w-xs"
          name="start"
          placeholder="From"
          value={start}
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="end"
          placeholder="Destination"
          className="input  bg-slate-100  input-bordered  w-full max-w-xs"
          value={end}
          onChange={handleInputChange}
        />
        <DateLimitor />
        <button
          // type="submit"
          onClick={onSubmit}
          className="bg-green-500 text-white px-4 py-2 rounded-md"
          disabled={isButtonDisabled}
        >
          Search
        </button>
      </form>

      {/* Available Buses */}
      <div className="mt-4">
        {/* <ul className="grid grid-cols-1 place-items-center gap-6 mt-4"> */}

        <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {busData.length > 0
            ? busData.map((bus) => (
                <li
                  key={bus.id}
                  className="border border-dashed p-4 rounded-lg shadow-md bg-white max-w-md mx-auto "
                >
                  <div className="flex flex-col space-y-2">
                    <h3 className="font-bold text-xl">🎟 {bus.busPosition} 🎟</h3>
                    <p className="text-m">Route: {bus.stops.join(" - ")}</p>
                    <p className="text-m">Time: {bus.time} Hours</p>
                    <p className="text-md">
                      Price:{" "}
                      <span className="text-green-700"> K{bus.price} </span>
                    </p>{" "}
                    <Link
                      to={`/book/${bus.busPosition}`}
                      className="bg-blue-500 text-white px-4 py-2 rounded-md mt-2"
                      onClick={() => localStorage.setItem("price", bus.price)}
                    >
                      Book Bus
                    </Link>
                  </div>
                </li>
              ))
            : hasSearched && (
                <div className="flex justify-center mt-4">
                  <div
                    role="alert"
                    className="alert alert-warning flex items-center w-full max-w-lg p-4 border border-yellow-300 rounded-lg bg-yellow-100 text-yellow-700"
                  >
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
                    <span className="">No buses found!</span>
                  </div>
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
                className="border border-dashed p-4 rounded-lg shadow-md bg-white max-w-md mx-auto"
              >
                <div className="flex flex-col space-y-2">
                  <h3 className="font-bold text-xl">🎟 {city.busPosition} 🎟</h3>
                  <p className="text-md">Route: {city.stops.join(" - ")}</p>
                  <p className="text-md">Time: {city.time} Hours</p>
                  <p className="text-md">
                    Price:{" "}
                    <span className="text-green-700"> K{city.price} </span>
                  </p>
                  <Link
                    to={`/book/${city.busPosition}`}
                    className="bg-green-500 text-white px-4 py-2 rounded-md mt-4 w-full text-center"
                    onClick={() => localStorage.setItem("price", city.price)}
                  >
                    Book Bus
                  </Link>
                </div>
              </li>
            ))
          ) : (
            <p>No Popular Routes Found.</p>
          )}
        </ul>
      </div>
    </div>
  );
};

export default Landing;
