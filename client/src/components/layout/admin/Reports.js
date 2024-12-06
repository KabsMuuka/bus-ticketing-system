import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getTickets } from "../../../actions/profile"; // Import your action
import { Link } from "react-router-dom";
const Reports = () => {
  const dispatch = useDispatch();
  const [TodayTotalPrice, setTodayTotalPrice] = useState(0);
  const [overallBookedTicket, setOverallBooked] = useState(0);
  const [dayTicketBooked, setDayTicketBooked] = useState(0);
  const [revenueByDestination, setRevenueByDestination] = useState({});
  const [salesByDestination, setSalesByDestination] = useState({});

  const bookedtickets = useSelector((state) => state.profile.getTickets) || [];

  // Fetch tickets on component mount
  useEffect(() => {
    dispatch(getTickets());
  }, [dispatch]);

  // Calculate today's tickets, total price, and grouped metrics
  useEffect(() => {
    const today = new Date().toISOString().split("T")[0];
    const todaysTickets = bookedtickets.filter(
      (ticket) => ticket.date.split("T")[0] === today
    );

    // Today's total price
    setTodayTotalPrice(
      todaysTickets.reduce(
        (total, ticket) => total + Number(ticket.price || 0),
        0
      )
    );

    // Today's ticket count
    setDayTicketBooked(todaysTickets.length);

    // Group revenue and ticket sales by destination
    const revenue = {};
    const sales = {};

    bookedtickets.forEach((ticket) => {
      const destination = ticket.to || "Unknown";
      const price = Number(ticket.price || 0);

      // Revenue by destination
      revenue[destination] = (revenue[destination] || 0) + price;

      // Ticket sales by destination
      sales[destination] = (sales[destination] || 0) + 1;
    });

    setRevenueByDestination(revenue);
    setSalesByDestination(sales);
  }, [bookedtickets]); // Recalculate when bookedtickets changes

  // Calculate overall booked tickets
  useEffect(() => {
    setOverallBooked(bookedtickets.length);
  }, [bookedtickets]); // Recalculate when bookedtickets changes

  return (
    <div className="container mx-auto px-4 py-4">
      <button className="mt-2 flex items-center space-x-1">
        <Link to={"/admin_dashboard"}>
          <img
            class="w-5 transition-all duration-2000 hover:scale-110"
            src="/back-button-svgrepo-com.svg"
            title="back button"
          />
        </Link>
        <span>dashboard</span>
      </button>
      <h1 className="text-3xl text-center font-extrabold text-gray-800 mb-8">
        Reports
      </h1>

      {/* Overall Metrics Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {/* Today's Booked Tickets */}
        <div className="bg-white shadow-md rounded-lg p-6 flex flex-col items-center">
          <div className="flex items-center justify-center w-20 h-20 bg-blue-500 text-white rounded-full text-3xl font-bold">
            {dayTicketBooked}
          </div>
          <p className="mt-4 text-center text-gray-600 font-semibold">
            Today’s Booked Tickets
          </p>
        </div>

        {/* Today's Total Price */}
        <div className="bg-white shadow-md rounded-lg p-6 flex flex-col items-center">
          <div className="flex items-center justify-center w-22 h-20 bg-green-500 text-white rounded-full text-3xl font-bold">
            K{TodayTotalPrice}
          </div>
          <p className="mt-4 text-center text-gray-600 font-semibold">
            Today’s Total Price
          </p>
        </div>

        {/* Overall Booked Tickets */}
        <div className="bg-white shadow-md rounded-lg p-6 flex flex-col items-center">
          <div className="flex items-center justify-center w-20 h-20 bg-purple-500 text-white rounded-full text-3xl font-bold">
            {overallBookedTicket}
          </div>
          <p className="mt-4 text-center text-gray-600 font-semibold">
            Overall Booked Tickets
          </p>
        </div>
      </div>

      {/* Revenue by Destination */}
      <div className="bg-white shadow-md rounded-lg p-6 mb-8">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          Revenue by Destination
        </h2>
        <ul>
          {Object.entries(revenueByDestination).map(
            ([destination, revenue]) => (
              <li
                key={destination}
                className="flex justify-between border-b py-2"
              >
                <span className="font-medium text-gray-600">{destination}</span>
                <span className="text-gray-800 font-bold">
                  K{revenue.toFixed(2)}
                </span>
              </li>
            )
          )}
        </ul>
      </div>

      {/* Ticket Sales by Destination */}
      <div className="bg-white shadow-md rounded-lg p-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          Ticket Sales by Destination
        </h2>
        <ul>
          {Object.entries(salesByDestination).map(([destination, sales]) => (
            <li
              key={destination}
              className="flex justify-between border-b py-2"
            >
              <span className="font-medium text-gray-600">{destination}</span>
              <span className="text-gray-800 font-bold">{sales} tickets</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Reports;
