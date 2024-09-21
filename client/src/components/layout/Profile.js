import React, { Fragment, useEffect, useMemo, useState } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";

//types
import {
  getCurrentProfile,
  removeTicket,
  getTickets,
  deleteAccount,
  ticket_codes,
} from "../../actions/profile"; //path

const Profile = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCurrentProfile());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getTickets());
  }, [dispatch]);

  //assign state.profile.getCurrentProfile to getCurrentProfile
  const currentUser = useSelector((state) => state.profile.profile) || []; //.profile.profile, file name, then profile defined in profile.js
  const savedTickets = useSelector((state) => state.profile.getTickets) || [];

  //Generating QrCode
  const [QRCode, setQrCode] = useState([]);

  useEffect(() => {
    // Generate QR code URLs
    const generatedQrCodes = savedTickets.map((ticket) => ({
      qrCodeUrl: `https://api.qrserver.com/v1/create-qr-code/?size=100x100&data=${ticket.uniqueCode}`,
    }));

    setQrCode(generatedQrCodes);
  }, []);

  console.log("QRCode", QRCode);
  //end

  // console.log("currentUser", currentUser);
  // console.log("savedTickets", savedTickets);

  //The some method is used to determine if there is at least one ticket where data.userId matches currentUser.id
  //returns a boolean if exits or not
  //used in a condition ? : ..

  //expected result is "true"
  const hasTicketForUser = savedTickets.some(
    (data) => data.userId === currentUser.id
  );

  // DELETE ACCOUNT
  //passing current user_id
  const handle_deleteAccount = (id) => {
    // Display a confirmation dialog
    const isConfirmed = window.confirm(
      "Are you sure you want to delete your account?"
    );
    if (isConfirmed) {
      dispatch(deleteAccount(id));
    }
  };

  //TICKET DELETION
  const handle_deleteTicket = (id) => {
    const isConfirmed = window.confirm(
      "Are you sure you want to delete your booked Ticket?"
    );
    if (isConfirmed) {
      dispatch(removeTicket(id)); //passing ticket id
    }
  };

  let filteredTickets_uniqueCodes;
  return (
    <Fragment>
      <div className="profile-grid my-1">
        <div className="profile-top bg-primary p-2">
          <h3 className="x-large fas fa-user ">
            {currentUser && currentUser.name}
          </h3>
          <h4 className="large">
            <i className="fas fa-globe fa-2x"></i>{" "}
            {currentUser && currentUser.email}
          </h4>
          <div className="icons my-1">
            <h3>
              <i className="" /> {currentUser && currentUser.gender}
            </h3>

            <div className="delete_account">
              {/* arrow function Ensures handle_deleteAccount() is only called onClick */}
              <button
                className="DELETE_ACCOUNT_BUTTON"
                onClick={() => handle_deleteAccount(currentUser.id)}
              >
                Delete-Account
              </button>
            </div>
          </div>
        </div>
        <div className="profile-exp bg-white p-2">
          <h2 className="text-danger">Booked Buses</h2>
          {/*
          Filter Tickets:
          If hasTicketsForUser is true, filter savedTickets to include 
          only those where data.userId matches currentUser.id. Then, map through the filtered tickets to display them.
          */}
          {/* ADD A UNIQUE CODE FOR A TICKET */}
          <ul className="UL">
            {hasTicketForUser && hasTicketForUser === true ? (
              <Fragment>
                {savedTickets &&
                  savedTickets
                    .filter((ticket) => ticket.userId === currentUser.id)
                    .map(
                      (data) => (
                        (filteredTickets_uniqueCodes = data.uniqueCode),
                        (
                          <li key={data.id}>
                            <div className="profile-container">
                              <div className="profile-card">
                                <div className="profile-box">
                                  <div className="profile-content">
                                    {/* Find and display the QR code for the current ticket */}
                                    <span>
                                      {/* image */}
                                      {QRCode && QRCode.length > 0 ? (
                                        // Use filter instead of map for conditional rendering
                                        QRCode.filter((ticket) => {
                                          const parts =
                                            ticket.qrCodeUrl.split("&data=");
                                          const data = parts[1];
                                          console.log("data part", data);
                                          return (
                                            data === filteredTickets_uniqueCodes
                                          ); // Extract and compare UID
                                        }).map((ticket) => (
                                          <img
                                            key={ticket.qrCodeUrl}
                                            src={ticket.qrCodeUrl}
                                            alt="QR Code"
                                          /> // Add key prop
                                        ))
                                      ) : (
                                        <p>No QR codes available</p> // Placeholder for no QR codes
                                      )}
                                    </span>
                                    <h3>{data.busPosition}</h3>
                                    <span>
                                      <h4>Route </h4>
                                      <h5> {data.from + "," + data.to}</h5>
                                    </span>
                                    <span>
                                      <h1>Time </h1>
                                      <h3>{data.time} Hours</h3>
                                    </span>
                                    <span>
                                      <h3>Date</h3>

                                      <h4>{data.date.split("T")[0]}</h4>
                                    </span>
                                    <button
                                      className="btn btn-danger"
                                      onClick={() => {
                                        handle_deleteTicket(data.id);
                                      }}
                                    >
                                      Delete Bus
                                    </button>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </li>
                        )
                      )
                    )}
              </Fragment>
            ) : (
              <h4 className="noTicketsFound">No Tickets Found.</h4>
            )}
          </ul>
        </div>
      </div>
    </Fragment>
  );
};

Profile.propTypes = {
  currentUser: PropTypes.array.isRequired,
  savedTickets: PropTypes.func.isRequired, //pending
  removeTicket: PropTypes.func.isRequired,
  // auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  // auth: state.auth,
  currentUser: state.profile.profile,
  savedTickets: state.profile.getTickets,
  removeTicket: state.profile.remove_ticket,
});

export default connect(mapStateToProps, {
  getCurrentProfile,
  getTickets,
  removeTicket,
})(Profile);
