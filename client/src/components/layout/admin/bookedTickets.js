import React, { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import { getTickets } from "../../../actions/profile";

import { logout } from "../../../actions/auth";
import { connect } from "react-redux";
import PropTypes from "prop-types";

const AdminPanel = ({ auth: { isAuthenticated }, logout }) => {
  const dispatch = useDispatch();

  const bookedTickets = useSelector((state) => state.profile.getTickets) || [];

  //popular routes
  useEffect(() => {
    dispatch(getTickets());
  }, [dispatch]);

  return (
    <>
      <main className="p-2">
        {/* back button */}

        <button className="mt-2 flex items-center space-x-1">
          <Link to={"/admin_dashboard"}>
            <img
              class="w-5 transition-all duration-2000 hover:scale-110"
              src="/back-button-svgrepo-com.svg"
              title="back button"
              alt="iconBtn"
            />
          </Link>
          <span>dashboard</span>
        </button>
        {/* back button */}
        <h1 className="text-center font-bold text-2xl p-3">Admin Panel</h1>
        <h1 className="text-center font-bold p-3">BookedTickets</h1>

        <p className="text-center text-sm">
          <em>Access restricted to authorized personnel only</em>
        </p>

        {/* <div className="flex flex-wrap gap-4 justify-center bg-slate-200 p-4 rounded-md">
          {busRoutes.map((route) => {
            return (
              <>
                <BusInforCard key={route.id} route={route} />
              </>
            );
          })}
        </div> */}

        <div>
          <div className="flex flex-wrap gap-4 justify-center bg-slate-200 p-4">
            {bookedTickets.map((ticket) => {
              const date = ticket.date.split("T")[0];
              let reservedSeat = "";
              let passengerName = "";

              try {
                // Parse the JSON string into an object
                const parsedPassenger = JSON.parse(ticket.passengerName);

                // Extract seat number and passenger name
                for (const [seatNumber, name] of Object.entries(
                  parsedPassenger
                )) {
                  reservedSeat = seatNumber;
                  passengerName = name;
                }
              } catch (error) {
                console.error(
                  "Error parsing passengerName:",
                  ticket.passengerName,
                  error
                );
              }

              return (
                <>
                  <div
                    key={ticket.id}
                    className="w-64 bg-white shadow-md p-4 rounded-md flex-shrink-0"
                  >
                    <h3 className="font-bold text-lg">{passengerName}</h3>

                    <h3 className="font-bold text-lg">{reservedSeat}</h3>

                    <p className="text-sm">{ticket.busPosition}</p>

                    <p className="text-sm">
                      Route:
                      {ticket.from} - {ticket.to}
                    </p>
                    <p className="text-sm">
                      Seat number: {ticket.reservedSeats}
                    </p>

                    <p className="text-sm">Time: {ticket.time}</p>
                    <p className="text-sm">Date: {date}</p>

                    <p className="text-sm text-green-600">
                      Price: K{ticket.price}
                    </p>
                    <p className="text-sm mt-2">Id: {ticket.uniqueCode}</p>
                  </div>
                </>
              );
            })}
          </div>
        </div>
      </main>
    </>
  );
};

AdminPanel.propTypes = {
  logout: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { logout })(AdminPanel);
