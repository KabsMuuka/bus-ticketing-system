// src/components/layout/Landing.js

import React, { Fragment, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { searchBuses, popularRoutes } from "../../actions/profile";
//useDispatch
import { useDispatch, useSelector } from "react-redux";

//date selector
import DateLimitor from "./DateLimitor";

import generatedCode from "./generateUniqueCode";

const Landing = () => {
  const dispatch = useDispatch();

  const [user, exp1] = useState("");
  // State to hold the selected date
  const [formData, setFormData] = useState({
    start: "",
    end: "",
    date: "",
  });
  const { start, end } = formData;

  useEffect(() => {
    dispatch(popularRoutes()); //for popular cities
  }, [dispatch]);

  //GENERATE 6 digit CODE && and saving to localstorage
  useEffect(() => {
    const unique_code = generatedCode();
    localStorage.setItem("uniqueCode", unique_code);
  }, []);

  const Routes = useSelector((state) => state.profile.popularRoutes) || []; //.profile."popularRoutes" is the state defined in Reducer profile.js
  const Ul_key_id = Routes.map((data) => data.id); //ul key id

  const handleToCity = (e) => {
    e.preventDefault();
    setFormData({ ...formData, [e.target.name]: e.target.value });
    localStorage.setItem("destination", e.target.value); //add destination city to local storage
  };
  const handleFromCity = (e) => {
    e.preventDefault();
    setFormData({ ...formData, [e.target.name]: e.target.value });
    localStorage.setItem("start", e.target.value); //add start point city to localstorage
  };

  const onSubmit = (e) => {
    e.preventDefault();
    searchBuses({ start, end }).then((busData) => {
      //checks if busData is an array or is [] empty
      console.log(busData);
      const validBusData = Array.isArray(busData) ? busData : [];

      exp1(
        <div className="profile-exp p-2">
          <h4 className="Available_Bus">Available</h4>
          <ul key={Ul_key_id} className="UL">
            {validBusData && validBusData.length > 0 ? (
              <Fragment>
                {validBusData.map((bus) => (
                  <li key={bus.id}>
                    <div className="container1">
                      <div className="card">
                        <div className="box">
                          <div className="content">
                            <span>
                              <h3>{bus.busPosition}</h3>{" "}
                            </span>
                            <span>
                              <h3>Routes </h3>
                              <h5>{bus.stops.join(", ")} </h5>
                            </span>
                            <span>
                              <h1>Time </h1>
                              <h3>{bus.time} Hours</h3>
                            </span>
                            <Link
                              to="/book/menu1"
                              className="bookBtn btn-light"
                              onClick={() => {
                                handleSubmit(bus.busPosition, bus.time);
                              }}
                            >
                              Book Bus
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  </li>
                ))}
              </Fragment>
            ) : (
              <h4>No Buses Found.</h4>
            )}
          </ul>
        </div>
      );

      const handleSubmit = (busPosition, busTime) => {
        localStorage.setItem("busPosition", busPosition); //pass the position dynamically based on of the user choose
        localStorage.setItem("time", busTime); //pass the time dynamically based on of the user choose
      };
    });
  };

  return (
    <div>
      <div className="rdc">
        <div className="main-container">
          <form className="form-inline" onSubmit={(e) => onSubmit(e)}>
            <input
              type="text"
              placeholder="From"
              name="start"
              data-style="btn-new"
              className="selectpicker"
              value={start}
              onChange={(e) => {
                handleFromCity(e);
              }}
            />
            <input
              type="text"
              name="end"
              placeholder="Destination"
              data-style="btn-new"
              className="selectpicker"
              value={end}
              onChange={(e) => {
                handleToCity(e);
              }}
            />
            <DateLimitor />

            <button type="submit" className="searchBtn" value="Search">
              search
            </button>
          </form>

          <div className="temp1">
            Are you a New User?{" "}
            <Link to="/register">
              {" "}
              <strong>Sign Up</strong>{" "}
            </Link>
          </div>

          <div className="tickets">{user}</div>

          <div className="profile-exp p-2">
            <h4 className="popular_routes">POPULAR</h4>

            <ul key={Ul_key_id} className="UL">
              {Routes && Routes.length > 0 ? (
                <Fragment>
                  {Routes.map((city) => (
                    <li key={city.id}>
                      <div className="container1">
                        <div className="card">
                          <div className="box">
                            <div className="content">
                              <span>
                                <h3>{city.busPosition}</h3>{" "}
                              </span>

                              <span>
                                <h4>Route </h4>
                                <h5>{city.stops.join(" , ")} </h5>
                              </span>
                              <span>
                                <h1>Time </h1>
                                <h3>{city.time} Hours</h3>
                              </span>
                              <Link
                                to="/book/menu1"
                                className="bookBtn btn-light"
                                onClick={() => {
                                  handleSubmit(city.busPosition, city.time);
                                }}
                              >
                                Book Bus
                              </Link>
                            </div>
                          </div>
                        </div>
                      </div>
                    </li>
                  ))}
                </Fragment>
              ) : (
                <h4>No Popular Routes Found.</h4>
              )}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

Landing.propTypes = {
  searchBuses: PropTypes.func.isRequired,
  popularRoutes: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  popularRoutes: state.profile.popularRoutes,
});

const handleSubmit = (busPosition, busTime) => {
  localStorage.setItem("busPosition", busPosition);
  localStorage.setItem("time", busTime); //pass the time dynamically based on of the user choose
};
export default connect(mapStateToProps, { searchBuses, popularRoutes })(
  Landing
);
