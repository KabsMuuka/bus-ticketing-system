import React, { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ticket_codes } from "../../../actions/profile"; // Import the action correctly
import "./adminStyle.css";

import { popularRoutes } from "../../../actions/profile";
import { getTickets } from "../../../actions/profile";

const AdminPanel = () => {
  const dispatch = useDispatch();
  const [availableCodes, setAvailableCodes] = useState("");
  const [showAvailableCodes, setShowAvailableCode] = useState("");

  const busRoutes = useSelector((state) => state.profile.popularRoutes) || [];
  const bookedTickets = useSelector((state) => state.profile.getTickets) || [];

  const codes = useSelector((state) => state.profile.ticket_codes);

  //popular routes
  useEffect(() => {
    dispatch(popularRoutes());
  }, [dispatch]);

  const BusInforCard = ({ route }) => {
    //making a busInformation card
    return (
      <>
        <div className="bg-slate-400 rounded-md" key={route.id}>
          <h3 className="font-bold text-xl">🎟 {route.busPosition} 🎟</h3>
          <p className="text-md">Route: {route.stops.join(" - ")}</p>
          <p className="text-md">Time: {route.time} Hours</p>
          <div>
            <p>price : {route.price}</p>
            <button className="btn">Edit price</button>
          </div>
        </div>
      </>
    );
  };

  //booked tickets
  useEffect(() => {
    dispatch(getTickets());
  }, [dispatch]);

  const Soldtickets = ({ ticket }) => {
    //making a busInformation card
    const date = ticket.date.split("T")[0];
    return (
      <>
        <h1 className="text-sm"> sold ticket </h1>
        <div className="bg-gray-600 rounded-md" key={ticket.id}>
          <p className="font-bold text-xl">Name {ticket.passengerName}</p>
          <p className="">{ticket.busPosition}</p>
          <p className="text-md">Route: {ticket.from + "-" + ticket.to}</p>
          <p className="text-md">Time: {ticket.time} Hours</p>
          <p className="text-md">Date: {date}</p>
          <p className="text-md text-green-600">Price: {ticket.price}</p>
        </div>
      </>
    );
  };

  //codes
  useEffect(() => {
    dispatch(ticket_codes());
  }, [dispatch]);

  const onChange = (e) => {
    setAvailableCodes(e.target.value);
  };

  const searchCodes = (e) => {
    e.preventDefault();

    const istrue = codes
      .filter((code) => code.uniqueCode.includes(availableCodes))
      .map((data) => data.uniqueCode);
    // console.log(istrue);
    if (istrue.length > 0 && istrue == "") {
      setShowAvailableCode(istrue);
    } else {
      setShowAvailableCode("Not In The System");
    }
  };

  return (
    <>
      <main className="admin-panel">
        <h1>Admin Panel</h1>
        <h1>Bus bus- Information</h1>
        <div className="flex flex-row space-x-2 border border-dashed rounded-lg shadow-md  bg-white">
          {busRoutes.map((route) => {
            return (
              <>
                <BusInforCard key={route.id} route={route} />
              </>
            );
          })}
        </div>

        <div className="flex flex-row space-x-2  border border-dashed p-4 rounded-lg shadow-md  bg-white">
          {bookedTickets.map((ticket) => {
            return (
              <>
                <Soldtickets key={ticket.id} ticket={ticket} />
              </>
            );
          })}
        </div>
      </main>
    </>
  );
};

export default AdminPanel;
