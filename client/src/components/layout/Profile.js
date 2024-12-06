import React, { Fragment, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";

// Types
import {
  getCurrentProfile,
  removeTicket,
  getTickets,
  deleteAccount,
} from "../../actions/profile"; // Path

const Profile = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCurrentProfile());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getTickets());
  }, [dispatch]);

  const currentUser =
    useSelector((state) => state.profile.getCurrentUser) || [];
  const savedTickets = useSelector((state) => state.profile.getTickets) || [];

  console.log(savedTickets);
  // Generating QR Code
  const [QRCode, setQrCode] = useState([]);

  useEffect(() => {
    const generatedQrCodes = savedTickets.map((ticket) => ({
      qrCodeUrl: `https://api.qrserver.com/v1/create-qr-code/?size=100x100&data=${ticket.uniqueCode}`,
    }));

    setQrCode(generatedQrCodes);
  }, [savedTickets]);

  const hasTicketForUser = savedTickets.some(
    (data) => data.userId === currentUser.id
  );

  // DELETE ACCOUNT
  const handle_deleteAccount = (id) => {
    const isConfirmed = window.confirm(
      "Are you sure you want to delete your account?"
    );
    if (isConfirmed) {
      dispatch(deleteAccount(id));
    }
  };

  // TICKET DELETION
  const handle_deleteTicket = (id) => {
    const isConfirmed = window.confirm(
      "Are you sure you want to delete your booked Ticket?"
    );
    if (isConfirmed) {
      dispatch(removeTicket(id)); // Passing ticket id
    }
  };

  let filteredTickets_uniqueCodes;

  return (
    <Fragment>
      <button className="mt-2 flex items-center space-x-1">
        <Link to={"/dashboard"}>
          <img
            class="w-5 transition-all duration-2000 hover:scale-110"
            src="/back-button-svgrepo-com.svg"
            title="back button"
          />
        </Link>
        <span>dashboard</span>
      </button>

      <div className="max-w-4xl mx-auto my-8 p-6 bg-white rounded-lg shadow-lg">
        <div className="bg-blue-500 p-4 rounded-t-lg">
          <h3 className="text-2xl font-bold text-white">
            {currentUser && currentUser.name}
          </h3>
          <h4 className="text-lg text-gray-200">
            <i className="fas fa-globe fa-2x"></i>{" "}
            {currentUser && currentUser.phoneNumber}
          </h4>
          <div className="flex items-center justify-between mt-2">
            <button
              className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition"
              onClick={() => handle_deleteAccount(currentUser.id)}
            >
              Delete Account
            </button>
          </div>
        </div>

        <div className="bg-gray-50 p-1 rounded-b-lg">
          <h2 className="text-xl font-semibold text-red-500 mb-4">
            Purchased Tickets
          </h2>
          <div className="flex flex-wrap gap-4">
            {hasTicketForUser ? (
              savedTickets
                .filter((ticket) => ticket.userId === currentUser.id)
                .map((data) => {
                  filteredTickets_uniqueCodes = data.uniqueCode;

                  return (
                    <div
                      key={data.id}
                      className="bg-white p-4 rounded-lg shadow flex flex-col items-start w-64"
                    >
                      <span>
                        {QRCode && QRCode.length > 0 ? (
                          QRCode.filter((ticket) => {
                            const parts = ticket.qrCodeUrl.split("&data=");
                            const code = parts[1];
                            return code === filteredTickets_uniqueCodes;
                          }).map((ticket) => (
                            <img
                              key={ticket.qrCodeUrl}
                              src={ticket.qrCodeUrl}
                              alt="QR Code"
                              className="w-24 h-24 mb-2"
                            />
                          ))
                        ) : (
                          <p>No QR codes available</p>
                        )}
                      </span>
                      <h3 className="text-lg font-semibold">
                        {data.busPosition}
                      </h3>

                      <h5 className="text-gray-600">
                        Route: {data.from + "-" + data.to}
                      </h5>
                      <h3 className="text-gray-600">
                        Time: <strong>{data.time} Hours</strong>{" "}
                      </h3>
                      <h3 className="text-gray-600 ">
                        Price:{" "}
                        <span className="text-green-600"> K{data.price} </span>
                      </h3>
                      <h4 className="text-gray-600">
                        Date: <strong>{data.date.split("T")[0]}</strong>
                      </h4>
                      <button
                        className="mt-2 bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition"
                        onClick={() => handle_deleteTicket(data.id)}
                      >
                        Delete Bus
                      </button>
                    </div>
                  );
                })
            ) : (
              <h4 className="text-center text-gray-500">No Tickets Found.</h4>
            )}
          </div>
        </div>
      </div>
    </Fragment>
  );
};

Profile.propTypes = {
  currentUser: PropTypes.array.isRequired,
  savedTickets: PropTypes.func.isRequired,
  removeTicket: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  currentUser: state.profile.profile,
  savedTickets: state.profile.getTickets,
});

export default connect(mapStateToProps, {
  getCurrentProfile,
  getTickets,
  removeTicket,
})(Profile);
